/**
 * AI Player Decision Making System
 * Simulates realistic player behavior in the Emergency Radio Coordination Game
 */

import { getNeedsDescription, getServiceProvider } from '../../../src/utils/roleGenerator.js';

export class PlayerAI {
  constructor(role, getGameStateFn) {
    this.role = role;
    this.getGameState = getGameStateFn; // Function to get current game state
    this.memory = {
      knownLocations: {}, // Track where other players/items are
      pendingCommunications: [],
      lastAction: null
    };
    this.personality = this.generatePersonality();
  }
  
  // Get current game state (always fresh)
  get gameState() {
    return this.getGameState();
  }

  generatePersonality() {
    // Add some variation to AI behavior
    return {
      communicationStyle: Math.random() > 0.5 ? 'concise' : 'detailed',
      priorityBias: Math.random() > 0.7 ? 'personal' : 'objective', // Personal relationships vs objectives
      riskTolerance: Math.random(), // 0-1, affects decision making
      protocolCompliance: 0.8 + Math.random() * 0.2, // 80-100% chance to follow protocol
      urgencySensitivity: Math.random() > 0.5 ? 'high' : 'medium'
    };
  }

  /**
   * Main decision loop - returns the next action this AI player should take
   */
  decideNextAction(currentRound, timeRemaining) {
    const actions = [];

    // Check if this player is Net Control - different behavior
    if (this.gameState.currentNCC === this.role.id) {
      return this.decideNetControlAction();
    }

    // Priority 1: Critical first-round needs
    if (currentRound === 1 && this.role.isCriticalFirstRound && !this.role.objectiveComplete) {
      const action = this.handleCriticalNeed();
      if (action) return action;
    }

    // Priority 2: If I have something critical someone needs
    if (this.role.isCriticalFirstRound && !this.role.itemDelivered) {
      const action = this.deliverCriticalItem();
      if (action) return action;
    }

    // Priority 3: Complete my own objective
    if (!this.role.objectiveComplete) {
      const action = this.completeObjective();
      if (action) return action;
    }

    // Priority 4: Handle personal relationship
    if (this.role.relationship && !this.role.relationshipComplete) {
      const action = this.handleRelationship();
      if (action) return action;
    }

    // Priority 5: Deliver my item if I have one
    if (this.role.has && !this.role.itemDelivered) {
      const action = this.deliverItem();
      if (action) return action;
    }

    // Priority 6: Help others
    const helpAction = this.helpOthers();
    if (helpAction) return helpAction;

    // Default: Gather information
    return {
      type: 'communicate',
      subtype: 'query',
      message: 'This is ' + this.role.name + ', checking status, anyone need assistance?',
      priority: 'routine'
    };
  }

  decideNetControlAction() {
    // Net Control manages traffic, doesn't move
    return {
      type: 'net_control',
      subtype: 'manage_traffic',
      message: 'Net Control here, all stations please check in with your location and status',
      priority: 'routine'
    };
  }

  handleCriticalNeed() {
    const need = this.role.needsService || this.role.needsItem;
    
    // Do I know where to get this?
    const location = this.memory.knownLocations[need];
    
    if (location && location !== this.role.currentLocation) {
      // Move to get it
      return {
        type: 'move',
        destination: location,
        reason: 'Critical need: ' + getNeedsDescription(this.role)
      };
    }

    // Don't know where it is - ask
    return {
      type: 'communicate',
      subtype: 'urgent_request',
      message: `URGENT - This is ${this.role.name}, I need ${getNeedsDescription(this.role)} immediately. ${this.role.needsService ? getServiceProvider(this.role) : 'Who has it?'}`,
      priority: 'urgent'
    };
  }

  deliverCriticalItem() {
    // Find who needs what I have (check role.needs)
    const recipient = this.gameState.roles.find(r => 
      r.needs === this.role.has &&
      r.needsCriticalFirstRound &&
      !r.objectiveComplete
    );

    if (!recipient) return null;

    // If I'm at their location, deliver
    if (recipient.currentLocation === this.role.currentLocation) {
      return {
        type: 'deliver',
        recipient: recipient.id,
        item: this.role.has,
        message: `${this.role.name} to ${recipient.name}, delivering ${this.role.has}`
      };
    }

    // Otherwise move to them
    return {
      type: 'move',
      destination: recipient.currentLocation,
      reason: `Delivering critical ${this.role.has} to ${recipient.name}`
    };
  }

  completeObjective() {
    if (this.role.needsType === 'service') {
      // Need a specialist to come to me
      const specialist = this.gameState.roles.find(r => 
        r.profession === getServiceProvider(this.role) ||
        (r.has && r.has.includes(getServiceProvider(this.role)))
      );

      if (!specialist) return null;

      // Are they at my location?
      if (specialist.currentLocation === this.role.currentLocation) {
        return {
          type: 'receive_service',
          provider: specialist.id,
          message: `${specialist.name}, can you provide ${this.role.needsService}?`
        };
      }

      // Ask them to come
      return {
        type: 'communicate',
        subtype: 'request',
        message: `This is ${this.role.name} at Location ${this.role.currentLocation}, requesting ${getServiceProvider(this.role)} for ${this.role.needsService}`,
        priority: this.role.needsCriticalFirstRound ? 'urgent' : 'routine'
      };
    } else {
      // Need an item - find who has it (use role.needs for item name)
      const itemNeeded = this.role.needs;
      const provider = this.gameState.roles.find(r => r.has === itemNeeded);
      
      if (!provider) return null;

      // Do I know where they are?
      const location = this.memory.knownLocations[provider.name] || provider.currentLocation;

      if (location === this.role.currentLocation) {
        return {
          type: 'receive_item',
          provider: provider.id,
          item: itemNeeded,
          message: `${provider.name}, requesting ${itemNeeded}`
        };
      }

      // Ask where they are
      return {
        type: 'communicate',
        subtype: 'query',
        message: `This is ${this.role.name}, looking for ${provider.name} with ${itemNeeded}. What's your location?`,
        priority: 'routine'
      };
    }
  }

