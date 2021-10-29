import { Utils } from '../../../helpers/Utils';
import { eventBus } from '../../../service/eventBus';

export class ControllerDate {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.isShownDate = null;
    this.isShownTime = null;
  }

  init() {
    eventBus.subscribe('block-date-changed', isShown => {
      this.isShownDate = isShown;
      if (isShown) {
        this.view.showBlockDate();
      } else {
        this.view.hideBlockDate();
      }
    });

    eventBus.subscribe('block-time-changed', isShown => {
      this.isShownTime = isShown;

      if (isShown) {
        this.view.showBlockTime();
      } else {
        this.view.hideBlockTime();
      }
    });

    eventBus.subscribe('lang-changed', args => {
      this.model.setLang(args[1]);
      this.showTime();
    });
  }

  showTime() {
    if (!this.isShownDate) {
      this.view.hideBlockDate();
      setTimeout(() => this.view.renderDate(this.model.getCurrentDate()), 1000);
    } else {
      this.view.renderDate(this.model.getCurrentDate());
    }

    if (!this.isShownTime) {
      this.view.hideBlockTime();
      setTimeout(() => this.view.renderTime(this.model.getCurrentTime()), 1000);
    } else {
      this.view.renderTime(this.model.getCurrentTime());
    }
    Utils.timeUpdate(this.showTime.bind(this));
  }
}
