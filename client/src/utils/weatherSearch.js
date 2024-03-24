const weatherSearch = async (lat, lon) => {


    // const requestCurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=91e1ab2853251b69b38a1c4b07c71d3c`

    const response = await fetch(requestCurrentWeatherUrl);
    const data = await response.json();

    console.log(data);
    return data;
};

export { weatherSearch };