/**
 * Simulation Engine
 * Orchestrates the game flow, processes AI actions, and manages game state
 */

import PlayerAI from '../ai/PlayerAI.js';

export class SimulationEngine {
  constructor(roles, scenario) {
    this.roles = roles.map((role, idx) => ({
      ...role,
      currentLocation: role.location,
      objectiveComplete: false,
      itemDelivered: false,
      relationshipComplete: false,
      hasBeenNCC: false
    }));
    
    this.scenario = scenario;
    this.currentRound = 1;
    this.roundTimeRemaining = 600; // 10 minutes
    this.totalElapsedTime = 0;
    this.currentNCC = null;
    this.isTransportPhase = false;
    
    this.eventLog = [];
    this.radioLog = [];
    this.transportLog = [];
    
    this.scores = {
      radioDiscipline: 0,
      teamCoordination: 0,
      decisionQuality: 0,
      highPrioritySuccess: 0,
      infractions: 0
    };

    // Create AI for each player - pass function to get fresh game state
    this.aiPlayers = this.roles.map(role => new PlayerAI(role, () => this.getGameState()));
    
    this.turnNumber = 0;
  }

  getGameState() {
    return {
      roles: this.roles,
      currentRound: this.currentRound,
      currentNCC: this.currentNCC,
      timeRemaining: this.roundTimeRemaining,
      isTransportPhase: this.isTransportPhase
    };
  }

  /**
   * Initialize the game - assign first Net Control
   */
  initialize() {
    this.assignNetControl();
    this.logEvent('🎮 Simulation Started', 'system');
    this.logEvent(`📻 ${this.roles.find(r => r.id === this.currentNCC).name} assigned as Net Control for Round 1`, 'ncc');
  }

  /**
   * Process one turn of the simulation
   * Returns true if simulation should continue, false if game is complete
   */
  processTurn() {
    this.turnNumber++;
    
    // Safety check - prevent infinite loops (max ~30 minutes of game time at 10 seconds/turn)
    const MAX_TURNS = 200;
    if (this.turnNumber >= MAX_TURNS) {
      this.logEvent('⏰ Maximum turns reached - ending simulation', 'complete');
      this.currentRound = 4; // Force completion
      return false;
    }
    
    // Handle transport phase - just wait a few turns then exit
    if (this.isTransportPhase) {
      if (!this.transportTurnsRemaining) {
        this.transportTurnsRemaining = 5; // Wait 5 turns in transport
      }
      
      this.transportTurnsRemaining--;
      
      if (this.transportTurnsRemaining <= 0) {
        this.exitTransportPhase();
        this.transportTurnsRemaining = null;
      }
      
      // Check if game is complete after transport
      if (this.isGameComplete()) {
        return false;
      }
      
      return true; // Continue simulation
    }
    
    // Decrement time (each turn = ~10 seconds of game time)
    this.roundTimeRemaining -= 10;
    this.totalElapsedTime += 10;

    if (this.roundTimeRemaining <= 0) {
      this.enterTransportPhase();
      return true;
    }

    // Each AI player gets to act (except Net Control who manages, not acts individually)
    for (const ai of this.aiPlayers) {
      if (ai.role.id === this.currentNCC) continue; // Net Control acts separately
      
      const action = ai.decideNextAction(this.currentRound, this.roundTimeRemaining);
      this.executeAction(ai, action);
    }

    // Net Control manages traffic every few turns
    if (this.turnNumber % 3 === 0 && this.currentNCC !== null) {
      const nccAI = this.aiPlayers.find(ai => ai.role.id === this.currentNCC);
      const nccAction = nccAI.decideNetControlAction();
      this.executeAction(nccAI, nccAction);
    }

    // Check for automatic scoring events
    this.evaluateCoordination();

    // Check if game is complete
    return !this.isGameComplete();
  }

  executeAction(ai, action) {
    if (!action) return;

    switch (action.type) {
      case 'communicate':
        this.handleCommunication(ai, action);
        break;
      
      case 'move':
        this.handleMovement(ai, action);
        break;
      
      case 'deliver':
        this.handleDelivery(ai, action);
        break;
      
      case 'receive_item':
        this.handleReceiveItem(ai, action);
        break;
      
      case 'receive_service':
        this.handleReceiveService(ai, action);
        break;
      
      case 'net_control':
        this.handleNetControl(ai, action);
        break;
    }
  }

