import { gql } from "@apollo/client";

// Execute login mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

// Execute add user mutation
export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $email: String
    $password: String
    $weatherCreateInstruction: Boolean
  ) {
    updateUser(
      id: $id
      email: $email
      password: $password
      weatherCreateInstruction: $weatherCreateInstruction
    ) {
      _id
      email
      weatherCreateInstruction
    }
  }
`;

// Execute create fantasy location mutation
export const CREATE_FANTASY_LOCATION = gql`
  mutation createFantasyLocation($name: String!, $realLocation: ID!) {
    createFantasyLocation(name: $name, realLocation: $realLocation) {
      _id
      name
      realLocation {
        _id
        lat
        lon
        tags
      }
    }
  }
`;

// Execute add fantasy location mutation for linking a new fantasy location to a user
export const ADD_FANTASY_LOCATION = gql`
  mutation addFantasyLocation($id: ID!, $fantasyLocationId: ID!) {
    addFantasyLocation(id: $id, fantasyLocationId: $fantasyLocationId) {
      _id
      email
      fantasyLocations {
        _id
        name
      }
    }
  }
`;

// Execute remove fantasy location mutation for removing a linked fantasy location from a user
export const REMOVE_FANTASY_LOCATION = gql`
  mutation removeFantasyLocation($id: ID!, $fantasyLocationId: ID!) {
    removeFantasyLocation(id: $id, fantasyLocationId: $fantasyLocationId) {
      _id
      email
      fantasyLocations {
        _id
        name
        realLocation {
          _id
          lat
          lon
          tags
        }
      }
    }
  }
`;

// Execute edit fantasy location mutation for editing names of fantasy locations or the link to a real location
export const EDIT_FANTASY_LOCATION = gql`
  mutation editFantasyLocation($name: String, $locationId: ID) {
    editFantasyLocation(name: $name, locationId: $locationId) {
      fantasyLocation {
        _id
        name
        realLocation {
          _id
          lat
          lon
          tags
        }
      }
    }
  }
`;

// Execute create a new spell
export const CREATE_SPELL = gql`
  mutation createSpell(
    $name: String!
    $level: Int!
    $school: String!
    $isRitual: Boolean
    $description: String!
    $effectsArray: [String]
    $atHigherLevel: String
    $components: String!
    $materialComponents: [String]
    $isConcentration: Boolean
    $classList: [String!]
    $sourceBook: String
    $duration: String
    $range: String!
    $createdBy: ID
  ) {
    createSpell(
      name: $name
      level: $level
      school: $school
      isRitual: $isRitual
      description: $description
      effectsArray: $effectsArray
      atHigherLevel: $atHigherLevel
      components: $components
      materialComponents: $materialComponents
      isConcentration: $isConcentration
      classList: $classList
      sourceBook: $sourceBook
      duration: $duration
      range: $range
      createdBy: $createdBy
    ) {
      spell {
        _id
        name
        level
        school
        isRitual
        description
        effectsArray
        atHigherLevel
        components
        materialComponents
        isConcentration
        classList
        sourceBook
        castingTime
        duration
        range
        createdBy {
          id
        }
      }
    }
  }
`;

// Execute updating an existing spell
export const UPDATE_SPELL = gql`
  mutation updateSpell(
    $name: String
    $level: Int
    $school: String
    $isRitual: Boolean
    $description: String
    $effectsArray: [String]
    $atHigherLevel: String
    $components: String
    $materialComponents: [String]
    $isConcentration: Boolean
    $classList: [String]
    $sourceBook: String
    $duration: String
    $range: String
  ) {
    updateSpell(
      name: $name
      level: $level
      school: $school
      isRitual: $isRitual
      description: $description
      effectsArray: $effectsArray
      atHigherLevel: $atHigherLevel
      components: $components
      materialComponents: $materialComponents
      isConcentration: $isConcentration
      classList: $classList
      sourceBook: $sourceBook
      duration: $duration
      range: $range
    ) {
      spell {
        _id
        name
        level
        school
        isRitual
        description
        effectsArray
        atHigherLevel
        components
        materialComponents
        isConcentration
        classList
        sourceBook
        castingTime
        duration
        range
        createdBy {
          _id
        }
      }
    }
  }
`;

export const DELETE_SPELL = gql`
  mutation deleteSpell($id: ID!) {
    deleteSpell(id: $id) {
      _id
      name
      level
      school
      isRitual
      description
      effectsArray
      atHigherLevel
      components
      materialComponents
      isConcentration
      classList
      sourceBook
      castingTime
      duration
      range
      createdBy {
        _id
      }
    }
  }
`;

export const CREATE_SPELL_LIST = gql`
  mutation createSpellList(
    $name: String!
    $spellIds: [ID]
    $userId: ID!
    $spellSlots: [SpellSlotInput]
    $preparedSpells: [String]
    $spellClass: String
  ) {
    createSpellList(
      name: $name
      spell: $spellIds
      user: $userId
      spellSlots: $spellSlots
      preparedSpells: $preparedSpells
      class: $spellClass
    ) {
      _id
      name
      spell {
        _id
        name
        level
        school
        isRitual
        description
        effectsArray
        atHigherLevel
        components
        materialComponents
        isConcentration
        classList
        sourceBook
        castingTime
        duration
        range
        createdBy {
          _id
        }
        statBlock {
          _id
          name
          size
          type
          alignment
          armorClass
          hitPoints
          speed
          strength
          dexterity
          constitution
          intelligence
          wisdom
          charisma
          conditionImmunities
          damageImmunities
          resistances
          skills
          sense
          language
          challenge
          proficiency
          trait {
            title
            description
          }
          action {
            title
            type
            hitBonus
            range
            target
            description
          }
          reaction {
            title
            type
            hitBonus
            range
            target
            description
          }
          bonusAction {
            title
            type
            hitBonus
            range
            target
            description
          }
        }
        table {
          header
          details
        }
      }
      user {
        _id
        email
      }
      spellSlots {
        level
        expended
        available
      }
      preparedSpells
      class
    }
  }
`;

export const UPDATE_SPELL_LIST = gql`
  mutation updateSpellList(
    $name: String
    $listId: ID!
    $spells: [ID]
    $spellSlots: [SpellSlotInput]
    $preparedSpells: [ID]
    $listClass: String
  ) {
    updateSpellList(
      name: $name
      listId: $listId
      spells: $spells
      spellSlots: $spellSlots
      preparedSpells: $preparedSpells
      listClass: $listClass
    ) {
      _id
      name
      spell {
        _id
        name
        level
        school
        isRitual
        description
        effectsArray
        atHigherLevel
        components
        materialComponents
        isConcentration
        classList
        sourceBook
        castingTime
        duration
        range
        createdBy {
          _id
        }
        statBlock {
          _id
          name
          size
          type
          alignment
          armorClass
          hitPoints
          speed
          strength
          dexterity
          constitution
          intelligence
          wisdom
          charisma
          conditionImmunities
          damageImmunities
          resistances
          skills
          sense
          language
          challenge
          proficiency
          trait {
            title
            description
          }
          action {
            title
            type
            hitBonus
            range
            target
            description
          }
          reaction {
            title
            type
            hitBonus
            range
            target
            description
          }
          bonusAction {
            title
            type
            hitBonus
            range
            target
            description
          }
        }
        table {
          header
          details
        }
      }
      user {
        _id
        email
      }
      spellSlots {
        level
        expended
        available
      }
      preparedSpells
      class
    }
  }
`;

export const DELETE_SPELL_LIST = gql`
  mutation deleteSpellList( $id: ID!) {
    deleteSpellList (id: $id) 
  }
`;
