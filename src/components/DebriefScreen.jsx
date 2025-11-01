import { 
  Trophy, Clock, Radio, Users, Target, AlertTriangle, 
  TrendingUp, RotateCcw, Printer, Download 
} from 'lucide-react';
import { getNeedsDescription } from '../utils/roleGenerator';
import './DebriefScreen.css';

function DebriefScreen({ gameData, onRestart }) {
  const { roles, scenario, scores, startTime, endTime } = gameData;
  
  const totalTime = Math.floor((endTime - startTime) / 1000);
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const getPerformanceRating = () => {
    const avgTimePerPlayer = totalTime / roles.length;
    const scorePerMinute = totalScore / (totalTime / 60);
    
    if (scorePerMinute > 15 && avgTimePerPlayer < 300) return 'Excellent';
    if (scorePerMinute > 10 && avgTimePerPlayer < 420) return 'Good';
    if (scorePerMinute > 5 && avgTimePerPlayer < 600) return 'Fair';
    return 'Needs Improvement';
  };

  const calculateMetrics = () => {
    const totalPossibleScore = (roles.length * 5) + 100; // Rough estimate
    const efficiency = Math.min(100, (totalScore / totalPossibleScore) * 100);
    const timeEfficiency = Math.max(0, 100 - (totalTime / 3600) * 50);
    const radioPerformance = Math.min(100, (scores.radioDiscipline / roles.length) * 10);
    const coordinationScore = Math.min(100, (scores.teamCoordination / roles.length) * 10);
    
    return {
      efficiency: efficiency.toFixed(1),
      timeEfficiency: timeEfficiency.toFixed(1),
      radioPerformance: radioPerformance.toFixed(1),
      coordinationScore: coordinationScore.toFixed(1)
    };
  };

  const metrics = calculateMetrics();
  const rating = getPerformanceRating();

  const handlePrint = () => {
    window.print();
  };

  const downloadReport = () => {
    const report = generateTextReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `game-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  const generateTextReport = () => {
    return `
EMERGENCY RADIO COORDINATION GAME - AFTER ACTION REPORT
========================================================

Scenario: ${scenario.title}
Date: ${new Date().toLocaleString()}
Duration: ${formatTime(totalTime)}

PARTICIPANTS
------------
${roles.map((r, i) => `${i + 1}. ${r.name} (${r.profession}) - Location ${r.location}`).join('\n')}

FINAL SCORES
------------
Total Score: ${totalScore}
Completion Time: ${formatTime(totalTime)}
Radio Discipline: ${scores.radioDiscipline}
Team Coordination: ${scores.teamCoordination}
Decision Quality: ${scores.decisionQuality}
High Priority Success: ${scores.highPrioritySuccess}
Infractions: ${scores.infractions}

PERFORMANCE METRICS
------------------
Overall Rating: ${rating}
Efficiency: ${metrics.efficiency}%
Time Management: ${metrics.timeEfficiency}%
Radio Performance: ${metrics.radioPerformance}%
Coordination: ${metrics.coordinationScore}%

RECOMMENDATIONS
---------------
${generateRecommendations().join('\n')}
`;
  };

  const generateRecommendations = () => {
    const recommendations = [];
    
    if (scores.radioDiscipline < 30) {
      recommendations.push('• Review radio protocol procedures and practice call signs');
    }
    if (scores.infractions < -10) {
      recommendations.push('• Focus on reducing communication errors and missed protocols');
    }
    if (totalTime > 3600) {
      recommendations.push('• Work on faster decision-making and movement coordination');
    }
    if (scores.teamCoordination < 20) {
      recommendations.push('• Practice information relay and collaborative planning');
    }
    if (scores.highPrioritySuccess < 20) {
      recommendations.push('• Improve prioritization of urgent needs and critical roles');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('• Excellent performance! Try increasing difficulty level');
      recommendations.push('• Consider adding more locations or players for complexity');
    }
    
    return recommendations;
  };

  return (
    <div className="debrief-screen">
      <div className="container">
        {/* Header */}
        <div className="debrief-header no-print">
          <div className="header-title">
            <Trophy size={48} className="trophy-icon" />
            <div>
              <h1>Game Complete!</h1>
              <p>After-Action Report & Analysis</p>
            </div>
          </div>
          
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={handlePrint}>
              <Printer size={20} />
              Print Report
            </button>
            <button className="btn btn-secondary" onClick={downloadReport}>
              <Download size={20} />
              Download
            </button>
            <button className="btn btn-primary" onClick={onRestart}>
              <RotateCcw size={20} />
              New Game
            </button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="performance-overview card fade-in">
          <h2>Performance Overview</h2>
          
          <div className="overview-grid">
            <div className="overview-card">
              <Clock className="overview-icon" />
              <div className="overview-label">Total Time</div>
              <div className="overview-value">{formatTime(totalTime)}</div>
            </div>
            
            <div className="overview-card">
              <Trophy className="overview-icon" />
              <div className="overview-label">Total Score</div>
              <div className="overview-value">{totalScore}</div>
            </div>
            
            <div className="overview-card">
              <Users className="overview-icon" />
              <div className="overview-label">Players</div>
              <div className="overview-value">{roles.length}</div>
            </div>
            
            <div className="overview-card">
              <TrendingUp className="overview-icon" />
              <div className="overview-label">Rating</div>
              <div className={`overview-value rating-${rating.toLowerCase().replace(' ', '-')}`}>
                {rating}
              </div>
            </div>
          </div>
        </div>

        <div className="debrief-grid">
          {/* Score Breakdown */}
          <div className="card score-breakdown-card">
            <h2>
              <Target size={24} />
              Score Breakdown
            </h2>
            
            <div className="score-items">
              <div className="score-item">
                <div className="score-info">
                  <Radio size={20} />
                  <span>Radio Discipline</span>
                </div>
                <div className="score-bar-container">
                  <div 
                    className="score-bar" 
                    style={{ width: `${Math.min(100, (scores.radioDiscipline / 50) * 100)}%` }}
                  />
                </div>
                <div className="score-points">{scores.radioDiscipline}</div>
              </div>

              <div className="score-item">
                <div className="score-info">
                  <Users size={20} />
                  <span>Team Coordination</span>
                </div>
                <div className="score-bar-container">
                  <div 
                    className="score-bar" 
                    style={{ width: `${Math.min(100, (scores.teamCoordination / 50) * 100)}%` }}
                  />
                </div>
                <div className="score-points">{scores.teamCoordination}</div>
              </div>

              <div className="score-item">
                <div className="score-info">
                  <Target size={20} />
                  <span>Decision Quality</span>
                </div>
                <div className="score-bar-container">
                  <div 
                    className="score-bar" 
                    style={{ width: `${Math.min(100, (scores.decisionQuality / 30) * 100)}%` }}
                  />
                </div>
                <div className="score-points">{scores.decisionQuality}</div>
              </div>

              <div className="score-item priority-item">
                <div className="score-info">
                  <AlertTriangle size={20} />
                  <span>High Priority Success</span>
                </div>
                <div className="score-bar-container">
                  <div 
                    className="score-bar priority-bar" 
                    style={{ width: `${Math.min(100, (scores.highPrioritySuccess / 40) * 100)}%` }}
                  />
                </div>
                <div className="score-points">{scores.highPrioritySuccess}</div>
              </div>

              {scores.infractions !== 0 && (
                <div className="score-item infraction-item">
                  <div className="score-info">
                    <AlertTriangle size={20} />
                    <span>Infractions</span>
                  </div>
                  <div className="score-bar-container">
                    <div 
                      className="score-bar infraction-bar" 
                      style={{ width: `${Math.min(100, Math.abs(scores.infractions / 20) * 100)}%` }}
                    />
                  </div>
                  <div className="score-points negative">{scores.infractions}</div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="card metrics-card">
            <h2>
              <TrendingUp size={24} />
              Performance Metrics
            </h2>
            
            <div className="metrics-list">
              <div className="metric-item">
                <div className="metric-header">
                  <span className="metric-label">Overall Efficiency</span>
                  <span className="metric-value">{metrics.efficiency}%</span>
                </div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill" 
                    style={{ width: `${metrics.efficiency}%` }}
                  />
                </div>
              </div>

              <div className="metric-item">
                <div className="metric-header">
                  <span className="metric-label">Time Management</span>
                  <span className="metric-value">{metrics.timeEfficiency}%</span>
                </div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill" 
                    style={{ width: `${metrics.timeEfficiency}%` }}
                  />
                </div>
              </div>

              <div className="metric-item">
                <div className="metric-header">
                  <span className="metric-label">Radio Performance</span>
                  <span className="metric-value">{metrics.radioPerformance}%</span>
                </div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill" 
                    style={{ width: `${metrics.radioPerformance}%` }}
                  />
                </div>
              </div>

              <div className="metric-item">
                <div className="metric-header">
                  <span className="metric-label">Coordination Score</span>
                  <span className="metric-value">{metrics.coordinationScore}%</span>
                </div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill" 
                    style={{ width: `${metrics.coordinationScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="card recommendations-card">
          <h2>Recommendations for Improvement</h2>
          <div className="recommendations-list">
            {generateRecommendations().map((rec, index) => (
              <div key={index} className="recommendation-item">
                {rec}
              </div>
            ))}
          </div>
        </div>

        {/* Discussion Points */}
        <div className="card discussion-card">
          <h2>Discussion Points for Debrief</h2>
          <div className="discussion-points">
            <div className="discussion-section">
              <h3>Communication</h3>
              <ul>
                <li>What communication strategies worked well?</li>
                <li>Where did confusion arise and why?</li>
                <li>How effectively were call signs and protocols used?</li>
              </ul>
            </div>

            <div className="discussion-section">
              <h3>Coordination</h3>
              <ul>
                <li>How were priorities determined?</li>
                <li>What coordination challenges occurred?</li>
                <li>How well did information flow between locations?</li>
              </ul>
            </div>

            <div className="discussion-section">
              <h3>Decision Making</h3>
              <ul>
                <li>What strategic dilemmas were encountered?</li>
                <li>How were high-priority situations handled?</li>
                <li>What would you do differently next time?</li>
              </ul>
            </div>

            <div className="discussion-section">
              <h3>Real-World Application</h3>
              <ul>
                <li>How does this relate to actual emergency response?</li>
                <li>What ICS/CERT principles were applied?</li>
                <li>What lessons transfer to real scenarios?</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Participant Summary */}
        <div className="card participants-card">
          <h2>Participant Summary</h2>
          <div className="participants-grid">
            {roles.map((role, index) => (
              <div key={index} className="participant-item">
                <div className="participant-header">
                  <strong>{role.name}</strong>
                  <span className="badge badge-info">{role.profession}</span>
                </div>
                <div className="participant-details">
                  <div className="detail-row">
                    <span>Had:</span>
                    {role.has ? (
                      <span className="badge badge-success">{role.has}</span>
                    ) : (
                      <span className="badge badge-info">{role.profession} Skills</span>
                    )}
                  </div>
                  <div className="detail-row">
                    <span>Needed:</span>
                    <span className={`badge ${role.needsType === 'service' ? 'badge-primary' : 'badge-warning'}`}>
                      {getNeedsDescription(role)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="debrief-footer no-print">
          <button className="btn btn-primary btn-large" onClick={onRestart}>
            <RotateCcw size={24} />
            Start New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default DebriefScreen;

