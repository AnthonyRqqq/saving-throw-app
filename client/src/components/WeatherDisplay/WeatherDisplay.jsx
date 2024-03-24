import { useQuery } from "@apollo/client";
import { GET_FANTASY_LOCATIONS } from "../../utils/queries";
import { useEffect } from "react";
import { weatherSearch } from "../../utils/weatherSearch";

export default function WeatherDisplayComponent() {

    const { loading, data } = useQuery(GET_FANTASY_LOCATIONS);

    useEffect(() => {
        console.log(loading)
        console.log(data)
        if (data && !loading) {
            const fantasyLocationData = data.fantasyLocations;

            console.log(fantasyLocationData)
            console.log(fantasyLocationData[0].realLocation.lat, fantasyLocationData[0].realLocation.lon)
            const lat = fantasyLocationData[0].realLocation.lat;
            const lon = fantasyLocationData[0].realLocation.lon;

            weatherSearch(lat, lon);

        }
    }, [data, loading])

}