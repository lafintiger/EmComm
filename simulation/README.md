# Emergency Radio Coordination Game - AI Simulator

## Overview
This is an **AI-powered simulation** of the Emergency Radio Coordination Game. It demonstrates realistic gameplay with AI players making decisions, communicating over radio, and completing objectives.

## Purpose
1. **Testing** - Validate role generation creates solvable, balanced scenarios
2. **Demonstration** - Show potential players/facilitators what gameplay looks like
3. **Training** - Help facilitators understand game flow before running live sessions
4. **Analysis** - Identify gaps, issues, or balance problems

## Features
- 🤖 AI players with realistic decision-making
- 📻 Simulated radio communications with proper protocol
- 🎨 Visual representation of locations and player movements
- ⏱️ Real-time or accelerated playback (1x, 2x, 5x, 10x speed)
- 📊 Live scoring and objective tracking
- 🚐 Transport phase simulation
- 🎯 Strategic dilemma resolution

## Quick Start

### Option 1: From the simulation folder
```bash
cd simulation
npm install
npm run dev
```

Then open your browser to `http://localhost:8081`

### Option 2: From the project root
```bash
cd simulation && npm install && npm run dev
```

## How to Use
1. **Configure Simulation** - Choose player count, locations, difficulty, and scenario
2. **Start Simulation** - Click "Start Simulation" to generate roles and begin
3. **Watch & Learn** - Observe AI players coordinate via radio
4. **Control Playback** - Use Play/Pause, adjust speed (1x to 10x), or step through turns
5. **Analyze Results** - Review scores, radio logs, and completion stats
6. **Run Again** - Click "Reset" to try different configurations

## What to Watch For
- ✅ **Good Patterns** - Efficient coordination, proper protocol, logical movement
- ⚠️ **Issues** - Impossible objectives, protocol violations, poor AI decisions
- 🎯 **Balance** - Are critical needs handled first? Do personal dilemmas create tension?
- 📻 **Communication** - Is Net Control effective? Are messages clear?

## Architecture
- `SimulatorApp.jsx` - Main simulation orchestrator
- `ai/PlayerAI.js` - AI decision-making logic
- `components/` - Visual components for locations, players, radio, etc.
- `engine/SimulationEngine.js` - Game engine for turn processing and state management
- **Completely separate from the main game code** - uses the same role generation utilities

## AI Behavior
The AI simulates realistic player behavior:
- **Communication** - Uses proper radio protocol, Net Control coordination
- **Decision Making** - Prioritizes critical needs, balances personal dilemmas
- **Movement** - Travels to complete objectives efficiently
- **Cooperation** - Shares information, coordinates with other players
- **Mistakes** - Occasionally makes protocol errors for realism (simulates human behavior)

## Customization
You can modify AI behavior by editing `src/ai/PlayerAI.js`:
- **Personality traits** - Communication style, priority bias, risk tolerance
- **Decision logic** - How AI chooses actions based on game state
- **Protocol compliance** - Percentage of proper radio protocol usage

## Troubleshooting
- **Port already in use?** - Edit `vite.config.js` to change port from 8081
- **Build errors?** - Make sure you're running `npm install` first
- **Slow performance?** - Try reducing player count or running at lower speed