  handleCommunication(ai, action) {
    const message = ai.formatRadioMessage(action);
    
    this.radioLog.push({
      timestamp: this.totalElapsedTime,
      round: this.currentRound,
      from: ai.role.name,
      message: message,
      priority: action.priority,
      followsProtocol: this.checkProtocol(message)
    });

    this.logEvent(`📻 ${ai.role.name}: ${message}`, 'radio');

    // Check protocol compliance for scoring
    if (!this.checkProtocol(message)) {
      this.scores.infractions -= 5;
      this.logEvent(`⚠️ Protocol violation by ${ai.role.name}`, 'infraction');
    } else {
      this.scores.radioDiscipline += 2;
    }

    // Share information with other AIs
    this.broadcastInformation(ai, action);
  }

  handleMovement(ai, action) {
    const oldLocation = ai.role.currentLocation;
    ai.role.currentLocation = action.destination;
    
    // Update role in main state
    const roleIdx = this.roles.findIndex(r => r.id === ai.role.id);
    this.roles[roleIdx].currentLocation = action.destination;

    this.logEvent(`🚶 ${ai.role.name} moved from Location ${oldLocation} to Location ${action.destination}`, 'movement');
    this.logEvent(`   Reason: ${action.reason}`, 'detail');

    this.scores.decisionQuality += 3;

    // Check if movement completes any objectives
    this.checkObjectiveCompletion(ai);
  }

  handleDelivery(ai, action) {
    const recipient = this.roles.find(r => r.id === action.recipient);
    
    if (!recipient) return;
    
    // Check if at same location
    if (recipient.currentLocation !== ai.role.currentLocation) {
      this.logEvent(`⚠️ ${ai.role.name} tried to deliver to ${recipient.name} but they're not at the same location!`, 'warning');
      return;
    }

    // Mark delivery complete for provider
    const roleIdx = this.roles.findIndex(r => r.id === ai.role.id);
    this.roles[roleIdx].itemDelivered = true;
    ai.role.itemDelivered = true;

    // Mark recipient objective complete
    const recipientIdx = this.roles.findIndex(r => r.id === recipient.id);
    this.roles[recipientIdx].objectiveComplete = true;
    
    // Update recipient AI's role too
    const recipientAI = this.aiPlayers.find(a => a.role.id === action.recipient);
    if (recipientAI) {
      recipientAI.role.objectiveComplete = true;
    }

    this.logEvent(`✅ ${ai.role.name} delivered ${action.item} to ${recipient.name}`, 'success');
    
    if (recipient.needsCriticalFirstRound) {
      this.scores.highPrioritySuccess += 20;
      this.logEvent(`🎯 CRITICAL DELIVERY COMPLETE!`, 'critical');
    }

    this.scores.teamCoordination += 10;
  }

  handleReceiveItem(ai, action) {
    const provider = this.roles.find(r => r.id === action.provider);
    
    if (!provider || provider.currentLocation !== ai.role.currentLocation) {
      return; // Can't receive if not at same location
    }

    // Mark objective complete for receiver
    const roleIdx = this.roles.findIndex(r => r.id === ai.role.id);
    this.roles[roleIdx].objectiveComplete = true;
    ai.role.objectiveComplete = true;

    // Mark delivery complete for provider
    const providerIdx = this.roles.findIndex(r => r.id === action.provider);
    this.roles[providerIdx].itemDelivered = true;
    
    // Update provider AI's role too
    const providerAI = this.aiPlayers.find(a => a.role.id === action.provider);
    if (providerAI) {
      providerAI.role.itemDelivered = true;
    }

    this.logEvent(`✅ ${ai.role.name} received ${action.item} from ${provider.name}`, 'success');
    
    if (ai.role.needsCriticalFirstRound) {
      this.scores.highPrioritySuccess += 20;
      this.logEvent(`🎯 CRITICAL OBJECTIVE COMPLETE!`, 'critical');
    }
    
    this.scores.teamCoordination += 10;
  }

