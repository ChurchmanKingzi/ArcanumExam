// ═══════════════════════════════════════════════════════════════════════════
//  main.js — Entry point: Discord SDK, Lobby, Game orchestration
// ═══════════════════════════════════════════════════════════════════════════
import { connect, emit, on } from './network.js';
import { initGame, updateGameState, resetGame, showMoeBombAnimation, hideLiveShowModal } from './game.js';

// ─── Discord SDK (optional) ──────────────────────────────────────────────
let discordUser = null;

async function initDiscord() {
  if (typeof DiscordSDK === 'undefined') {
    console.log('ℹ️ Discord SDK not detected — running in standalone mode');
    return null;
  }
  try {
    const sdk = new DiscordSDK();
    await sdk.ready();
    const { code } = await sdk.commands.authorize({
      client_id: sdk.clientId, response_type: 'code',
      state: '', prompt: 'none', scope: ['identify'],
    });
    const resp = await fetch('/api/token', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const { access_token } = await resp.json();
    const auth = await sdk.commands.authenticate({ access_token });
    discordUser = auth.user;
    console.log(`🎮 Discord user: ${discordUser.username}`);
    document.getElementById('input-name').value = discordUser.global_name || discordUser.username;
    document.getElementById('input-room').value = sdk.instanceId || 'discord-room';
    return sdk;
  } catch (err) {
    console.warn('Discord SDK init failed, continuing standalone:', err);
    return null;
  }
}

// ─── Session Storage ─────────────────────────────────────────────────────
function saveSession(sessionToken, roomId, playerName) {
  try { sessionStorage.setItem('cardgame_session', JSON.stringify({ sessionToken, roomId, playerName })); } catch {}
}
function loadSession() {
  try { const r = sessionStorage.getItem('cardgame_session'); return r ? JSON.parse(r) : null; } catch { return null; }
}
function clearSession() {
  try { sessionStorage.removeItem('cardgame_session'); } catch {}
}

// ─── Avatar Storage (localStorage for persistence across sessions) ───────
const AVATAR_STORAGE_KEY = 'cardgame_avatars';
const MAX_SAVED_AVATARS = 8;
let currentAvatar = null; // base64 data URL

function loadSavedAvatars() {
  try {
    const raw = localStorage.getItem(AVATAR_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveAvatarToHistory(dataUrl) {
  const avatars = loadSavedAvatars();
  // Don't duplicate
  const existing = avatars.indexOf(dataUrl);
  if (existing !== -1) avatars.splice(existing, 1);
  avatars.unshift(dataUrl);
  if (avatars.length > MAX_SAVED_AVATARS) avatars.length = MAX_SAVED_AVATARS;
  try { localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(avatars)); } catch {}
}

function renderAvatarHistory() {
  const avatars = loadSavedAvatars();
  $avatarHistory.innerHTML = '';
  avatars.forEach(dataUrl => {
    const thumb = document.createElement('div');
    thumb.className = 'avatar-history-thumb' + (currentAvatar === dataUrl ? ' selected' : '');
    thumb.style.backgroundImage = `url("${dataUrl}")`;
    thumb.addEventListener('click', () => {
      currentAvatar = dataUrl;
      setAvatarPreview(dataUrl);
      renderAvatarHistory();
    });
    $avatarHistory.appendChild(thumb);
  });
}

function setAvatarPreview(dataUrl) {
  $avatarPreview.style.backgroundImage = dataUrl ? `url("${dataUrl}")` : '';
  $avatarPreviewText.style.display = dataUrl ? 'none' : '';
}

function processAvatarFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = () => {
    // Resize to 96x96 for efficiency
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 96; canvas.height = 96;
      const ctx = canvas.getContext('2d');
      // Center-crop to square
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      ctx.drawImage(img, sx, sy, size, size, 0, 0, 96, 96);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      currentAvatar = dataUrl;
      setAvatarPreview(dataUrl);
      saveAvatarToHistory(dataUrl);
      renderAvatarHistory();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

// ─── DOM references ──────────────────────────────────────────────────────
const $lobby            = document.getElementById('screen-lobby');
const $game             = document.getElementById('screen-game');
const $btnJoin          = document.getElementById('btn-join');
const $btnStart         = document.getElementById('btn-start');
const $btnLeave         = document.getElementById('btn-leave');
const $inputName        = document.getElementById('input-name');
const $inputRoom        = document.getElementById('input-room');
const $lobbyWait        = document.getElementById('lobby-waiting');
const $lobbyRoom        = document.getElementById('lobby-room-name');
const $playerList       = document.getElementById('lobby-player-list');
const $toast            = document.getElementById('toast');
const $avatarInput      = document.getElementById('avatar-input');
const $avatarPreview    = document.getElementById('avatar-preview');
const $avatarPreviewText = document.getElementById('avatar-preview-text');
const $avatarHistory    = document.getElementById('avatar-history');
const $btnLobbyLeave    = document.getElementById('btn-lobby-leave');
const $turnTimerToggle  = document.getElementById('turn-timer-toggle');
const $btnToggleTimer   = document.getElementById('btn-toggle-timer');

$btnToggleTimer.addEventListener('click', () => {
  emit('lobby:toggleTurnTimer');
});

let myId = null;
let joined = false;
let reconnecting = false;

// ─── Toast ───────────────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  $toast.textContent = msg;
  $toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $toast.classList.add('hidden'), 3500);
}

// ─── Lobby Logic ─────────────────────────────────────────────────────────
function showLobby(state) {
  const isPostGame = state.phase === 'post-game-lobby';
  const players = [state.you, ...state.others].sort((a, b) => a.seat - b.seat);
  $playerList.innerHTML = '';
  const colors = state.playerColors || {};

  players.forEach(p => {
    // In post-game lobby, don't show players who left
    if (isPostGame && p.left) return;

    const chip = document.createElement('div');
    chip.className = 'lobby-player-chip' + (p.id === state.hostId ? ' host' : '');

    // In post-game lobby: gray out players still in fireworks
    if (isPostGame && !p.inPostGameLobby) {
      chip.classList.add('in-fireworks');
    }

    // Player color ring
    const color = colors[p.id];
    if (color) {
      chip.style.borderColor = color;
      chip.style.boxShadow = `0 0 8px ${color}40`;
      chip.style.background = `${color}18`;
    }

    // Winner badge
    if (isPostGame && (state.winners || []).includes(p.id)) {
      const badge = document.createElement('span');
      badge.className = 'lobby-winner-badge';
      badge.textContent = '🏆';
      chip.appendChild(badge);
    }

    // Show avatar in lobby chip if available
    if (p.customAvatar) {
      const ava = document.createElement('div');
      ava.className = 'lobby-chip-avatar';
      ava.style.backgroundImage = `url("${p.customAvatar}")`;
      chip.appendChild(ava);
    }

    // Disconnected indicator
    if (p.disconnected) {
      chip.classList.add('disconnected');
    }

    const nameSpan = document.createElement('span');
    nameSpan.textContent = p.name;
    chip.appendChild(nameSpan);
    $playerList.appendChild(chip);
  });

  if (isPostGame) {
    // Any player can start new game when conditions met
    const connected = players.filter(p => !p.left && !p.disconnected);
    const allInLobby = connected.every(p => p.inPostGameLobby);
    const enough = connected.length >= 2;
    $btnStart.classList.remove('hidden');
    $btnStart.disabled = !(allInLobby && enough);
    $btnStart.classList.toggle('btn-disabled', !(allInLobby && enough));
    $btnStart.textContent = allInLobby && enough ? 'Start New Game' : 'Waiting for players…';
    // Update hint
    const $hint = document.querySelector('.lobby-hint');
    const waiting = connected.filter(p => !p.inPostGameLobby).length;
    if (waiting > 0) {
      $hint.textContent = `Waiting for ${waiting} player${waiting > 1 ? 's' : ''} to exit results screen…`;
    } else if (!enough) {
      $hint.textContent = 'Need at least 2 players to start';
    } else {
      $hint.textContent = 'Ready! Any player can start a new game.';
    }
  } else {
    document.querySelector('.lobby-hint').textContent = 'Waiting for host to start…';
    if (state.hostId === myId && state.playerCount >= 2) {
      $btnStart.classList.remove('hidden');
      $btnStart.disabled = false;
      $btnStart.classList.toggle('btn-disabled', false);
      $btnStart.textContent = 'Start Game';
    } else {
      $btnStart.classList.add('hidden');
    }
  }

  // Turn Timer toggle — visible to all, clickable by host
  $turnTimerToggle.classList.remove('hidden');
  const timerOn = state.turnTimerEnabled || false;
  $btnToggleTimer.textContent = timerOn ? 'ON' : 'OFF';
  $btnToggleTimer.classList.toggle('timer-on', timerOn);
  $btnToggleTimer.disabled = (state.hostId !== myId);
}

function switchToGame() {
  $lobby.classList.remove('active');
  $game.classList.add('active');
  // Stop peeking when entering game
  emit('room:unpeek');
}

function switchToLobby(message) {
  $game.classList.remove('active');
  $lobby.classList.add('active');
  $lobbyWait.classList.add('hidden');
  document.querySelector('.lobby-form').style.display = '';
  joined = false;
  reconnecting = false;
  if (message) showToast(message);
  // Re-trigger peek for current room code
  updateRoomPeek();
}

// ─── Room Peek (live room status on join button) ─────────────────────────
let lastPeekedRoom = null;

function updateRoomPeek() {
  const room = $inputRoom.value.trim();
  if (!room) {
    $btnJoin.textContent = 'Create Room';
    $btnJoin.disabled = false;
    $btnJoin.classList.remove('btn-disabled');
    if (lastPeekedRoom) { emit('room:unpeek'); lastPeekedRoom = null; }
    return;
  }
  if (room !== lastPeekedRoom) {
    lastPeekedRoom = room;
    emit('room:peek', { roomId: room });
  }
}

function handleRoomStatus({ roomId, exists, playerCount, inProgress }) {
  // Only update if this is for the room currently typed
  if (roomId !== $inputRoom.value.trim()) return;
  if (joined) return; // don't touch button once joined

  if (!exists) {
    $btnJoin.textContent = 'Create Room';
    $btnJoin.disabled = false;
    $btnJoin.classList.remove('btn-disabled');
  } else if (inProgress) {
    $btnJoin.textContent = `Game in Progress`;
    $btnJoin.disabled = true;
    $btnJoin.classList.add('btn-disabled');
  } else if (playerCount >= 8) {
    $btnJoin.textContent = `Join Room (8/8)`;
    $btnJoin.disabled = true;
    $btnJoin.classList.add('btn-disabled');
  } else {
    $btnJoin.textContent = `Join Room (${playerCount}/8)`;
    $btnJoin.disabled = false;
    $btnJoin.classList.remove('btn-disabled');
  }
}

// ─── Init ────────────────────────────────────────────────────────────────
async function init() {
  await initDiscord();

  // Init avatar history
  const savedAvatars = loadSavedAvatars();
  if (savedAvatars.length > 0) {
    currentAvatar = savedAvatars[0];
    setAvatarPreview(currentAvatar);
  }
  renderAvatarHistory();

  // Avatar upload handler
  $avatarInput.addEventListener('change', (e) => {
    if (e.target.files[0]) processAvatarFile(e.target.files[0]);
    e.target.value = ''; // allow re-upload of same file
  });

  const socket = connect();
  myId = socket.id;

  socket.on('connect', () => {
    myId = socket.id;

    // Attempt reconnection
    const session = loadSession();
    if (session && !joined) {
      reconnecting = true;
      console.log(`🔄 Attempting reconnect to room ${session.roomId}...`);
      emit('room:join', {
        roomId: session.roomId,
        playerName: session.playerName,
        discordId: discordUser?.id || null,
        discordAvatar: discordUser?.avatar || null,
        sessionToken: session.sessionToken,
        customAvatar: currentAvatar,
      });
    }
  });

  // ── Room peek on input change ────────────────────────────────────────
  $inputRoom.addEventListener('input', () => updateRoomPeek());
  // Also peek on focus in case they switch back
  $inputRoom.addEventListener('focus', () => updateRoomPeek());

  // ── Room status updates (pushed by server in real-time) ───────────────
  on('room:status', handleRoomStatus);

  // ── Session token received (new join) ─────────────────────────────────
  on('session:token', ({ sessionToken, roomId }) => {
    const name = $inputName.value.trim();
    saveSession(sessionToken, roomId, name);
    console.log(`🔑 Session token saved for room ${roomId}`);
  });

  // ── Session restored (reconnection successful) ────────────────────────
  on('session:restored', () => {
    reconnecting = false;
    joined = true;
    console.log('✅ Session restored successfully');
    showToast('Reconnected!');
  });

  // ── Join ─────────────────────────────────────────────────────────────
  $btnJoin.addEventListener('click', () => {
    if ($btnJoin.disabled) return;
    const name = $inputName.value.trim();
    const room = $inputRoom.value.trim();
    if (!name || !room) {
      showToast('Please enter a name and room code');
      return;
    }
    emit('room:join', {
      roomId: room,
      playerName: name,
      discordId: discordUser?.id || null,
      discordAvatar: discordUser?.avatar || null,
      customAvatar: currentAvatar,
    });
    joined = true;
    $lobbyRoom.textContent = room;
    $lobbyWait.classList.remove('hidden');
    document.querySelector('.lobby-form').style.display = 'none';
  });

  $inputName.addEventListener('keydown', (e) => { if (e.key === 'Enter') $inputRoom.focus(); });
  $inputRoom.addEventListener('keydown', (e) => { if (e.key === 'Enter') $btnJoin.click(); });

  // ── Start ────────────────────────────────────────────────────────────
  let currentPhase = 'lobby';  // track current phase for start button
  $btnStart.addEventListener('click', () => {
    if ($btnStart.disabled) return;
    if (currentPhase === 'post-game-lobby') {
      emit('game:startNewGame');
    } else {
      emit('game:start');
    }
  });

  // ── Leave (from lobby/post-game lobby) ─────────────────────────────
  $btnLobbyLeave.addEventListener('click', () => {
    clearSession();
    emit('game:leave');
  });

  // ── Leave (in-game) ──────────────────────────────────────────────
  $btnLeave.addEventListener('click', () => {
    hideLiveShowModal();
    clearSession();
    emit('game:leave');
  });

  // ── Room closed ──────────────────────────────────────────────────────
  on('room:closed', ({ reason }) => {
    clearSession();
    resetGame();
    switchToLobby(reason);
  });

  // ── Game state updates ───────────────────────────────────────────────
  // MOE Bomb: start the animation immediately but delay rendering the damage
  // until the explosion fires (~1.55s in), so HP bars don't drop at anim start.
  const MOE_BOMB_EXPLOSION_MS = 1550;
  function applyGameState(state, id) {
    if (state.moeBombEvent) {
      showMoeBombAnimation(state);
      setTimeout(() => updateGameState(state, id), MOE_BOMB_EXPLOSION_MS);
      return;
    }
    updateGameState(state, id);
  }

  on('game:state', (state) => {
    if (state.pendingActivation && state.pendingActivation.effectType === 'rains-blessing-target') {
    }
    currentPhase = state.phase;

    if (state.phase === 'lobby') {
      showLobby(state);
      if (reconnecting) {
        reconnecting = false;
        joined = true;
        $lobbyRoom.textContent = loadSession()?.roomId || '';
        $lobbyWait.classList.remove('hidden');
        document.querySelector('.lobby-form').style.display = 'none';
      }
    } else if (state.phase === 'post-game-lobby') {
      if (state.you.inPostGameLobby) {
        // Player has dismissed fireworks → show lobby screen
        if ($game.classList.contains('active')) {
          resetGame();
          $game.classList.remove('active');
          $lobby.classList.add('active');
        }
        // Ensure lobby waiting section is visible (handles reconnection case)
        $lobbyWait.classList.remove('hidden');
        document.querySelector('.lobby-form').style.display = 'none';
        $lobbyRoom.textContent = loadSession()?.roomId || '';
        joined = true;
        showLobby(state);
      } else {
        // Player is still in fireworks → keep showing game screen
        if ($lobby.classList.contains('active')) {
          switchToGame();
          initGame(state, myId);
        }
        applyGameState(state, myId);
      }
    } else {
      if ($lobby.classList.contains('active')) {
        switchToGame();
        initGame(state, myId);
      }
      applyGameState(state, myId);
    }
  });

  // ── Errors ───────────────────────────────────────────────────────────
  on('error:msg', (msg) => {
    if (reconnecting) {
      reconnecting = false;
      clearSession();
    }
    // Re-enable button on join errors (like duplicate name)
    if (joined && $lobby.classList.contains('active')) {
      joined = false;
      $lobbyWait.classList.add('hidden');
      document.querySelector('.lobby-form').style.display = '';
      updateRoomPeek();
    }
    showToast(msg);
  });
}

init();