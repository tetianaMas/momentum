import { storage } from '../../../service/storage/LocalStorage';
import { GitImageStorage } from '../imageStorage/GitImageStorage';
import { UnspImageStorage } from '../imageStorage/UnspImageStorage';
import { UnspImageSearchStorage } from '../imageStorage/UnspImageSearchStorage';

export class ModelSlider {
  constructor() {
    this.sourse = 'git';
    this.tags = [];
    this.apiLinks = {
      git: new GitImageStorage(20),
      unsp: new UnspImageStorage(),
    };
  }

  getBgLink() {
    return this.apiLinks[this.sourse].getLink();
  }

  getSearchLink() {
    const link = this.apiLinks['unsp'].getSearchLink(this.getTags());
    this.apiLinks['unsp'].loadImages();
    return link;
  }

  async loadImages() {
    for (let val of Object.values(this.apiLinks)) {
      val.removeCollection();
      await val.createLinks();
      val.loadImages();
    }
  }

  async loadSearchImages() {
    this.apiLinks.unsp.loadImages();
  }

  getBgImage() {
    return this.apiLinks[this.sourse].getImage();
  }

  setSourse(src) {
    this.sourse = src;
  }

  setTags(tags) {
    this.tags = tags;
    this.saveTags();
  }

  useApiWithTag() {
    if (this.sourse === 'unsp') {
      this.apiLinks['unsp'] = new UnspImageSearchStorage();
    }
  }

  useDefaulApi() {
    if (this.sourse === 'unsp') {
      this.apiLinks['unsp'] = new UnspImageStorage();
    }
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
