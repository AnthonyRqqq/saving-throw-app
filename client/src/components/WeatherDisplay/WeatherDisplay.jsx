import { useQuery } from "@apollo/client";
import { GET_FANTASY_LOCATIONS } from "../../utils/queries";
import { useEffect, useState } from "react";
import { weatherSearch } from "../../utils/weatherSearch";
import "./WeatherDisplay.css";

export default function WeatherDisplayComponent() {
  const [fantasyLocations, setFantasyLocations] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [weatherState, setWeatherState] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [currentFantastyLocation, setCurrentFantasyLocation] = useState("");
  // const [currentRealLocation, setCurrentRealLocation] = useState('');

  const { loading, data } = useQuery(GET_FANTASY_LOCATIONS);

  useEffect(() => {
    if (data && !loading) {
      // Gets list of fantasy locations and sets the state
      console.log(data);
      const fantasyLocationData = data.fantasyLocations;
      setFantasyLocations(fantasyLocationData);
      console.log(fantasyLocations);
    }
  }, [data, loading, fantasyLocations]);

  const handleWeatherSearch = async (e) => {
    const lat = parseFloat(e.target.dataset.lat);
    const lon = parseFloat(e.target.dataset.lon);

    const weatherResult = await weatherSearch(lat, lon);
    console.log(weatherResult);
    // setCurrentFantasyLocation(e.target.dataset.fantasyname);
    // setCurrentRealLocation(e.target.dataset.realname);
    await setWeatherData(weatherResult);
    await setCurrentFantasyLocation(e.target.dataset.fantasyname);
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

  return (
    <div>
      {weatherState && (
        <div className="weatherDisplay">
          <span>{currentFantastyLocation}</span>
          <span>Current Temp: {weatherData.main.temp}</span>
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
                Hide
              </div>
            ) : (
              <div className="clickText" onClick={() => handleSeeMore()}>
                See More
              </div>
            )}
            {seeMore && (
              <ul>
                <li>Feels Like: {weatherData.main.feels_like}</li>
                <li>Visibility: {weatherData.visibility / 1000} km</li>
                <li>Humidity: {weatherData.main.humidity}%</li>
                <li>Wind Speed: {weatherData.wind.speed} mph</li>
                <li>Cloud Cover: {weatherData.weather.clouds}%</li>
                <li>
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  ></img>
                </li>
              </ul>
            )}
          </span>
        </div>
      )}

      {data && (
        <div className="row fantasyLocationItem">
          {/* Iterates through fantasy locations, displays data and assigns lat and lon individually */}
          {fantasyLocations.map((location) => (
            <div className="col-4" key={location._id}>
              <div className="col">
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
              </div>
              <div className="col">
                <span className="realLocationName">
                  ({location.realLocation.name})
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
