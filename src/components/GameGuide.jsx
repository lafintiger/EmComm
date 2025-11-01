import { ArrowLeft, Printer } from 'lucide-react';
import './GameGuide.css';

function GameGuide({ onBack }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="game-guide printable-document">
      <div className="guide-controls no-print">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Menu
        </button>
        <button className="btn btn-primary" onClick={handlePrint}>
          <Printer size={20} />
          Print Guide
        </button>
      </div>

      <div className="guide-header">
        <h1>Emergency Radio Coordination Game</h1>
        <h2>Complete Game Guide</h2>
      </div>

      <section className="guide-section">
        <h3>Overview</h3>
        <p>
          This is a live-action communication and coordination training game designed to teach participants 
          how to operate under pressure, prioritize resources, and communicate effectively using radio systems.
        </p>
        <div className="info-box">
          <strong>Game Duration:</strong> 45 minutes (3 rounds × 15 minutes)<br/>
          <strong>Players:</strong> 6-24 participants<br/>
          <strong>Locations:</strong> 2-5 physical areas<br/>
          <strong>Equipment:</strong> Radios (Ham, GMRS, FRS, or apps), role cards, timer
        </div>
      </section>

      <section className="guide-section">
        <h3>Setup Phase (10 minutes)</h3>
        <ol>
          <li>
            <strong>Prepare Physical Locations:</strong>
            <ul>
              <li>Mark 2-5 distinct areas (rooms, zones, or outdoor spaces)</li>
              <li>Label each location clearly (Location 1, Location 2, etc.)</li>
              <li>Ensure radio communication works between all locations</li>
            </ul>
          </li>
          <li>
            <strong>Generate and Distribute Role Cards:</strong>
            <ul>
              <li>Use the app to generate roles based on player count</li>
              <li>Print role cards or display digitally to each player</li>
              <li>Keep cards secret - players should not share their cards</li>
            </ul>
          </li>
          <li>
            <strong>Distribute Radios:</strong>
            <ul>
              <li>Give each player a radio or ensure they have a radio app</li>
              <li>Set all radios to the same channel/frequency</li>
              <li>Test communications before starting</li>
            </ul>
          </li>
          <li>
            <strong>Position Players:</strong>
            <ul>
              <li>Send each player to their starting location (shown on role card)</li>
              <li>Players must stay at their starting location until game begins</li>
            </ul>
          </li>
        </ol>
      </section>

      <section className="guide-section">
        <h3>How to Play</h3>
        
        <h4>Game Objectives</h4>
        <p>Each player has TWO main objectives:</p>
        <ol>
          <li><strong>Primary Need:</strong> Find a specific item or service (shown on your card)</li>
          <li><strong>Delivery (if you have an item):</strong> Deliver your item to someone who needs it</li>
        </ol>
        <p><strong>Some players also have:</strong></p>
        <ul>
          <li>💔 <strong>Personal relationships</strong> - Family members at other locations</li>
          <li>⚡ <strong>Strategic dilemmas</strong> - Multiple urgent needs creating conflicts</li>
        </ul>

        <h4>Basic Rules</h4>
        <ol>
          <li><strong>Communication:</strong> ALL communication must happen via radio using proper protocol</li>
          <li><strong>Movement:</strong> Players can move between locations at any time</li>
          <li><strong>Exchanges:</strong> When two players meet in person, they can:
            <ul>
              <li>Exchange items (physical cards or verbal confirmation)</li>
              <li>Provide services (if they have the needed profession)</li>
              <li>Share information about who/what is where</li>
            </ul>
          </li>
          <li><strong>No Phones/Texts:</strong> Only radio communication allowed</li>
          <li><strong>No Shouting:</strong> Don't communicate between locations without radio</li>
        </ol>

        <h4>Game Flow</h4>
        <div className="numbered-steps">
          <div className="step">
            <span className="step-number">Round 1 (15 min)</span>
            <p>Initial coordination - figure out who has what and where they are</p>
          </div>
          <div className="step">
            <span className="step-number">Round 2 (15 min)</span>
            <p>Movement and exchanges - start traveling to meet needs</p>
          </div>
          <div className="step">
            <span className="step-number">Round 3 (15 min)</span>
            <p>Final push - complete remaining objectives and handle dilemmas</p>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <h3>Role Card Interpretation</h3>
        <div className="example-card">
          <h4>Example Role Card:</h4>
          <div className="card-example">
            <p><strong>Name:</strong> Dr. Sarah Martinez</p>
            <p><strong>Profession:</strong> Doctor</p>
            <p><strong>Location:</strong> 1</p>
            <p><strong>Has:</strong> Medical Kit</p>
            <p><strong>Needs:</strong> broken leg (needs medical care) → Requires: Doctor</p>
            <p><strong>Dilemma:</strong> 💔 Find spouse (Officer John Martinez @ Location 3)</p>
          </div>
          
          <h4>What This Means:</h4>
          <ul>
            <li>You ARE a Doctor (you can provide medical services)</li>
            <li>You HAVE a Medical Kit (deliver it to someone who needs it)</li>
            <li>You NEED to help someone with a broken leg (find another Doctor)</li>
            <li>You have a PERSONAL CONFLICT - your spouse is at Location 3</li>
          </ul>
        </div>
      </section>

      <section className="guide-section">
        <h3>Strategic Tips</h3>
        <ul className="tips-list">
          <li><strong>Start by gathering information:</strong> Use radio to ask "Who has X?" and "Who needs Y?"</li>
          <li><strong>Announce your location:</strong> Make it easy for people to find you</li>
          <li><strong>HIGH PRIORITY roles:</strong> If you're needed by others, coordinate carefully</li>
          <li><strong>Triangle dilemmas:</strong> If your need and relationship are at different locations, prioritize based on urgency</li>
          <li><strong>Team coordination:</strong> Help relay messages between players</li>
          <li><strong>Time management:</strong> Don't spend all 45 minutes coordinating - start moving!</li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Winning Conditions</h3>
        <p>This is a <strong>cooperative game</strong> - the team wins together based on:</p>
        <ul>
          <li>✅ Number of objectives completed</li>
          <li>✅ Radio discipline maintained</li>
          <li>✅ Effective coordination demonstrated</li>
          <li>✅ Strategic decisions made under pressure</li>
        </ul>
        <p><strong>Perfect Score:</strong> All players complete their objectives with excellent radio protocol</p>
      </section>

      <section className="guide-section">
        <h3>Common Mistakes to Avoid</h3>
        <ul className="warning-list">
          <li>❌ Talking too long on the radio (keeps others from communicating)</li>
          <li>❌ Not identifying yourself when transmitting</li>
          <li>❌ Forgetting to deliver items you're carrying</li>
          <li>❌ Ignoring personal relationships (they're part of the challenge!)</li>
          <li>❌ Giving up when faced with impossible choices (that's the learning!)</li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Facilitator Role</h3>
        <p>The facilitator/referee should:</p>
        <ul>
          <li>Monitor radio communications for protocol violations</li>
          <li>Track which objectives are completed using the app</li>
          <li>Award points for good radio discipline and coordination</li>
          <li>Deduct points for infractions</li>
          <li>Keep time and announce round transitions</li>
          <li>Observe player decision-making for debrief discussion</li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>After Game Debrief (15 minutes)</h3>
        <p>Use the app's debrief screen to discuss:</p>
        <ol>
          <li><strong>Communication effectiveness:</strong> What worked? What didn't?</li>
          <li><strong>Difficult decisions:</strong> How did players handle dilemmas?</li>
          <li><strong>Coordination strategies:</strong> What helped the team succeed?</li>
          <li><strong>Real-world application:</strong> How does this relate to actual emergencies?</li>
          <li><strong>Lessons learned:</strong> What would you do differently next time?</li>
        </ol>
      </section>

      <section className="guide-section">
        <h3>Variations and Advanced Play</h3>
        <div className="variations">
          <h4>Easy Mode:</h4>
          <ul>
            <li>Fewer locations (2-3)</li>
            <li>More time (60 minutes)</li>
            <li>Fewer relationships/dilemmas</li>
          </ul>

          <h4>Hard Mode:</h4>
          <ul>
            <li>More locations (4-5)</li>
            <li>Less time (30 minutes)</li>
            <li>Add random events (building collapses, weather changes)</li>
            <li>Limit radio batteries (must conserve power)</li>
          </ul>

          <h4>Expert Challenges:</h4>
          <ul>
            <li>Some radios go down mid-game</li>
            <li>Players can't see role cards of others</li>
            <li>Add "injured" players who can't move</li>
            <li>Require specific message formats</li>
          </ul>
        </div>
      </section>

      <footer className="guide-footer">
        <p><strong>Emergency Radio Coordination Game</strong> | Training Tool for Emergency Communication</p>
        <p>Aligned with FEMA ICS, CERT, and ARRL emergency protocols</p>
      </footer>
    </div>
  );
}

export default GameGuide;

