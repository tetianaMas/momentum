import { Utils } from '../../../helpers/Utils';
import { propsApi } from '../props/propsApi';
import { ImageStorage } from './ImageStorage';
import { apiService } from '../../../service/apiService/ApiService';

export class UnspImageStorage extends ImageStorage {
  constructor() {
    super();
    this.api = propsApi.unspApiCollections;
    this.key = propsApi.unspKey;
    this.unspQuery = propsApi.unspQuery;
  }

  async createLinks() {
    const dayTime = Utils.getTimeOfDay();
    this.removeCollection();

    const link = this.api[dayTime] + '&client_id=' + this.key;

    await apiService
      .get(link)
      .then(res => {
        res.forEach(item => {
          this.collection.push(item.urls.raw + this.unspQuery);
        });
      })
      .catch(err => console.log(err));
  }

  async getLink() {
    if (!this.collection.length) {
      await this.createLinks();
    }

    return this.collection[this.randomNum];
  }
}
