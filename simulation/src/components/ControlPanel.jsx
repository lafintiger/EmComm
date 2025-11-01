import { Play, Pause, RotateCcw, FastForward, Zap, Flag } from 'lucide-react';
import './ControlPanel.css';

function ControlPanel({ 
  isRunning, 
  speed, 
  onTogglePlay, 
  onSetSpeed, 
  onReset,
  onStepForward,
  isComplete 
}) {
  const speedOptions = [
    { value: 1000, label: '1x', icon: Play },
    { value: 500, label: '2x', icon: FastForward },
    { value: 200, label: '5x', icon: FastForward },
    { value: 100, label: '10x', icon: Zap }
  ];

  return (
    <div className="control-panel">
      <div className="control-header">
        <h3>Simulation Controls</h3>
        {isComplete && (
          <div className="complete-badge">
            <Flag size={16} />
            Complete
          </div>
        )}
      </div>

      <div className="control-buttons">
        <button 
          className={`control-btn ${isRunning ? 'active' : ''}`}
          onClick={onTogglePlay}
          disabled={isComplete}
        >
          {isRunning ? (
            <>
              <Pause size={20} />
              Pause
            </>
          ) : (
            <>
              <Play size={20} />
              Play
            </>
          )}
        </button>

        <button 
          className="control-btn"
          onClick={onStepForward}
          disabled={isRunning || isComplete}
        >
          <FastForward size={20} />
          Step
        </button>

        <button 
          className="control-btn reset"
          onClick={onReset}
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      <div className="speed-controls">
        <div className="speed-label">Simulation Speed</div>
        <div className="speed-buttons">
          {speedOptions.map(option => (
            <button
              key={option.value}
              className={`speed-btn ${speed === option.value ? 'active' : ''}`}
              onClick={() => onSetSpeed(option.value)}
              disabled={isComplete}
            >
              <option.icon size={16} />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-info">
        <p>
          {isRunning 
            ? `Simulation running at ${speedOptions.find(s => s.value === speed)?.label} speed` 
            : 'Simulation paused'}
        </p>
        <p className="control-hint">
          Watch AI players communicate, move, and complete objectives in real-time
        </p>
      </div>
    </div>
  );
}

export default ControlPanel;

