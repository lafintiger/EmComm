import { Radio, AlertCircle } from 'lucide-react';
import './RadioFeed.css';

function RadioFeed({ messages, maxMessages = 20 }) {
  const displayMessages = messages.slice(-maxMessages).reverse();

  const getMessageClass = (msg) => {
    if (msg.priority === 'net_control') return 'msg-net-control';
    if (msg.priority === 'emergency' || msg.priority === 'urgent') return 'msg-urgent';
    if (!msg.followsProtocol) return 'msg-violation';
    return 'msg-routine';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="radio-feed">
      <div className="radio-feed-header">
        <Radio size={20} />
        <h3>Radio Communications</h3>
        <span className="message-count">{messages.length} messages</span>
      </div>
      
      <div className="radio-feed-body">
        {displayMessages.length === 0 ? (
          <div className="no-messages">No radio traffic yet...</div>
        ) : (
          displayMessages.map((msg, idx) => (
            <div key={idx} className={`radio-message ${getMessageClass(msg)}`}>
              <div className="message-header">
                <span className="message-time">{formatTime(msg.timestamp)}</span>
                <span className="message-from">{msg.from}</span>
                {!msg.followsProtocol && (
                  <span className="protocol-warning">
                    <AlertCircle size={14} />
                    Protocol
                  </span>
                )}
              </div>
              <div className="message-content">{msg.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RadioFeed;

