export class ViewSlider {
  constructor(model) {
    this.model = model;
    this.nextSliderBtn = document.querySelector('.slide-next-js');
    this.prevSliderBtn = document.querySelector('.slide-prev-js');
  }

  setBg(link) {
    const img = new Image();
    img.src = link;
    img.addEventListener('load', () => {
      document.body.style.backgroundImage = `url(${img.src})`;
    });
  }

  setBtnDisabled() {
    this.nextSliderBtn.classList.add('disabled');
    this.prevSliderBtn.classList.add('disabled');
  }

  removeBtnDisabled() {
    this.nextSliderBtn.classList.remove('disabled');
    this.prevSliderBtn.classList.remove('disabled');
  }

  setTransitionEvent() {
    document.body.addEventListener('transitionend', e => {
      if (e.target.tagName === 'BODY') {
        setTimeout(() => this.removeBtnDisabled(), 300);
      }
    });
  }
}
