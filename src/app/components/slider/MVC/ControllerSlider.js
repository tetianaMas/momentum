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
      if (this.model.getTags().length && this.model.sourse === 'unsp') {
        eventBus.post('add-tags', this.model.getTags());
      } else {
        await this.updateBg();
      }
    });

    eventBus.subscribe('add-tags', tags => {
      this.model.setTags(tags);
      this.view.setBlur();
      if (tags.join('') === '') {
        this.model.useDefaulApi();
        this.updateBg();
      } else {
        this.model.useApiWithTag();
        this.updateSearchBg();
      }

      eventBus.post('post-tags', this.model.getTags());
    });

    eventBus.subscribe('get-tags', () => {
      eventBus.post('post-tags', this.model.getTags());
    });

    eventBus.subscribe('no-serch-results', this.noResultsFound.bind(this));

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
    this.view.setBlur();

    const link = await this.model.getBgLink();
    this.view.setBg(await link);
    this.model.loadImages();
  }

  setBgImage() {
    this.view.setBtnDisabled();
    this.view.setBlur();

    const image = this.model.getBgImage();
    this.view.setBg(image);
  }

  async updateSearchBg() {
    this.view.setBtnDisabled();

    const link = await this.model.getSearchLink();
    this.view.setBg(await link);
    this.model.loadSearchImages();
  }

  noResultsFound() {
    this.model.useDefaulApi();
    this.updateBg();
  }
}
