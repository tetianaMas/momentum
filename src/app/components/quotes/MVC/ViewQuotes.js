export class ViewQuotes {
  constructor() {
    this.container = document.querySelector('.quote-container-js');
    this.quoteContainer = document.querySelector('.quote-js');
    this.quoteWrapper = document.querySelector('.quote-wrapper-js');
    this.authorContainer = document.querySelector('.author-js');
    this.randomBtn = document.querySelector('.change-quote-js');
  }

  render(quote) {
    this.quoteContainer.textContent = quote.quote;
    this.authorContainer.textContent = quote.author;
  }

  hideBlock() {
    this.container.classList.add('hidden');
  }

  showBlock() {
    this.container.classList.remove('hidden');
  }

  animate() {
    this.quoteWrapper.classList.add('animate');
    this.randomBtn.classList.add('animate-btn', 'disabled');
    this.randomBtn.setAttribute('disabled', '');

    this.randomBtn.addEventListener('animationend', () => {
      setTimeout(() => {
        this.randomBtn.classList.remove('animate-btn', 'disabled');
        this.randomBtn.removeAttribute('disabled');
      }, 300);
    });
    setTimeout(() => this.quoteWrapper.classList.remove('animate'), 1000);
  }
}
