import { Utils } from '../../../helpers/Utils';
import { storage } from '../../../service/storage/LocalStorage';

export class ModelGreeting {
  constructor() {
    this.lang = 'en';
    this.langProperties = {
      en: {
        placeholder: '[Enter name]',
      },
      ru: {
        placeholder: '[Введите имя]',
      },
    };
  }

  getGreeting() {
    let timeOfDay = Utils.getTimeOfDay();
    let greeting = Utils.getGreeting(this.lang, timeOfDay);

    return `${greeting}, `;
  }

  getName() {
    const savedName = storage.get('nameVal');

    return savedName ? savedName : '';
  }

  getPlaceholder() {
    return this.langProperties[this.lang].placeholder;
  }

  saveName(name) {
    storage.set('nameVal', name);
  }

  setLang(lang = 'en') {
    this.lang = lang;
  }
}
