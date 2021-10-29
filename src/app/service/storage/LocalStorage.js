class LocalStorage {
  constructor() {
    this.prefix = 'tetianaMas-LS-prop-';
  }
  set(key, value) {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  get(key) {
    return JSON.parse(localStorage.getItem(this.prefix + key));
  }
}

export const storage = new LocalStorage();
