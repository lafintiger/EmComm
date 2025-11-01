import { ArrowLeft, Printer } from 'lucide-react';
import './CommunicationsGuide.css';

function CommunicationsGuide({ onBack }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="communications-guide printable-document">
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
        <h1>Radio Communication Protocol Guide</h1>
        <h2>Emergency Radio Coordination Game</h2>
      </div>

      <section className="guide-section">
        <h3>Why Radio Protocol Matters</h3>
        <p>
          In real emergencies, proper radio communication can save lives. Clear, concise, and disciplined 
          radio use ensures that critical information gets through when it matters most. This guide teaches 
          the essential protocols used by emergency responders worldwide.
        </p>
      </section>

      <section className="guide-section">
        <h3>The 5-Step Communication Protocol</h3>
        
        <div className="protocol-step">
          <div className="step-number">STEP 1</div>
          <div className="step-content">
            <h4>Identify Yourself and Your Location</h4>
            <p><strong>Always start with WHO you are and WHERE you are</strong></p>
            <div className="example-box good">
              <strong>✓ GOOD:</strong> "This is Dr. Martinez at Location 1"
            </div>
            <div className="example-box bad">
              <strong>✗ BAD:</strong> "Hey, it's me"
            </div>
          </div>
        </div>

        <div className="protocol-step">
          <div className="step-number">STEP 2</div>
          <div className="step-content">
            <h4>State Your Message Clearly</h4>
            <p><strong>Be brief and specific. Say what you need.</strong></p>
            <div className="example-box good">
              <strong>✓ GOOD:</strong> "I need a mechanic. Generator is down. Does anyone copy?"
            </div>
            <div className="example-box bad">
              <strong>✗ BAD:</strong> "Uh, so like, we have a problem here, and I was wondering if maybe someone could help us out with, you know, fixing something..."
            </div>
          </div>
        </div>

        <div className="protocol-step">
          <div className="step-number">STEP 3</div>
          <div className="step-content">
            <h4>Wait for Acknowledgment</h4>
            <p><strong>Don't keep talking. Let others respond.</strong></p>
            <div className="example-box good">
              <strong>✓ GOOD:</strong> [Wait 3-5 seconds for response]
            </div>
            <div className="example-box bad">
              <strong>✗ BAD:</strong> "Does anyone copy? Hello? Anyone there? Can anyone hear me? Hello?"
            </div>
          </div>
        </div>

        <div className="protocol-step">
          <div className="step-number">STEP 4</div>
          <div className="step-content">
            <h4>Confirm and Coordinate</h4>
            <p><strong>Acknowledge responses and confirm actions</strong></p>
            <div className="example-box good">
              <strong>✓ GOOD:</strong> "Copy that, Location 3. Moving from Location 1 to Location 3 now."
            </div>
            <div className="example-box bad">
              <strong>✗ BAD:</strong> "Okay cool, see you soon!"
            </div>
          </div>
        </div>

        <div className="protocol-step">
          <div className="step-number">STEP 5</div>
          <div className="step-content">
            <h4>Close Transmission Properly</h4>
            <p><strong>Signal you're done transmitting</strong></p>
            <div className="example-box good">
              <strong>✓ GOOD:</strong> "Martinez clear" or "Location 1 out"
            </div>
            <div className="example-box bad">
              <strong>✗ BAD:</strong> [Just stops talking]
            </div>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <h3>Standard Radio Terminology</h3>
        <table className="radio-terms-table">
          <thead>
            <tr>
              <th>Term</th>
              <th>Meaning</th>
              <th>When to Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Copy / Roger</strong></td>
              <td>"I understand"</td>
              <td>Acknowledging information received</td>
            </tr>
            <tr>
              <td><strong>Negative</strong></td>
              <td>"No" or "Incorrect"</td>
              <td>Denying or correcting information</td>
            </tr>
            <tr>
              <td><strong>Affirmative</strong></td>
              <td>"Yes" or "Correct"</td>
              <td>Confirming information</td>
            </tr>
            <tr>
              <td><strong>Stand By</strong></td>
              <td>"Wait, I need a moment"</td>
              <td>When you need time to check or prepare</td>
            </tr>
            <tr>
              <td><strong>Go Ahead</strong></td>
              <td>"I'm ready for your message"</td>
              <td>Responding to someone calling you</td>
            </tr>
            <tr>
              <td><strong>Repeat / Say Again</strong></td>
              <td>"Please say that again"</td>
              <td>When you didn't hear clearly</td>
            </tr>
            <tr>
              <td><strong>Clear / Out</strong></td>
              <td>"Transmission complete"</td>
              <td>Ending your transmission</td>
            </tr>
            <tr>
              <td><strong>Break / Break Break</strong></td>
              <td>"Emergency traffic"</td>
              <td>Urgent interruption (use sparingly!)</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="guide-section">
        <h3>Example Conversations</h3>

        <div className="conversation-example">
          <h4>Example 1: Finding Someone</h4>
          <div className="radio-exchange">
            <div className="transmission">
              <strong>Dr. Martinez (Location 1):</strong><br/>
              "This is Dr. Martinez at Location 1. Looking for a nurse. Does anyone copy?"
            </div>
            <div className="transmission">
              <strong>Nurse Thompson (Location 2):</strong><br/>
              "Location 2, Thompson here. I'm a nurse. Go ahead."
            </div>
            <div className="transmission">
              <strong>Dr. Martinez:</strong><br/>
              "Copy, Thompson. Need assistance with patient. Can you come to Location 1?"
            </div>
            <div className="transmission">
              <strong>Nurse Thompson:</strong><br/>
              "Affirmative. Moving from Location 2 to Location 1. ETA 5 minutes."
            </div>
            <div className="transmission">
              <strong>Dr. Martinez:</strong><br/>
              "Roger. Standing by. Martinez clear."
            </div>
          </div>
        </div>

        <div className="conversation-example">
          <h4>Example 2: Requesting Item</h4>
          <div className="radio-exchange">
            <div className="transmission">
              <strong>Garcia (Location 3):</strong><br/>
              "This is Garcia at Location 3. Need batteries urgently. Who has batteries?"
            </div>
            <div className="transmission">
              <strong>Chen (Location 1):</strong><br/>
              "Location 1, Chen here. I have batteries."
            </div>
            <div className="transmission">
              <strong>Garcia:</strong><br/>
              "Copy, Chen. Can you bring them to Location 3?"
            </div>
            <div className="transmission">
              <strong>Chen:</strong><br/>
              "Negative. I'm needed here. Can you come to Location 1?"
            </div>
            <div className="transmission">
              <strong>Garcia:</strong><br/>
              "Affirmative. En route to Location 1. Garcia out."
            </div>
          </div>
        </div>

        <div className="conversation-example">
          <h4>Example 3: Urgent Emergency</h4>
          <div className="radio-exchange">
            <div className="transmission">
              <strong>Officer Davis (Location 2):</strong><br/>
              "Break break break! This is Officer Davis, Location 2. Medical emergency. Need doctor immediately!"
            </div>
            <div className="transmission">
              <strong>Dr. Martinez (Location 1):</strong><br/>
              "Dr. Martinez responding. What's the situation?"
            </div>
            <div className="transmission">
              <strong>Officer Davis:</strong><br/>
              "Patient unconscious. Possible head injury."
            </div>
            <div className="transmission">
              <strong>Dr. Martinez:</strong><br/>
              "Copy. En route to Location 2 now. ETA 3 minutes. Martinez out."
            </div>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <h3>Common Mistakes and How to Fix Them</h3>
        
        <div className="mistake-fix">
          <div className="mistake">
            <strong>❌ MISTAKE:</strong> Rambling or over-explaining
          </div>
          <div className="fix">
            <strong>✓ FIX:</strong> Use the "What, Where, When" rule. State facts clearly and briefly.
          </div>
        </div>

        <div className="mistake-fix">
          <div className="mistake">
            <strong>❌ MISTAKE:</strong> Multiple people talking at once
          </div>
          <div className="fix">
            <strong>✓ FIX:</strong> Listen before transmitting. If someone else is talking, wait your turn.
          </div>
        </div>

        <div className="mistake-fix">
          <div className="mistake">
            <strong>❌ MISTAKE:</strong> Not identifying yourself
          </div>
          <div className="fix">
            <strong>✓ FIX:</strong> Always start with "This is [YOUR NAME] at [LOCATION]"
          </div>
        </div>

        <div className="mistake-fix">
          <div className="mistake">
            <strong>❌ MISTAKE:</strong> Using unclear pronouns ("he", "she", "they")
          </div>
          <div className="fix">
            <strong>✓ FIX:</strong> Always use names and locations. "Martinez is at Location 1" not "He's over there"
          </div>
        </div>

        <div className="mistake-fix">
          <div className="mistake">
            <strong>❌ MISTAKE:</strong> Not waiting for acknowledgment
          </div>
          <div className="fix">
            <strong>✓ FIX:</strong> Pause 3-5 seconds after asking a question. Let others respond.
          </div>
        </div>
      </section>

      <section className="guide-section">
        <h3>Phonetic Alphabet (For Clarity)</h3>
        <p>Use when spelling names or difficult words:</p>
        <div className="phonetic-grid">
          <div className="phonetic-item">A = <strong>Alpha</strong></div>
          <div className="phonetic-item">B = <strong>Bravo</strong></div>
          <div className="phonetic-item">C = <strong>Charlie</strong></div>
          <div className="phonetic-item">D = <strong>Delta</strong></div>
          <div className="phonetic-item">E = <strong>Echo</strong></div>
          <div className="phonetic-item">F = <strong>Foxtrot</strong></div>
          <div className="phonetic-item">G = <strong>Golf</strong></div>
          <div className="phonetic-item">H = <strong>Hotel</strong></div>
          <div className="phonetic-item">I = <strong>India</strong></div>
          <div className="phonetic-item">J = <strong>Juliet</strong></div>
          <div className="phonetic-item">K = <strong>Kilo</strong></div>
          <div className="phonetic-item">L = <strong>Lima</strong></div>
          <div className="phonetic-item">M = <strong>Mike</strong></div>
          <div className="phonetic-item">N = <strong>November</strong></div>
          <div className="phonetic-item">O = <strong>Oscar</strong></div>
          <div className="phonetic-item">P = <strong>Papa</strong></div>
          <div className="phonetic-item">Q = <strong>Quebec</strong></div>
          <div className="phonetic-item">R = <strong>Romeo</strong></div>
          <div className="phonetic-item">S = <strong>Sierra</strong></div>
          <div className="phonetic-item">T = <strong>Tango</strong></div>
          <div className="phonetic-item">U = <strong>Uniform</strong></div>
          <div className="phonetic-item">V = <strong>Victor</strong></div>
          <div className="phonetic-item">W = <strong>Whiskey</strong></div>
          <div className="phonetic-item">X = <strong>X-ray</strong></div>
          <div className="phonetic-item">Y = <strong>Yankee</strong></div>
          <div className="phonetic-item">Z = <strong>Zulu</strong></div>
        </div>
      </section>

      <section className="guide-section">
        <h3>Radio Discipline Checklist</h3>
        <p>Before each transmission, ask yourself:</p>
        <ul className="checklist">
          <li>☐ Is the channel clear?</li>
          <li>☐ Do I know what I want to say?</li>
          <li>☐ Can I say it in under 30 seconds?</li>
          <li>☐ Am I using proper protocol?</li>
          <li>☐ Will I identify myself?</li>
        </ul>
      </section>

      <section className="guide-section">
        <h3>Quick Reference Card</h3>
        <div className="quick-ref-card">
          <h4>Every Transmission Should Include:</h4>
          <ol>
            <li><strong>WHO</strong> you are (name)</li>
            <li><strong>WHERE</strong> you are (location)</li>
            <li><strong>WHAT</strong> you need or are saying</li>
            <li><strong>WAIT</strong> for response</li>
            <li><strong>CLOSE</strong> transmission properly</li>
          </ol>
        </div>
      </section>

      <footer className="guide-footer">
        <p><strong>Radio Communication Protocol Guide</strong> | Emergency Radio Coordination Game</p>
        <p>Based on FEMA ICS standards and ARRL emergency communication protocols</p>
      </footer>
    </div>
  );
}

export default CommunicationsGuide;

