import axios from 'axios'


const weatherSearch = async (lat, lon) => {

    const response = await axios.get('https://savingthrows.onrender.com/api/env-variable');
    const weatherKey = await response.data.envVariable;

    const requestCurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherKey}`

    const weatherResponse = await fetch(requestCurrentWeatherUrl);
    const data = await weatherResponse.json();
    return data;
};

export { weatherSearch };