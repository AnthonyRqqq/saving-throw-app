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

  # Type for spells
  type Spell {
    _id: ID,
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
    castingTime: String,
    duration: String,
    range: String!,
    createdBy: User,
    statBlock: [StatBlock]
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
  }
`;

module.exports = typeDefs;
