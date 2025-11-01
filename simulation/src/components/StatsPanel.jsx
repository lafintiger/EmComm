import { TrendingUp, Clock, Target, Award, AlertTriangle } from 'lucide-react';
import './StatsPanel.css';

function StatsPanel({ stats }) {
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stats-panel">
      <div className="stats-header">
        <TrendingUp size={20} />
        <h3>Game Statistics</h3>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Round {stats.round}/3</div>
            <div className="stat-value">{formatTime(stats.timeRemaining)}</div>
            <div className="stat-sublabel">Time Remaining</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Progress</div>
            <div className="stat-value">{stats.progress.toFixed(0)}%</div>
            <div className="stat-sublabel">
              {stats.objectivesComplete}/{stats.objectivesTotal} Objectives
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Score</div>
            <div className="stat-value">{stats.totalScore}</div>
            <div className="stat-sublabel">Points</div>
          </div>
        </div>
      </div>

      <div className="score-breakdown">
        <h4>Score Breakdown</h4>
        <div className="score-items">
          <div className="score-item">
            <span className="score-name">Radio Discipline</span>
            <span className="score-points">{stats.scores.radioDiscipline}</span>
          </div>
          <div className="score-item">
            <span className="score-name">Team Coordination</span>
            <span className="score-points">{stats.scores.teamCoordination}</span>
          </div>
          <div className="score-item">
            <span className="score-name">Decision Quality</span>
            <span className="score-points">{stats.scores.decisionQuality}</span>
          </div>
          <div className="score-item highlight">
            <span className="score-name">High Priority Success</span>
            <span className="score-points">{stats.scores.highPrioritySuccess}</span>
          </div>
          <div className="score-item negative">
            <span className="score-name">
              <AlertTriangle size={14} />
              Infractions
            </span>
            <span className="score-points">{stats.scores.infractions}</span>
          </div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-label">
          <span>Deliveries: {stats.deliveriesComplete}/{stats.deliveriesTotal}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(stats.deliveriesComplete / stats.deliveriesTotal) * 100}%` }}
          ></div>
        </div>
      </div>

      {stats.isTransportPhase && (
        <div className="transport-indicator">
          <span className="transport-icon">🚐</span>
          <strong>TRANSPORT PHASE</strong>
        </div>
      )}
    </div>
  );
}

export default StatsPanel;

