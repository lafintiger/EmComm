import { useState } from 'react';
import { ChevronLeft, Play, Printer, Download, Eye, EyeOff } from 'lucide-react';
import { getNeedsDescription, getServiceProvider } from '../utils/roleGenerator';
import './RoleDisplayScreen.css';

function RoleDisplayScreen({ roles, scenario, onStart, onBack }) {
  const [hideRoles, setHideRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handlePrint = () => {
    window.print();
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

  return (
    <div className="role-display-screen">
      <div className="container">
        <div className="role-header no-print">
          <button className="btn btn-secondary" onClick={onBack}>
            <ChevronLeft size={20} />
            Back to Setup
          </button>
          
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => setHideRoles(!hideRoles)}>
              {hideRoles ? <Eye size={20} /> : <EyeOff size={20} />}
              {hideRoles ? 'Show All Roles' : 'Hide Roles'}
            </button>
            <button className="btn btn-secondary" onClick={handlePrint}>
              <Printer size={20} />
              Print Cards
            </button>
            <button className="btn btn-primary" onClick={onStart}>
              <Play size={20} />
              Start Game
            </button>
          </div>
        </div>

        {/* Scenario Information */}
        <div className="scenario-info card fade-in">
          <h1>{scenario.title}</h1>
          <p className="scenario-description">{scenario.description}</p>
          
          <div className="scenario-details">
            <div className="detail-item">
              <strong>Timeframe:</strong> {scenario.timeframe}
            </div>
            <div className="detail-item">
              <strong>Players:</strong> {roles.length}
            </div>
            <div className="detail-item">
              <strong>Locations:</strong> {Math.max(...roles.map(r => r.location))}
            </div>
          </div>

          <div className="special-rules">
            <h3>Special Rules:</h3>
            <ul>
              {scenario.specialRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>

          <div className="urgent-conditions">
            <h3>Urgent Conditions:</h3>
            <div className="conditions-list">
              {scenario.urgentConditions.map((condition, index) => (
                <span key={index} className="badge badge-danger">{condition}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Role Cards Grid */}
        {!hideRoles && (
          <div className="roles-grid">
            {roles.map((role) => (
              <div 
                key={role.id} 
                className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
                onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
              >
                <div className="role-card-header" style={{ borderColor: getLocationColor(role.location) }}>
                  <div className="role-title">
                    <h3>{role.name}</h3>
                    <span className="role-profession">{role.profession}</span>
                  </div>
                  <div className="location-badge" style={{ backgroundColor: getLocationColor(role.location) }}>
                    Location {role.location}
                  </div>
                </div>

                <div className="role-card-body">
                <div className="role-section">
                  <div className="section-label">Has:</div>
                  <div className="section-value has-item">
                    {role.has ? (
                      <span className="badge badge-success">{role.has}</span>
                    ) : (
                      <span className="badge badge-info">{role.profession} Skills</span>
                    )}
                  </div>
                </div>

                <div className="role-section">
                  <div className="section-label">Needs:</div>
                  <div className="section-value needs-item">
                    <span className={`badge ${role.needsType === 'service' ? 'badge-primary' : 'badge-warning'}`}>
                      {getNeedsDescription(role)}
                    </span>
                    {role.needsType === 'service' && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        → Requires: <strong>{getServiceProvider(role)}</strong>
                      </div>
                    )}
                  </div>
                </div>

                  {role.priority === 'high' && (
                    <div className="priority-marker">
                      <span className="badge badge-danger">⚠️ HIGH PRIORITY ROLE</span>
                    </div>
                  )}

                {role.alsoNeeds && role.alsoNeeds.length > 0 && (
                  <div className="role-section dilemma-section">
                    <div className="section-label">⚡ Strategic Dilemma:</div>
                    {role.alsoNeeds.map((also, index) => (
                      <div key={index} className="dilemma-item">
                        {also.type === 'relationship' ? (
                          <span className="badge badge-danger">
                            💔 <strong>{also.description}</strong>
                          </span>
                        ) : (
                          <span className="badge badge-danger">
                            Also needs <strong>{also.service}</strong> from {also.profession}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                </div>

                <div className="role-card-footer">
                  <small>Card ID: #{role.id + 1}</small>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Printable Version */}
        <div className="print-only">
          <div className="print-header">
            <h1>{scenario.title}</h1>
            <p>{scenario.description}</p>
          </div>

          <div className="print-roles">
            {roles.map((role) => (
              <div key={role.id} className="print-role-card page-break">
                <div className="print-card-header" style={{ borderColor: getLocationColor(role.location) }}>
                  <h2>{role.name}</h2>
                  <div className="print-location" style={{ backgroundColor: getLocationColor(role.location) }}>
                    Location {role.location}
                  </div>
                </div>
                
                <div className="print-card-body">
                  <div className="print-row">
                    <strong>Profession:</strong> {role.profession}
                  </div>
                  <div className="print-row">
                    <strong>Has:</strong> <span className="print-badge">{role.has || `${role.profession} Skills`}</span>
                  </div>
                  <div className="print-row">
                    <strong>Needs:</strong> <span className="print-badge">{getNeedsDescription(role)}</span>
                    {role.needsType === 'service' && (
                      <div style={{ marginLeft: '1rem', fontStyle: 'italic' }}>
                        (Requires: {getServiceProvider(role)})
                      </div>
                    )}
                  </div>
                  
                  {role.priority === 'high' && (
                    <div className="print-priority">
                      ⚠️ HIGH PRIORITY ROLE - You may be needed by multiple people
                    </div>
                  )}

                  {role.alsoNeeds && role.alsoNeeds.length > 0 && (
                    <div className="print-dilemma">
                      <strong>⚡ Strategic Dilemma:</strong>
                      {role.alsoNeeds.map((also, index) => (
                        <div key={index}>
                          {also.type === 'relationship' ? (
                            <>💔 {also.description}</>
                          ) : (
                            <>• Also needs {also.service} from {also.profession}</>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="print-card-footer">
                  Card #{role.id + 1} | {scenario.title}
                </div>
              </div>
            ))}
          </div>

          {/* Protocol Sheet */}
          <div className="print-protocol page-break">
            <h1>Communication Protocol Sheet</h1>
            <table className="protocol-table">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Action</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Identify call sign and location</td>
                  <td>"This is Dr. Morales at Location 1"</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Request or transmit information</td>
                  <td>"Looking for Nurse Patel, does anyone copy?"</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Wait for acknowledgment</td>
                  <td>"Copy that, Location 3 here, Patel is with us"</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Confirm movements or actions</td>
                  <td>"Roger. Morales moving from 1 to 3"</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Close properly</td>
                  <td>"Morales clear"</td>
                </tr>
              </tbody>
            </table>

            <h2>Scoring Guidelines</h2>
            <ul>
              <li><strong>Radio Discipline:</strong> +10 points per round with perfect protocol</li>
              <li><strong>Team Coordination:</strong> +10 points for effective relay</li>
              <li><strong>Decision Quality:</strong> +5 points per logical prioritization</li>
              <li><strong>High-Priority Success:</strong> +20 bonus for urgent deliveries</li>
              <li><strong>Infractions:</strong> -5 points each (missed protocol, confusion)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleDisplayScreen;

