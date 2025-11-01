/**
 * Emergency Radio Coordination Game - Role Generation Algorithm
 * 
 * Constraints:
 * 1. People can HAVE items or skills (their profession)
 * 2. People can NEED items or services (from specific roles)
 * 3. No player starts at same location as what they need
 * 4. All puzzles must be solvable
 * 5. Create strategic dilemmas (e.g., doctor needed by multiple people)
 * 6. Balanced dependencies
 */

const PROFESSIONS = [
  'Doctor', 'Nurse', 'Electrician', 'Mechanic', 'Police Officer',
  'Fire Fighter', 'Radio Technician', 'Teacher', 'Community Volunteer',
  'Mayor', 'Paramedic', 'Construction Worker', 'Pharmacist', 'Veterinarian',
  'Engineer', 'Social Worker', 'Emergency Manager', 'Logistics Officer',
  'EMT', 'Carpenter', 'Plumber', 'IT Specialist'
];

const ITEMS = [
  'Water', 'Insulin', 'Batteries', 'First Aid Kit', 'Food', 'Fuel',
  'Blankets', 'Medical Supplies', 'Tools', 'Portable Radio', 'Flashlight',
  'Generator', 'Medicine', 'Fire Extinguisher', 'Rope', 'Tarp',
  'Emergency Kit', 'Blood Pressure Monitor', 'Defibrillator', 'Bandages',
  'Oxygen Tank', 'Pain Medication', 'Power Tools', 'Ladder', 'Solar Charger'
];

// Emergency situations that require specific professional services
// Each role can address specific realistic problems
const SERVICE_NEEDS = {
  'Doctor': [
    'broken leg (needs medical care)',
    'severe infection (needs antibiotics & treatment)',
    'chest pain (needs medical evaluation)',
    'deep wound (needs stitches)'
  ],
  'Nurse': [
    'diabetes management (needs insulin administration)',
    'wound dressing needed',
    'blood pressure crisis',
    'dehydration (needs IV fluids)'
  ],
  'Paramedic': [
    'unconscious person (needs emergency care)',
    'possible concussion',
    'severe bleeding',
    'difficulty breathing'
  ],
  'Mechanic': [
    'vehicle won\'t start (needs repair)',
    'flat tire on truck with supplies',
    'generator not working',
    'stuck vehicle needs rescue'
  ],
  'Electrician': [
    'power lines down',
    'generator wiring issue',
    'electrical fire hazard',
    'no electricity in shelter'
  ],
  'Radio Technician': [
    'radio not transmitting',
    'repeater down (needs repair)',
    'antenna damaged',
    'communication equipment broken'
  ],
  'Fire Fighter': [
    'person trapped in collapsed building',
    'gas leak detected',
    'small fire spreading',
    'need evacuation assistance'
  ],
  'Police Officer': [
    'need security for supply distribution',
    'missing person search',
    'traffic control needed',
    'crowd management for evacuation'
  ],
  'Construction Worker': [
    'unsafe building (needs assessment)',
    'roof collapsed (needs temporary repair)',
    'need debris cleared',
    'structural damage evaluation'
  ],
  'Plumber': [
    'water main broken',
    'no running water',
    'sewage backup',
    'water contamination risk'
  ],
  'Carpenter': [
    'door jammed shut',
    'need temporary shelter built',
    'window boarded up',
    'structural bracing needed'
  ],
  'Engineer': [
    'bridge safety assessment needed',
    'infrastructure damage evaluation',
    'water system analysis',
    'road collapse evaluation'
  ]
};

// CRITICAL FIRST-ROUND SKILLS - Must be completed in Round 1 to enable other actions
// These represent life-saving or infrastructure-enabling services
const CRITICAL_FIRST_ROUND_SKILLS = {
  'Doctor': 'life-threatening medical emergency (URGENT - Round 1)',
  'Paramedic': 'severe trauma patient (URGENT - Round 1)',
  'Fire Fighter': 'person trapped in building (URGENT - Round 1)',
  'Mechanic': 'generator repair needed for power (URGENT - Round 1)',
  'Electrician': 'restore power to shelter (URGENT - Round 1)',
  'Radio Technician': 'fix repeater for communications (URGENT - Round 1)',
  'Engineer': 'structural assessment for safety (URGENT - Round 1)',
  'Plumber': 'restore water supply (URGENT - Round 1)'
};

// High priority professions that create dilemmas
const CRITICAL_ROLES = Object.keys(CRITICAL_FIRST_ROUND_SKILLS);

