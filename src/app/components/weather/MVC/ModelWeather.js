import { weaterService } from '../../../service/weatherService/WeatherService';
import { storage } from '../../../service/storage/LocalStorage';
import { weatherProps } from '../props/weatherProps';
import { langProps } from '../props/langProps';

export class ModelWeather {
  constructor() {
    this.weatherData = null;
    this.lang = 'en';
    this.defaultCity = weatherProps.defaultCity;
    this.units = weatherProps.units;
    this.langProperties = langProps;
  }

  setWeatherData(data) {
    if (!data) {
      return;
    }
    this.data = data;
  }

  setCity(city) {
    if (!city) {
      return;
    }
    this.city = city;
    storage.set('city', city);
  }

  setLang(lang = 'en') {
    this.lang = lang;
  }

  getDefaultCity() {
    return this.defaultCity[this.lang];
  }

  getWeatherData() {
    return weaterService.get(this.getCity(), this.lang, this.units);
  }

  getCity() {
    return this.getCityFromStorage()
      ? this.getCityFromStorage().trim()
      : this.getDefaultCity();
  }

  getCityFromStorage() {
    return storage.get('city');
  }

  getLangProperties() {
    return this.langProperties[this.lang];
  }
}
