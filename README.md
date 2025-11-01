# Emergency Radio Coordination Game

A live-action communication and coordination training game designed to teach participants how to operate under pressure, prioritize resources, and communicate effectively using radio systems.

## 🎯 Features

- **Smart Role Generation** - Automatically generates balanced role cards with strategic dilemmas
- **Multiple Scenarios** - Storm, Earthquake, Flood, and Wildfire scenarios
- **Live Game Session Management** - Timer, round tracking, and player progress monitoring
- **Real-time Scoring** - Track radio discipline, coordination, and decision quality
- **Printable Role Cards** - Professional PDF-ready cards for in-person gameplay
- **Comprehensive Debrief** - After-action reports with metrics and recommendations
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will open at `http://localhost:3000`

## 📖 How to Play

### 1. Setup Game
- Choose number of players (6-24)
- Select number of locations (2-5)
- Pick difficulty level (Easy, Medium, Hard)
- Choose scenario type

### 2. Generate Roles
- System automatically creates balanced role cards
- Each player receives unique objectives and resources
- Print role cards for distribution

### 3. Start Game Session
- Use timer to track progress
- Monitor player movements and objectives
- Award points for proper radio protocol and coordination
- Track infractions and decision quality

### 4. Complete & Debrief
- Review performance metrics
- Analyze communication effectiveness
- Discuss lessons learned
- Generate after-action report

## 🎓 Learning Objectives

- Master radio communication protocols (call signs, brevity, clarity)
- Practice resource coordination under time pressure
- Develop situational awareness and prioritization skills
- Experience strategic decision-making in emergency scenarios

## 🎮 Game Mechanics

### Role Generation
- **Constraint-based algorithm** ensures no same-location pairs
- **Strategic dilemmas** create priority conflicts (e.g., doctor choosing between spouse and patient)
- **Solvable puzzles** guarantee achievable objectives
- **Balanced dependencies** distribute critical resources

### Scoring System
| Category | Points | Description |
|----------|--------|-------------|
| Radio Discipline | +10/round | Proper protocol, clarity, efficiency |
| Team Coordination | +10 | Effective information relay |
| Decision Quality | +5 | Logical prioritization and movement |
| High-Priority Success | +20 | Urgent aid delivery |
| Infractions | -5 each | Missed protocols, confusion |

## 📱 Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **CSS3** - Styling with print media queries

## 🎨 Scenarios

### Storm Aftermath
Power and cell networks down. Communities need coordination.
*Recommended for beginners*

### Earthquake Response
Infrastructure damaged. Roads cracked. Aftershocks possible.
*Medium complexity*

### Flash Flood
Rising water levels. Evacuation priorities. Time-sensitive.
*High urgency*

### Wildfire Evacuation
Fast-moving fire approaching. Critical timing required.
*Expert level*

## 📋 Training Alignment

This game aligns with:
- **FEMA ICS** communication concepts
- **CERT** coordination principles
- **ARRL** emergency operation protocols

## 🖨️ Printing Role Cards

1. Navigate to Role Display screen
2. Click "Print Cards" button
3. Browser print dialog opens
4. Cards are formatted for standard 8.5"x11" paper
5. Includes communication protocol sheet

## 🎯 Ideal For

- **Families** - Fun way to learn emergency preparedness
- **Classrooms** - Practical communication training
- **CERT Teams** - Realistic coordination practice
- **Community Groups** - Emergency response drills
- **Ham Radio Clubs** - Protocol training exercises

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── WelcomeScreen.jsx
│   ├── SetupScreen.jsx
│   ├── RoleDisplayScreen.jsx
│   ├── GameSessionScreen.jsx
│   └── DebriefScreen.jsx
├── utils/
│   └── roleGenerator.js # Role generation algorithm
├── App.jsx             # Main app component
└── index.css           # Global styles
```

### Key Components

**roleGenerator.js** - Core algorithm with constraints:
- No same-location pairs
- Solvable puzzles
- Strategic dilemmas
- Balanced dependencies

**GameSessionScreen** - Live session management:
- Real-time timer
- Player tracking
- Live scoring
- Event logging

**DebriefScreen** - Post-game analysis:
- Performance metrics
- Score breakdown
- Recommendations
- Discussion points

## 🚧 Future Enhancements

- [ ] Custom scenario builder
- [ ] Advanced difficulty with random events
- [ ] Multiplayer online mode
- [ ] Mobile app (React Native)
- [ ] Integration with radio systems
- [ ] Historical game data tracking
- [ ] Leaderboards and achievements
- [ ] Physical card game version

## 📄 License

This project is open source and available for educational use.

## 🤝 Contributing

Contributions welcome! This project is designed to support emergency preparedness training worldwide.

## 📞 Support

For questions or feedback about using this training tool, please open an issue on the repository.

---

**Built with ❤️ for emergency preparedness education**

