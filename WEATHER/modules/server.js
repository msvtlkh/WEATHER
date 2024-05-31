import { errors, changeMainInfo, changeHourlyInfo } from './DOM.js'

function GetServerData(serverURL) {
    this.serverURL = serverURL,
    this.cityName = 'none',
    this.apiKey = 'f660a2fb1e4bad108d6160b7f58c555f',
        this.createURL = function() {
            return `${this.serverURL}?q=${this.cityName}&appid=${this.apiKey}`
        }
}

const serverDataCurrent = new GetServerData('http://api.openweathermap.org/data/2.5/weather')
const serverDataHourly = new GetServerData('http://api.openweathermap.org/data/2.5/forecast')


async function getCurrentWeatherData(cityName) {
    serverDataCurrent.cityName = cityName
    const serverURL = serverDataCurrent.createURL()

    try {
        const response = await fetch(serverURL);
        if (!response.ok) throw new Error(response.status)
        const data = await response.json();

        let calvinTemp = data.main.temp 
        let nameCity = data.name
        let icon = data.weather[0].icon
        let feelsLike = data.main.feels_like
        let sunrise = data.sys.sunrise
        let sunset = data.sys.sunset

        changeMainInfo(calvinTemp, nameCity, icon, feelsLike, sunrise, sunset)

    } catch (error) {
        switch (error) {
            case '404':
                console.log(errors[404])
                break;

            default: console.log('ERROR')
                break;
        }
        
    }
}

async function getHourlyWeatherData(cityName) {
    serverDataHourly.cityName = cityName 
    const serverURL = serverDataHourly.createURL()

    try {
        const response = await fetch(serverURL)
        if(!response.ok) throw new Error(response.status)
        const data = await response.json()

        let temperature12 = data.list[12].main.temp
        let temperature15 = data.list[15].main.temp
        let temperature18 = data.list[18].main.temp

        let feelsLike12 = data.list[12].main.feels_like
        let feelsLike15 = data.list[15].main.feels_like
        let feelsLike18 = data.list[18].main.feels_like

        changeHourlyInfo(temperature12, temperature15, temperature18, feelsLike12, feelsLike15, feelsLike18)

    } catch (error) {
        switch (error) {
            case '404':
                alert(errors[404])
                break;
        
            default: console.log('error')
                break;
        }
    }
}

export {serverDataCurrent, getCurrentWeatherData, getHourlyWeatherData}