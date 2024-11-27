let slideInterval;
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getLocalizationButton').addEventListener('click', () => {
        getCurrentWeather();
        document.getElementById('forecastContainer').style.display = 'flex'; // Show the container
    });
    slideInterval = setInterval(() => plusSlides(1, 0), 2000);
});

function getCurrentWeather() {
    const cityName = document.getElementById('cityName').value;
    const apiURLCurrent = `https://api.openweathermap.org/data/2.5/weather?&appid=bd02d33a046925af057fe0c93151e28f&units=metric&q=${cityName}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiURLCurrent, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                // console.log(data);
                displayWeatherData(data);
            } else {
                console.error('Error:', xhr.statusText);
            }
        }
    };
    xhr.send();
    getForecastWeather();
}

function getForecastWeather() {
    const cityName = document.getElementById('cityName').value;
    const apiURLForecast = `https://api.openweathermap.org/data/2.5/forecast?&appid=bd02d33a046925af057fe0c93151e28f&units=metric&q=${cityName}`;
    fetch(apiURLForecast)
        .then(response => {
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayForecastWeather(data);
        })
        .catch(error => console.error('Error:', error));
}

function displayWeatherData(data) {
    const crtWeatherTitle = document.createElement('h2');
    crtWeatherTitle.textContent = 'Current weather';

    const weatherContainer = document.getElementById('currentWeather');
    weatherContainer.innerHTML = '';

    const weatherElement = document.createElement('div');
    weatherElement.className = 'weatherElement';

    const date = new Date(data.dt * 1000);
    const dateElement = document.createElement('div');
    dateElement.className = 'forecastDate';
    dateElement.textContent = date.toLocaleString();

    const weatherIcon = document.createElement('div');
    weatherIcon.className = 'forecastIcon';
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather icon">`;


    const weatherDescription = document.createElement('div');
    weatherDescription.className = 'weatherDescription';
    weatherDescription.textContent = data.weather[0].description;

    const weatherTemperature = document.createElement('div');
    weatherTemperature.className = 'weatherTemperature';
    weatherTemperature.innerHTML = `<img src="temperature-icon.png" alt="Temperature icon"> ${data.main.temp} °C`;

    const weatherPressure = document.createElement('div');
    weatherPressure.className = 'weatherPressure';
    weatherPressure.innerHTML = `<img src="pressure-icon.png" alt="Pressure icon"> ${data.main.pressure} hPa`;

    const weatherHumidity = document.createElement('div');
    weatherHumidity.className = 'weatherHumidity';
    weatherHumidity.innerHTML = `<img src="humidity-icon.png" alt="Humidity icon"> ${data.main.humidity} %`;

    const weatherWind = document.createElement('div');
    weatherWind.className = 'weatherWind';
    weatherWind.innerHTML = `<img src="wind-icon.png" alt="Wind speed icon"> ${data.wind.speed} m/s`;

    weatherElement.appendChild(crtWeatherTitle);
    weatherElement.appendChild(dateElement);
    weatherElement.appendChild(weatherIcon);
    weatherElement.appendChild(weatherDescription);
    weatherElement.appendChild(weatherTemperature);
    weatherElement.appendChild(weatherPressure);
    weatherElement.appendChild(weatherHumidity);
    weatherElement.appendChild(weatherWind);
    weatherContainer.appendChild(weatherElement);
}

function displayForecastWeather(data) {
    const forecastContainer = document.getElementById('forecastWeather');
    forecastContainer.innerHTML = '';

    data.list.forEach(element => {
        const forecastElement = document.createElement('div');
        forecastElement.className = 'forecastElement mySlides1';

        const date = new Date(element.dt * 1000);
        const dateElement = document.createElement('div');
        dateElement.className = 'forecastDate';
        dateElement.textContent = date.toLocaleString();

        const weatherIcon = document.createElement('div');
        weatherIcon.className = 'forecastIcon';
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${element.weather[0].icon}.png" alt="Weather icon">`;

        const weatherDescription = document.createElement('div');
        weatherDescription.className = 'weatherDescription';
        weatherDescription.textContent = element.weather[0].description;

        const weatherTemperature = document.createElement('div');
        weatherTemperature.className = 'weatherTemperature';
        weatherTemperature.innerHTML = `<img src="temperature-icon.png" alt="Temperature icon"> ${element.main.temp} °C`;

        const weatherPressure = document.createElement('div');
        weatherPressure.className = 'weatherPressure';
        weatherPressure.innerHTML = `<img src="pressure-icon.png" alt="Pressure icon"> ${element.main.pressure} hPa`;

        const weatherHumidity = document.createElement('div');
        weatherHumidity.className = 'weatherHumidity';
        weatherHumidity.innerHTML = `<img src="humidity-icon.png" alt="Humidity icon"> ${element.main.humidity} %`;

        const weatherWind = document.createElement('div');
        weatherWind.className = 'weatherWind';
        weatherWind.innerHTML = `<img src="wind-icon.png" alt="Wind speed icon"> ${element.wind.speed} m/s`;

        forecastElement.appendChild(dateElement);
        forecastElement.appendChild(weatherIcon);
        forecastElement.appendChild(weatherDescription);
        forecastElement.appendChild(weatherTemperature);
        forecastElement.appendChild(weatherPressure);
        forecastElement.appendChild(weatherHumidity);
        forecastElement.appendChild(weatherWind);
        forecastContainer.appendChild(forecastElement);
    });

    const prevArrow = document.createElement('button');
    prevArrow.className = 'arrow';
    prevArrow.id = 'prevArrow';
    prevArrow.textContent = '<';
    forecastContainer.insertBefore(prevArrow, forecastContainer.firstChild);

    const nextArrow = document.createElement('button');
    nextArrow.className = 'arrow';
    nextArrow.id = 'nextArrow';
    nextArrow.textContent = '>';
    forecastContainer.appendChild(nextArrow);

    forecastContainer.style.display = 'flex';

    document.getElementById('prevArrow').addEventListener('click', () => plusSlides(-1, 0));
    document.getElementById('nextArrow').addEventListener('click', () => plusSlides(1, 0));

    showSlides(1, 0);
}

let slideIndex = [1];
let slideId = ["mySlides1"];

function plusSlides(direction, slideGroupID) {
    showSlides(slideIndex[slideGroupID] += direction, slideGroupID);
}

function showSlides(direction, slideGroupID) {
    let forecastElements = document.getElementsByClassName(slideId[slideGroupID]);
    let totalElements = forecastElements.length;
    let elementsToShow = 4;
    if (slideIndex[slideGroupID] > totalElements - elementsToShow + 1) {
        slideIndex[slideGroupID] = 1;
    }
    if (slideIndex[slideGroupID] < 1) {
        slideIndex[slideGroupID] = totalElements - elementsToShow + 1;
    }
    for (let i = 0; i < forecastElements.length; i++) {
        forecastElements[i].style.display = "none";
    }
    for (let i = 0; i < elementsToShow; i++) {
        if (forecastElements[(slideIndex[slideGroupID] - 1 + i) % totalElements]) {
            forecastElements[(slideIndex[slideGroupID] - 1 + i) % totalElements].style.display = "block";
        }
    }
    clearInterval(slideInterval);
    slideInterval = setInterval(() => plusSlides(1, slideGroupID), 2000);
}