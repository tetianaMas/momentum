import { Utils } from '../../../helpers/Utils';
import { storage } from '../../../service/storage/LocalStorage';

import { GitImageStorage } from '../imageStorage/GitImageStorage';
import { UnspImageStorage } from '../imageStorage/UnspImageStorage';

export class ModelSlider {
  constructor() {
    this.sourse = 'git';
    this.tags = [Utils.getTimeOfDay()];
    this.apiLinks = {
      git: new GitImageStorage(20),
      unsp: new UnspImageStorage(),
    };
  }

  getBgLink() {
    return this.apiLinks[this.sourse].getLink(Utils.getTimeOfDay());
  }

  async loadImages() {
    this.apiLinks['git'].createLinks();
    for (let val of Object.values(this.apiLinks)) {
      val.loadImages();
    }
  }

  getBgImage() {
    return this.apiLinks[this.sourse].getImage();
  }

  setSourse(src) {
    this.sourse = src;
  }

  setTags(tags) {
    this.removeFromUnspCollection();
    this.tags = tags;
    this.saveTags();
  }

  saveTags() {
    storage.set('tags', this.tags);
  }

  getTags() {
    const tags = storage.get('tags');
    if (tags) {
      this.tags = tags;
    }
    return this.tags;
  }

  getNextImg() {
    this.apiLinks[this.sourse].getNextImg();
  }

  getPrevImg() {
    this.apiLinks[this.sourse].getPrevImg();
  }
}
