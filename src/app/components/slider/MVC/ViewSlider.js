export class ViewSlider {
  constructor() {
    this.nextSliderBtn = document.querySelector('.slide-next-js');
    this.prevSliderBtn = document.querySelector('.slide-prev-js');
    this.bgImg = document.getElementById('bg-img');
  }

  setBg(link) {
    const img = new Image();
    img.src = link;

    img.addEventListener('load', () => {
      const src = `url("${img.src}")`;
      if (this.bgImg.style.backgroundImage !== src) {
        this.bgImg.style.backgroundImage = src;
        this.bgImg.classList.remove('visible');
        this.bgImg.classList.add('visible');
      }
      setTimeout(() => {
        this.removeBtnDisabled();

        this.removeBlur();
      }, 300);
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

  setBlur() {
    this.bgImg.style.filter = 'blur(10px)';
  }

  removeBlur() {
    this.bgImg.style.filter = 'none';
  }
}
