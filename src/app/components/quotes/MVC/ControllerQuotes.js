import { eventBus } from '../../../service/eventBus';

export class ControllerQuotes {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.isShown = null;
  }

  init() {
    eventBus.subscribe('block-quote-changed', isShown => {
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
      if (!this.isShown) {
        this.view.hideBlock();
        setTimeout(() => this.setQuote(), 1000);
      } else {
        this.setQuote();
      }
    });
    this.view.randomBtn.addEventListener('click', this.setQuote.bind(this));
  }

  setQuote() {
    this.view.animate();

    this.model
      .getQuotes()
      .then(res => {
        const quote = this.model.getRandomQuote(res);
        this.view.render(quote);
      })
      .catch(err => console.log(err.message));
  }
}
