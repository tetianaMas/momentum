import { apiService } from '../../../service/apiService/ApiService';
import { storage } from '../../../service/storage/LocalStorage';
import { weatherProps } from '../props/weatherProps';
import { langProps } from '../props/langProps';

export class ModelWeather {
  constructor() {
    this.weatherData = null;
    this.lang = 'en';
    this.api = weatherProps.api;
    this.key = weatherProps.key;
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

  setLang(lang = this.lang) {
    this.lang = lang;
  }

  getDefaultCity() {
    return this.defaultCity[this.lang];
  }

  getWeatherData() {
    const link =
      this.api +
      '?appid=' +
      this.key +
      '&q=' +
      this.getCity() +
      '&lang=' +
      this.lang +
      '&units=' +
      this.units;
    return apiService.get(link);
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
