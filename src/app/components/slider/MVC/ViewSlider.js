export class ViewSlider {
  constructor() {
    this.nextSliderBtn = document.querySelector('.slide-next-js');
    this.prevSliderBtn = document.querySelector('.slide-prev-js');
    this.bgContainer = document.querySelector('.bg-js');
    this.bgImg = document.getElementById('bg-img');
    this.bgImgCopy = document.getElementById('bg-copy');
    this.initEvents();
    this.timeouts = [];
  }

  setBg(link) {
    this.clearContainer();
    const img = new Image();
    img.src = link;
    const bgImgContainer = document.createElement('div');
    bgImgContainer.classList.add('bg-img');

    img.addEventListener('load', () => {
      const src = `url("${img.src}")`;
      if (this.bgImg.style.backgroundImage !== src) {
        bgImgContainer.style.backgroundImage = src;
        this.bgImg.classList.remove('visible');
        this.bgContainer.append(bgImgContainer);

        const timeout = setTimeout(() => {
          this.bgImg = bgImgContainer;
          this.bgImg.classList.add('visible');
        }, 100);
        this.timeouts.push(timeout);
      }
      this.showImage();
    });

    this.clearTimeouts(this.timeouts);
  }

  clearContainer() {
    const container = [...this.bgContainer.children];
    if (container.length) {
      container.forEach(elem => {
        if (elem !== this.bgImg) {
          elem.remove();
        }
      });
    }
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
  }

  clearTimeouts() {
    const arr = this.timeouts;
    arr.forEach((timer, index) => {
      clearTimeout(timer);
      this.timeouts.splice(index, 1);
    });
  }

  showImage() {
    const timeout = setTimeout(() => {
      this.removeBtnDisabled();
      this.removeBlur();
    }, 500);
    this.timeouts.push(timeout);
  }
}
