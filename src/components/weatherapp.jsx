import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCog, faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import languages from './languages';

const Weatherapp = () => {
    let api_key = "9d4761c1f4ddf1a245e715f546407ee3";
    const [language, setLanguage] = useState(Cookies.get('language') || "pl");
    const [background, setBackground] = useState(Cookies.get('background') || "dark");
    const [theme, setTheme] = useState(Cookies.get('theme') || "purple");
    const lang = languages[language];
    if (background === "light") {
        document.body.style.backgroundColor = "#efe8df";
    } else if (background === "dark") {
        document.body.style.backgroundColor = "#101720";
    }
    if (theme === "purple") {
        document.body.style.setProperty('--primaryColor', '#fff');
    } else {}
    let defCity = Cookies.get('city') || "Warszawa";
    const search = async (city = defCity) => {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&units=Metric&appid=${api_key}`;
        Cookies.set('city', city);
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
    
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const openSettings = () => {
        setIsSettingsOpen(true);
    };
    const closeSettings = () => {
        setIsSettingsOpen(false);
    };
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        Cookies.set('language', e.target.value);
    };
    const handleBackgroundChange = (e) => {
        setBackground(e.target.value);
        Cookies.set('background', e.target.value);
    };
    const handleThemeChange = (e) => {
        setTheme(e.target.value);
        Cookies.set('theme', e.target.value);
    };

    return (
        <main className={theme}>
            {isSettingsOpen && (
                <div className={`${theme} settings`}>
                    <header>
                        <h1>{lang.settings}</h1>
                        <button onClick={closeSettings}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </header>
                    <h2>{lang.language}</h2>
                    <div className='setting'>
                        <label>
                            <input type="radio" name="language" value="pl" checked={language === "pl"} onChange={handleLanguageChange} />
                            {lang.polish}
                        </label>
                        <label>
                            <input type="radio" name="language" value="en" checked={language === "en"} onChange={handleLanguageChange} />
                            {lang.english}
                        </label>
                    </div>
                    <h2>{lang.background}</h2>
                    <div className='setting'>
                        <label>
                            <input type="radio" name="background" value="light" checked={background === "light"} onChange={handleBackgroundChange} />
                            {lang.light}
                        </label>
                        <label>
                            <input type="radio" name="background" value="dark" checked={background === "dark"} onChange={handleBackgroundChange} />
                            {lang.dark}
                        </label>
                    </div>
                    <h2>{lang.theme}</h2>
                    <div className='setting'>
                        <label className="theme">
                            <input type="radio" name="theme" value="purple" checked={theme === "purple"} onChange={handleThemeChange} />
                            <div className="color" id='purple'></div>
                        </label>
                        <label className="theme">
                            <input type="radio" name="theme" value="green" checked={theme === "green"} onChange={handleThemeChange} />
                            <div className="color" id='green'></div>
                        </label>
                        <label className="theme">
                            <input type="radio" name="theme" value="claret" checked={theme === "claret"} onChange={handleThemeChange} />
                            <div className="color" id='claret'></div>
                        </label>
                        <label className="theme">
                            <input type="radio" name="theme" value="pink" checked={theme === "pink"} onChange={handleThemeChange} />
                            <div className="color" id='pink'></div>
                        </label>
                    </div>
                </div>
            )}
            <header>
                <h1>{lang.weather}</h1>
                <button onClick={openSettings}>
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </header>
            <div className="search">
                <input type="text" className="searchBar" placeholder={lang.cityName} />
                <button className={`${theme}Color`} onClick={() => { search(document.getElementsByClassName("searchBar")[0].value) }}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div className="location">
                <div className="left">
                    <p className="cityName"></p>
                    <div className="infoSet">
                        <p>{lang.pressure}: </p>
                        <p className="pressure"></p>
                    </div>
                    <div className="infoSet">
                        <p>{lang.humidity}: </p>
                        <p className="humidity"></p>
                    </div>
                    <div className="infoSet">
                        <p>{lang.wind}r: </p>
                        <p className="wind"></p>
                    </div>
                    <div className="infoSet">
                        <p>{lang.feelsLike}: </p>
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