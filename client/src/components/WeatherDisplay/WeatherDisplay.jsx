import { useQuery } from "@apollo/client";
import { GET_FANTASY_LOCATIONS } from "../../utils/queries";
import { useEffect, useState } from "react";
import { weatherSearch } from "../../utils/weatherSearch";
import './WeatherDisplay.css'

export default function WeatherDisplayComponent() {

    const [fantasyLocations, setFantasyLocations] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [weatherState, setWeatherState] = useState(false);

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
        setWeatherData(weatherResult);

        // Resets weather state to true or initializes it if false
        if (weatherState) {
            setWeatherState(false);
            setWeatherState(true);
        } else {
            setWeatherState(true);
        }
    }


    return (
        <div>
            {data && (
                <div>
                    {/* Iterates through fantasy locations, displays data and assigns lat and lon individually */}
                    {fantasyLocations.map(location => (
                        <div className="col-4" key={location._id}>
                            <div className="col">
                                <span
                                    onClick={(e) => handleWeatherSearch(e)}
                                    data-lat={location.realLocation.lat}
                                    data-lon={location.realLocation.lon}
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
                    <span>{weatherData.main.temp}</span>
                </div>
            )}
        </div>
    );
}
