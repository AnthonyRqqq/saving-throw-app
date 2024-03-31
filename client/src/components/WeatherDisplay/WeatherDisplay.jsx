import { useQuery } from "@apollo/client";
import { GET_FANTASY_LOCATIONS } from "../../utils/queries";
import { useEffect, useState } from "react";
import { weatherSearch } from "../../utils/weatherSearch";

export default function WeatherDisplayComponent() {

    const [fantasyLocations, setFantasyLocations] = useState([]);

    const { loading, data } = useQuery(GET_FANTASY_LOCATIONS);

    useEffect(() => {

        console.log(data)
        if (data && !loading) {
            const fantasyLocationData = data.fantasyLocations;
            setFantasyLocations(fantasyLocationData);
            console.log(fantasyLocations)

            // weatherSearch(lat, lon);

        }
    }, [data, loading])


    return (
        <div>
            {data && (
                <div>
                    {fantasyLocations.map(location => (
                        <div key={location._id}>
                            <span
                                onClick={(event) => weatherSearch(parseFloat(event.target.dataset.lat), parseFloat(event.target.dataset.lon))}
                                data-lat={location.realLocation.lat}
                                data-lon={location.realLocation.lon}
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
