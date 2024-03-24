import { useQuery } from "@apollo/client";
import { GET_FANTASY_LOCATIONS } from "../../utils/queries";

export default function WeatherDisplayComponent() {

    const { loading, data } = useQuery(GET_FANTASY_LOCATIONS);



}