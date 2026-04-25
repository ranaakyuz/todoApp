class WeatherAPI {
    constructor() {
        this.baseURL = "https://api.openweathermap.org/data/2.5/weather";
        this.apiKey = "516a8c34e777bc1b1249c6a41576d17a";
    }

    getWeatherInfo(cityName) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseURL}?q=${cityName}&appid=${this.apiKey}&units=metric&lang=tr`)
                .then((response => response.json()))
                .then((data => resolve(data)))
                .catch((err => reject(err)));
        })
    }
}