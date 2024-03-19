import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { GET_LOCATIONS, GET_LOCATIONS_BY_TAGS, GET_FANTASY_LOCATIONS } from '../utils/queries';
import { CREATE_FANTASY_LOCATION } from '../utils/mutations';

export default function WeatherSearchForm() {
    // Set up arrays using state to dynamically update available locations
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('')
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [fantasyLocationName, setFantasyLocationName] = useState('')

    const tagOptions = ['Desert', 'Dunes', 'Hot', 'Arid', 'Cold', 'Tundra', 'Windy', 'Snowy', 'Tropical', 'Jungle', 'River', 'Rainy', 'Warm', 'Moderate', 'Coastal', 'Mountains', 'Marshes', 'Forest', 'Windy', 'Stormy', 'Plains', 'River', 'Dry']

    // // Define queries
    // const { allLocationData, allLocationLoading } = useQuery(GET_LOCATIONS);
    // const { filteredLocationData, filteredLocationLoading } = useQuery(GET_LOCATIONS_BY_TAGS);
    // const { fantasyLocationData, fantasyLocationLoading } = useQuery(GET_FANTASY_LOCATIONS);

    // Define mutation
    const [createFantasyLocation] = useMutation(CREATE_FANTASY_LOCATION);

    const handleTagSelect = async (e) => {
            console.log("HERE")

            // Keeps search results limited to three
            if (tags.length === 3) {
                tags.shift();
            }

            // Get the name of the tag and adds it to the tags array
            const newTagsArray = [...tags, selectedTag];

            // Updates state
            setTags(newTagsArray);
            console.log(newTagsArray)
    };

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'fantasyLocationName') {
            setFantasyLocationName(inputValue);
        } else if (inputType === 'tagSelect') {
            setSelectedTag(inputValue)
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
    }

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
                        <option value='' disabled selected style={{ textAlign: 'center'}}></option>
                        {tagOptions.map((tag, index) => (
                            <option className='tagSelect' key={index} value={tag} style={{ textAlign: 'center'}}>{tag}</option>
                        ))};
                    </select>

                    {/* Button for adding tags to the search array */}
                    <div className='row justify-content-center'>
                        <button className='col-1 mt-2 tagBtn' onClick={handleTagSelect}>Add Tag</button>
                    </div>

                    {/* Displays selected tags, max of three */}
                    <div className='row justify-content-center'>
                        <ul className='col-1' style={{ listStyle: 'none', padding: '0'}}>
                            {tags.map((tag, index) => (
                                <li style={{ textAlign: 'center', listStyle: 'none', display: 'inline-block', marginRight: '5px'}}>{tag}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </form>
        </div>
    )

}