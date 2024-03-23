import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_LOCATIONS } from '../utils/queries';
import { CREATE_FANTASY_LOCATION } from '../utils/mutations';

export default function WeatherSearchForm() {

    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const [tagLimit, setTagLimit] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [filtered, setFiltered] = useState(false)
    const [fantasyLocationName, setFantasyLocationName] = useState('');
    const [allLocations, setAllLocations] = useState([]);

    const tagOptions = ['Desert', 'Dunes', 'Hot', 'Arid', 'Cold', 'Tundra', 'Windy', 'Snowy', 'Tropical', 'Jungle', 'River', 'Rainy', 'Warm', 'Moderate', 'Coastal', 'Mountains', 'Marshes', 'Forest', 'Windy', 'Stormy', 'Plains', 'River', 'Dry']

    // // Define queries
    const { loading: allLocationLoading, data: allLocationData } = useQuery(GET_LOCATIONS);

    // Define mutation
    const [createFantasyLocation] = useMutation(CREATE_FANTASY_LOCATION);

    useEffect(() => {
        if (!allLocationLoading && allLocationData) {
            const locations = allLocationData.locations;
            setAllLocations(locations);
        }

        if (tags) {
            console.log(tags)
            setFilteredLocations([]);
            locationFilter();
        }

    }, [allLocationData, allLocationLoading, tags])

    // For setting up list of tags to filter locations by
    const handleTagSelect = async () => {

        // Keeps search results limited to three, sets tag limit to display error message
        if (tags.length === 3) {
            setTagLimit(true);
            return;
        }

        // Get the name of the tag and adds it to the tags array
        const newTagsArray = [...tags, selectedTag];
        console.log(selectedTag)
        console.log(newTagsArray)
        // Updates state
        setTags(newTagsArray);
    };

    // For deleting tags from list
    const handleDeleteTag = async (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);

        // Resets tag limit to erase error message
        if (tagLimit) {
            setTagLimit(false);
        };
    }

    const handleInputChange = async (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'fantasyLocationName') {
            setFantasyLocationName(inputValue);
        } else if (inputType === 'tagSelect') {
            setSelectedTag(inputValue);
        }
    };

    const handleFormSubmit = async (e) => {

        // Prevents page refresh
        e.preventDefault();

        try {

        } catch (err) {
            console.error(err);
            throw new Error('Could not create linked location.')
        }
    };

    // Filters locations based on selected tags at tag change
    const locationFilter = async () => {
        if (allLocations) {
            const matchingLocations = [];

            // Convert tags to lowercase
            const lowercaseTags = tags.map(tag => tag.toLowerCase());

            for (const location of allLocations) {
                // Convert location tags to lowercase
                const lowercaseLocationTags = location.tags.map(tag => tag.toLowerCase());

                // Check if all lowercase tags are included in lowercase location tags
                if (lowercaseTags.every(tag => lowercaseLocationTags.includes(tag))) {
                    matchingLocations.push(location);
                }
            }

            // Update filteredLocations with new matching locations
            setFilteredLocations(matchingLocations);
        }
    };


    return (
        <div className='form-div'>
            <h3 className='row justify-content-center'>Weather Search</h3>
            <form className='weather-search-form justify-content-center' onSubmit={handleFormSubmit}>

                {/* Input field for the name of the fantasy location */}
                <div className='row justify-content-center'>
                    <input
                        className='col-3'
                        value={fantasyLocationName}
                        name='fantasyLocationName'
                        onChange={handleInputChange}
                        type='text'
                        placeholder='Fantasy Location Name'
                        required
                    />
                </div>

                {/* For selecting tags */}
                <div className='row justify-content-center'>
                    {/* Div to separate span onto own line */}
                    <div className='row justify-content-center'>
                        <span className='row justify-content-center'>Select your tags. (Max of 3)</span>
                    </div>

                    {/* Dropdown of tag options */}
                    <select className='col-1' name='tagSelect' onChange={handleInputChange}>
                        <option value='' disabled selected style={{ textAlign: 'center' }}></option>
                        {tagOptions.map((tag, index) => (
                            <option className='tagSelect' key={index} value={tag} style={{ textAlign: 'center' }}>{tag}</option>
                        ))};
                    </select>

                    {/* Button for adding tags to the search array */}
                    <div className='row justify-content-center'>
                        <button className='col-1 mt-2 tagBtn' onClick={handleTagSelect}>Add Tag</button>
                        {/* Displays error when too many tags are selected */}
                        {tagLimit && (
                            <p>No more than three tags possible.</p>
                        )}
                    </div>

                    {/* Displays selected tags, max of three */}
                    <div className='row justify-content-center'>
                        <ul className='col-1' style={{ listStyle: 'none', padding: '0' }}>
                            {tags.map((tag, index) => (
                                <li style={{ textAlign: 'center', listStyle: 'none', display: 'inline-block', marginRight: '5px' }} key={index}>{tag}
                                    <button onClick={() => handleDeleteTag(index)}>X</button>
                                </li>

                            ))}
                        </ul>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <ul>
                        {filteredLocations.length !== allLocations.length && (
                            filteredLocations.map((location, index) => {
                                return (
                                <li key={index}>{location.name}</li>
                            )})
                        )}
                    </ul>
                </div>

            </form>
        </div>
    )

}