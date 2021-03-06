import { Utils } from '../../../helpers/Utils';
import { propsApi } from '../props/propsApi';
import { ImageStorage } from './ImageStorage';

export class GitImageStorage extends ImageStorage {
  constructor(imagesAmount) {
    super();
    this.api = propsApi.gitApi;
    this.imagesAmount = imagesAmount;
  }

  createLinks() {
    const dayTime = Utils.getTimeOfDay();

    for (let i = this.randomNum; i <= this.imagesAmount; i++) {
      this.collection.push(this.getLinkTemplate(dayTime, i));
    }
    for (let k = 1; k <= this.randomNum - 1; k++) {
      this.collection.push(this.getLinkTemplate(dayTime, k));
    }
  }

  getLink() {
    if (!this.collection.length) {
      this.createLinks();
    }

    return this.getNextImg();
  }

  getLinkTemplate(dayTime = Utils.getTimeOfDay(), num = this.randomNum) {
    return `${this.api}${dayTime}/${num < 10 ? '0' + num : num}.jpg`;
  }

  getCollection() {
    return this.collection;
  }
}
