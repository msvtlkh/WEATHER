import { DOMElements, errors, render } from "./modules/DOM.js"
import { getCurrentWeatherData, getHourlyWeatherData } from "./modules/server.js"
import { storage } from "./modules/local_storage.js"
import { daysToWeeks, minutesToHours } from "../node_modules/date-fns"

const fromLocalStorage = storage.getFavCities() || [];

let favList = new Set(fromLocalStorage)

render()

function showCityInfo(event) {
    event.preventDefault()

    if(DOMElements.input.value === ''){
        alert(errors.emptyInput)
    } else {
        getCurrentWeatherData(DOMElements.input.value)
        getHourlyWeatherData(DOMElements.input.value)
    }

    DOMElements.input.value =''
}

function addToFav() {
    DOMElements.addCityButton.classList.add('clicked')
    favList.add(DOMElements.title.textContent)
    storage.saveFavCities(Array.from(favList))

    render()
}

DOMElements.form.addEventListener('submit', showCityInfo)
DOMElements.addCityButton.addEventListener('click', addToFav)

console.log(daysToWeeks(120))

export { favList }
