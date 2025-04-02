import { gql } from "@apollo/client";

// Executing getting all locations
export const GET_LOCATIONS = gql`
  query locations {
    locations {
      _id
      name
      lat
      lon
      tags
    }
  }
`;

// Executing getting locations based on provided tags
export const GET_LOCATIONS_BY_TAGS = gql`
  query locationsByTags($tags: [String!]) {
    location(tags: $tags) {
      _id
      name
      lat
      lon
      tags
    }
  }
`;

// Executing getting all fantasy locations
export const GET_FANTASY_LOCATIONS = gql`
  query fantasyLocations {
    fantasyLocations {
      _id
      name
      realLocation {
        _id
        name
        lat
        lon
        tags
      }
    }
  }
`;

// Executing getting fantasy location by name
export const GET_FANTASY_LOCATION_BY_NAME = gql`
  query fantasyLocationByName($name: String!) {
    fantasyLocationByName(name: $name) {
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

// Executing getting user by id
export const GET_USER_BY_ID = gql`
  query userById($id: ID!) {
    userById(id: $id) {
      _id
      email
      weatherCreateInstruction
      fantasyLocations {
        _id
        name
        realLocation {
          _id
          name
          lat
          lon
          tags
        }
      }
    }
  }
`;

// Executing getting all spells
export const GET_ALL_SPELLS = gql`
  query spells {
    spells {
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
  }
`;

export const GET_FILTERED_SPELLS = gql`
  query filteredSpells($schools: [String], $levels: [String]) {
    filteredSpells(schools: $schools, levels: $levels) {
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

export const GET_SPELL_LIST_BY_ID = gql`
  query spellListById($id: ID!) {
    spellListById(id: $id) {
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

export const GET_BLOG_POSTS = gql`
  query blogPosts {
    blogPosts {
      _id
      date
      title
      body
      notes
    }
  }
`;

export const GET_ALL_SPELL_LISTS = gql`
  query spellLists($userId: ID!) {
    spellLists(userId: $userId) {
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
