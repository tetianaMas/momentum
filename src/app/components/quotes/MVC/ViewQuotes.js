export class ViewQuotes {
  constructor() {
    this.container = document.querySelector('.quote-container-js');
    this.quoteContainer = document.querySelector('.quote-js');
    this.quoteWrapper = document.querySelector('.quote-wrapper-js');
    this.authorContainer = document.querySelector('.author-js');
    this.randomBtn = document.querySelector('.change-quote-js');
    this.timeouts = [];
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
    this.clearTimeouts();
    let timer1, timer2;
    this.quoteWrapper.classList.add('animate');
    this.randomBtn.classList.add('animate-btn', 'disabled');
    this.randomBtn.setAttribute('disabled', '');

    this.randomBtn.addEventListener('animationend', () => {
      timer1 = setTimeout(() => {
        this.randomBtn.classList.remove('animate-btn', 'disabled');
        this.randomBtn.removeAttribute('disabled');
      }, 300);
    });
    timer2 = setTimeout(
      () => this.quoteWrapper.classList.remove('animate'),
      1000
    );
    this.timeouts.push(timer1, timer2);
  }

  clearTimeouts() {
    const arr = this.timeouts;
    arr.forEach((timer, index) => {
      clearTimeout(timer);
      this.timeouts.splice(index, 1);
    });
  }
}
