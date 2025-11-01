import { CheckCircle, Circle, Package, Heart, AlertTriangle } from 'lucide-react';
import './PlayerCard.css';

function PlayerCard({ player, showDetails = true }) {
  return (
    <div className={`player-card-sim ${player.objectiveComplete ? 'complete' : ''}`}>
      <div className="player-card-header">
        <div className="player-info">
          <strong>{player.name}</strong>
          <span className="profession">{player.profession}</span>
        </div>
        
        {player.isCriticalFirstRound && (
          <div className="critical-badge">
            <AlertTriangle size={14} />
            CRITICAL
          </div>
        )}
      </div>

      {showDetails && (
        <div className="player-card-body">
          <div className="objective-status">
            {player.objectiveComplete ? (
              <CheckCircle size={16} className="status-icon complete" />
            ) : (
              <Circle size={16} className="status-icon pending" />
            )}
            <span className={player.objectiveComplete ? 'complete-text' : ''}>
              {player.needsItem || player.needsService || 'Objective'}
            </span>
          </div>

          {player.has && (
            <div className="has-item">
              <Package size={14} />
              <span>Has: {player.has}</span>
              {player.itemDelivered && <CheckCircle size={14} className="check-small" />}
            </div>
          )}

          {player.relationship && (
            <div className="relationship-status">
              <Heart size={14} className={player.relationshipComplete ? 'heart-complete' : 'heart-pending'} />
              <span className="relationship-text">
                {player.relationship.partnerName}
              </span>
              {player.relationshipComplete && <CheckCircle size={14} className="check-small" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlayerCard;

