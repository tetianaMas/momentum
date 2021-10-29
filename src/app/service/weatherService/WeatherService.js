class WeatherService {
  constructor(api, key) {
    this.api = api || 'https://api.openweathermap.org/data/2.5/weather';
    this.key = key || '977f37dc694570221b9ebea1905aa9fb';
  }

  async get(city, lang, units) {
    try {
      const data = await fetch(
        `${this.api}?q=${city}&lang=${lang}&appid=${this.key}&units=${units}`
      );

      return await data.json();
    } catch (err) {
      console.log(err.message);
    }
  }
}

export const weaterService = new WeatherService();
