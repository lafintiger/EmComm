import { MapPin, Users } from 'lucide-react';
import PlayerCard from './PlayerCard';
import './LocationView.css';

function LocationView({ locationNumber, players, isActive }) {
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

  const color = getLocationColor(locationNumber);

  return (
    <div className={`location-view ${isActive ? 'active' : ''}`} style={{ borderColor: color }}>
      <div className="location-header" style={{ backgroundColor: color }}>
        <MapPin size={20} />
        <h3>Location {locationNumber}</h3>
        <div className="player-count">
          <Users size={16} />
          {players.length}
        </div>
      </div>
      
      <div className="location-body">
        {players.length === 0 ? (
          <div className="empty-location">No players at this location</div>
        ) : (
          <div className="players-grid">
            {players.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationView;