  handleReceiveService(ai, action) {
    const provider = this.roles.find(r => r.id === action.provider);
    
    if (!provider || provider.currentLocation !== ai.role.currentLocation) {
      return; // Can't receive service if not at same location
    }

    // Mark objective complete for receiver
    const roleIdx = this.roles.findIndex(r => r.id === ai.role.id);
    this.roles[roleIdx].objectiveComplete = true;
    ai.role.objectiveComplete = true;

    // Mark service as "delivered" for provider (even though it's a service, not an item)
    const providerIdx = this.roles.findIndex(r => r.id === action.provider);
    if (provider.has && provider.has.includes('Skills')) {
      this.roles[providerIdx].itemDelivered = true; // Using this field to track service provided
      
      const providerAI = this.aiPlayers.find(a => a.role.id === action.provider);
      if (providerAI) {
        providerAI.role.itemDelivered = true;
      }
    }

    this.logEvent(`✅ ${provider.name} provided ${ai.role.needsService} service to ${ai.role.name}`, 'success');
    
    if (ai.role.needsCriticalFirstRound) {
      this.scores.highPrioritySuccess += 20;
      this.logEvent(`🎯 CRITICAL SERVICE COMPLETE!`, 'critical');
    }

    this.scores.teamCoordination += 10;
  }

  handleNetControl(ai, action) {
    this.radioLog.push({
      timestamp: this.totalElapsedTime,
      round: this.currentRound,
      from: `📻 NET CONTROL (${ai.role.name})`,
      message: action.message,
      priority: 'net_control',
      followsProtocol: true
    });

    this.logEvent(`📻 NET CONTROL: ${action.message}`, 'ncc');
    this.scores.radioDiscipline += 5;
  }

  checkProtocol(message) {
    // Simple protocol check - proper messages include call sign and "over"
    const hasCallSign = message.toLowerCase().includes('this is');
    const hasClosing = message.toLowerCase().includes('over') || 
                      message.toLowerCase().includes('acknowledge');
    
    return hasCallSign && hasClosing;
  }

  broadcastInformation(ai, action) {
    // Share info with other AIs
    for (const otherAI of this.aiPlayers) {
      if (otherAI.role.id === ai.role.id) continue;
      
      otherAI.learnInformation({
        type: 'location',
        subject: ai.role.name,
        location: ai.role.currentLocation
      });
    }
  }

  checkObjectiveCompletion(ai) {
    // Check if arriving at a location completes relationship objective
    if (ai.role.relationship && !ai.role.relationshipComplete) {
      const partner = this.roles.find(r => r.name === ai.role.relationship.partnerName);
      
      if (partner && partner.currentLocation === ai.role.currentLocation) {
        const roleIdx = this.roles.findIndex(r => r.id === ai.role.id);
        this.roles[roleIdx].relationshipComplete = true;
        ai.role.relationshipComplete = true;
        
        this.logEvent(`💚 ${ai.role.name} reunited with ${partner.name}`, 'relationship');
        this.scores.teamCoordination += 5;
      }
    }
  }

  evaluateCoordination() {
    // Award points for good coordination patterns
    // E.g., multiple players at same location working together
    const locationGroups = {};
    
    for (const role of this.roles) {
      if (!locationGroups[role.currentLocation]) {
        locationGroups[role.currentLocation] = [];
      }
      locationGroups[role.currentLocation].push(role);
    }

    // Bonus for efficient co-location (people who need each other at same place)
    for (const loc in locationGroups) {
      const group = locationGroups[loc];
      
      if (group.length >= 2) {
        // Check if any provide services to others in group
        for (const role of group) {
          const needsServiceFromGroup = group.some(other => 
            other.id !== role.id &&
            role.needsType === 'service' &&
            other.profession === role.needsService
          );
          
          if (needsServiceFromGroup) {
            this.scores.decisionQuality += 2;
          }
        }
      }
    }
  }

