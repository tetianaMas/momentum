import { propsApi } from '../props/propsApi';
import { ImageStorage } from './ImageStorage';
import { apiService } from '../../../service/apiService/ApiService';
import { eventBus } from '../../../service/eventBus';

export class UnspImageSearchStorage extends ImageStorage {
  constructor() {
    super();
    this.api = propsApi.unspApiSearch;
    this.key = propsApi.unspKey;
    this.unspQuery = propsApi.unspQuery;
  }

  async createLinks(tags) {
    this.removeCollection();
    const tagsQuery = tags ? '&query=' + tags.join(',') : '';
    const link = this.api + '&client_id=' + this.key + tagsQuery;

    await apiService
      .get(link)
      .then(res => {
        if (!res.results.length) {
          this.noResults();
        }
        res.results.forEach(item => {
          this.collection.push(item.urls.raw + this.unspQuery);
        });
      })
      .catch(err => console.log(err));
  }

  async getLink(tags) {
    if (!this.collection.length) {
      await this.createLinks(tags);
    }

    return this.getNextImg();
  }

  noResults() {
    eventBus.post('no-serch-results');
  }
}
