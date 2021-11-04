import { eventBus } from '../../../service/eventBus';

export class ControllerWeather {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.isShown = null;
    this.timeouts = [];
  }

  init() {
    eventBus.subscribe('block-weather-changed', isShown => {
      this.isShown = isShown;
      if (isShown) {
        this.view.showBlock();
      } else {
        this.view.hideBlock();
      }
    });

    eventBus.subscribe('lang-changed', args => {
      this.clearTimeouts();

      let timer;
      const [, lang] = args;
      this.model.setLang(lang);

      if (this.isShown) {
        this.getWeather();
      } else {
        this.view.hideBlock();
        timer = setTimeout(() => this.getWeather(), 1000);
      }
      this.timeouts.push(timer);
    });

    this.view.cityContainer.addEventListener('change', () => {
      let val = this.view.cityContainer.value;
      if (!val) {
        return;
      }
      this.model.setCity(val);
      this.getWeather();
    });
  }

  getWeather() {
    this.model
      .getWeatherData()
      .then(res => {
        this.view.render(res, this.model.getLangProperties());
        this.model.setWeatherData(res);
      })
      .catch(() => {
        this.model.setCity(this.model.getDefaultCity());
        this.view.renderError(this.model.getLangProperties());
      });
  }

  clearTimeouts() {
    const arr = this.timeouts;
    arr.forEach((timer, index) => {
      clearTimeout(timer);
      this.timeouts.splice(index, 1);
    });
  }
}
