import { Utils } from '../../../helpers/Utils';

export class ModelQuotes {
  constructor() {
    this.lang = 'en';
    this.langProperties = {
      en: 'assets/quotes/quotes_eng.json',
      ru: 'assets/quotes/quotes_ru.json',
    };
  }

  async getQuotes() {
    const res = await fetch(this.getQuotesLink());

    return res.json();
  }

  getQuotesLink() {
    return this.langProperties[this.lang];
  }

  getRandomQuote(arr) {
    return arr[Utils.getRandomNum(arr.length - 1)];
  }

  setLang(lang = 'en') {
    this.lang = lang;
  }
}