  handleRelationship() {
    const partner = this.gameState.roles.find(r => r.name === this.role.relationship.partnerName);
    
    if (!partner) return null;

    // Personality determines if they prioritize this over objective
    const shouldPrioritize = this.personality.priorityBias === 'personal' || 
                             Math.random() < 0.3; // 30% chance even if objective-focused

    if (shouldPrioritize && partner.currentLocation !== this.role.currentLocation) {
      return {
        type: 'move',
        destination: partner.currentLocation,
        reason: `Personal: reuniting with ${partner.name}`,
        message: `${partner.name}, this is ${this.role.name}, I'm coming to you`
      };
    }

    return null;
  }

  deliverItem() {
    // Find who needs what I have (check role.needs for items)
    const recipient = this.gameState.roles.find(r => 
      r.needsType === 'item' && r.needs === this.role.has && !r.objectiveComplete
    );

    if (!recipient) {
      // Announce I have it
      return {
        type: 'communicate',
        subtype: 'announcement',
        message: `This is ${this.role.name} at Location ${this.role.currentLocation}, I have ${this.role.has} available`,
        priority: 'routine'
      };
    }

    // Move to deliver or wait for transport
    if (recipient.currentLocation === this.role.currentLocation) {
      return {
        type: 'deliver',
        recipient: recipient.id,
        item: this.role.has,
        message: `${this.role.name} to ${recipient.name}, here's the ${this.role.has}`
      };
    }

    return {
      type: 'communicate',
      subtype: 'coordination',
      message: `${recipient.name}, this is ${this.role.name}, I have your ${this.role.has}. Should I bring it or send via transport?`,
      priority: 'routine'
    };
  }

  helpOthers() {
    // If I'm a specialist, check if anyone needs my services
    if (this.role.has && this.role.has.includes('Skills')) {
      const needsHelp = this.gameState.roles.find(r => 
        r.needsType === 'service' && 
        getServiceProvider(r) === this.role.profession &&
        !r.objectiveComplete
      );

      if (needsHelp && needsHelp.currentLocation !== this.role.currentLocation) {
        return {
          type: 'move',
          destination: needsHelp.currentLocation,
          reason: `Providing ${this.role.profession} service to ${needsHelp.name}`
        };
      }
    }

    return null;
  }

  /**
   * Update AI memory when receiving information
   */
  learnInformation(info) {
    if (info.type === 'location') {
      this.memory.knownLocations[info.subject] = info.location;
    } else if (info.type === 'status') {
      this.memory.knownLocations[info.player] = info.status;
    }
  }

  /**
   * Generate radio message with proper protocol (most of the time)
   */
  formatRadioMessage(action) {
    const followsProtocol = Math.random() < this.personality.protocolCompliance;
    
    if (!followsProtocol) {
      // Occasional protocol violations for realism
      return action.message; // Just send the raw message
    }

    // Proper format: Call sign, message, confirmation
    let formatted = `This is ${this.role.name}`;
    
    if (action.priority === 'urgent' || action.priority === 'emergency') {
      formatted = `PRIORITY - ${formatted}`;
    }
    
    formatted += `, ${action.message}`;
    
    if (this.personality.communicationStyle === 'concise') {
      formatted += ', over';
    } else {
      formatted += ', please acknowledge, over';
    }

    return formatted;
  }

  /**
   * Decide transport phase priorities
   */
  decideTransportPriority() {
    const priorities = [];

    // Critical needs first
    if (this.role.needsCriticalFirstRound && !this.role.objectiveComplete) {
      priorities.push({
        type: 'incoming',
        item: this.role.needsItem || this.role.needsService,
        urgency: 'critical',
        reason: 'Life-threatening situation'
      });
    }

    // My item deliveries
    if (this.role.has && !this.role.itemDelivered) {
      const recipient = this.gameState.roles.find(r => r.needsItem === this.role.has);
      if (recipient) {
        priorities.push({
          type: 'outgoing',
          item: this.role.has,
          destination: recipient.currentLocation,
          urgency: recipient.needsCriticalFirstRound ? 'critical' : 'normal'
        });
      }
    }

    // Personal movement
    if (this.role.relationship && !this.role.relationshipComplete) {
      const partner = this.gameState.roles.find(r => r.name === this.role.relationship.partnerName);
      if (partner && this.personality.priorityBias === 'personal') {
        priorities.push({
          type: 'movement',
          destination: partner.currentLocation,
          urgency: 'personal',
          reason: this.role.relationship.description
        });
      }
    }

    return priorities.sort((a, b) => {
      const urgencyOrder = { critical: 3, normal: 2, personal: 1 };
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    });
  }
}

export default PlayerAI;

