import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SetupScreen from './components/SetupScreen';
import RoleDisplayScreen from './components/RoleDisplayScreen';
import GameSessionScreen from './components/GameSessionScreen';
import DebriefScreen from './components/DebriefScreen';
import GameGuide from './components/GameGuide';
import CommunicationsGuide from './components/CommunicationsGuide';
import RefereeChecklist from './components/RefereeChecklist';
import './App.css';

function App() {
  const [screen, setScreen] = useState('welcome'); // welcome, setup, roles, game, debrief, game-guide, comms-guide, referee-checklist
  const [gameData, setGameData] = useState({
    roles: [],
    scenario: null,
    playerCount: 9,
    locationCount: 3,
    difficulty: 'medium',
    startTime: null,
    endTime: null,
    events: [],
    scores: {
      completionTime: 0,
      radioDiscipline: 0,
      teamCoordination: 0,
      decisionQuality: 0,
      infractions: 0,
      highPrioritySuccess: 0
    }
  });

  const startSetup = () => setScreen('setup');
  
  const startGame = (setupData) => {
    setGameData({
      ...gameData,
      ...setupData,
      startTime: Date.now()
    });
    setScreen('roles');
  };

  const beginSession = () => {
    setScreen('game');
  };

  const endGame = (finalScores) => {
    setGameData({
      ...gameData,
      endTime: Date.now(),
      scores: finalScores
    });
    setScreen('debrief');
  };

  const restartGame = () => {
    setGameData({
      roles: [],
      scenario: null,
      playerCount: 9,
      locationCount: 3,
      difficulty: 'medium',
      startTime: null,
      endTime: null,
      events: [],
      scores: {
        completionTime: 0,
        radioDiscipline: 0,
        teamCoordination: 0,
        decisionQuality: 0,
        infractions: 0,
        highPrioritySuccess: 0
      }
    });
    setScreen('welcome');
  };

  const goToGuide = (guideName) => {
    setScreen(guideName);
  };

  const backToWelcome = () => {
    setScreen('welcome');
  };

  return (
    <div className="app">
      {screen === 'welcome' && <WelcomeScreen onStart={startSetup} onGuide={goToGuide} />}
      {screen === 'setup' && <SetupScreen onGenerate={startGame} onBack={restartGame} />}
      {screen === 'roles' && <RoleDisplayScreen roles={gameData.roles} scenario={gameData.scenario} onStart={beginSession} onBack={() => setScreen('setup')} />}
      {screen === 'game' && <GameSessionScreen gameData={gameData} onEnd={endGame} onBack={() => setScreen('roles')} />}
      {screen === 'debrief' && <DebriefScreen gameData={gameData} onRestart={restartGame} />}
      {screen === 'game-guide' && <GameGuide onBack={backToWelcome} />}
      {screen === 'comms-guide' && <CommunicationsGuide onBack={backToWelcome} />}
      {screen === 'referee-checklist' && <RefereeChecklist onBack={backToWelcome} />}
    </div>
  );
}

export default App;

