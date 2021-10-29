export class ViewWeather {
  constructor() {
    this.weatherContainer = document.querySelector('.weather-js');
    this.iconContainer = document.querySelector('.weather-icon-js');
    this.temperatureContainer = document.querySelector('.temperature-js');
    this.descrContainer = document.querySelector('.weather-description-js');
    this.cityContainer = document.querySelector('.city-js');
    this.windContainer = document.querySelector('.wind-js');
    this.humidityContainer = document.querySelector('.humidity-js');
    this.errorContainer = document.querySelector('.weather-error-js');
  }

  render(data, langProps, city) {
    this.errorContainer.textContent = '';
    this.iconContainer.className = 'weather-icon owf weather-icon-js';
    this.iconContainer.classList.add(`owf-${data.weather[0].id}`);
    this.temperatureContainer.textContent = `${Math.round(data.main.temp)}°C`;
    this.descrContainer.textContent = data.weather[0].description;
    this.cityContainer.value = city;
    this.windContainer.textContent = `${langProps.windSpeed}${Math.round(
      data.wind.speed
    )} ${langProps.windUnits}`;
    this.humidityContainer.textContent = `${langProps.humidity}${data.main.humidity} %`;
  }

  renderError(langProps) {
    this.errorContainer.textContent = `${langProps.error} ${
      this.cityContainer.value.trim().length > 0
        ? this.cityContainer.value
        : langProps.empty
    }.`;
    this.iconContainer.className = '';
    this.temperatureContainer.textContent = '';
    this.descrContainer.textContent = '';
    this.cityContainer.value = '';
    this.windContainer.textContent = '';
    this.humidityContainer.textContent = '';
  }

  hideBlock() {
    this.weatherContainer.classList.add('hidden');
  }

  showBlock() {
    this.weatherContainer.classList.remove('hidden');
  }
}