// Relationship types for personal dilemmas - EVERYONE gets one
const RELATIONSHIP_TYPES = [
  { type: 'Spouse', description: 'Reunite with spouse' },
  { type: 'Child', description: 'Check on child' },
  { type: 'Parent', description: 'Find parent' },
  { type: 'Sibling', description: 'Find sibling' },
  { type: 'Partner', description: 'Find partner' }
];

/**
 * Generate role cards for players
 * NEW REQUIREMENTS:
 * 1. EVERYONE has a separated relationship (100% coverage)
 * 2. EVERYONE has something someone else needs (item or skill)
 * 3. At least 1/3 have CRITICAL FIRST-ROUND SKILLS
 * 4. Net Control Operator rotates each round
 * 
 * @param {number} playerCount - Number of players (6-18 recommended, must be even)
 * @param {number} locationCount - Number of locations (default 3)
 * @param {string} difficulty - 'easy', 'medium', 'hard'
 * @returns {Array} Array of role objects
 */
export function generateRoles(playerCount, locationCount = 3, difficulty = 'medium') {
  if (playerCount < 6) {
    throw new Error('Minimum 6 players required');
  }
  
  // Ensure even number for pairing
  if (playerCount % 2 !== 0) {
    playerCount = playerCount + 1; // Add one player to make it even
  }

  const roles = [];
  const usedProfessions = [];
  const usedItems = [];
  
  // Calculate how many need critical first-round skills (at least 1/3)
  const criticalSkillCount = Math.ceil(playerCount / 3);
  const criticalSkillProfessions = [];
  
  // Step 1: Assign professions with required critical skills
  for (let i = 0; i < playerCount; i++) {
    let profession;
    
    // First 1/3 get critical first-round professions
    if (i < criticalSkillCount) {
      const availableCritical = CRITICAL_ROLES.filter(p => !usedProfessions.includes(p));
      profession = availableCritical.length > 0 
        ? availableCritical[Math.floor(Math.random() * availableCritical.length)]
        : selectUnique(PROFESSIONS, usedProfessions);
      criticalSkillProfessions.push(profession);
    } else {
      profession = selectUnique(PROFESSIONS, usedProfessions);
    }
    
    usedProfessions.push(profession);
    
    roles.push({
      id: i,
      name: generateName(profession),
      profession: profession,
      location: (i % locationCount) + 1,
      has: null,         // Either item OR critical skill
      needs: null,       // Either item OR service
      needsType: null,   // 'item' or 'service'
      priority: CRITICAL_ROLES.includes(profession) ? 'high' : 'normal',
      isCriticalFirstRound: i < criticalSkillCount,
      relationship: null, // Will be filled in step 4
      nccRound: null     // Net Control Operator for which round (1, 2, or 3)
    });
  }

  // Step 2: Ensure EVERYONE has something someone else needs
  // Note: Net Control Operators will be manually assigned by organizers
  assignWhatPeopleHave(roles, usedItems, criticalSkillProfessions);

  // Step 3: Create 100% relationship coverage - EVERYONE paired with someone at different location
  addUniversalRelationships(roles, locationCount);

  // Step 4: Assign what everyone NEEDS (ensuring triangle complexity)
  assignWhatPeopleNeed(roles, usedItems);

  return roles;
}

/**
 * Assign what everyone HAS
 * - Critical first-round players have their critical skill
 * - Everyone else gets an item that someone will need
 */
function assignWhatPeopleHave(roles, usedItems, criticalSkillProfessions) {
  roles.forEach(role => {
    if (role.isCriticalFirstRound && CRITICAL_FIRST_ROUND_SKILLS[role.profession]) {
      // They HAVE a critical skill (their profession)
      role.has = `${role.profession} Skills (CRITICAL)`;
      role.hasCriticalSkill = true;
    } else {
      // They HAVE an item
      const item = selectUnique(ITEMS, usedItems);
      usedItems.push(item);
      role.has = item;
      role.hasCriticalSkill = false;
    }
  });
}

/**
 * Create 100% relationship coverage - EVERYONE gets paired
 * Each pair is at different locations for maximum complexity
 */
