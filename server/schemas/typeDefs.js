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
  }

  # Type for locations used in weather API
  type Location {
    _id: ID
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
    name: String!
    locationId: ID
  }

  type Query {
    locations: [Location]
    locationsByTags(tags: TagInput!): [Location]
    fantasyLocations: [FantasyLocation]
    fantasyLocationByName(name: String!): FantasyLocation
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(email: String!, password: String!): Auth

    addFantasyLocation(name: String!, locationId: ID): FantasyLocation

    editFantasyLocation(name: String, locationId: ID): FantasyLocation
  }
`

module.exports = typeDefs;