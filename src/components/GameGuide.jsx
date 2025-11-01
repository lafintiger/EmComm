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

        <h4>Physical Game Components</h4>
        <div className="important-note">
          <h4>📄 Tear-Off Item Cards</h4>
          <p><strong>Each role card has a TEAR-OFF section at the bottom</strong> (marked with ✂️ scissors).</p>
          <ul>
            <li>If you have an <strong>ITEM</strong> (not a skill), tear off this section during the Transport Phase</li>
            <li>Give it to the transport vehicle to deliver to the person who needs it</li>
            <li>The item card shows: <strong>Item Name, From (your name), Instructions</strong></li>
          </ul>

          <h4>✍️ Service Signatures</h4>
          <p>If you need a <strong>SERVICE</strong> from a specialist (Doctor, Mechanic, etc.):</p>
          <ul>
            <li>Your card has a <strong>Signature Line</strong></li>
            <li>When the specialist provides the service, they <strong>SIGN your card</strong></li>
            <li>This proves the service was completed</li>
          </ul>

          <h4>🤝 Physical Positioning</h4>
          <p>If you need to find a <strong>PERSON</strong> (spouse, child, parent, etc.):</p>
          <ul>
            <li>You must physically <strong>STAND NEXT TO</strong> that person</li>
            <li>Both of you stay together for the rest of the game</li>
            <li>This visually shows the relationship has been reunited</li>
          </ul>
        </div>

        <h4>Basic Rules</h4>
        <ol>
          <li><strong>Communication:</strong> ALL communication must happen via radio using proper protocol</li>
          <li><strong>Movement:</strong> Players can move between locations at any time</li>
          <li><strong>Exchanges During Transport Phase:</strong>
            <ul>
              <li><strong>ITEMS:</strong> Tear off item card and give to transport vehicle</li>
              <li><strong>SERVICES:</strong> Specialist signs the card of person needing service</li>
              <li><strong>RELATIONSHIPS:</strong> Stand next to your family member</li>
            </ul>
          </li>
          <li><strong>No Phones/Texts:</strong> Only radio communication allowed</li>
          <li><strong>No Shouting:</strong> Don't communicate between locations without radio</li>
        </ol>

        <h4>Game Flow (3 Rounds x 10 Minutes)</h4>
        <div className="numbered-steps">
          <div className="step">
            <span className="step-number">Round 1 (10 min)</span>
            <p><strong>Initial Coordination & Critical Needs:</strong> All 3 locations coordinate via radio to:</p>
            <ul>
              <li>Agree on who speaks first (Net Control organizes)</li>
              <li>Communicate what's needed at each location</li>
              <li>Prioritize CRITICAL first-round needs (life-threatening!)</li>
            </ul>
            <p><strong>Transport Phase:</strong> Vehicle arrives! Teams decide what/who goes where based on their coordination.</p>
          </div>
          <div className="step">
            <span className="step-number">Round 2 (10 min)</span>
            <p><strong>Movement & Exchanges:</strong> New Net Control takes over. Teams continue coordinating:</p>
            <ul>
              <li>Track what was delivered in Round 1</li>
              <li>Coordinate remaining needs</li>
              <li>Handle personal dilemmas (relationships)</li>
            </ul>
            <p><strong>Transport Phase:</strong> Second vehicle arrives - more coordination required!</p>
          </div>
          <div className="step">
            <span className="step-number">Round 3 (10 min)</span>
            <p><strong>Final Push:</strong> Third Net Control coordinates final efforts:</p>
            <ul>
              <li>Complete remaining objectives</li>
              <li>Resolve difficult strategic dilemmas</li>
              <li>Ensure all critical needs addressed</li>
            </ul>
            <p><strong>Final Transport Phase:</strong> Last chance to get people/items where they need to be!</p>
          </div>
        </div>

        <div className="important-note">
          <h4>⚠️ The Transport System - Why It Creates Urgency</h4>
          <p><strong>Each round has only 10 minutes.</strong> At the end, a vehicle arrives to transport people and materials between locations.</p>
          <p><strong>The Challenge:</strong> All 3 locations must coordinate via radio to decide:</p>
          <ul>
            <li>Who talks first? (This can be chaotic without Net Control!)</li>
            <li>What needs to go where?</li>
            <li>Who needs to travel to which location?</li>
          </ul>
          <p><strong>If teams don't coordinate well, people miss the transport and needs go unmet!</strong></p>
          <p>This creates time pressure and demonstrates <strong>why radio protocols matter</strong> - without structure, chaos ensues!</p>
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
        <h3>Game Completion - When Is The Game Over?</h3>
        <div className="important-note">
          <h4>🏁 The game ends when ALL THREE conditions are met for EVERY player:</h4>
          <ol style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            <li><strong>✅ Item Condition:</strong> Each person has the physical <strong>torn-off paper item</strong> that matches their need
              <ul style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>
                <li>Example: If Sarah needs "First Aid Kit", she must physically hold the torn-off paper showing "First Aid Kit"</li>
              </ul>
            </li>
            <li><strong>✅ Relationship Condition:</strong> Each person is <strong>physically standing next to</strong> the person they were looking for
              <ul style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>
                <li>Example: If Sarah needs to find her spouse John, they must be standing together</li>
              </ul>
            </li>
            <li><strong>✅ Service Condition:</strong> Anyone who needed a specialist has that specialist's <strong>signature on their card</strong>
              <ul style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>
                <li>Example: If Sarah needs a Doctor for broken leg, a Doctor must have signed her card</li>
              </ul>
            </li>
          </ol>
        </div>

        <h4>How Referee Verifies Completion:</h4>
        <ol>
          <li><strong>Physical Check:</strong> Walk around and verify each player is holding the item they need</li>
          <li><strong>Visual Check:</strong> Verify people who needed to find each other are standing together</li>
          <li><strong>Signature Check:</strong> Check all service recipient cards for specialist signatures</li>
        </ol>

        <h4>Scoring (After Completion):</h4>
        <p>This is a <strong>cooperative game</strong> - the team wins together based on:</p>
        <ul>
          <li>✅ Completion time (faster = better)</li>
          <li>✅ Radio discipline maintained throughout</li>
          <li>✅ Effective coordination during transport phases</li>
          <li>✅ Strategic decisions made under pressure</li>
        </ul>
        <p><strong>Perfect Score:</strong> All conditions met with excellent radio protocol and minimal infractions</p>
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