function addUniversalRelationships(roles, locationCount) {
  const unpaired = [...roles];
  const paired = new Set();
  
  // Shuffle to randomize pairing
  for (let i = unpaired.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unpaired[i], unpaired[j]] = [unpaired[j], unpaired[i]];
  }
  
  // Pair everyone
  for (let i = 0; i < unpaired.length; i += 2) {
    if (i + 1 >= unpaired.length) break;
    
    const person1 = unpaired[i];
    const person2 = unpaired[i + 1];
    
    // If they're at the same location, try to swap person2 with someone at a different location
    if (person1.location === person2.location && i + 2 < unpaired.length) {
      // Try to find someone at a different location to swap with
      for (let j = i + 2; j < unpaired.length; j++) {
        if (unpaired[j].location !== person1.location && !paired.has(unpaired[j].id)) {
          [unpaired[i + 1], unpaired[j]] = [unpaired[j], unpaired[i + 1]];
          break;
        }
      }
    }
    
    // Re-assign person2 after potential swap
    const finalPerson2 = unpaired[i + 1];
    
    // Select relationship type
    const relationship = RELATIONSHIP_TYPES[Math.floor(Math.random() * RELATIONSHIP_TYPES.length)];
    
    // Update names to show relationship (matching last names)
    const sharedLastName = person1.name.split(' ').pop();
    
    if (relationship.type === 'Spouse' || relationship.type === 'Sibling' || relationship.type === 'Partner') {
      const firstName2 = finalPerson2.name.split(' ')[0];
      finalPerson2.name = firstName2.includes('Dr.') || firstName2.includes('Officer') || firstName2.includes('Mayor')
        ? finalPerson2.name.split(' ').slice(0, -1).join(' ') + ' ' + sharedLastName
        : `${firstName2} ${sharedLastName}`;
    }
    
    if (relationship.type === 'Child' || relationship.type === 'Parent') {
      const firstName2 = finalPerson2.name.split(' ')[0];
      finalPerson2.name = `${firstName2} ${sharedLastName}`;
    }
    
    // Store relationship data
    person1.relationship = {
      type: relationship.type,
      description: relationship.description,
      partnerId: finalPerson2.id,
      partnerName: finalPerson2.name,
      partnerLocation: finalPerson2.location
    };
    
    const reciprocalDesc = relationship.type === 'Child' ? 'Find parent' :
                          relationship.type === 'Parent' ? 'Check on child' :
                          relationship.type === 'Spouse' ? 'Reunite with spouse' :
                          relationship.type === 'Sibling' ? 'Find sibling' :
                          'Find partner';
    
    finalPerson2.relationship = {
      type: relationship.type,
      description: reciprocalDesc,
      partnerId: person1.id,
      partnerName: person1.name,
      partnerLocation: person1.location
    };
    
    paired.add(person1.id);
    paired.add(finalPerson2.id);
  }
}

/**
 * Assign what everyone NEEDS
 * Mix of items and services, ensuring triangle complexity:
 * - Person at Location A
 * - Need at Location B
 * - Relationship at Location C
 */
function assignWhatPeopleNeed(roles, usedItems) {
  roles.forEach(role => {
    // Decide if they need an item or a service
    const needsService = Math.random() > 0.5;
    
    if (needsService) {
      // Need a service from someone at a DIFFERENT location
      // And NOT at the same location as their relationship
      const availableServiceProviders = roles.filter(r => 
        SERVICE_NEEDS[r.profession] !== undefined && 
        r.location !== role.location &&
        (!role.relationship || r.location !== role.relationship.partnerLocation) &&
        r.id !== role.id
      );
      
      if (availableServiceProviders.length > 0) {
        const provider = availableServiceProviders[Math.floor(Math.random() * availableServiceProviders.length)];
        const possibleNeeds = SERVICE_NEEDS[provider.profession];
        const specificNeed = possibleNeeds[Math.floor(Math.random() * possibleNeeds.length)];
        
        role.needs = provider.profession;
        role.needsType = 'service';
        role.needsService = specificNeed;
        role.needsItem = null; // Not needing an item
      } else {
        // Fallback to item
        const item = assignItemNeedWithTriangleComplexity(role, roles, usedItems);
        role.needs = item;
        role.needsType = 'item';
        role.needsItem = item;
        role.needsService = null;
      }
    } else {
      // Need an item at a DIFFERENT location from both role and relationship
      const item = assignItemNeedWithTriangleComplexity(role, roles, usedItems);
      role.needs = item;
      role.needsType = 'item';
      role.needsItem = item;
      role.needsService = null;
    }
  });
  
  // Assign critical first-round needs
  assignCriticalFirstRoundNeeds(roles);
}

/**
 * Assign item needs ensuring triangle complexity
 */
