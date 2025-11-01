import { Radio, Users, Target, Timer, BookOpen, MessageSquare, ClipboardCheck } from 'lucide-react';
import './WelcomeScreen.css';

function WelcomeScreen({ onStart, onGuide }) {
  return (
    <div className="welcome-screen">
      <div className="container">
        <div className="welcome-content fade-in">
          <div className="welcome-header">
            <div className="icon-badge">
              <Radio size={48} />
            </div>
            <h1>Emergency Radio Coordination Game</h1>
            <p className="subtitle">
              Master radio communication, strategic coordination, and emergency response
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card slide-in" style={{ animationDelay: '0.1s' }}>
              <Radio size={32} className="feature-icon" />
              <h3>Radio Discipline</h3>
              <p>Learn proper communication protocols and message brevity</p>
            </div>
            
            <div className="feature-card slide-in" style={{ animationDelay: '0.2s' }}>
              <Users size={32} className="feature-icon" />
              <h3>Team Coordination</h3>
              <p>Work together to find people and deliver critical supplies</p>
            </div>
            
            <div className="feature-card slide-in" style={{ animationDelay: '0.3s' }}>
              <Target size={32} className="feature-icon" />
              <h3>Strategic Decisions</h3>
              <p>Prioritize resources and make tough choices under pressure</p>
            </div>
            
            <div className="feature-card slide-in" style={{ animationDelay: '0.4s' }}>
              <Timer size={32} className="feature-icon" />
              <h3>Time Management</h3>
              <p>Complete objectives efficiently while maintaining accuracy</p>
            </div>
          </div>

          <div className="welcome-info card">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Setup Game</h4>
                  <p>Choose player count, scenario type, and difficulty level</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Receive Roles</h4>
                  <p>Each player gets a role card with objectives and resources</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Coordinate & Move</h4>
                  <p>Use radios to communicate and physically move between locations</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Complete Objectives</h4>
                  <p>Find your targets, exchange supplies, and support your team</p>
                </div>
              </div>
            </div>
          </div>

          <div className="resources-section card">
            <h2>Game Resources</h2>
            <p className="resources-subtitle">Print these guides before playing</p>
            <div className="resources-grid">
              <button className="resource-card" onClick={() => onGuide('game-guide')}>
                <BookOpen size={32} className="resource-icon" />
                <h4>Game Guide</h4>
                <p>Complete instructions for players and facilitators</p>
              </button>
              
              <button className="resource-card" onClick={() => onGuide('comms-guide')}>
                <MessageSquare size={32} className="resource-icon" />
                <h4>Radio Protocol Guide</h4>
                <p>Communication procedures and examples</p>
              </button>
              
              <button className="resource-card" onClick={() => onGuide('referee-checklist')}>
                <ClipboardCheck size={32} className="resource-icon" />
                <h4>Referee Checklist</h4>
                <p>Scoring guide and observation sheets</p>
              </button>
            </div>
          </div>

          <div className="welcome-actions">
            <button className="btn btn-primary btn-large" onClick={onStart}>
              Start New Game
            </button>
          </div>

          <div className="welcome-footer">
            <p>
              Ideal for families, classrooms, CERT teams, and community emergency preparedness training
            </p>
            <p className="training-note">
              Aligned with FEMA ICS concepts, CERT coordination principles, and ARRL emergency protocols
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;

