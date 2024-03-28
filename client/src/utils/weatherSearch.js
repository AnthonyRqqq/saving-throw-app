import axios from 'axios'

const weatherSearch = async (lat, lon) => {

    const response = await axios.get('http://localhost:3001/api/env-variable');
    console.log(response)
    const weatherKey = await response.data.envVariable;
    console.log(weatherKey)

    const requestCurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherKey}`

    const weatherResponse = await fetch(requestCurrentWeatherUrl);
    const data = await weatherResponse.json();

    console.log(data);
    return data;
};

export { weatherSearch };