import { useState } from 'react';
import { Settings, Users, MapPin, Zap, ChevronLeft, Play } from 'lucide-react';
import { generateRoles, generateScenario, validateRoles } from '../utils/roleGenerator';
import './SetupScreen.css';

function SetupScreen({ onGenerate, onBack }) {
  const [playerCount, setPlayerCount] = useState(9);
  const [locationCount, setLocationCount] = useState(3);
  const [difficulty, setDifficulty] = useState('medium');
  const [scenarioType, setScenarioType] = useState('storm');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = () => {
    setError('');
    setIsGenerating(true);

    try {
      // Validate inputs
      if (playerCount < 6) {
        throw new Error('Minimum 6 players required');
      }
      if (playerCount > 24) {
        throw new Error('Maximum 24 players supported');
      }

      // Generate roles
      const roles = generateRoles(playerCount, locationCount, difficulty);
      
      // Validate
      const validation = validateRoles(roles);
      if (!validation.valid) {
        throw new Error(`Role generation failed: ${validation.issues.join(', ')}`);
      }

      // Generate scenario
      const scenario = generateScenario(scenarioType);

      // Pass to parent
      setTimeout(() => {
        onGenerate({
          roles,
          scenario,
          playerCount,
          locationCount,
          difficulty
        });
        setIsGenerating(false);
      }, 800); // Small delay for smooth transition

    } catch (err) {
      setError(err.message);
      setIsGenerating(false);
    }
  };

  return (
    <div className="setup-screen">
      <div className="container">
        <div className="setup-content fade-in">
          <div className="setup-header">
            <button className="btn btn-secondary no-print" onClick={onBack}>
              <ChevronLeft size={20} />
              Back
            </button>
            <div className="header-title">
              <Settings size={32} />
              <h1>Game Setup</h1>
            </div>
          </div>

          <div className="setup-grid">
            <div className="setup-card card">
              <h2>Game Configuration</h2>
              
              <div className="input-group">
                <label>
                  <Users size={20} />
                  Number of Players
                </label>
                <input
                  type="number"
                  min="6"
                  max="24"
                  value={playerCount}
                  onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                />
                <span className="input-hint">Recommended: 9-15 players</span>
              </div>

              <div className="input-group">
                <label>
                  <MapPin size={20} />
                  Number of Locations
                </label>
                <select
                  value={locationCount}
                  onChange={(e) => setLocationCount(parseInt(e.target.value))}
                >
                  <option value="2">2 Locations (Beginner)</option>
                  <option value="3">3 Locations (Standard)</option>
                  <option value="4">4 Locations (Advanced)</option>
                  <option value="5">5 Locations (Expert)</option>
                </select>
                <span className="input-hint">More locations = more complexity</span>
              </div>

              <div className="input-group">
                <label>
                  <Zap size={20} />
                  Difficulty Level
                </label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="easy"
                      checked={difficulty === 'easy'}
                      onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <span>Easy</span>
                    <p>Clear objectives, simple dependencies</p>
                  </label>
                  
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="medium"
                      checked={difficulty === 'medium'}
                      onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <span>Medium</span>
                    <p>Strategic choices, some dilemmas</p>
                  </label>
                  
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="hard"
                      checked={difficulty === 'hard'}
                      onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <span>Hard</span>
                    <p>Complex dependencies, priority conflicts</p>
                  </label>
                </div>
              </div>
            </div>

            <div className="setup-card card">
              <h2>Scenario Selection</h2>
              
              <div className="scenario-options">
                <label className={`scenario-card ${scenarioType === 'storm' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="storm"
                    checked={scenarioType === 'storm'}
                    onChange={(e) => setScenarioType(e.target.value)}
                  />
                  <div className="scenario-content">
                    <h3>⛈️ Storm Aftermath</h3>
                    <p>Power and communications down. Communities need coordination.</p>
                    <span className="scenario-tag">Recommended for beginners</span>
                  </div>
                </label>

                <label className={`scenario-card ${scenarioType === 'earthquake' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="earthquake"
                    checked={scenarioType === 'earthquake'}
                    onChange={(e) => setScenarioType(e.target.value)}
                  />
                  <div className="scenario-content">
                    <h3>🏚️ Earthquake Response</h3>
                    <p>Infrastructure damaged. Roads cracked. Aftershocks possible.</p>
                    <span className="scenario-tag">Medium complexity</span>
                  </div>
                </label>

                <label className={`scenario-card ${scenarioType === 'flood' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="flood"
                    checked={scenarioType === 'flood'}
                    onChange={(e) => setScenarioType(e.target.value)}
                  />
                  <div className="scenario-content">
                    <h3>🌊 Flash Flood</h3>
                    <p>Rising water levels. Evacuation priorities. Time-sensitive.</p>
                    <span className="scenario-tag">High urgency</span>
                  </div>
                </label>

                <label className={`scenario-card ${scenarioType === 'wildfire' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="wildfire"
                    checked={scenarioType === 'wildfire'}
                    onChange={(e) => setScenarioType(e.target.value)}
                  />
                  <div className="scenario-content">
                    <h3>🔥 Wildfire Evacuation</h3>
                    <p>Fast-moving fire approaching. Critical timing required.</p>
                    <span className="scenario-tag">Expert level</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="error-message card">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="setup-actions">
            <button 
              className="btn btn-primary btn-large"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>Generating Roles...</>
              ) : (
                <>
                  <Play size={20} />
                  Generate Game
                </>
              )}
            </button>
          </div>

          <div className="setup-info card">
            <h3>Preparation Checklist</h3>
            <ul className="checklist">
              <li>✓ Radios distributed to all players (Ham, GMRS, FRS, or app)</li>
              <li>✓ Physical locations marked and accessible</li>
              <li>✓ Stopwatch or timer ready</li>
              <li>✓ Facilitator with protocol sheet and scoring clipboard</li>
              <li>✓ Safety briefing completed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetupScreen;

