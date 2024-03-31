import { useQuery } from "@apollo/client";
import { GET_FANTASY_LOCATIONS } from "../../utils/queries";
import { useEffect, useState } from "react";
import { weatherSearch } from "../../utils/weatherSearch";
import './WeatherDisplay.css'

export default function WeatherDisplayComponent() {

    const [fantasyLocations, setFantasyLocations] = useState([]);

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


    return (
        <div>
            {data && (
                <div>
                    {/* Iterates through fantasy locations, displays data and assigns lat and lon individually */}
                    {fantasyLocations.map(location => (
                        <div key={location._id}>
                            <span
                                onClick={(event) => weatherSearch(parseFloat(event.target.dataset.lat), parseFloat(event.target.dataset.lon))}
                                data-lat={location.realLocation.lat}
                                data-lon={location.realLocation.lon}
                                className="fantasyLocationName"
                            >{location.name}
                            </span>
                            <span>{location.realLocation.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
