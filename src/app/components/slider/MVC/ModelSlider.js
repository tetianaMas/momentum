import { storage } from '../../../service/storage/LocalStorage';
import { GitImageStorage } from '../imageStorage/GitImageStorage';
import { UnspImageStorage } from '../imageStorage/UnspImageStorage';
import { UnspImageSearchStorage } from '../imageStorage/UnspImageSearchStorage';

export class ModelSlider {
  constructor() {
    this.sourse = 'git';
    this.tags = [];
    this.apiLinks = {
      git: new GitImageStorage(10),
      unsp: new UnspImageStorage(),
    };
  }

  getBgLink() {
    return this.apiLinks[this.sourse].getLink();
  }

  getSearchLink() {
    const link = this.apiLinks['unsp'].getLink(this.getTags());
    this.apiLinks['unsp'].loadImages();
    return link;
  }

  async loadImages() {
    const defaultSrc = this.isDefaultApi();
    if (defaultSrc) {
      await this.loadUnspImg();
    }

    this.loadGitImg();
  }

  async loadUnspImg() {
    if (this.sourse === 'unsp') {
      const src = this.apiLinks['unsp'];
      src.removeCollection();
      await src.createLinks();
      src.loadImages();
    }
  }

  loadGitImg() {
    if (this.sourse === 'git') {
      const src = this.apiLinks['git'];
      src.removeCollection();
      src.createLinks();
      src.loadImages();
    }
  }

  loadSearchImages() {
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

  isDefaultApi() {
    return this.apiLinks['unsp'] instanceof UnspImageStorage;
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
