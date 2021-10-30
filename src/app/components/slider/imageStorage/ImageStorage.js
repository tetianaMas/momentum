import { Utils } from '../../../helpers/Utils';

export class ImageStorage {
  constructor() {
    this.collection = [];
    this.randomNum = Utils.getRandomNum(20);
  }

  loadImages() {
    const rawCollection = this.collection;
    this.removeCollection();

    rawCollection.forEach(link => {
      const loader = new Promise(resolve => {
        const img = new Image();
        img.src = link;

        img.addEventListener('load', () => {
          resolve(img);
        });
      });

      loader
        .then(img => {
          this.collection.push(img.src);
        })
        .catch(err => console.log(err));
    });
  }

  getRandomImage() {
    this.randomNum = Utils.getRandomNum(this.collection.length - 1);
    return this.collection[this.randomNum];
  }

  getImage() {
    return this.collection[this.randomNum];
  }

  getNextImg() {
    this.randomNum++;
    if (this.randomNum > this.collection.length - 1) {
      this.randomNum = 0;
    }

    this.getImage();
  }

  getPrevImg() {
    this.randomNum--;
    if (this.randomNum < 0) {
      this.randomNum = this.collection.length - 1;
    }

    this.getImage();
  }

  removeCollection() {
    this.collection = [];
  }
}
