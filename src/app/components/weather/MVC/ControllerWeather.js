import { eventBus } from '../../../service/eventBus';

export class ControllerWeather {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.isShown = null;
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
      const [, lang] = args;
      this.model.setLang(lang);

      if (this.isShown) {
        this.getWeather();
      } else {
        this.view.hideBlock();
        setTimeout(() => this.getWeather(), 1000);
      }
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
}
