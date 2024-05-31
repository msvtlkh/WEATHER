const storage = {
    saveFavCities: (favList) => {
        localStorage.setItem("city", JSON.stringify(favList))
    },
    getFavCities: () => {
        return JSON.parse(localStorage.getItem("city"))
    }
}

export { storage }
