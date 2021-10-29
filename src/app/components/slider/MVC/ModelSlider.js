import { Utils } from '../../../helpers/Utils';
import { storage } from '../../../service/storage/LocalStorage';
export class ModelSlider {
  constructor() {
    this.sourse = 'git';
    this.sourseLinks = {
      git: 'https://raw.githubusercontent.com/tetianamas/stage1-tasks/assets/images/',
      unsp: 'https://api.unsplash.com/photos/random?orientation=landscape&content_filter=low&page=1&per_page=30&count=30',
      fli: 'https://www.flickr.com/services/rest/?method=flickr.photos.search&extras=url_k&format=json&nojsoncallback=1&page=1&per_page=300&tag_mode=all&safe_search=1&content_type=1&accuracy=1',
    };
    this.tags = [Utils.getTimeOfDay()];
    this.unspKey = [
      'DM8RBkZ_j-ovHc1CDHmSRWsHkj4e4xu1Sz8JOLGuOSE',
      'VtXyeAcvzOtVBYmcGjjkCCRehaLExVj6IJS6_Y3on7o',
      'Zn1_cnk4Cr49JLkSC-iHYn3BqJPMgwxeptJM7gHG5FM',
    ];
    this.unspKeyIndex = 0;
    this.imgUnspQuery =
      '&w=2048&h=1365&fit=crop&crop=edges&lossless=0&auto=format&fm=avif&q=70';
    this.flickrKey = '986c0b59818206e58455ce35e29eadb3';
    this.flickrCollection = [];
    this.unsplashCollection = [];
    this.randomNum = Utils.getRandomNum(20);
  }

  async getBgLink() {
    if (this.sourse === 'git') {
      return this.getGitImg();
    } else if (this.sourse === 'unsp') {
      if (this.unsplashCollection.length) {
        return this.getFromUnsplashCollection();
      } else {
        return this.getUnsplashImg();
      }
    } else if (this.flickrCollection.length) {
      return this.getFromFlickrCollection();
    } else {
      return this.getFlickrImg();
    }
  }

  getGitImg() {
    const dayTime = Utils.getTimeOfDay();

    return `${this.sourseLinks[this.sourse]}${dayTime}/${
      this.randomNum < 10 ? '0' + this.randomNum : this.randomNum
    }.jpg`;
  }

  async getUnsplashImg() {
    const tags = this.getTags().length
      ? '&query=' + this.getTags().join(',')
      : '';
    this.unspKeyIndex++;
    if (this.unspKeyIndex >= this.unspKey.length) {
      this.unspKeyIndex = 0;
    }

    const link = `${this.sourseLinks[this.sourse]}&client_id=${
      this.unspKey[this.unspKeyIndex]
    }${tags}`;

    await this.getImgFromApi(link)
      .then(res => this.unsplashCollection.push(...res))
      .catch(err => console.log(err));

    return this.getFromUnsplashCollection();
  }

  getFromUnsplashCollection() {
    if (!this.unsplashCollection.length) {
      return;
    }

    return this.getRandomImage(this.unsplashCollection, this.imgUnspQuery);
  }

  getRandomImage(images, imgQuery) {
    const randomNum = Utils.getRandomNum(images.length - 1);
    const img = images[randomNum];

    if (img) {
      return img.url_k ? img.url_k : img.urls.raw + imgQuery;
    }
  }

  async getFlickrImg() {
    const tags = this.getTags().length
      ? '&tags=' + this.getTags().join(',')
      : '';
    const link = `${this.sourseLinks[this.sourse]}&api_key=${
      this.flickrKey
    }${tags}`;

    await this.getImgFromApi(link)
      .then(res => this.flickrCollection.push(...res.photos.photo))
      .catch(err => console.log(err));

    return this.getFromFlickrCollection();
  }

  getFromFlickrCollection() {
    if (!this.flickrCollection.length) {
      return;
    }

    const images = Utils.getLandscapeOrientationImg(this.flickrCollection);

    return this.getRandomImage(images);
  }

  removeFromFlickrCollection() {
    this.flickrCollection = [];
  }

  removeFromUnspCollection() {
    this.unsplashCollection = [];
  }

  async getImgFromApi(link) {
    try {
      const res = await fetch(link);

      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  setSourse(src = 'git') {
    this.sourse = src;
  }

  setTags(tags) {
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
}
