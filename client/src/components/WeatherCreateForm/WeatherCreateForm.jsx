import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "../../utils/queries";
import { CREATE_FANTASY_LOCATION } from "../../utils/mutations";
import "./WeatherCreateForm.css";

export default function WeatherCreateForm() {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [tagLimit, setTagLimit] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [fantasyLocationName, setFantasyLocationName] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("");

  const tagOptions = [
    "Desert",
    "Dunes",
    "Hot",
    "Arid",
    "Cold",
    "Tundra",
    "Windy",
    "Snowy",
    "Tropical",
    "Jungle",
    "River",
    "Rainy",
    "Warm",
    "Moderate",
    "Coastal",
    "Mountains",
    "Marshes",
    "Forest",
    "Windy",
    "Stormy",
    "Plains",
    "River",
    "Dry",
  ];

  // // Define queries
  const { loading: allLocationLoading, data: allLocationData } =
    useQuery(GET_LOCATIONS);

  // Define mutation
  const [createFantasyLocation] = useMutation(CREATE_FANTASY_LOCATION);

  useEffect(() => {
    // Defines location data when loaded
    if (!allLocationLoading && allLocationData) {
      const locations = allLocationData.locations;
      setAllLocations(locations);
    }

    // Resets filtered locations when tags are selected or deleted
    if (tags) {
      locationFilter();
    }

    if (fantasyLocationName && selectedLocation) {
      console.log(fantasyLocationName, selectedLocation);
    }
  }, [
    allLocationData,
    allLocationLoading,
    tags,
    fantasyLocationName,
    selectedLocation,
  ]);

  const handleFantasyLocationCreation = async () => {
    if (fantasyLocationName === "") {
      return;
    }

    try {
      const response = await createFantasyLocation({
        variables: {
          name: fantasyLocationName,
          realLocation: selectedLocation,
        },
      });

      console.log("Fantasy location created: ", response.data);
    } catch (err) {
      console.error("Error creating fantasy location: ", err);
    }
  };

  // For setting up list of tags to filter locations by
  const handleTagSelect = async () => {
    // Keeps duplicate tags from being added
    if (tags.includes(selectedTag)) {
      return;
    }

    // Keeps search results limited to three, sets tag limit to display error message
    if (tags.length === 3) {
      setTagLimit(true);
      return;
    }

    // Get the name of the tag and adds it to the tags array
    const newTagsArray = [...tags, selectedTag];

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
    }

    handleLocationSelect();
  };

  const handleInputChange = async (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === "fantasyLocationName") {
      setFantasyLocationName(inputValue);
    } else if (inputType === "tagSelect") {
      setSelectedTag(inputValue);
    }
  };

  const handleFormSubmit = async (e) => {
    // Prevents page refresh
    e.preventDefault();
  };

  // Filters locations based on selected tags at tag change
  const locationFilter = async () => {
    if (allLocations) {
      const matchingLocations = [];

      // Convert tags to lowercase
      const lowercaseTags = tags.map((tag) => tag.toLowerCase());

      for (const location of allLocations) {
        // Convert location tags to lowercase
        const lowercaseLocationTags = location.tags.map((tag) =>
          tag.toLowerCase()
        );

        // Check if all lowercase tags are included in lowercase location tags
        if (lowercaseTags.every((tag) => lowercaseLocationTags.includes(tag))) {
          matchingLocations.push(location);
        }
      }

      // Update filteredLocations with new matching locations
      setFilteredLocations(matchingLocations);
    }
  };

  const handleLocationSelect = async (e) => {
    if (e === undefined) {
      setSelectedLocation("");
      setSelectedLocationName("");
      return;
    }
    const { target } = e;
    setSelectedLocation(target.value);
    setSelectedLocationName(target.textContent);
  };

  return (
    <div className="form-div">
      <h3 className="row justify-content-center">Create Weather Link</h3>
      <form
        className="weather-search-form justify-content-center"
        onSubmit={handleFormSubmit}
      >
        {/* Input field for the name of the fantasy location */}
        <div className="row justify-content-center">
          <input
            className="col-3"
            value={fantasyLocationName}
            name="fantasyLocationName"
            onChange={handleInputChange}
            type="text"
            placeholder="Fantasy Location Name"
          />
        </div>

        {/* For selecting tags */}
        <div className="row justify-content-center">
          {/* Div to separate span onto own line */}
          <div className="row justify-content-center">
            <p className="row justify-content-center mt-2">
              Select your tags. (Max of 3)
            </p>
          </div>

          {/* Dropdown of tag options */}
          <select className="col-1" name="tagSelect">
            <option
              value=""
              disabled
              selected
              style={{ textAlign: "center" }}
            ></option>
            {tagOptions.map((tag, index) => (
              <option
                className="tagSelect"
                key={index}
                value={tag}
                style={{ textAlign: "center" }}
              >
                {tag}
              </option>
            ))}
            ;
          </select>

          {/* Button for adding tags to the search array */}
          <div className="row justify-content-center">
            <button className="col-1 mt-2 tagBtn" onClick={handleTagSelect}>
              Add Tag
            </button>
            {/* Displays error when too many tags are selected */}
            {tagLimit && (
              <p className="row justify-content-center">
                No more than three tags possible.
              </p>
            )}
          </div>

          {/* Displays selected tags, max of three */}
          <div className="container">
            <div className="row justify-content-center">
              <ul className="list-unstyled d-flex justify-content-center">
                {tags.map((tag, index) => (
                  <li key={index} className="mx-2">
                    <button onClick={() => handleDeleteTag(index)}>
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <ul className="list-unstyled d-flex justify-content-center">
              {filteredLocations.length !== allLocations.length &&
                filteredLocations.map((location, index) => {
                  return (
                    <li className="mx-2" key={index}>
                      <button
                        className="locationBtn"
                        onClick={handleLocationSelect}
                        value={location._id}
                      >
                        {location.name}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        {selectedLocation && (
          <div className="row justify-content-center">
            <p className="row justify-content-center">
              Selected Location: {selectedLocationName}
            </p>
          </div>
        )}

        <div className="row justify-content-center">
          <button
            className="row justify-content-center col-1"
            onClick={handleFantasyLocationCreation}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