function assignItemNeedWithTriangleComplexity(person, roles, usedItems) {
  let needsItem;
  let attempts = 0;
  const relationshipLocation = person.relationship ? person.relationship.partnerLocation : null;
  
  do {
    needsItem = usedItems[Math.floor(Math.random() * usedItems.length)];
    attempts++;
    
    const itemLocation = roles.find(r => r.has === needsItem)?.location;
    
    // Item must be at different location from person AND their relationship
    const atPersonLocation = itemLocation === person.location;
    const atRelationshipLocation = relationshipLocation && itemLocation === relationshipLocation;
    
    if (!atPersonLocation && !atRelationshipLocation) {
      break;
    }
  } while (attempts < 50);
  
  return needsItem || usedItems[0];
}

/**
 * Assign critical first-round needs to non-critical players
 * These MUST be completed in Round 1
 */
function assignCriticalFirstRoundNeeds(roles) {
  const criticalSkillProviders = roles.filter(r => r.isCriticalFirstRound);
  const nonCriticalPlayers = roles.filter(r => !r.isCriticalFirstRound);
  
  // Give at least half of non-critical players a critical first-round need
  const needCriticalCount = Math.floor(nonCriticalPlayers.length / 2);
  
  for (let i = 0; i < needCriticalCount && i < nonCriticalPlayers.length; i++) {
    const player = nonCriticalPlayers[i];
    
    // Find a critical skill provider at a different location
    const availableProviders = criticalSkillProviders.filter(p => 
      p.location !== player.location &&
      (!player.relationship || p.location !== player.relationship.partnerLocation)
    );
    
    if (availableProviders.length > 0) {
      const provider = availableProviders[Math.floor(Math.random() * availableProviders.length)];
      player.needs = provider.profession;
      player.needsType = 'service';
      player.needsService = CRITICAL_FIRST_ROUND_SKILLS[provider.profession];
      player.needsItem = null;
      player.needsCriticalFirstRound = true;
    }
  }
}

/**
 * Assign an item that the person needs
 */
function assignItemNeed(person, roles, usedItems) {
  let needsItem;
  let attempts = 0;
  
  do {
    needsItem = usedItems[Math.floor(Math.random() * usedItems.length)];
    attempts++;
  } while (
    (needsItem === person.has || isItemAtSameLocation(needsItem, person.location, roles)) &&
    attempts < 50
  );
  
  // If we couldn't find an item not at same location, just pick one
  if (attempts >= 50) {
    needsItem = usedItems[Math.floor(Math.random() * usedItems.length)];
  }
  
  return needsItem;
}

/**
 * Check if an item is at the same location as the player
 */
function isItemAtSameLocation(item, location, roles) {
  return roles.some(r => r.has === item && r.location === location);
}

/**
 * Select unique item from array
 */
