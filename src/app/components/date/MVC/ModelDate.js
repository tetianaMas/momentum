export class ModelDate {
  constructor() {
    this.optionsDate = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };

    this.optionsTime = {
      hour12: false,
    };

    this.lang = 'en';
    this.locale = {
      en: 'en-US',
      ru: 'ru-RU',
    };
  }

  getCurrentDate() {
    const date = new Date();
    return date.toLocaleDateString(this.locale[this.lang], this.optionsDate);
  }

  getCurrentTime() {
    const date = new Date();
    return date.toLocaleTimeString([], this.optionsTime);
  }

  setLang(lang = 'en') {
    this.lang = lang;
  }
}
