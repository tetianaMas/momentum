export class ViewSlider {
  constructor() {
    this.nextSliderBtn = document.querySelector('.slide-next-js');
    this.prevSliderBtn = document.querySelector('.slide-prev-js');
    this.bgImg = document.getElementById('bg-img');
    this.bgImgCopy = document.getElementById('bg-copy');
    this.initEvents();
    this.isCopyShown = false;
  }

  setBg(link) {
    const img = new Image();
    img.src = link;

    img.addEventListener('load', () => {
      const src = `url("${img.src}")`;
      if (this.bgImg.style.backgroundImage === src) {
        this.showImage();
        return;
      }
      if (!this.bgImg.style.backgroundImage || this.isCopyShown) {
        this.isCopyShown = false;
        this.bgImg.style.backgroundImage = src;
        this.bgImgCopy.classList.remove('visible');
        this.bgImg.classList.add('visible');
      } else {
        this.isCopyShown = true;
        this.bgImgCopy.style.backgroundImage = src;
        this.bgImg.classList.remove('visible');
        this.bgImgCopy.classList.add('visible');
      }
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
    this.bgImg.classList.add('blur');
  }

  removeBlur() {
    this.bgImg.classList.remove('blur');
  }

  initEvents() {
    this.bgImg.addEventListener('transitionend', () => {
      this.showImage();
    });

    this.bgImgCopy.addEventListener('transitionend', () => {
      this.showImage();
    });
  }

  showImage() {
    setTimeout(() => {
      this.removeBtnDisabled();
      this.removeBlur();
    }, 500);
  }
}
