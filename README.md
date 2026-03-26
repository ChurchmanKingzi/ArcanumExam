# 🃏 Discord Card Game Activity

A multiplayer card game for 2–8 players that runs as a **Discord Activity** (embedded in voice channels) or as a standalone web app.

## Features

- **Lobby system** — create/join rooms, host starts the game
- **Tabletop view** — players arranged around a virtual felt table
- **Hand management** — your cards at the bottom, opponents shown as card-back icons
- **Student card phase** — pick 1 of 2 students; chosen one goes face-down on the table, the other to discard
- **Card zoom** — hover over any card to see it enlarged
- **Discord integration** — runs natively inside Discord voice channels as an Activity

## Quick Start (Standalone)

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start
# → http://localhost:3000

# 3. Open multiple browser tabs to test multiplayer
```

No Discord credentials needed for standalone mode — just open the URL, enter a name and room code.

## Card Setup

The game scans these folders for card images:

```
./cards/              ← Normal cards (~200 images)
./cards/students/     ← Student cards (>16 images)
```

**Supported formats:** `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`

The project comes with placeholder cards for testing. Replace them with your real card images.

**Rules:**
- Each player gets **16 normal cards** + **2 student cards**
- Each student card can only appear **once** across the entire lobby
- You need at least `players × 16` normal cards and `players × 2` student cards

## Discord Activity Setup

### 1. Create a Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application**
3. Go to **Activities** in the left sidebar
4. Enable the Activity and set the **URL Mapping**:
   - **Target**: `/` → `your-server-url` (e.g., `localhost:3000` for dev, or your deployed URL)
   - Set **Supported Platforms**: Web, iOS, Android

### 2. Configure OAuth2

1. Go to **OAuth2** → **General**
2. Add redirect: `https://your-server-url` (for production)
3. Copy your **Client ID** and **Client Secret**

### 3. Environment Variables

```bash
cp .env.example .env
# Edit .env with your credentials:
# DISCORD_CLIENT_ID=...
# DISCORD_CLIENT_SECRET=...
```

### 4. Development with Discord Tunnel

For local development, Discord provides a tunnel tool:

```bash
# Install the Discord tunnel (requires Node 18+)
npx @discord/embedded-app-sdk-starter tunnel --port 3000
```

Or use a tool like `cloudflared` / `ngrok` and set the URL mapping accordingly.

### 5. Launch

1. Start the server: `npm start`
2. In Discord, join a voice channel
3. Click the **Activities** rocket icon
4. Select your activity
5. All participants in the voice channel can join!

## Project Structure

```
├── server.js                 # Express + Socket.IO + Discord token proxy
├── package.json
├── .env.example
├── public/
│   ├── index.html            # Main page
│   ├── css/game.css          # All styling
│   ├── js/
│   │   ├── main.js           # Entry: Discord SDK, lobby, orchestration
│   │   ├── game.js           # Game rendering & interaction
│   │   └── network.js        # Socket.IO wrapper
│   └── images/
│       └── cardback.png      # Card back sprite
└── cards/
    ├── card_001.png … etc    # Normal cards
    └── students/
        └── student_ada.png … # Student cards
```

## Architecture

```
┌─────────────┐         ┌──────────────┐
│  Discord     │ iframe  │  Your Server │
│  Client      │◄───────►│  Express     │
│  (Activity)  │         │  Socket.IO   │
└─────────────┘         └──────────────┘
                              │
                    ┌─────────┼─────────┐
                    │         │         │
                 Room 1    Room 2    Room N
                 (2-8p)    (2-8p)    (2-8p)
```

- **Express** serves static files + handles Discord OAuth2 token exchange
- **Socket.IO** manages real-time game state synchronization
- **Rooms** are isolated game instances (one per voice channel in Discord mode)
- Game state lives server-side; clients receive only what they're allowed to see

## Extending the Game

The current implementation covers the lobby → student-pick → playing flow. The `playing` phase is a shell ready for your game's actual turn mechanics. To add gameplay:

1. Add new socket events in `server.js` (e.g., `card:play`, `turn:end`)
2. Handle them in `game.js` on the client
3. Update `broadcastRoomState()` to include new state data

## License

Private project.
