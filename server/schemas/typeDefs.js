const typeDefs = `

# Type for authentication
type Auth {
  token: ID!
  user: User
}

# Type for user
type User {
  _id: ID
  email: String!
  fantasyLocations: [FantasyLocation]
  weatherCreateInstruction: Boolean
}

# Type for locations used in weather API
type Location {
  _id: ID
  name: String
  lat: Float!
  lon: Float!
  tags: [String!]
}

# Type for tag inputs
type TagInput {
  tags: [String!]
}

# Type for fantasy locations
type FantasyLocation {
  _id: ID
  name: String!
  realLocation: Location!
}

type Table {
  header: String!
  details: [String]
}

# Type for spells
type Spell {
  _id: ID
  name: String!
  level: Int!
  school: String!
  isRitual: Boolean
  description: String!
  effectsArray: [String]
  atHigherLevel: String
  components: String!
  materialComponents: [String]
  isConcentration: Boolean
  classList: [String!]
  sourceBook: String
  castingTime: String
  duration: String
  range: String!
  createdBy: User
  statBlock: [StatBlock]
  table: [Table]
}

type BlogPost {
_id: ID
date: String!
title: String!
body: String!
notes: [String]
}

type Trait {
  title: String!
  description: String!
}

type Action {
  title: String!
  type: String
  hitBonus: String
  range: String
  target: String
  description: String!
}

type Reaction {
  title: String!
  type: String
  hitBonus: String
  range: String
  target: String
  description: String!
}

type BonusAction {
  title: String!
  type: String
  hitBonus: String
  range: String
  target: String
  description: String!
}

type SpellSlot {
  level: String!
  expended: Int!
  available: Int!
}

input SpellSlotInput {
  level: String!
  expended: Int!
  available: Int!
}

# StatBlock for spell or creature
type StatBlock {
  _id: ID
  name: String!
  size: String!
  type: String!
  alignment: String
  armorClass: String!
  hitPoints: String!
  speed: String!
  strength: Int!
  dexterity: Int!
  constitution: Int!
  intelligence: Int!
  wisdom: Int!
  charisma: Int!
  conditionImmunities: [String]
  damageImmunities: [String]
  resistances: [String]
  skills: [String]
  sense: [String!]
  language: [String]
  challenge: String
  proficiency: String
  trait: [Trait]
  action: [Action]
  reaction: [Reaction]
  bonusAction: [BonusAction]
}

type SpellList {
  _id: ID
  name: String
  spell: [Spell]
  user: User
  spellSlots: [SpellSlot]
  preparedSpells: [String]
  class: String
}


  type Query {
    users: [User]
    userById(id: ID!): User
    locations: [Location]
    locationsByTags(tags: [String!]): [Location]
    fantasyLocations: [FantasyLocation]
    fantasyLocationByName(name: String!): FantasyLocation
    spells: [Spell]
    filteredSpells(schools: [String], levels: [Int]): [Spell]
    spellLists(userId: ID!): [SpellList]
    spellListById(id: ID!): SpellList
    blogPosts: [BlogPost]
  }

   input SpellSlotInput {
    level: String!
    expended: Int!
    available: Int!
  }

  type Mutation {
  
    login(email: String!, password: String!): Auth

    addUser(email: String!, password: String!): Auth

    updateUser(id: ID!, email: String, password: String, weatherCreateInstruction: Boolean): User

    createFantasyLocation(name: String!, realLocation: ID!): FantasyLocation

    addFantasyLocation(id: ID!, fantasyLocationId: ID!): User

    removeFantasyLocation(id: ID!, fantasyLocationId: ID!): User

    editFantasyLocation(name: String, locationId: ID): FantasyLocation

    createSpell(
      name: String!,
      level: Int!,
      school: String!,
      isRitual: Boolean,
      description: String!,
      effectsArray: [String],
      atHigherLevel: String,
      components: String!,
      materialComponents: [String],
      isConcentration: Boolean,
      classList: [String!],
      sourceBook: String,
      duration: String,
      range: String!,
      createdBy: ID
    ): Spell

    updateSpell(
      id: ID,
      name: String,
      level: Int,
      school: String,
      isRitual: Boolean,
      description: String,
      effectsArray: [String],
      atHigherLevel: String,
      components: String,
      materialComponents: [String],
      isConcentration: Boolean,
      classList: [String],
      sourceBook: String,
      duration: String,
      range: String
    ): Spell

    deleteSpell(id: ID!): Spell

    createSpellList(
    name: String!,
      spell: [ID],
      user: ID!,
      spellSlots: [SpellSlotInput],
      preparedSpells: [String],
      class: String
    ): SpellList

    updateSpellList(
    name: String,
      listId: ID!,
      spells: [ID],
      preparedSpells: [ID],
      listClass: String,
      spellSlots: [SpellSlotInput] 
  ): SpellList

  deleteSpellList(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
