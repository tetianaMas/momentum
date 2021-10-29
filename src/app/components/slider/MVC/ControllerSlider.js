import { eventBus } from '../../../service/eventBus';

export class ControllerSlider {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    eventBus.subscribe('img-changed', async args => {
      const [, val] = args;
      this.model.setSourse(val);
      this.model.removeFromFlickrCollection();
      this.model.removeFromUnspCollection();
      this.view.setBg(await this.model.getBgLink());
    });

    eventBus.subscribe('add-tags', async tags => {
      this.model.setTags(tags);
      this.model.removeFromFlickrCollection();
      this.model.removeFromUnspCollection();
      this.view.setBg(await this.model.getBgLink());
      eventBus.post('post-tags', this.model.getTags());
    });

    eventBus.subscribe('get-tags', () => {
      eventBus.post('post-tags', this.model.getTags());
    });

    this.view.nextSliderBtn.addEventListener('click', async () => {
      this.model.randomNum++;
      if (this.model.randomNum > 20) {
        this.model.randomNum = 1;
      }
      this.view.setBtnDisabled();
      this.view.setBg(await this.model.getBgLink());
    });

    this.view.prevSliderBtn.addEventListener('click', async () => {
      this.model.randomNum--;
      if (this.model.randomNum < 1) {
        this.model.randomNum = 20;
      }
      this.view.setBtnDisabled();
      this.view.setBg(await this.model.getBgLink());
    });

    this.model.removeFromFlickrCollection();
    this.model.removeFromUnspCollection();
    this.view.setTransitionEvent();
  }
}
