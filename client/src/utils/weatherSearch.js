const weatherSearch = async (lat, lon) => {
    const requestCurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.WEATHER_API_KEY}`

    const response = await fetch(requestCurrentWeatherUrl);
    const data = await response.json();

    console.log(data);
    return data;
};

export { weatherSearch };