  enterTransportPhase() {
    this.isTransportPhase = true;
    this.logEvent('🚐 Transport Phase - Vehicle has arrived!', 'transport');
    
    // AI decides what to transport
    for (const ai of this.aiPlayers) {
      const priorities = ai.decideTransportPriority();
      
      if (priorities.length > 0) {
        const topPriority = priorities[0];
        this.transportLog.push({
          round: this.currentRound,
          player: ai.role.name,
          priority: topPriority,
          timestamp: this.totalElapsedTime
        });
        
        this.logEvent(`📦 ${ai.role.name} requests transport: ${topPriority.item || 'Movement'} (${topPriority.urgency})`, 'transport');
      }
    }

    // Score coordination during transport phase
    this.scores.teamCoordination += 5;
  }

  exitTransportPhase() {
    this.isTransportPhase = false;
    
    // Process transports - simulate items/people moving
    for (const transport of this.transportLog.filter(t => t.round === this.currentRound)) {
      // Simplified: just award coordination points
      this.scores.decisionQuality += 3;
    }

    this.logEvent(`✅ Transport complete for Round ${this.currentRound}`, 'transport');

    // Advance to next round
    if (this.currentRound < 3) {
      this.currentRound++;
      this.roundTimeRemaining = 600;
      this.assignNetControl();
      this.logEvent(`⏭️ Starting Round ${this.currentRound}`, 'round');
      this.logEvent(`📻 ${this.roles.find(r => r.id === this.currentNCC).name} assigned as Net Control for Round ${this.currentRound}`, 'ncc');
    } else {
      // Just finished round 3 transport
      this.currentRound = 4; // This will trigger game completion
      this.logEvent(`🏁 All rounds complete!`, 'complete');
    }
  }

  assignNetControl() {
    // Find a player who hasn't been NCC yet
    const available = this.roles.filter(r => !r.hasBeenNCC);
    
    if (available.length === 0) {
      // Everyone has been NCC, start over
      this.roles.forEach(r => r.hasBeenNCC = false);
      available.push(...this.roles);
    }

    // Pick randomly
    const selected = available[Math.floor(Math.random() * available.length)];
    this.currentNCC = selected.id;
    
    const roleIdx = this.roles.findIndex(r => r.id === selected.id);
    this.roles[roleIdx].hasBeenNCC = true;
  }

  isGameComplete() {
    // Game complete when all objectives done
    const allObjectives = this.roles.every(r => r.objectiveComplete);
    const allDeliveries = this.roles.every(r => {
      // If role has no item (is a skill provider), no delivery needed
      if (!r.has || r.has.includes('Skills')) return true;
      // Otherwise check if delivered
      return r.itemDelivered;
    });
    
    if (allObjectives && allDeliveries) {
      this.logEvent('🎉 All objectives complete! Game finished!', 'complete');
      return true;
    }

    // Or when we've finished round 3 transport phase
    if (this.currentRound > 3) {
      this.logEvent('⏰ Round 3 complete - Game finished!', 'complete');
      return true;
    }

    return false;
  }

  logEvent(message, type = 'info') {
    this.eventLog.push({
      timestamp: this.totalElapsedTime,
      round: this.currentRound,
      message,
      type
    });
  }

  getProgress() {
    const objectivesTotal = this.roles.length;
    const deliveriesTotal = this.roles.filter(r => r.has).length;
    const total = objectivesTotal + deliveriesTotal;
    
    const objectivesComplete = this.roles.filter(r => r.objectiveComplete).length;
    const deliveriesComplete = this.roles.filter(r => r.itemDelivered).length;
    const complete = objectivesComplete + deliveriesComplete;
    
    return (complete / total) * 100;
  }

  getTotalScore() {
    return Object.values(this.scores).reduce((a, b) => a + b, 0);
  }

  getStats() {
    return {
      round: this.currentRound,
      timeRemaining: this.roundTimeRemaining,
      totalTime: this.totalElapsedTime,
      progress: this.getProgress(),
      scores: { ...this.scores },
      totalScore: this.getTotalScore(),
      objectivesComplete: this.roles.filter(r => r.objectiveComplete).length,
      objectivesTotal: this.roles.length,
      deliveriesComplete: this.roles.filter(r => r.itemDelivered).length,
      deliveriesTotal: this.roles.filter(r => r.has).length,
      isTransportPhase: this.isTransportPhase,
      turnNumber: this.turnNumber
    };
  }
}

export default SimulationEngine;

