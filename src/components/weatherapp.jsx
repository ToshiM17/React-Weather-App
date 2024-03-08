import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'

const Weatherapp = () => {
    let api_key = "9d4761c1f4ddf1a245e715f546407ee3";
    const search = async (city = "Warszawa") => {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pl&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();

        const cityName = document.getElementsByClassName("cityName");
        const temp = document.getElementsByClassName("temp");
        const feelsLike = document.getElementsByClassName("feelsLike");
        const pressure = document.getElementsByClassName("pressure");
        const humidity = document.getElementsByClassName("humidity");
        const wind = document.getElementsByClassName("wind");
        const weatherName = document.getElementsByClassName("weatherName");

        cityName[0].innerHTML = data.name;
        temp[0].innerHTML = data.main.temp + "°C";
        feelsLike[0].innerHTML = data.main.feels_like + "°C";
        pressure[0].innerHTML = data.main.pressure + " hPa";
        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = data.wind.speed + " m/s";
        weatherName[0].innerHTML = data.weather[0].description;

        const line = document.getElementsByClassName("line")[0];
        line.style.height = `${(data.main.temp / 100) * -100 + 50}%`;
    }

    useEffect(() => {
        search();
    });

    return (
        <main>
            <header>
                <h1>Pogoda</h1>
                <button>
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </header>
            <div className="search">
                <input type="text" className="searchBar" placeholder="Wpisz nazwe miasta..." />
                <button onClick={() => { search(document.getElementsByClassName("searchBar")[0].value) }}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div className="location">
                <div className="left">
                    <p className="cityName"></p>
                    <div className="infoSet">
                        <p>Ciśnienie: </p>
                        <p className="pressure"></p>
                    </div>
                    <div className="infoSet">
                        <p>Wilgotność: </p>
                        <p className="humidity"></p>
                    </div>
                    <div className="infoSet">
                        <p>Wiatr: </p>
                        <p className="wind"></p>
                    </div>
                    <div className="infoSet">
                        <p>Odczuwalna: </p>
                        <p className="feelsLike"></p>
                    </div>
                    <p className="temp"></p>
                    <p className="weatherName"></p>
                </div>
                <div className="right">
                    <div className="thermometer">
                        <div className="line"></div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Weatherapp