import { useState, useEffect } from 'react';
import { 
  ChevronLeft, Play, Pause, RotateCcw, CheckCircle, XCircle, 
  Plus, Clock, Users, MapPin, AlertTriangle, TrendingUp 
} from 'lucide-react';
import { getNeedsDescription, getServiceProvider } from '../utils/roleGenerator';
import './GameSessionScreen.css';

function GameSessionScreen({ gameData, onEnd, onBack }) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [playerStatuses, setPlayerStatuses] = useState(
    gameData.roles.map(role => ({
      id: role.id,
      completedObjective: false,  // Found what/who they need
      deliveredItem: false,         // If they have an item, did they deliver it to someone who needs it
      currentLocation: role.location,
      hasBeenNCC: false            // Track if they've been Net Control
    }))
  );
  const [currentNCC, setCurrentNCC] = useState(null); // Current Net Control Operator
  const [scores, setScores] = useState({
    completionTime: 0,
    radioDiscipline: 0,
    teamCoordination: 0,
    decisionQuality: 0,
    infractions: 0,
    highPrioritySuccess: 0
  });
  const [eventLog, setEventLog] = useState([]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    logEvent(isRunning ? 'Timer paused' : 'Timer started');
  };

  const logEvent = (message, type = 'info') => {
    setEventLog(prev => [{
      timestamp: elapsedTime,
      message,
      type,
      round: currentRound
    }, ...prev]);
  };

  const updatePlayerStatus = (playerId, field) => {
    setPlayerStatuses(prev => prev.map(p => 
      p.id === playerId ? { ...p, [field]: !p[field] } : p
    ));
    const player = gameData.roles.find(r => r.id === playerId);
    logEvent(`${player.name} - ${field}: ${!playerStatuses.find(p => p.id === playerId)[field]}`, 'success');
  };

  const movePlayer = (playerId, newLocation) => {
    setPlayerStatuses(prev => prev.map(p => 
      p.id === playerId ? { ...p, currentLocation: newLocation } : p
    ));
    const player = gameData.roles.find(r => r.id === playerId);
    logEvent(`${player.name} moved to Location ${newLocation}`, 'move');
  };

  const addScore = (category, points) => {
    setScores(prev => ({
      ...prev,
      [category]: prev[category] + points
    }));
    logEvent(`+${points} points: ${category.replace(/([A-Z])/g, ' $1').trim()}`, 'score');
  };

  const nextRound = () => {
    clearNetControl();
    setCurrentRound(prev => prev + 1);
    logEvent(`Round ${currentRound + 1} started`, 'info');
  };

  const assignNetControl = (playerId) => {
    const player = gameData.roles.find(r => r.id === playerId);
    setCurrentNCC(playerId);
    setPlayerStatuses(prev => prev.map(p => 
      p.id === playerId ? { ...p, hasBeenNCC: true } : p
    ));
    logEvent(`${player.name} assigned as Net Control for Round ${currentRound}`, 'ncc');
  };

  const clearNetControl = () => {
    if (currentNCC) {
      const player = gameData.roles.find(r => r.id === currentNCC);
      logEvent(`${player.name} released from Net Control duty`, 'ncc');
    }
    setCurrentNCC(null);
  };

  const calculateProgress = () => {
    const objectivesTotal = gameData.roles.length; // Everyone needs something
    const itemDeliveriesTotal = gameData.roles.filter(r => r.has).length; // Only those with items need to deliver
    const total = objectivesTotal + itemDeliveriesTotal;
    
    const objectivesCompleted = playerStatuses.filter(p => p.completedObjective).length;
    const deliveriesCompleted = playerStatuses.filter(p => p.deliveredItem).length;
    const completed = objectivesCompleted + deliveriesCompleted;
    
    return (completed / total) * 100;
  };

  const isGameComplete = () => {
    // Everyone completed their objective
    const allObjectives = playerStatuses.every(p => p.completedObjective);
    // Everyone with items delivered them
    const allDeliveries = gameData.roles.every((role, idx) => {
      if (!role.has) return true; // No item to deliver
      return playerStatuses[idx].deliveredItem;
    });
    return allObjectives && allDeliveries;
  };

  const handleEndGame = () => {
    const finalScores = {
      ...scores,
      completionTime: elapsedTime
    };
    setIsRunning(false);
    logEvent('Game completed!', 'success');
    onEnd(finalScores);
  };

  const getLocationColor = (location) => {
    const colors = {
      1: '#ef4444',
      2: '#3b82f6',
      3: '#10b981',
      4: '#f59e0b',
      5: '#8b5cf6'
    };
    return colors[location] || '#6b7280';
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const progress = calculateProgress();

  return (
    <div className="game-session-screen">
      <div className="container">
        {/* Header */}
        <div className="session-header no-print">
          <button className="btn btn-secondary" onClick={onBack}>
            <ChevronLeft size={20} />
            Back
          </button>
          
          <div className="timer-display">
            <Clock size={24} />
            <span className="time">{formatTime(elapsedTime)}</span>
            <span className="round-badge">Round {currentRound}</span>
          </div>

          <div className="timer-controls">
            <button className="btn btn-secondary" onClick={toggleTimer}>
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
              {isRunning ? 'Pause' : 'Resume'}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-section card">
          <div className="progress-header">
            <h3>Game Progress</h3>
            <span className="progress-percentage">{progress.toFixed(0)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-stats">
            <div className="stat-item">
              <span className="stat-label">Objectives Complete:</span>
              <span className="stat-value">
                {playerStatuses.filter(p => p.completedObjective).length} / {gameData.roles.length}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Items/Services Delivered:</span>
              <span className="stat-value">
                {playerStatuses.filter(p => p.deliveredItem).length} / {gameData.roles.filter(r => r.has).length}
              </span>
            </div>
          </div>
        </div>

        {/* Net Control Operator Assignment */}
        <div className="ncc-panel card">
          <h2>
            📻 Net Control Operator - Round {currentRound}
          </h2>
          <p className="ncc-instructions">
            Assign a player who is physically at a location. They must stay at their location for this round. 
            Cannot assign someone who has already been Net Control.
          </p>
          
          {currentNCC ? (
            <div className="ncc-current">
              <div className="ncc-assigned-info">
                <strong>{gameData.roles.find(r => r.id === currentNCC)?.name}</strong>
                <span className="ncc-location">
                  @ Location {playerStatuses.find(p => p.id === currentNCC)?.currentLocation}
                </span>
              </div>
              <button className="btn btn-warning btn-sm" onClick={clearNetControl}>
                Change NCC
              </button>
            </div>
          ) : (
            <div className="ncc-selection">
              <select 
                className="ncc-dropdown"
                onChange={(e) => e.target.value && assignNetControl(parseInt(e.target.value))}
                value=""
              >
                <option value="">Select Net Control Operator...</option>
                {gameData.roles.map((role) => {
                  const status = playerStatuses.find(p => p.id === role.id);
                  const hasBeenNCC = status.hasBeenNCC;
                  return (
                    <option 
                      key={role.id} 
                      value={role.id}
                      disabled={hasBeenNCC}
                    >
                      {role.name} ({role.profession}) - Location {status.currentLocation}
                      {hasBeenNCC ? ' - Already served as NCC' : ''}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <div className="round-controls">
            <button 
              className="btn btn-primary"
              onClick={nextRound}
              disabled={currentRound >= 3 || !currentNCC}
            >
              Advance to Round {currentRound + 1}
            </button>
            {!currentNCC && (
              <p className="warning-text">⚠️ Must assign Net Control before advancing</p>
            )}
          </div>
        </div>

        <div className="session-grid">
          {/* Player Tracking */}
          <div className="players-panel card">
            <h2>
              <Users size={24} />
              Player Tracking
            </h2>
            
            <div className="players-list">
              {gameData.roles.map((role) => {
                const status = playerStatuses.find(p => p.id === role.id);
                return (
                  <div key={role.id} className={`player-item ${currentNCC === role.id ? 'is-ncc' : ''}`}>
                    <div className="player-header">
                      <div className="player-info">
                        <strong>{role.name}</strong>
                        <span className="player-profession">{role.profession}</span>
                        {currentNCC === role.id && (
                          <span className="ncc-indicator">📻 NET CONTROL</span>
                        )}
                        {role.isCriticalFirstRound && (
                          <span className="critical-indicator">⚠️ CRITICAL</span>
                        )}
                      </div>
                      <div 
                        className="player-location" 
                        style={{ backgroundColor: getLocationColor(status.currentLocation) }}
                      >
                        <MapPin size={14} />
                        {status.currentLocation}
                      </div>
                    </div>

                    <div className="player-objectives">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={status.completedObjective}
                          onChange={() => updatePlayerStatus(role.id, 'completedObjective')}
                        />
                        <span className={status.completedObjective ? 'completed' : ''}>
                          {getNeedsDescription(role)}
                          {role.needsType === 'service' && (
                            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}> ({getServiceProvider(role)})</span>
                          )}
                        </span>
                        {status.completedObjective && <CheckCircle size={16} className="check-icon" />}
                      </label>

                      {role.has && (
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={status.deliveredItem}
                            onChange={() => updatePlayerStatus(role.id, 'deliveredItem')}
                          />
                          <span className={status.deliveredItem ? 'completed' : ''}>
                            Delivered: {role.has}
                          </span>
                          {status.deliveredItem && <CheckCircle size={16} className="check-icon" />}
                        </label>
                      )}

                      {role.relationship && (
                        <div className="dilemma-indicator">
                          <AlertTriangle size={14} style={{ color: '#ef4444' }} />
                          <span style={{ fontSize: '0.875rem', color: '#ef4444', fontWeight: 500 }}>
                            Personal Dilemma:
                          </span>
                          <div style={{ fontSize: '0.75rem', marginLeft: '1.5rem', color: '#6b7280' }}>
                            💔 {role.relationship.description} ({role.relationship.partnerName} @ Location {role.relationship.partnerLocation})
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="location-controls">
                      <span className="control-label">Move to:</span>
                      {[1, 2, 3, 4, 5].slice(0, gameData.locationCount).map(loc => (
                        <button
                          key={loc}
                          className={`location-btn ${status.currentLocation === loc ? 'active' : ''}`}
                          style={{ 
                            backgroundColor: status.currentLocation === loc ? getLocationColor(loc) : undefined,
                            borderColor: getLocationColor(loc)
                          }}
                          onClick={() => movePlayer(role.id, loc)}
                          disabled={currentNCC === role.id}
                        >
                          {loc}
                        </button>
                      ))}
                      {currentNCC === role.id && (
                        <span className="ncc-note">Cannot move - serving as Net Control</span>
                      )}
                    </div>

                    {role.priority === 'high' && (
                      <div className="priority-indicator">
                        <AlertTriangle size={14} />
                        High Priority
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scoring Panel */}
          <div className="scoring-panel">
            <div className="card score-card">
              <h2>
                <TrendingUp size={24} />
                Live Scoring
              </h2>
              
              <div className="total-score">
                <span className="score-label">Total Score</span>
                <span className="score-value">{totalScore}</span>
              </div>

              <div className="score-breakdown">
                <div className="score-category">
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => addScore('radioDiscipline', 10)}
                  >
                    <Plus size={16} /> Radio Discipline
                  </button>
                  <span className="category-score">{scores.radioDiscipline}</span>
                </div>

                <div className="score-category">
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => addScore('teamCoordination', 10)}
                  >
                    <Plus size={16} /> Team Coordination
                  </button>
                  <span className="category-score">{scores.teamCoordination}</span>
                </div>

                <div className="score-category">
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => addScore('decisionQuality', 5)}
                  >
                    <Plus size={16} /> Decision Quality
                  </button>
                  <span className="category-score">{scores.decisionQuality}</span>
                </div>

                <div className="score-category">
                  <button 
                    className="btn btn-warning btn-sm"
                    onClick={() => addScore('highPrioritySuccess', 20)}
                  >
                    <Plus size={16} /> Priority Success
                  </button>
                  <span className="category-score">{scores.highPrioritySuccess}</span>
                </div>

                <div className="score-category infraction">
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => addScore('infractions', -5)}
                  >
                    <Plus size={16} /> Infraction (-5)
                  </button>
                  <span className="category-score">{scores.infractions}</span>
                </div>
              </div>
            </div>

            {/* Event Log */}
            <div className="card event-log-card">
              <h3>Event Log</h3>
              <div className="event-log">
                {eventLog.length === 0 ? (
                  <div className="empty-log">No events yet</div>
                ) : (
                  eventLog.map((event, index) => (
                    <div key={index} className={`event-item event-${event.type}`}>
                      <span className="event-time">{formatTime(event.timestamp)}</span>
                      <span className="event-message">{event.message}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete Game Button */}
        {isGameComplete() && (
          <div className="completion-banner">
            <div className="banner-content">
              <CheckCircle size={32} />
              <div>
                <h3>All Objectives Complete!</h3>
                <p>Ready to end the game and view debrief?</p>
              </div>
              <button className="btn btn-primary btn-large" onClick={handleEndGame}>
                End Game & View Results
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameSessionScreen;

