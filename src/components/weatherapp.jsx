import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'

const Weatherapp = () => {
    let api_key = "9d4761c1f4ddf1a245e715f546407ee3";
    const search = async () => {
        const element = document.getElementsByClassName("searchBar");
        if (element[0].value === "") {
            return 0;
        }
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&lang=pl&units=Metric&appid=${api_key}`;
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
        temp[0].innerHTML = data.main.temp+"°C";
        feelsLike[0].innerHTML = data.main.feels_like+"°C";
        pressure[0].innerHTML = data.main.pressure+" hPa";
        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = data.wind.speed+" m/s";
        weatherName[0].innerHTML = data.weather[0].description;

        const line = document.getElementsByClassName("line")[0];
        line.style.height = `${(data.main.temp / 100) * 100 + 50}%`;
        line.style.background = `linear-gradient(to bottom, ${getTemperatureColor(data.main.temp)}, #5555ff)`;

        function getTemperatureColor(temperature) {
            if (temperature >= 26) {
                return "#ff0000";
            } else if (temperature >= 18) {
                return "#ff7c00";
            } else if (temperature >= 12) {
                return "#ffa500";
            } else if (temperature >= 5) {
                return "#ffeb3b";
            } else if (temperature >= -5) {
                return "#8fabff";
            } else {
                return "#6666dd";
            }
        }
    }
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
            <button onClick={()=>{search()}}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
        <div className="location">
            <div className="left">
                <p className="cityName">Nazwa</p>
                <div className="infoSet">
                    <p>Ciśnienie: </p>
                    <p className="pressure">1010</p>
                </div>
                <div className="infoSet">
                    <p>Wilgotność: </p>
                    <p className="humidity">50</p>
                </div>
                <div className="infoSet">
                    <p>Wiatr: </p>
                    <p className="wind">18</p>
                </div>
                <div className="infoSet">
                    <p>Odczuwalna: </p>
                    <p className="feelsLike">20</p>
                </div>
                <p className="temp">24</p>
                <p className="weatherName">Pogoda</p>
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