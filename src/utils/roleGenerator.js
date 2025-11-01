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

// High priority professions that create dilemmas
const CRITICAL_ROLES = ['Doctor', 'Nurse', 'Paramedic', 'Fire Fighter', 'Police Officer', 'Mechanic'];

/**
 * Generate role cards for players
 * @param {number} playerCount - Number of players (6-18 recommended)
 * @param {number} locationCount - Number of locations (default 3)
 * @param {string} difficulty - 'easy', 'medium', 'hard'
 * @returns {Array} Array of role objects
 */
export function generateRoles(playerCount, locationCount = 3, difficulty = 'medium') {
  if (playerCount < 6) {
    throw new Error('Minimum 6 players required');
  }

  const roles = [];
  const usedProfessions = [];
  const usedItems = [];
  
  // Step 1: Assign names, professions, and starting locations
  for (let i = 0; i < playerCount; i++) {
    const profession = selectUnique(PROFESSIONS, usedProfessions);
    usedProfessions.push(profession);
    
    roles.push({
      id: i,
      name: generateName(profession),
      profession: profession,
      location: (i % locationCount) + 1,
      has: null,         // Can be an item
      needs: null,       // Can be an item OR a service from a role
      needsType: null,   // 'item' or 'service'
      priority: CRITICAL_ROLES.includes(profession) ? 'high' : 'normal'
    });
  }

  // Step 2: Assign what people HAVE (items)
  // Not everyone has items - some people's value is their skill/profession
  const itemHolderCount = Math.floor(playerCount * 0.7); // 70% have items
  for (let i = 0; i < itemHolderCount; i++) {
    const item = selectUnique(ITEMS, usedItems);
    usedItems.push(item);
    roles[i].has = item;
  }

  // Step 3: Assign what people NEED (mix of items and realistic service needs)
  for (let i = 0; i < playerCount; i++) {
    // Decide if they need an item or a service (60% item, 40% service for realism)
    const needsService = Math.random() > 0.6;
    
    if (needsService) {
      // Need a service from someone with a useful profession
      const availableServiceProviders = roles.filter(r => 
        SERVICE_NEEDS[r.profession] !== undefined && 
        r.location !== roles[i].location &&
        r.id !== i
      );
      
      if (availableServiceProviders.length > 0) {
        const provider = availableServiceProviders[Math.floor(Math.random() * availableServiceProviders.length)];
        const possibleNeeds = SERVICE_NEEDS[provider.profession];
        const specificNeed = possibleNeeds[Math.floor(Math.random() * possibleNeeds.length)];
        
        roles[i].needs = provider.profession; // The profession that can help
        roles[i].needsType = 'service';
        roles[i].needsService = specificNeed; // The specific problem/situation
      } else {
        // Fallback to item if no service providers available at different locations
        roles[i].needs = assignItemNeed(roles[i], roles, usedItems);
        roles[i].needsType = 'item';
      }
    } else {
      // Need an item
      roles[i].needs = assignItemNeed(roles[i], roles, usedItems);
      roles[i].needsType = 'item';
    }
  }

  // Step 4: Add strategic dilemmas - make critical roles needed by multiple people
  addStrategicDilemmas(roles);

  return roles;
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
 * Add strategic dilemmas - make critical roles needed by multiple people
 */
function addStrategicDilemmas(roles) {
  const criticalRoles = roles.filter(r => r.priority === 'high' && SERVICE_NEEDS[r.profession]);
  
  criticalRoles.forEach(critical => {
    // Find players who might need this critical role's service
    const potentialNeeders = roles.filter(r => 
      r.id !== critical.id && 
      r.location !== critical.location &&
      r.needs !== critical.profession // Don't duplicate if already needs this service
    );
    
    if (potentialNeeders.length > 0 && Math.random() > 0.6) {
      // Make 1 additional person need this critical role (creating competition)
      const needer = potentialNeeders[Math.floor(Math.random() * potentialNeeders.length)];
      const possibleNeeds = SERVICE_NEEDS[critical.profession];
      const specificNeed = possibleNeeds[Math.floor(Math.random() * possibleNeeds.length)];
      
      // Add an "also needs" field to create dilemma
      if (!needer.alsoNeeds) {
        needer.alsoNeeds = [];
      }
      needer.alsoNeeds.push({
        profession: critical.profession,
        service: specificNeed,
        priority: 'urgent'
      });
    }
  });
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
      title: 'Storm Aftermath',
      description: 'A severe thunderstorm has knocked out power and cell networks. Communities are isolated and need coordination.',
      timeframe: '48 hours after impact',
      specialRules: [
        'Limited radio battery power',
        'Some roads are blocked by fallen trees',
        'Medical needs are increasing'
      ],
      urgentConditions: ['Medical emergencies', 'Running out of water']
    },
    earthquake: {
      title: 'Earthquake Response',
      description: 'A 6.5 magnitude earthquake has damaged infrastructure. Roads are cracked and buildings are unstable.',
      timeframe: '24 hours after initial quake',
      specialRules: [
        'Aftershocks may occur (random events)',
        'Some routes are impassable',
        'Structural safety concerns'
      ],
      urgentConditions: ['Trapped individuals', 'Gas leaks', 'Structural collapse risk']
    },
    flood: {
      title: 'Flash Flood Emergency',
      description: 'Heavy rainfall has caused flash flooding. Water levels are rising and evacuation is necessary.',
      timeframe: '12 hours into flood event',
      specialRules: [
        'Water levels affect movement times',
        'Evacuation priorities',
        'Limited dry supplies'
      ],
      urgentConditions: ['Rising water', 'Medical evacuations', 'Contaminated water supply']
    },
    wildfire: {
      title: 'Wildfire Evacuation',
      description: 'A fast-moving wildfire is approaching. Evacuation and coordination are critical.',
      timeframe: '6 hours before predicted arrival',
      specialRules: [
        'Wind direction affects safe zones',
        'Smoke limiting visibility',
        'Urgent evacuation timing'
      ],
      urgentConditions: ['Evacuation orders', 'Smoke inhalation', 'Cut-off escape routes']
    }
  };
  
  return scenarios[type] || scenarios.storm;
}

