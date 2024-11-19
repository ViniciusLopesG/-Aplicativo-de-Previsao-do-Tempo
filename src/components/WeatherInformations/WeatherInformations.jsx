import './WeatherInformations.css'

function WeatherInformations({ weather }) {
  

    if (!weather || !weather.name || !weather.weather || weather.weather.length === 0) {
        return 
    }

    return (
        <div className='weather-container'>
            <h2>{weather.name}</h2>
            <div className='    '>
                <img 
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
                    alt={weather.weather[0].description} 
                />
                 <p className='temperature'>{Math.round(weather.main.temp)} °C</p>
            </div>
           <p className='description'>{weather.weather[0].description}</p>

           <div className='details'>
            <p>Sensação Térmica:{Math.round(weather.main.feels_like)} °C</p>
            <p>Umidade:{weather.main.humidity} %</p>
            <p>Pressão:{weather.main.pressure}</p>
           </div>
        </div>
    );
}

export default WeatherInformations;