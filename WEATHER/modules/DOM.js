import { favList } from "../script.js"
import { getCurrentWeatherData, getHourlyWeatherData } from "./server.js"
import { storage } from "./local_storage.js"

const DOMElements = {
    form: document.querySelector('#form'),
    input: document.querySelector('#inputSearch'),
    button: document.querySelector('#search'),
    title: document.querySelector('#city'),
    temperature: document.querySelector('#temperature'),
    icon: document.querySelector('#icon'),
    addCityButton: document.querySelector('#addCity'),
    listCity: document.querySelector('#list'),
    feelsLike: document.querySelector('.feels__like'),
    sunrise: document.querySelector('.sunrise'),
    sunset: document.querySelector('.sunset')
}

const DOMElementsHourly = {
    temperatureAt12: document.querySelector('#temp12'),
    temperatureAt15: document.querySelector('#temp15'),
    temperatureAt18: document.querySelector('#temp18'),
    feelsLikeAt12: document.querySelector('#feels12'),
    feelsLikeAt15: document.querySelector('#feels15'),
    feelsLikeAt18: document.querySelector('#feels18'),
}

const errors = {
    emptyInput: 'Пустое поле. Введите значение!',
    404: 'Город не найден',
    exist: 'Город уже есть в списке'
}

function changeMainInfo (temperature, city, iconCity, feelsLike, sunrise, sunset) {
    DOMElements.temperature.textContent = Math.round(temperature - 273.15)
    DOMElements.title.textContent = city.charAt(0).toUpperCase() + city.slice(1)
    DOMElements.icon.src = `https://openweathermap.org/img/wn/${iconCity}@2x.png`
    DOMElements.feelsLike.innerHTML = `<div class="feels__like">Feels like: ${Math.round(feelsLike - 273.15)}</div>` 
    DOMElements.sunrise.innerHTML = `<div class="sunrise">Sunrise: ${new Date(sunrise * 1000).getHours()}:${new Date(sunrise * 1000).getMinutes()}</div>`
    DOMElements.sunset.innerHTML = `<div class="sunset">Sunset: ${new Date(sunset * 1000).getHours()}:${new Date(sunset * 1000).getMinutes()}</div>`

    if (favList.has(city)) {
        DOMElements.addCityButton.classList.add("clicked")
    } else {
        DOMElements.addCityButton.classList.remove("clicked")
    }


}

function changeHourlyInfo (temp12, temp15, temp18, feelsLike12, feelsLike15, feelsLike18) {
    DOMElementsHourly.temperatureAt12.innerHTML = `<div class="temperature" id="temp12">Temperature: ${Math.round(temp12 - 273.15)}</div>`
    DOMElementsHourly.temperatureAt15.innerHTML = `<div class="temperature" id="temp12">Temperature: ${Math.round(temp15 - 273.15)}</div>`
    DOMElementsHourly.temperatureAt18.innerHTML = `<div class="temperature" id="temp12">Temperature: ${Math.round(temp18 - 273.15)}</div>`
    
    DOMElementsHourly.feelsLikeAt12.innerHTML = `<div class="time__feels__like" id="feels12">Feels like: ${Math.round(feelsLike12 - 273.15)}</div>`
    DOMElementsHourly.feelsLikeAt15.innerHTML = `<div class="time__feels__like" id="feels12">Feels like: ${Math.round(feelsLike15 - 273.15)}</div>`
    DOMElementsHourly.feelsLikeAt18.innerHTML = `<div class="time__feels__like" id="feels12">Feels like: ${Math.round(feelsLike18 - 273.15)}</div>`
}

function createFavElements(cityName) {
    DOMElements.listCity.insertAdjacentHTML('afterbegin', `<li class="city"> <div class="cityName">${cityName}</div><button class="delete__btn"></button></li>`);
}

function deleteFavCity(event) {
    event.preventDefault()

    if(event.target.className === 'delete__btn') {
        const currentCityName = event.target.previousElementSibling.textContent;
        favList.delete(currentCityName);
        if (DOMElements.title.textContent === currentCityName) DOMElements.addCityButton.classList.remove("clicked");

        storage.saveFavCities(Array.from(favList))

        render()
    }
}

function showFavCityInfo(event) {
    event.preventDefault()

    if(event.target.className === 'cityName') {
        const currentCityName = event.target.textContent;
        
        getCurrentWeatherData(currentCityName)
        getHourlyWeatherData(currentCityName)
    }
}

function render() {
    DOMElements.listCity.innerHTML = ''

    for (const city of favList) {
        createFavElements(city)
    }
}

DOMElements.listCity.addEventListener('click', deleteFavCity)
DOMElements.listCity.addEventListener('click', showFavCityInfo)

export { DOMElements, DOMElementsHourly, errors, changeMainInfo, render, changeHourlyInfo }