function selectUnique(array, used) {
  const available = array.filter(item => !used.includes(item));
  if (available.length === 0) {
    // If we run out, reuse but try to minimize repeats
    return array[Math.floor(Math.random() * array.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

/**
 * Get description of what someone needs
 */
export function getNeedsDescription(role) {
  if (role.needsType === 'service') {
    // Return the specific problem/situation
    return role.needsService;
  }
  return role.needs;
}

/**
 * Get who can provide the needed service
 */
export function getServiceProvider(role) {
  if (role.needsType === 'service') {
    return role.needs; // The profession
  }
  return null;
}

/**
 * Generate appropriate name for profession
 */
function generateName(profession) {
  const firstNames = [
    'Lena', 'Marcus', 'Sarah', 'David', 'Maria', 'James', 'Ava', 'Miguel',
    'Emma', 'Ravi', 'Isabella', 'Chen', 'Olivia', 'Hassan', 'Sophia', 'Ahmed',
    'Emily', 'Jamal', 'Madison', 'Kwame', 'Grace', 'Yuki', 'Zara', 'Diego'
  ];
  
  const lastNames = [
    'Morales', 'Johnson', 'Patel', 'Lee', 'Garcia', 'Brown', 'Chen', 'Rodriguez',
    'Martinez', 'Davis', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson',
    'White', 'Harris', 'Martin', 'Thompson', 'Robinson', 'Clark', 'Lewis', 'Walker'
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  // Add title for certain professions
  if (profession === 'Doctor') return `Dr. ${firstName} ${lastName}`;
  if (profession === 'Mayor') return `Mayor ${lastName}`;
  if (profession === 'Officer' || profession === 'Police Officer') return `Officer ${firstName} ${lastName}`;
  
  return `${firstName} ${lastName}`;
}

/**
 * Validate that the generated roles are solvable
 */
export function validateRoles(roles) {
  const issues = [];
  
  // Check 1: Items - No one needs item at same location
  roles.forEach(role => {
    if (role.needsType === 'item') {
      const itemHolder = roles.find(r => r.has === role.needs && r.location === role.location);
      if (itemHolder) {
        issues.push(`${role.name} needs ${role.needs} which is at same location`);
      }
    }
  });
  
  // Check 2: Services - No one needs service from someone at same location
  roles.forEach(role => {
    if (role.needsType === 'service') {
      const serviceProvider = roles.find(r => r.profession === role.needs && r.location === role.location);
      if (serviceProvider) {
        issues.push(`${role.name} needs ${role.needs} service which is at same location`);
      }
    }
  });
  
  // Check 3: All item needs are available
  roles.forEach(role => {
    if (role.needsType === 'item') {
      const hasItem = roles.some(r => r.has === role.needs);
      if (!hasItem) {
        issues.push(`${role.name} needs ${role.needs} which doesn't exist in game`);
      }
    }
  });
  
  // Check 4: All service needs are available
  roles.forEach(role => {
    if (role.needsType === 'service') {
      const hasProvider = roles.some(r => r.profession === role.needs);
      if (!hasProvider) {
        issues.push(`${role.name} needs ${role.needs} service which doesn't exist in game`);
      }
    }
  });
  
  // Check 5: Triangle complexity - relationships should not be at same location as needs
  roles.forEach(role => {
    if (role.relationship) {
      // Find role's need location
      let needLocation = null;
      if (role.needsType === 'item') {
        const itemHolder = roles.find(r => r.has === role.needs);
        if (itemHolder) needLocation = itemHolder.location;
      } else if (role.needsType === 'service') {
        const serviceProvider = roles.find(r => r.profession === role.needs);
        if (serviceProvider) needLocation = serviceProvider.location;
      }
      
      // Relationship should not be at same location as need (triangle constraint)
      if (needLocation !== null && role.relationship.partnerLocation === needLocation) {
        issues.push(`${role.name} has relationship and need at same location ${needLocation} - breaks triangle complexity`);
      }
    }
  });
  
  // Check 6: Everyone should have a relationship
  const unrelatedPeople = roles.filter(r => !r.relationship);
  if (unrelatedPeople.length > 0) {
    issues.push(`${unrelatedPeople.length} people have no relationships - everyone should be paired`);
  }
  
  // Note: Net Control Operators will be manually assigned by organizers during setup
  
  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * Generate scenario context
 */
export function generateScenario(type = 'storm') {
  const scenarios = {
    storm: {
      title: 'Severe Storm Aftermath - Operation Blackout',
      description: 'A devastating line of severe thunderstorms tore through the region 48 hours ago, leaving a trail of destruction in its wake. Widespread power outages have plunged entire neighborhoods into darkness. Cell towers are down, and traditional phone lines are severed. Trees and power lines litter the streets, blocking critical routes to hospitals and emergency services. The community is fractured into isolated pockets, each facing mounting challenges: dwindling medical supplies, spoiling food, and rising anxiety. Summer heat is making conditions worse as air conditioning fails and water pumps stop working. You are part of the emergency communication network—the only lifeline connecting these separated communities. Lives depend on your ability to coordinate resources, reunite families, and get critical help where it\'s needed most. Every minute counts as medical conditions worsen and supplies run dangerously low.',
      timeframe: '48 hours post-impact | Day 3 of emergency operations',
      specialRules: [
        'Limited radio battery power - conserve transmissions',
        'Roads blocked by fallen trees and downed power lines',
        'Medical conditions deteriorating without power for medical equipment',
        'Heat stress increasing due to lack of air conditioning'
      ],
      urgentConditions: ['Medical emergencies without power', 'Insulin requiring refrigeration', 'Running out of clean water', 'Heat-related illnesses']
    },
    earthquake: {
      title: 'Major Earthquake Response - The Big One',
      description: 'At 3:47 AM this morning, a magnitude 6.5 earthquake violently shook the region for what felt like an eternity. Buildings swayed, windows shattered, and the ground cracked open in multiple locations. Twenty-four hours later, the true scope of devastation is becoming clear. Gas lines have ruptured, filling neighborhoods with dangerous fumes. Water mains burst, flooding streets and leaving thousands without drinking water. Several structures have suffered critical damage and could collapse at any moment. Aftershocks continue to rattle nerves and further weaken damaged buildings. Roads are impassable—buckled by the quake\'s force, blocked by rubble, or simply too dangerous to traverse near unstable structures. Families are separated, with loved ones trapped or unreachable. The normal communication infrastructure has failed completely. As part of the emergency radio network, you must navigate this chaos to coordinate search and rescue, get medical help to the injured, reunite desperate families, and prevent further casualties. The next aftershock could come at any moment, and time is running out for those trapped in the debris.',
      timeframe: '24 hours post-quake | Aftershock period active',
      specialRules: [
        'Aftershocks may occur without warning—be prepared to take cover',
        'Multiple routes impassable due to structural damage',
        'Structural safety assessments required before entering buildings',
        'Gas leak zones must be avoided—no spark-producing equipment'
      ],
      urgentConditions: ['People trapped in collapsed structures', 'Active gas leaks creating explosion risk', 'Buildings at imminent collapse risk', 'Crush injuries requiring immediate surgery']
    },
    flood: {
      title: 'Flash Flood Emergency - Rising Waters',
      description: 'Twelve hours of relentless rainfall has transformed peaceful creeks into raging torrents and turned streets into rivers. What started as a severe weather warning has escalated into a life-threatening flash flood emergency. Water levels are rising by the hour, already reaching waist-deep in low-lying areas and threatening to climb higher. Evacuation routes are rapidly disappearing as bridges become submerged and roads turn into impassable channels of debris-filled water. Entire families are trapped on upper floors and rooftops, watching helplessly as the water creeps higher. The elderly and those with mobility issues cannot evacuate on their own. Contaminated floodwater has compromised the drinking water supply, and medical facilities are at risk of flooding. Vehicles are submerged and useless. With conventional communication systems flooded out, your emergency radio network is the only way to coordinate rescues, direct people to higher ground, and prevent drownings. The forecast shows no sign of the rain stopping, and weather services warn the worst may be yet to come. Every decision about who to evacuate first could mean the difference between life and death.',
      timeframe: '12 hours into flood event | Waters still rising',
      specialRules: [
        'Water depth affects travel time and safety—wading takes longer',
        'Evacuation priorities: elderly, disabled, families with young children',
        'Limited dry supplies and medical equipment',
        'Do not attempt to drive through floodwater—turn around, don\'t drown'
      ],
      urgentConditions: ['Waters rising 2 inches per hour', 'Medical evacuations from flooded facilities', 'Contaminated water supply—no safe drinking water', 'People stranded on rooftops']
    },
    wildfire: {
      title: 'Wildfire Evacuation - Red Flag Warning',
      description: 'A wind-driven wildfire that started in the hills 18 hours ago has exploded in size, consuming everything in its path and bearing down on populated areas with terrifying speed. Fueled by drought-dried vegetation and pushed by 40 mph winds, the fire has already burned through thousands of acres and shows no signs of slowing. The sky is choked with thick, acrid smoke that burns lungs and reduces visibility to near-zero. Ash is falling like snow, and embers are landing miles ahead of the fire line, starting new spot fires without warning. Evacuation orders have been issued, but time is running out—fire officials estimate you have perhaps six hours before the main fire front arrives, maybe less if winds shift. Roads are clogged with evacuees, and some escape routes may already be cut off. The elderly, those without vehicles, and pet owners need assistance. People with respiratory issues are already suffering from smoke inhalation. Some residents are refusing to leave, not understanding the deadly danger they face. Your emergency radio network must coordinate a massive evacuation, ensure no one is left behind, and keep everyone informed about which routes are still safe as the situation changes minute by minute. When wildfire moves this fast, there are no second chances. The decisions you make in the next few hours will determine who makes it out alive.',
      timeframe: '6 hours before predicted fire arrival | Conditions deteriorating rapidly',
      specialRules: [
        'Wind direction changes affect safe zones—monitor updates constantly',
        'Smoke severely limiting visibility—navigation difficult',
        'Urgent evacuation timing—DO NOT delay',
        'Some escape routes may close with little warning'
      ],
      urgentConditions: ['Mandatory evacuation orders in effect', 'Severe smoke inhalation cases', 'Escape routes being cut off by fire', 'Spot fires appearing miles from main fire line']
    }
  };
  
  return scenarios[type] || scenarios.storm;
}

