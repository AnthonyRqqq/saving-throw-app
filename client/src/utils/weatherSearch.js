import axios from 'axios'


const weatherSearch = async (lat, lon) => {

    const response = await axios.get('https://savingthrows.onrender.com/api/env-variable');
    console.log(response)
    const weatherKey = await response.data.envVariable;
    console.log(weatherKey)

    const requestCurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherKey}`

    const weatherResponse = await fetch(requestCurrentWeatherUrl);
    const data = await weatherResponse.json();
    return data;
};

export { weatherSearch };