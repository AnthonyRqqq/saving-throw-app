import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../utils/queries";
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
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [fantasyLocationId, setFantasyLocationId] = useState("");

  const user = Auth.getUser();

  const { loading, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: user.data._id },
  });

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

  // For clicking the 'see more' button, gives further details of weather
  const handleSeeMore = async () => {
    await setSeeMore(true);
  };

  // For clicking the 'see less' button, hides potentially less useful details
  const handleCollapseSeeMore = async () => {
    await setSeeMore(false);
  };

  const handleDeleteIconClick = async (e) => {
    setDeleteConfirm(true);
    setFantasyLocationId(e.target.dataset.fantasylocationid);
    console.log(fantasyLocationId);
    console.log(deleteConfirm);
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
            {seeMore ? (
              <div
                className="clickText"
                onClick={() => handleCollapseSeeMore()}
              >
                Hide Details
              </div>
            ) : (
              <div className="clickText" onClick={() => handleSeeMore()}>
                See More
              </div>
            )}
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

      {fantasyLocations && (
        <div className="row fantasyLocationItem">
          {fantasyLocations.map((location) => (
            <div className="col-4" key={location._id}>
              <div className="col locationCard fantasyLocationCard">
                <span
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
                  <i
                    className="bi bi-trash deleteIcon"
                    onClick={(e) => handleDeleteIconClick(e)}
                    data-fantasylocationid={location._id}
                  ></i>
                </div>
              </div>
              <div className="col locationCard realLocationCard">
                <span className="realLocationName">
                  ({location.realLocation.name})
                </span>
              </div>
            </div>
          ))}

          {deleteConfirm && (
            <DeleteModal
              userId={user.data._id}
              fantasyLocationId={fantasyLocationId}
              onClose={() => setDeleteConfirm(false)}
              deleteConfirm={deleteConfirm}
            />
          )}
        </div>
      )}
    </div>
  );
}
