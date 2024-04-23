import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_BY_ID } from "../../utils/queries";
import { REMOVE_FANTASY_LOCATION } from "../../utils/mutations";
import { useEffect, useState } from "react";
import { weatherSearch } from "../../utils/weatherSearch";
import "./WeatherDisplay.css";
import Auth from "../../utils/auth";
import DeleteModal from "../DeleteModal";

export default function WeatherDisplayComponent() {
  const [fantasyLocations, setFantasyLocations] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [weatherState, setWeatherState] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [currentFantasyLocation, setCurrentFantasyLocation] = useState("");
  const [cloudCover, setCloudCover] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [fantasyLocationId, setFantasyLocationId] = useState("");
  const [removeFantasyLocation] = useMutation(REMOVE_FANTASY_LOCATION);

  const user = Auth.getUser();

  // Gets user data from Auth
  const { loading, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: user.data._id },
  });

  // Sets fantasy location data on state change for data and loading
  useEffect(() => {
    if (data && !loading) {
      const fantasyLocationData = data.userById.fantasyLocations;
      setFantasyLocations(fantasyLocationData);
    }
  }, [data, loading, fantasyLocations]);

  // Handles click events for fantasy locations, runs search for weather data
  const handleWeatherSearch = async (e) => {
    const lat = parseFloat(e.target.dataset.lat);
    const lon = parseFloat(e.target.dataset.lon);

    const weatherResult = await weatherSearch(lat, lon);
    // Converts visibility from unix to km, then to miles
    const weatherVisibility = (
      (weatherResult.visibility / 1000) *
      0.621371
    ).toFixed(1);

    await setWeatherData(weatherResult);
    await setCurrentFantasyLocation(e.target.dataset.fantasyname);
    await setCloudCover(weatherResult.clouds.all);
    await setVisibility(weatherVisibility);

    // Resets weather state to true or initializes it if false
    if (weatherState) {
      setWeatherState(false);
      setWeatherState(true);
    } else {
      setWeatherState(true);
    }
  };

  // Sets fantasy location id based on delete button's associated location
  const handleDeleteIconClick = async (e) => {
    setFantasyLocationId(e.target.dataset.fantasylocationid);
  };

  // Handles deleting the indicated fantasy location
  const handleRemoveFantasyLocation = async () => {
    try {
      await removeFantasyLocation({
        variables: { id: user.data._id, fantasyLocationId: fantasyLocationId },
      });
      // Closes weather data display on deletion
      setWeatherState(false);
    } catch (err) {
      console.error("Error removing fantasy location: ", err);
    }
  };

  return (
    <div>
      {/* Main display of weather data, just temp and weather */}
      {weatherState && (
        <div className="weatherDisplay weatherCard">
          <span style={{ fontSize: "xx-large" }}>{currentFantasyLocation}</span>
          <span>Current Temp: {weatherData.main.temp} &deg;F</span>
          <span>
            Weather: {weatherData.weather[0].main}{" "}
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            ></img>
          </span>
          {/* For seeing further details about weather, switches to hide to get rid of details */}
          <span>

            {/* The expand/collapse toggle */}
            {/* Functions  off stateful data*/}
            {seeMore ? (
              // Collapses the extra details
              <div
                className="clickText"
                onClick={() => setSeeMore(false)}
              >
                Hide Details
              </div>
            ) : (
              // Expands extra details
              <div className="clickText" onClick={() => setSeeMore(true)}>
                See More
              </div>
            )}
            {/* Extra data for weather, toggled by user */}
            {seeMore && (
              <ul style={{ listStyle: "none" }}>
                <li>Feels Like: {weatherData.main.feels_like} &deg;F</li>
                <li>Visibility: {visibility} miles</li>
                <li>Humidity: {weatherData.main.humidity}%</li>
                <li>Wind Speed: {weatherData.wind.speed} mph</li>
                {/* Sets whether there is no cloud cover or the percentage */}
                <li>
                  Cloud Cover: {cloudCover === 0 ? `None` : `${cloudCover}%`}
                </li>
              </ul>
            )}
          </span>
        </div>
      )}

      {/* Only renders if fantasy locations are present and successfully loaded */}
      {fantasyLocations && (
        <div className="row fantasyLocationItem">
          {fantasyLocations.map((location) => (
            <div className="col-4" key={location._id}>
              {/* The part of the chip holding the fantasy location daya */}
              <div className="col locationCard fantasyLocationCard">
                <span
                  // Handles pulling weather data
                  // Holds various data points to pass to weather search function
                  onClick={(e) => handleWeatherSearch(e)}
                  data-lat={location.realLocation.lat}
                  data-lon={location.realLocation.lon}
                  data-fantasyname={location.name}
                  data-realname={location.realLocation.name}
                  className="fantasyLocationName"
                >
                  {location.name}
                </span>

                <div>
                  {/* Delete icon */}
                  {/* Sets the state of the selected location and toggles modal */}
                  <i
                    className="bi bi-trash deleteIcon"
                    onClick={(e) => handleDeleteIconClick(e)}
                    data-fantasylocationid={location._id}
                    data-bs-toggle="modal"
                    data-bs-target="#confirmModal"
                  ></i>
                </div>
              </div>

              {/* The part of the chip holding the real world location data */}
              <div className="col locationCard realLocationCard">
                <span className="realLocationName">
                  ({location.realLocation.name})
                </span>
              </div>
            </div>
          ))}

          {/* Handles modal fade in */}
          <div
            className="modal fade"
            id="confirmModal"
            tabIndex="-1"
            aria-labelledby="confirmModalLabel"
            aria-hidden="true"
          >
            {/* Modal for confirming deletion */}
            <DeleteModal onClick={() => handleRemoveFantasyLocation()} />
          </div>
        </div>
      )}
    </div>
  );
}
