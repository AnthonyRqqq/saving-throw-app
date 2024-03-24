import { gql } from '@apollo/client';

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
`

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
`

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
    mutation addFantasyLocation($email: String!, $fantasyLocationId: ID!) {
        addFantasyLocation(email: $email, fantasyLocationId: $fantasyLocationId) {
            user {
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
    }
`

// Execute remove fantasy location mutation for removing a linked fantasy location from a user
export const REMOVE_FANTASY_LOCATION = gql`
    mutation removeFantasyLocation($email: String!, $fantasyLocationId: ID!) {
        removeFantasyLocation(email: $email, fantasyLocationId: $fantasyLocationId) {
            user {
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
    }
`

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
`