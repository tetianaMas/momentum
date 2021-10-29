import { Utils } from '../../../helpers/Utils';
import { eventBus } from '../../../service/eventBus';

export class ControllerGreeting {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.isShown = null;
  }

  init() {
    eventBus.subscribe('block-greet-changed', isShown => {
      this.isShown = isShown;
      if (isShown) {
        this.view.showBlock();
      } else {
        this.view.hideBlock();
      }
    });

    eventBus.subscribe('lang-changed', args => {
      this.model.setLang(args[1]);
      if (!this.isShown) {
        this.view.hideBlock();
        setTimeout(() => this.showGreeting(), 1000);
      } else {
        this.showGreeting();
      }
    });
  }

  showGreeting() {
    this.view.render(this.model.getGreeting());
    if (!this.model.getName()) {
      this.view.inputName.setAttribute(
        'placeholder',
        this.model.getPlaceholder()
      );
    } else {
      this.view.inputName.value = this.model.getName();
    }
    this.view.inputName.addEventListener('input', () => {
      this.model.saveName(this.view.inputName.value);
    });
    Utils.timeUpdate(this.showGreeting.bind(this));
  }
}
