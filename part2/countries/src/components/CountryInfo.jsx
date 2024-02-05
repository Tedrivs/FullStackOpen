import { useState, useEffect } from "react"
import weatherService from "../services/weatherService"

const CountryInfo = ({ country }) => {

    const [weatherInfo, setWeatherinfo] = useState()

    useEffect(() => {
        weatherService.GetWeather(country.capital).then(result => setWeatherinfo(result))
    }, [])

    const rounding = (input) => {
        return (Math.round(input * 100) / 100).toFixed(2);
    }

    return <div>
        <h1>{country.name.common}</h1>

        <div>capital {country.capital}</div>
        <div>area {country.area}</div>

        <h3>languages:</h3>
        <ul>
            {Object.keys(country.languages).map(key => <li> {country.languages[key]}</li>)}
        </ul>

        <img src={country.flags.png} />

        <h2>Weather in {country.capital}</h2>

        <div>temperature {rounding((weatherInfo?.main.temp / 100))} Celcius</div>
        <img src={`https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@2x.png`} />

        <div>wind {weatherInfo?.wind?.speed} m/s</div>

    </div>
}

export default CountryInfo