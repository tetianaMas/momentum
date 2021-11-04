import { eventBus } from '../../../service/eventBus';

export class ViewSettings {
  constructor() {
    this.settingsContainer = document.querySelector('.settings-container-js');
    this.settingsBtn = document.querySelector('.settings-btn-js');
    this.propsTitle = document.querySelector('.props-title-js');
    this.propsList = document.querySelector('.list-js');
    this.categoriesContainer = document.querySelector('.categories-js');
    this.tagsInput = null;
    this.errorMes = '';
  }

  initEvents() {
    document.addEventListener('click', e => {
      if (
        !e.target.classList.contains('settings-btn-js') &&
        !e.target.closest('.settings-container-js')
      ) {
        this.closeContainer();
      }
    });
  }

  renderProps(elems, tags) {
    this.propsTitle.textContent = elems.title;
    let isInput = false;
    let isGit = false;
    let addText = '';
    let template = '';

    elems.props.forEach(elem => {
      template += `<li class="list-item ${elem.checked ? 'checked' : ''}" id="${
        elem.id
      }">${elem.text}<span class="toggle-slider ${
        elem.checked ? 'toggle-slider-active' : ''
      }"></span></li>`;

      if (elem.checked && elem.id === 'img-git') {
        isGit = true;
      }

      if (elem.tags) {
        isInput = true;
        addText = elem.addText;
        this.errorMes = elem.errorMes;
      }
    });

    if (isInput) {
      template += `<p class="settings-addtext settings-addtext-js ${
        isGit ? 'hidden' : ''
      }">${addText}</p>
      <p class="message message-js hidden">${this.errorMes}</p>
      <input class="tags tags-js" maxlength="15" type="text" ${
        isGit ? 'disabled' : ''
      } value="${tags.join(' ')}">`;
    }
    this.propsList.innerHTML = template;
    this.setUpInput();
  }

  setUpInput() {
    this.tagsInput = document.querySelector('.tags-js');
    if (!this.tagsInput) {
      return;
    }

    this.tagsInput.addEventListener('change', () => {
      if (this.isValidTags(this.tagsInput.value)) {
        const currTags = this.tagsInput.value.split(' ');
        eventBus.post('add-tags', currTags);
      } else {
        this.showInvalidMessage();
      }
    });

    this.tagsInput.addEventListener('input', () => {
      this.removeInvalidMessage();
    });
  }

  isValidTags(tags) {
    const regex = /^[a-zA-Z\s,]*$/;
    return regex.test(tags);
  }

  showInvalidMessage() {
    this.tagsInput.classList.add('invalid');
    const messageContainer = document.querySelector('.message-js');
    messageContainer.textContent = this.errorMes;
    messageContainer.classList.remove('hidden');
  }

  removeInvalidMessage() {
    this.tagsInput.classList.remove('invalid');
    document.querySelector('.message-js').classList.add('hidden');
  }

  renderCategories(elems) {
    const categories = document.querySelectorAll('.categories-item-js');

    elems.forEach((elem, index) => {
      categories[index].textContent = elem;
    });
  }

  toggleContainer() {
    this.settingsContainer.classList.toggle('open');
    this.settingsContainer.classList.toggle('closed');
  }

  toggleBtn() {
    this.settingsBtn.classList.toggle('active-btn');
  }

  closeContainer() {
    this.settingsContainer.classList.remove('open');
    this.settingsContainer.classList.add('closed');
  }

  toggleCategories(itemClicked) {
    const items = document.querySelectorAll('.categories-item-js');
    items.forEach(item => item.classList.remove('active'));

    itemClicked.classList.add('active');
  }

  toggleProps(id) {
    const input = document.querySelector('.tags-js');
    if (input && id !== 'img-git') {
      document.querySelector('.settings-addtext-js').classList.remove('hidden');
      input.removeAttribute('disabled');
    } else if (input) {
      document.querySelector('.settings-addtext-js').classList.add('hidden');
      input.setAttribute('disabled', '');
    }
    const currentElem = document.getElementById(id).firstElementChild;
    const items = document.querySelectorAll('.toggle-slider');
    items.forEach(item => item.classList.remove('toggle-slider-active'));

    currentElem.classList.add('toggle-slider-active');
  }

  toggleBlock(id) {
    const item = document.getElementById(id);
    item.classList.toggle('checked');

    item.firstElementChild.classList.toggle('toggle-slider-active');
  }

  renderNoResultsError(data) {
    const messageContainer = document.querySelector('.message-js');
    messageContainer.textContent = data.noResultsError;
    messageContainer.classList.remove('hidden');
  }
}
