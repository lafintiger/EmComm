import { ArrowLeft, Printer } from 'lucide-react';
import './RefereeChecklist.css';

function RefereeChecklist({ onBack }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="referee-checklist printable-document">
      <div className="guide-controls no-print">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Menu
        </button>
        <button className="btn btn-primary" onClick={handlePrint}>
          <Printer size={20} />
          Print Checklist
        </button>
      </div>

      <div className="guide-header">
        <h1>Referee/Facilitator Checklist</h1>
        <h2>Emergency Radio Coordination Game</h2>
      </div>

      <section className="guide-section">
        <h3>Facilitator Role Overview</h3>
        <p>
          As the referee/facilitator, you are responsible for monitoring radio communications, 
          tracking player progress, awarding points, and ensuring fair gameplay. This checklist 
          helps you observe, score, and guide the game effectively.
        </p>
      </section>

      <section className="guide-section">
        <h3>Pre-Game Setup Checklist</h3>
        <div className="checklist-box">
          <h4>☐ Physical Setup (15 minutes before)</h4>
          <ul className="task-list">
            <li>☐ All locations clearly marked and accessible</li>
            <li>☐ Radio equipment tested at each location</li>
            <li>☐ All radios on same channel/frequency</li>
            <li>☐ Timer/stopwatch ready</li>
            <li>☐ Role cards printed or ready to distribute</li>
            <li>☐ Scoring sheets printed (this document)</li>
            <li>☐ Communication protocol guide available for reference</li>
          </ul>

          <h4>☐ Player Briefing (5-10 minutes)</h4>
          <ul className="task-list">
            <li>☐ Explain game objectives and rules</li>
            <li>☐ Demonstrate proper radio protocol</li>
            <li>☐ Review the 5-step communication procedure</li>
            <li>☐ Emphasize safety (no running, stay within boundaries)</li>
            <li>☐ Answer player questions</li>
            <li>☐ Distribute role cards (keep confidential)</li>
          </ul>

          <h4>☐ Equipment Check</h4>
          <ul className="task-list">
            <li>☐ Each player has a working radio</li>
            <li>☐ Battery levels sufficient for 45 minutes</li>
            <li>☐ Volume levels appropriate</li>
            <li>☐ Test transmission from each location</li>
          </ul>
        </div>
      </section>

      <section className="guide-section">
        <h3>During Game: Observation Points</h3>
        
        <div className="observation-category">
          <h4>1. Radio Discipline (Score: +10 per round, -5 per infraction)</h4>
          <p><strong>OBSERVE:</strong></p>
          <table className="observation-table">
            <thead>
              <tr>
                <th>Positive Behaviors (+)</th>
                <th>Negative Behaviors (-)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>✓ Identifies self and location</td>
                <td>✗ No identification</td>
              </tr>
              <tr>
                <td>✓ Clear, concise messages</td>
                <td>✗ Rambling or unclear</td>
              </tr>
              <tr>
                <td>✓ Waits for acknowledgment</td>
                <td>✗ Interrupts others</td>
              </tr>
              <tr>
                <td>✓ Uses proper terminology</td>
                <td>✗ Slang or casual language</td>
              </tr>
              <tr>
                <td>✓ Closes transmissions properly</td>
                <td>✗ Abrupt endings</td>
              </tr>
              <tr>
                <td>✓ Stays on topic</td>
                <td>✗ Off-topic chatter</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="observation-category">
          <h4>2. Team Coordination (+10 points)</h4>
          <p><strong>AWARD POINTS WHEN YOU SEE:</strong></p>
          <ul className="points-list">
            <li>✓ Players helping relay information between others</li>
            <li>✓ Strategic planning and delegation</li>
            <li>✓ Efficient routing (minimizing unnecessary travel)</li>
            <li>✓ Clear communication of who has what and where</li>
            <li>✓ Problem-solving when plans don't work</li>
            <li>✓ Supporting others to complete objectives</li>
          </ul>
        </div>

        <div className="observation-category">
          <h4>3. Decision Quality (+5 points per good decision)</h4>
          <p><strong>LOOK FOR:</strong></p>
          <ul className="points-list">
            <li>✓ Logical prioritization of needs</li>
            <li>✓ Balancing personal vs. professional obligations</li>
            <li>✓ Adapting when situations change</li>
            <li>✓ Considering time constraints</li>
            <li>✓ Making difficult choices in dilemmas</li>
            <li>✓ Explaining reasoning to teammates</li>
          </ul>
        </div>

        <div className="observation-category">
          <h4>4. High-Priority Completions (+20 bonus)</h4>
          <p><strong>AWARD BONUS FOR:</strong></p>
          <ul className="points-list">
            <li>✓ Critical roles (Doctor, Paramedic, etc.) completing urgent needs</li>
            <li>✓ Life-saving supplies delivered quickly</li>
            <li>✓ Emergency situations resolved</li>
          </ul>
        </div>
      </section>

      <section className="guide-section">
        <h3>Location Observation Sheet</h3>
        <p><strong>Print multiple copies - one per location</strong></p>
        
        <div className="location-sheet">
          <h4>Location: __________ | Round: __________</h4>
          
          <table className="tracking-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Player Name</th>
                <th>Action</th>
                <th>Notes</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_____</td>
                <td>_______________</td>
                <td>_______________</td>
                <td>________________________</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>_____</td>
                <td>_______________</td>
                <td>_______________</td>
                <td>________________________</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>_____</td>
                <td>_______________</td>
                <td>_______________</td>
                <td>________________________</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>_____</td>
                <td>_______________</td>
                <td>_______________</td>
                <td>________________________</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>_____</td>
                <td>_______________</td>
                <td>_______________</td>
                <td>________________________</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>_____</td>
                <td>_______________</td>
                <td>_______________</td>
                <td>________________________</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>_____</td>
                <td>_______________</td>
                <td>_______________</td>
                <td>________________________</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>_____</td>
                <td>_______________</td>
                <td>_______________</td>
                <td>________________________</td>
                <td>_____</td>
              </tr>
            </tbody>
          </table>

          <div className="round-summary">
            <p><strong>Round Summary:</strong></p>
            <p>Radio Discipline Score: _____ / 10</p>
            <p>Notable Moments: _____________________________________________</p>
            <p>Infractions: __________________________________________________</p>
          </div>
        </div>
      </section>

      <section className="guide-section page-break">
        <h3>Radio Communication Infractions Tracker</h3>
        <p><strong>-5 points each</strong></p>
        
        <div className="infraction-tracking">
          <table className="infraction-table">
            <thead>
              <tr>
                <th>Infraction Type</th>
                <th>Round 1</th>
                <th>Round 2</th>
                <th>Round 3</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No identification</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>Interrupting others</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>Rambling messages</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>No proper closing</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>Off-topic chatter</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>Using phones/texting</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>Shouting between locations</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="guide-section">
        <h3>Objective Completion Tracker</h3>
        <p><strong>Use app for live tracking, or fill this out manually</strong></p>
        
        <table className="completion-table">
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Primary Need ✓</th>
              <th>Item Delivered ✓</th>
              <th>Relationship Resolved ✓</th>
              <th>Time Completed</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(12)].map((_, i) => (
              <tr key={i}>
                <td>_________________</td>
                <td>☐</td>
                <td>☐</td>
                <td>☐</td>
                <td>_______</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="guide-section">
        <h3>Decision-Making Observation Notes</h3>
        <p><strong>Record interesting dilemmas and how players resolved them:</strong></p>
        
        <div className="notes-section">
          <h4>Player Dilemmas Observed:</h4>
          <div className="note-box">
            <p>Player: _____________________ Dilemma: _________________________________</p>
            <p>Decision Made: _______________________________________________________</p>
            <p>Reasoning: ___________________________________________________________</p>
            <p>Quality: ☐ Excellent  ☐ Good  ☐ Fair  ☐ Poor</p>
          </div>
          <div className="note-box">
            <p>Player: _____________________ Dilemma: _________________________________</p>
            <p>Decision Made: _______________________________________________________</p>
            <p>Reasoning: ___________________________________________________________</p>
            <p>Quality: ☐ Excellent  ☐ Good  ☐ Fair  ☐ Poor</p>
          </div>
          <div className="note-box">
            <p>Player: _____________________ Dilemma: _________________________________</p>
            <p>Decision Made: _______________________________________________________</p>
            <p>Reasoning: ___________________________________________________________</p>
            <p>Quality: ☐ Excellent  ☐ Good  ☐ Fair  ☐ Poor</p>
          </div>
        </div>
      </section>

      <section className="guide-section page-break">
        <h3>Final Score Calculation</h3>
        
        <div className="score-calc">
          <table className="score-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Points</th>
                <th>Round 1</th>
                <th>Round 2</th>
                <th>Round 3</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Radio Discipline</td>
                <td>+10/round</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>Team Coordination</td>
                <td>+10 each</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>Decision Quality</td>
                <td>+5 each</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>High-Priority Success</td>
                <td>+20 each</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>Objectives Completed</td>
                <td>+15 each</td>
                <td colspan="3">_____ completed</td>
                <td>_____</td>
              </tr>
              <tr className="negative-row">
                <td>Infractions</td>
                <td>-5 each</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
                <td>_____</td>
              </tr>
              <tr className="total-row">
                <td colspan="5"><strong>TOTAL SCORE</strong></td>
                <td><strong>_____</strong></td>
              </tr>
            </tbody>
          </table>

          <div className="scoring-guide">
            <h4>Performance Rating:</h4>
            <ul>
              <li><strong>200+:</strong> Excellent - Professional-level communication and coordination</li>
              <li><strong>150-199:</strong> Good - Solid performance with minor improvements needed</li>
              <li><strong>100-149:</strong> Fair - Basic understanding, needs more practice</li>
              <li><strong>Below 100:</strong> Needs Improvement - Review protocols and try again</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="guide-section page-break">
        <h3>🏁 Game Completion Verification</h3>
        <p><strong>Use this checklist to verify ALL completion conditions are met for EVERY player</strong></p>
        
        <div className="verification-section">
          <h4>STEP 1: Physical Item Verification ✅</h4>
          <p><em>Walk around and check each player</em></p>
          <table className="verification-table">
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Needs (Item)</th>
                <th>Has Torn-Off Paper? ✓</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td style={{ width: '80px' }}>□</td>
                <td>_________________</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
                <td>_________________</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
                <td>_________________</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
                <td>_________________</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
                <td>_________________</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
                <td>_________________</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="verification-section">
          <h4>STEP 2: Physical Positioning Verification 🤝</h4>
          <p><em>Check that people who need to find each other are standing together</em></p>
          <table className="verification-table">
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Needs to Find</th>
                <th>Standing Together? ✓</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td style={{ width: '80px' }}>□</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
                <td>_____</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
                <td>_____</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="verification-section">
          <h4>STEP 3: Service Signature Verification ✍️</h4>
          <p><em>Check cards for specialist signatures</em></p>
          <table className="verification-table">
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Needs (Service)</th>
                <th>Specialist Required</th>
                <th>Has Signature? ✓</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>_________________</td>
                <td style={{ width: '80px' }}>□</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
              </tr>
              <tr>
                <td>_________________</td>
                <td>_________________</td>
                <td>_________________</td>
                <td>□</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="completion-checklist">
          <h4>🎯 Final Completion Check:</h4>
          <div style={{ fontSize: '1.1rem', lineHeight: '2' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              <input type="checkbox" style={{ marginRight: '1rem', transform: 'scale(1.3)' }} />
              <strong>ALL players have their needed item (torn-off paper)</strong>
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              <input type="checkbox" style={{ marginRight: '1rem', transform: 'scale(1.3)' }} />
              <strong>ALL relationship pairs are standing together</strong>
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              <input type="checkbox" style={{ marginRight: '1rem', transform: 'scale(1.3)' }} />
              <strong>ALL service recipients have specialist signatures</strong>
            </label>
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#dcfce7', border: '2px solid #16a34a', borderRadius: '0.5rem' }}>
            <strong style={{ color: '#15803d', fontSize: '1.2rem' }}>✓ When ALL three boxes are checked, the game is COMPLETE!</strong>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <h3>Post-Game Debrief Guide</h3>
        
        <div className="debrief-questions">
          <h4>Discussion Questions to Ask:</h4>
          <ol>
            <li><strong>Communication:</strong> "What radio communication challenges did you face?"</li>
            <li><strong>Coordination:</strong> "How did you decide who should move where?"</li>
            <li><strong>Dilemmas:</strong> "Who had to make a difficult choice? What did you choose and why?"</li>
            <li><strong>Improvements:</strong> "What would you do differently next time?"</li>
            <li><strong>Real-World:</strong> "How does this relate to actual emergency situations?"</li>
            <li><strong>Surprises:</strong> "What unexpected challenges came up?"</li>
            <li><strong>Success:</strong> "What strategies worked well for your team?"</li>
            <li><strong>Learning:</strong> "What's the most important thing you learned today?"</li>
          </ol>
        </div>

        <div className="key-takeaways">
          <h4>Key Takeaways to Emphasize:</h4>
          <ul>
            <li>✓ Clear, concise communication saves time and prevents confusion</li>
            <li>✓ Protocol exists to create order in chaos</li>
            <li>✓ Personal emotions impact professional decisions</li>
            <li>✓ Team coordination requires trust and clear information sharing</li>
            <li>✓ In emergencies, perfect solutions don't exist - prioritize and adapt</li>
          </ul>
        </div>
      </section>

      <section className="guide-section">
        <h3>Facilitator Tips</h3>
        
        <div className="tips-box">
          <h4>Do's:</h4>
          <ul>
            <li>✓ Stay neutral - don't help one player over another</li>
            <li>✓ Observe quietly - let players figure it out</li>
            <li>✓ Take notes on interesting moments for debrief</li>
            <li>✓ Be consistent with scoring</li>
            <li>✓ Celebrate good communication when you hear it</li>
            <li>✓ Use the app to track progress in real-time</li>
          </ul>

          <h4>Don'ts:</h4>
          <ul>
            <li>✗ Don't give hints or solutions</li>
            <li>✗ Don't let perfect protocol overshadow learning</li>
            <li>✗ Don't embarrass players for mistakes</li>
            <li>✗ Don't intervene unless safety is a concern</li>
            <li>✗ Don't forget this is a training exercise - learning matters more than winning</li>
          </ul>
        </div>
      </section>

      <footer className="guide-footer">
        <p><strong>Referee/Facilitator Checklist</strong> | Emergency Radio Coordination Game</p>
        <p>Training tool for emergency communication and coordination</p>
      </footer>
    </div>
  );
}

export default RefereeChecklist;

