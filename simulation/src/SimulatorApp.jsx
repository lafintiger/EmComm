import { useState, useEffect, useRef } from 'react';
import { Play, Loader } from 'lucide-react';
import SimulationEngine from './engine/SimulationEngine.js';
import LocationView from './components/LocationView';
import RadioFeed from './components/RadioFeed';
import StatsPanel from './components/StatsPanel';
import ControlPanel from './components/ControlPanel';
import { generateRoles, generateScenario } from '../../src/utils/roleGenerator.js';
import './SimulatorApp.css';

function SimulatorApp() {
  const [gameState, setGameState] = useState('setup'); // setup, running, complete
  const [engine, setEngine] = useState(null);
  const [simulationState, setSimulationState] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500); // milliseconds per turn
  const [setupConfig, setSetupConfig] = useState({
    playerCount: 9,
    locationCount: 3,
    difficulty: 'medium',
    scenarioType: 'storm'
  });

  const intervalRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Simulation loop
  useEffect(() => {
    if (isRunning && engine && gameState === 'running') {
      intervalRef.current = setInterval(() => {
        const shouldContinue = engine.processTurn();
        
        // Update UI with current state
        setSimulationState({
          roles: [...engine.roles],
          eventLog: [...engine.eventLog],
          radioLog: [...engine.radioLog],
          stats: engine.getStats()
        });

        // Check if simulation complete
        if (!shouldContinue) {
          setIsRunning(false);
          setGameState('complete');
          clearInterval(intervalRef.current);
        }
      }, speed);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isRunning, engine, speed, gameState]);

  const handleStartSimulation = () => {
    // Generate roles and scenario
    const roles = generateRoles(
      setupConfig.playerCount,
      setupConfig.locationCount,
      setupConfig.difficulty
    );
    
    const scenario = generateScenario(setupConfig.scenarioType);

    // Create engine
    const newEngine = new SimulationEngine(roles, scenario);
    newEngine.initialize();

    setEngine(newEngine);
    setSimulationState({
      roles: [...newEngine.roles],
      eventLog: [...newEngine.eventLog],
      radioLog: [...newEngine.radioLog],
      stats: newEngine.getStats(),
      scenario: scenario
    });

    setGameState('running');
    setIsRunning(true);
  };

  const handleTogglePlay = () => {
    setIsRunning(!isRunning);
  };

  const handleSetSpeed = (newSpeed) => {
    setSpeed(newSpeed);
  };

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setEngine(null);
    setSimulationState(null);
    setGameState('setup');
  };

  const handleStepForward = () => {
    if (engine && !isRunning) {
      const shouldContinue = engine.processTurn();
      
      setSimulationState({
        roles: [...engine.roles],
        eventLog: [...engine.eventLog],
        radioLog: [...engine.radioLog],
        stats: engine.getStats()
      });

      if (!shouldContinue) {
        setGameState('complete');
      }
    }
  };

  // Group players by location
  const getPlayersByLocation = (locationNum) => {
    if (!simulationState) return [];
    return simulationState.roles.filter(r => r.currentLocation === locationNum);
  };

  if (gameState === 'setup') {
    return (
      <div className="simulator-app">
        <div className="container">
          <div className="setup-screen">
            <div className="setup-header">
              <h1>🎮 Emergency Radio Coordination Game</h1>
              <h2>AI Simulation System</h2>
              <p className="setup-subtitle">
                Watch AI players demonstrate realistic emergency coordination gameplay
              </p>
            </div>

            <div className="setup-card">
              <h3>Simulation Configuration</h3>
              
              <div className="setup-form">
                <div className="form-group">
                  <label>Number of Players</label>
                  <select 
                    value={setupConfig.playerCount}
                    onChange={(e) => setSetupConfig({...setupConfig, playerCount: parseInt(e.target.value)})}
                  >
                    <option value={6}>6 Players</option>
                    <option value={9}>9 Players (Recommended)</option>
                    <option value={12}>12 Players</option>
                    <option value={15}>15 Players</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Number of Locations</label>
                  <select 
                    value={setupConfig.locationCount}
                    onChange={(e) => setSetupConfig({...setupConfig, locationCount: parseInt(e.target.value)})}
                  >
                    <option value={3}>3 Locations (Recommended)</option>
                    <option value={4}>4 Locations</option>
                    <option value={5}>5 Locations</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Difficulty Level</label>
                  <select 
                    value={setupConfig.difficulty}
                    onChange={(e) => setSetupConfig({...setupConfig, difficulty: e.target.value})}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium (Recommended)</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Scenario Type</label>
                  <select 
                    value={setupConfig.scenarioType}
                    onChange={(e) => setSetupConfig({...setupConfig, scenarioType: e.target.value})}
                  >
                    <option value="storm">Severe Storm</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="flood">Flood</option>
                    <option value="wildfire">Wildfire</option>
                  </select>
                </div>
              </div>

              <button className="btn-start-sim" onClick={handleStartSimulation}>
                <Play size={24} />
                Start Simulation
              </button>
            </div>

            <div className="info-cards">
              <div className="info-card">
                <h4>🎯 Purpose</h4>
                <p>Watch AI demonstrate realistic gameplay to identify gaps and showcase game mechanics</p>
              </div>
              <div className="info-card">
                <h4>🤖 AI Behavior</h4>
                <p>AI players use proper radio protocol, prioritize objectives, and handle personal dilemmas</p>
              </div>
              <div className="info-card">
                <h4>⚡ Interactive</h4>
                <p>Control simulation speed, pause to examine state, and step through turn-by-turn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!simulationState) {
    return (
      <div className="simulator-app">
        <div className="container">
          <div className="loading-screen">
            <Loader size={48} className="spin" />
            <p>Initializing simulation...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="simulator-app">
      <div className="container">
        <div className="sim-header">
          <div className="sim-title">
            <h1>📻 Live Simulation</h1>
            <p>{simulationState.scenario?.title}</p>
          </div>
        </div>

        <div className="sim-controls-bar">
          <ControlPanel
            isRunning={isRunning}
            speed={speed}
            onTogglePlay={handleTogglePlay}
            onSetSpeed={handleSetSpeed}
            onReset={handleReset}
            onStepForward={handleStepForward}
            isComplete={gameState === 'complete'}
          />
        </div>

        <div className="sim-grid">
          <div className="locations-column">
            <h3 className="section-title">🗺️ Physical Locations</h3>
            <div className="locations-grid">
              {Array.from({ length: setupConfig.locationCount }, (_, i) => i + 1).map(locNum => (
                <LocationView
                  key={locNum}
                  locationNumber={locNum}
                  players={getPlayersByLocation(locNum)}
                  isActive={false}
                />
              ))}
            </div>
          </div>

          <div className="right-column">
            <div className="radio-section">
              <RadioFeed messages={simulationState.radioLog} />
            </div>

            <div className="stats-section">
              <StatsPanel stats={simulationState.stats} />
            </div>
          </div>
        </div>

        {gameState === 'complete' && (
          <div className="completion-overlay">
            <div className="completion-card">
              <h2>🎉 Simulation Complete!</h2>
              <div className="final-stats">
                <div className="final-stat">
                  <span className="final-stat-label">Total Score</span>
                  <span className="final-stat-value">{simulationState.stats.totalScore}</span>
                </div>
                <div className="final-stat">
                  <span className="final-stat-label">Objectives Complete</span>
                  <span className="final-stat-value">
                    {simulationState.stats.objectivesComplete}/{simulationState.stats.objectivesTotal}
                  </span>
                </div>
                <div className="final-stat">
                  <span className="final-stat-label">Total Turns</span>
                  <span className="final-stat-value">{simulationState.stats.turnNumber}</span>
                </div>
              </div>
              <button className="btn-reset" onClick={handleReset}>
                Run Another Simulation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SimulatorApp;

