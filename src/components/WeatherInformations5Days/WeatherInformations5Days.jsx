import "./WeatherInformations5Days.css";

function WeatherInformations5Days({ weather5Days }) {
  console.log(weather5Days);

  // Verifica se weather5Days e weather5Days.list estão definidos e se list é um array
  if (
    !weather5Days ||
    !weather5Days.list ||
    !Array.isArray(weather5Days.list)
  ) {
    return <div className="error">Dados de previsão não disponíveis.</div>;
  }

  let dailyForecast = {};

  // Agrupar previsões por data
  for (let forecast of weather5Days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    // Armazena apenas a primeira previsão do dia
    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast; // Armazena o objeto de previsão
    }
  }

  // Função para converter a data em dia da semana
  function convertToWeekday(forecast) {
    const date = new Date(forecast.dt * 1000); // Converte o timestamp para um objeto Date
    return date.toLocaleDateString("pt-BR", { weekday: "long" }); // Retorna o dia da semana em português
  }

  // Obter as previsões únicas
  const uniqueForecasts = Object.values(dailyForecast);

  // Obter a data atual
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = domingo, 1 = segunda, ..., 6 = sábado

  // Calcular o número de dias até quarta-feira
  const daysUntilWednesday = (3 - dayOfWeek + 7) % 7; // 3 é quarta-feira
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + daysUntilWednesday); // Data de quarta-feira

  // Calcular o número de dias até a próxima segunda-feira
  const daysUntilNextMonday = ((1 - dayOfWeek + 7) % 7) + 7; // 1 é segunda-feira, +7 para pegar a próxima segunda
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + daysUntilNextMonday); // Data de segunda-feira da próxima semana

  const forecastsToShow = uniqueForecasts.filter((forecast) => {
    const forecastDate = new Date(forecast.dt * 1000);
    return forecastDate >= startDate && forecastDate <= endDate;
  });

  // Ordenar as previsões pela data
  forecastsToShow.sort((a, b) => new Date(a.dt * 1000) - new Date(b.dt * 1000));

  return (
    <div className="weather-container">
      <h3>Previsão Proximo 5 Dias</h3>
      <div className="weather-list">
        {forecastsToShow.map((forecast) => (
          <div key={forecast.dt} className="weather-item">
            <h3>{convertToWeekday(forecast)}</h3> {/* Exibe o dia da semana */}
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              alt={forecast.weather[0].description}
            />
            <p>{forecast.weather[0].description}</p>
            <p>
              {Math.round(forecast.main.temp_min)} °C min /{" "}
              {Math.round(forecast.main.temp_max)} °C max
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherInformations5Days;
