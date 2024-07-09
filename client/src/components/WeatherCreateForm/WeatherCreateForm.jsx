import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS, GET_USER_BY_ID } from "../../utils/queries";
import {
  CREATE_FANTASY_LOCATION,
  ADD_FANTASY_LOCATION,
  UPDATE_USER,
} from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import "./WeatherCreateForm.css";
import InstructionModal from "../Modals/InstructionModal";

export default function WeatherCreateForm() {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [tagLimit, setTagLimit] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [fantasyLocationName, setFantasyLocationName] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [logInFlag, setLogInFlag] = useState(false);
  const [fantasyLocationId, setFantasyLocationId] = useState(null);
  const [instructions, setInstructions] = useState(false);

  const tagOptions = [
    "Arid",
    "Coastal",
    "Cold",
    "Desert",
    "Dry",
    "Dunes",
    "Forest",
    "Hot",
    "Jungle",
    "Marshes",
    "Moderate",
    "Mountains",
    "Plains",
    "Rainy",
    "River",
    "Snowy",
    "Stormy",
    "Tropical",
    "Tundra",
    "Warm",
    "Windy",
  ];

  const navigateTo = useNavigate();
  const user = Auth.getUser();

  // // Define queries
  const { loading: allLocationLoading, data: allLocationData } =
    useQuery(GET_LOCATIONS);
  const { loading: userLoading, data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { id: user.data._id },
  });

  // Define mutation
  const [createFantasyLocation] = useMutation(CREATE_FANTASY_LOCATION);
  const [addFantasyLocation] = useMutation(ADD_FANTASY_LOCATION);
  const [updateUser] = useMutation(UPDATE_USER);

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
  }, [
    allLocationData,
    allLocationLoading,
    tags,
    fantasyLocationName,
    selectedLocation,
  ]);

  useEffect(() => {
    if (logInFlag) {
      return;
    }

    if (fantasyLocationId) {
      addFantasyLocationToUser();
    }
  }, [fantasyLocationId]);

  useEffect(() => {
    if (userData && !userLoading) {
      if (userData.userById.weatherCreateInstruction) {
        setInstructions(true);
      }
    }
  }, [userData, userLoading]);

  const handleShowAgainCheckbox = async () => {
    try {
      await updateUser({
        variables: {
          id: user.data._id,
          weatherCreateInstruction: false,
        },
      });
    } catch (err) {
      console.error("Error updating from checkbox: ", err);
    }
  };

  const handleFantasyLocationCreation = async () => {
    // Checks to see if user is logged in
    if (!Auth.loggedIn()) {
      setLogInFlag(true);
      return;
    } else {
      setLogInFlag(false);
    }

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

      await setFantasyLocationId(response.data.createFantasyLocation._id);
    } catch (err) {
      console.error("Error creating fantasy location: ", err);
    }
  };

  const addFantasyLocationToUser = async () => {
    try {
      await addFantasyLocation({
        variables: {
          id: user.data._id,
          fantasyLocationId: fantasyLocationId,
        },
      });
      navigateTo("/weather/display");
    } catch (err) {
      console.error("Error adding fantasy location: ", err);
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

  const instructionText = () => {
    const instructions = `
      Welcome to weather link creation!
      <br />
      <br />
      This is where you will link a fantasy location to a real-world
      equivalent to obtain real-time weather data.
      <br />
      <br />
      Start by entering the name of your fantasy location, then
      select up to three descriptive tags to filter real-world locations.
      Bear in mind that not all combinations will have a viable
      match.
      <br />
      <br />
      If you don't like a tag you picked, that's okay! Simply click on
      the button associated with the tag to clear it.
      <br />
      <br />
      Once you've found a location you like, simply click on the
      associated button with the real-world location to select it and
      click submit.
      <br />
      <br />
      That's all there is to it! Go out and make something cool!
    `;

    return (
      <div
        dangerouslySetInnerHTML={{ __html: instructions }} 
      />
    );
  };

  const handleModalHide = () => {
    const checkbox = document.getElementById("showAgainCheckbox");
    if (checkbox.checked) {
      handleShowAgainCheckbox();
    }
    setInstructions(false);
  }


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
            className="col-6 col-lg-3 weatherInput"
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
          <select
            className="col-lg-1 col-4 tagInput"
            name="tagSelect"
            onChange={(e) => setSelectedTag(e.target.value)}
            defaultValue={""}
          >
            <option
              value={""}
              disabled
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
            <button
              className="col-lg-1 col-sm-3 col-3 mt-2 tagBtn roundedBox"
              onClick={handleTagSelect}
            >
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
            <div className="justify-content-center">
              <ul className="list-unstyled tagList">
                {tags.map((tag, index) => (
                  <li key={index} className="mx-2">
                    <button
                      onClick={() => handleDeleteTag(index)}
                      className="roundedBox"
                    >
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
            <ul className="list-unstyled tagList">
              {filteredLocations.length !== allLocations.length &&
                filteredLocations.map((location, index) => {
                  return (
                    <li className="mx-2" key={index}>
                      <button
                        className="locationBtn roundedBox"
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
            className="row justify-content-center col-3 col-lg-1 roundedBox"
            onClick={handleFantasyLocationCreation}
          >
            Submit
          </button>

          {logInFlag && (
            <h3 className="row justify-content-center">
              Please log in to access this function.
            </h3>
          )}
        </div>
      </form>

      <InstructionModal
        show={instructions}
        instructionText={instructionText()}
        onHide={handleModalHide}
        onClick={handleModalHide}
        style={{ paddingTop: "1%" }}
      />
    </div>
  );
}
