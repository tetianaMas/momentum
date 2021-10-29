import { storage } from '../../../service/storage/LocalStorage';
import { eventBus } from '../../../service/eventBus';
import { props } from '../props/props';

export class ModelSettings {
  constructor() {
    this.lang = 'en';
    this.langProperties = props;
    this.tags = [];
  }

  initSettings() {
    const settings = storage.get('settings');
    if (settings) {
      this.langProperties = settings;
    }
    this.setProps();
  }

  setProps() {
    const langProps = this.getActiveProps('lang');
    const imgProps = this.getActiveProps('img');
    const blockProps = this.getActiveProps('block');

    blockProps.props.forEach(elem =>
      eventBus.post(`${elem.id}-changed`, elem.checked)
    );

    [imgProps, langProps].forEach(item => {
      const checkedProps = item.props.filter(prop => prop.checked === true);
      checkedProps.forEach(checkedProp => this.postEvent(checkedProp.id));
    });
  }

  getProps() {
    return this.langProperties[this.lang];
  }

  getTags() {
    const tags = storage.get('tags');
    if (tags) {
      this.tags = tags;
    }

    return this.tags ? this.tags : '';
  }

  setTags(tags) {
    this.tags = tags;
  }

  getCategories() {
    return this.langProperties[this.lang].categories;
  }

  setLang(lang = 'en') {
    this.lang = lang;
  }

  getActiveProps(id = 'lang') {
    return this.langProperties[this.lang][id];
  }

  setActiveProp(id) {
    const category = id.split('-')[0];
    const value = id.split('-')[1];

    for (let [key, val] of Object.entries(this.langProperties)) {
      if (key === value) {
        val.isActive = true;
      } else {
        val.isActive = false;
      }
      const locale = val;
      const currProps = locale[category].props;
      const listItem = currProps.find(prop => prop.id === id);

      currProps.forEach(prop => (prop.checked = false));
      listItem.checked = true;
    }
    this.postEvent(id);
  }

  setActiveBlockProp(id) {
    const category = id.split('-')[0];
    let isHidden = false;

    for (let val of Object.values(this.langProperties)) {
      const locale = val;
      const currProps = locale[category].props;
      const listItem = currProps.find(prop => prop.id === id);

      listItem.checked = !listItem.checked;
      isHidden = listItem.checked;
    }
    eventBus.post(`${id}-changed`, isHidden);
  }

  postEvent(id) {
    const category = id.split('-')[0];
    const value = id.split('-')[1];
    eventBus.post(`${category}-changed`, [category, value]);
  }

  saveToStorage() {
    storage.set('settings', this.langProperties);
  }
}
