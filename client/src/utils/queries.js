import { gql } from '@apollo/client';

// Executing getting all locations
export const GET_LOCATIONS = gql`
    query locations{
        locations{
            _id
            lat
            lon
            tags
        }
    }
`

// Executing getting locations based on provided tags
export const GET_LOCATIONS_BY_TAGS = gql`
    query locationsByTags($tags: [String!]) {
        location(tags: $tags) {
            _id
            lat
            lon
            tags
        }
    }
`

// Executing getting all fantasy locations
export const GET_FANTASY_LOCATIONS = gql`
    query fantasyLocations {
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
`

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
`