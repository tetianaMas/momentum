export class Utils {
  static timeUpdate(cb) {
    const ONE_SECOND = 1000;

    setTimeout(cb, ONE_SECOND);
  }

  static getTimeOfDay() {
    const DAY_TIME_DURATION = 6;
    const DAY_TIME = {
      0: 'night',
      1: 'morning',
      2: 'afternoon',
      3: 'evening',
    };

    const date = new Date();
    const currentHour = date.getHours();
    const dayTimeNumber = Math.floor(currentHour / DAY_TIME_DURATION);

    return DAY_TIME[dayTimeNumber];
  }

  static getGreeting(lang, timeOfDay) {
    const DAY_TIME = {
      en: {
        night: 'Good night',
        morning: 'Good morning',
        afternoon: 'Good afternoon',
        evening: 'Good evening',
      },
      ru: {
        night: 'Спокойной ночи',
        morning: 'Доброе утро',
        afternoon: 'Добрый день',
        evening: 'Добрый вечер',
      },
    };

    return DAY_TIME[lang][timeOfDay];
  }

  static getRandomNum(max) {
    const randomNum = Math.round(Math.random() * max);
    return randomNum === 0 ? 1 : randomNum;
  }

  static getLandscapeOrientationImg(images) {
    return images.filter(
      img =>
        img.width_k > img.height_k &&
        img.width_k === 2048 &&
        img.height_k === 1365
    );
  }

  static getId() {
    const date = new Date();
    return Math.round(Math.random() * 100000) + date.getTime();
  }
}
