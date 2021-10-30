import { eventBus } from '../../../service/eventBus';

export class ControllerSlider {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    this.model.loadImages();
    eventBus.subscribe('img-changed', async args => {
      const [, val] = args;
      this.model.setSourse(val);
      await this.updateBg();
    });

    eventBus.subscribe('add-tags', tags => {
      this.model.setTags(tags);
      this.updateBg();
      eventBus.post('post-tags', this.model.getTags());
    });

    eventBus.subscribe('get-tags', () => {
      eventBus.post('post-tags', this.model.getTags());
    });

    this.view.nextSliderBtn.addEventListener('click', () => {
      this.model.getNextImg();
      this.setBgImage();
    });

    this.view.prevSliderBtn.addEventListener('click', () => {
      this.model.getPrevImg();
      this.setBgImage();
    });
  }

  async updateBg() {
    this.view.setBtnDisabled();
    const link = await this.model.getBgLink();
    this.view.setBg(await link);
  }

  setBgImage() {
    this.view.setBtnDisabled();
    const image = this.model.getBgImage();
    this.view.setBg(image);
  }
}
