import { useQuery } from "@apollo/client";
import { GET_FANTASY_LOCATIONS } from "../../utils/queries";
import { useEffect, useState } from "react";
import { weatherSearch } from "../../utils/weatherSearch";
import './WeatherDisplay.css'

export default function WeatherDisplayComponent() {

    const [fantasyLocations, setFantasyLocations] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [weatherState, setWeatherState] = useState(false);
    // const [currentFantastyLocation, setCurrentFantasyLocation] = useState('');
    // const [currentRealLocation, setCurrentRealLocation] = useState('');

    const { loading, data } = useQuery(GET_FANTASY_LOCATIONS);

    useEffect(() => {
        if (data && !loading) {
            // Gets list of fantasy locations and sets the state
            console.log(data)
            const fantasyLocationData = data.fantasyLocations;
            setFantasyLocations(fantasyLocationData);
            console.log(fantasyLocations)
        }
    }, [data, loading])

    const handleWeatherSearch = async (e) => {
        const lat = parseFloat(e.target.dataset.lat);
        const lon = parseFloat(e.target.dataset.lon);

        const weatherResult = await weatherSearch(lat, lon);
        console.log(weatherResult)
        // setCurrentFantasyLocation(e.target.dataset.fantasyname);
        // setCurrentRealLocation(e.target.dataset.realname);
        setWeatherData(weatherResult);

        await formatTime(weatherResult.sys.sunrise)

        // Resets weather state to true or initializes it if false
        if (weatherState) {
            setWeatherState(false);
            setWeatherState(true);
        } else {
            setWeatherState(true);
        }
    }

    const formatTime = async (time) => {


        // Convert Unix timestamp to UTC time
        const utcDate = new Date(time * 1000);

        // Get hours, minutes, and seconds from UTC time
        const utcHours = utcDate.getUTCHours();
        const utcMinutes = utcDate.getUTCMinutes();
        const utcSeconds = utcDate.getUTCSeconds();

        // Convert UTC time to local machine time
        const localDate = new Date(utcDate);

        // Get hours, minutes, and seconds from local time
        const localHours = localDate.getHours();
        const localMinutes = localDate.getMinutes();
        const localSeconds = localDate.getSeconds();

        // Print the results
        console.log("UTC Time:", utcHours + ":" + utcMinutes + ":" + utcSeconds);
        console.log("Local Time:", localHours + ":" + localMinutes + ":" + localSeconds);

    }


    return (
        <div>
            {data && (
                <div className="row fantasyLocationItem">
                    {/* Iterates through fantasy locations, displays data and assigns lat and lon individually */}
                    {fantasyLocations.map(location => (
                        <div className="col-4" key={location._id}>
                            <div className="col">
                                <span
                                    onClick={(e) => handleWeatherSearch(e)}
                                    data-lat={location.realLocation.lat}
                                    data-lon={location.realLocation.lon}
                                    data-fantasyname={location.name}
                                    data-realname={location.realLocation.name}
                                    className="fantasyLocationName"
                                >{location.name}
                                </span>
                            </div>
                            <div className="col">
                                <span className="realLocationName">({location.realLocation.name})</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {weatherState && (
                <div>
                    <span>Current Temp: {weatherData.main.temp}</span>
                    <span>Weather: {weatherData.weather[0].main}</span>
                    <span>See More
                        <ul>
                            <li>Feels Like: {weatherData.main.feels_like}</li>
                            <li>Visibility: {weatherData.visibility / 1000} km</li>
                            <li>Humidity: {weatherData.main.humidity}%</li>
                            <li>Wind Speed: {weatherData.wind.speed} mph</li>
                            <li>Cloud Cover: {weatherData.weather.clouds}%</li>
                            <li><img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}></img></li>
                        </ul>
                    </span>

                </div>
            )}
        </div>
    );
}
