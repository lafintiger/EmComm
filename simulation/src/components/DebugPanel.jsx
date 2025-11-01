import { Bug, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import './DebugPanel.css';

function DebugPanel({ roles, eventLog }) {
  const [expanded, setExpanded] = useState(false);

  // Analyze what's blocking completion
  const analyzeProblems = () => {
    const problems = [];

    roles.forEach(role => {
      if (!role.objectiveComplete) {
        if (role.needsType === 'service') {
          // Find if the service provider exists
          const provider = roles.find(r => 
            r.profession === role.needsService || 
            (r.has && r.has.includes(role.needsService))
          );
          
          if (!provider) {
            problems.push({
              player: role.name,
              issue: `CRITICAL: Needs ${role.needsService} but no provider exists!`,
              severity: 'critical'
            });
          } else if (provider.currentLocation !== role.currentLocation) {
            problems.push({
              player: role.name,
              issue: `Waiting for ${provider.name} (${role.needsService}) to arrive at Location ${role.currentLocation}. Provider at Location ${provider.currentLocation}`,
              severity: 'warning'
            });
          }
        } else {
          // Needs an item
          const provider = roles.find(r => r.has === role.needsItem);
          
          if (!provider) {
            problems.push({
              player: role.name,
              issue: `CRITICAL: Needs ${role.needsItem} but no one has it!`,
              severity: 'critical'
            });
          } else if (!provider.itemDelivered) {
            problems.push({
              player: role.name,
              issue: `Waiting for ${provider.name} to deliver ${role.needsItem}. Provider at Location ${provider.currentLocation}`,
              severity: 'warning'
            });
          }
        }
      }

      if (role.has && !role.has.includes('Skills') && !role.itemDelivered) {
        const recipient = roles.find(r => r.needsItem === role.has);
        
        if (!recipient) {
          problems.push({
            player: role.name,
            issue: `Has ${role.has} but no one needs it!`,
            severity: 'critical'
          });
        } else {
          problems.push({
            player: role.name,
            issue: `Needs to deliver ${role.has} to ${recipient.name} at Location ${recipient.currentLocation}`,
            severity: 'info'
          });
        }
      }
    });

    return problems;
  };

  const problems = analyzeProblems();
  const criticalProblems = problems.filter(p => p.severity === 'critical');

  return (
    <div className="debug-panel">
      <div className="debug-header" onClick={() => setExpanded(!expanded)}>
        <Bug size={20} />
        <h3>🔍 Debug Analysis</h3>
        {criticalProblems.length > 0 && (
          <span className="critical-badge">{criticalProblems.length} Critical Issues</span>
        )}
        <button className="expand-btn">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {expanded && (
        <div className="debug-body">
          <div className="problems-section">
            <h4>Blocking Issues ({problems.length})</h4>
            {problems.length === 0 ? (
              <div className="no-problems">✅ No issues detected</div>
            ) : (
              <div className="problems-list">
                {problems.map((problem, idx) => (
                  <div key={idx} className={`problem-item problem-${problem.severity}`}>
                    <div className="problem-player">{problem.player}</div>
                    <div className="problem-issue">{problem.issue}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="roles-status">
            <h4>All Players Status</h4>
            <div className="roles-grid-debug">
              {roles.map(role => (
                <div key={role.id} className="role-debug-card">
                  <strong>{role.name}</strong>
                  <div className="role-debug-info">
                    <div>Location: {role.currentLocation}</div>
                    <div>Has: {role.has || 'Nothing'}</div>
                    <div>Needs: {role.needsItem || role.needsService || 'Nothing'}</div>
                    <div>Objective: {role.objectiveComplete ? '✅' : '❌'}</div>
                    <div>Delivered: {role.has && !role.has.includes('Skills') ? (role.itemDelivered ? '✅' : '❌') : 'N/A'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="recent-events">
            <h4>Recent Events (Last 10)</h4>
            <div className="events-list-debug">
              {eventLog.slice(-10).reverse().map((event, idx) => (
                <div key={idx} className="event-debug">
                  <span className="event-time-debug">{Math.floor(event.timestamp / 60)}:{(event.timestamp % 60).toString().padStart(2, '0')}</span>
                  <span className="event-msg-debug">{event.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DebugPanel;

