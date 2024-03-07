import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
        const icon = document.getElementsByClassName("icon");

        cityName[0].innerHTML = data.name;
        temp[0].innerHTML = data.main.temp+" °C";
        feelsLike[0].innerHTML = data.main.feels_like+" °C";
        pressure[0].innerHTML = data.main.pressure+" hPa";
        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = data.wind.speed+" m/s";
        icon[0].innerHTML = "<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png' alt='icon'>";
    }
  return (
    <main>
        <h1>Weather App</h1>
        <div className="search">
            <input type="text" className="searchBar" placeholder="Search..." />
            <button onClick={()=>{search()}}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
        <div className="location">
            <div className="cityName">Nazwa</div>
            <div className="temp">24</div>
            <div className="feelsLike">23</div>
            <div className="pressure">1010</div>
            <div className="humidity">50</div>
            <div className="wind">18</div>
            <div className="icon">icon</div>
        </div>
    </main>
  );
}

export default Weatherapp