import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_LOCATIONS, GET_LOCATIONS_BY_TAGS, GET_FANTASY_LOCATIONS } from '../utils/queries';
import { CREATE_FANTASY_LOCATION } from '../utils/mutations';

export default function WeatherSearchForm() {
    // Set up tags array using state to dynamically update available locations
    const [tags, setTags] = useState([]);

    // Define queries
    const [getAllLocations] = useQuery(GET_LOCATIONS);
    const [getFilteredLocations] = useQuery(GET_LOCATIONS_BY_TAGS);
    const [getFantasyLocations] = useQuery(GET_FANTASY_LOCATIONS);

    // Define mutation
    const [createFantasyLocation] = useMutation(CREATE_FANTASY_LOCATION);

    const handleTagSelect = async (e) => {
        const { target } = e;

        // Checks for tag button
        if (target.className === 'tagBtn') {

            // Get the name of the tag and adds it to the tags array
            const tagName = target.value;
            const newTagsArray = [...tags, tagName];

            // Updates state
            setTags(newTagsArray);
        };
    };


}