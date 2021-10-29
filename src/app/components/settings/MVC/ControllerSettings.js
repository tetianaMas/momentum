import { eventBus } from '../../../service/eventBus';

export class ControllerSettings {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    eventBus.subscribe('post-tags', tags => {
      this.model.setTags(tags);
    });
    eventBus.post('get-tags');

    eventBus.subscribe('lang-changed', args => {
      this.model.setLang(args[1]);
      this.view.renderProps(
        this.model.getActiveProps(args[0]),
        this.model.getTags()
      );
      this.view.renderCategories(this.model.getCategories());
    });

    this.model.initSettings();
    this.view.initEvents();

    this.view.settingsBtn.addEventListener('click', () => {
      this.view.toggleContainer();
      this.view.toggleBtn();
    });

    this.view.categoriesContainer.addEventListener('click', e => {
      if (e.target.tagName === 'LI') {
        this.view.toggleCategories(e.target);
        this.view.renderProps(
          this.model.getActiveProps(e.target.id),
          this.model.getTags()
        );
      }
    });

    this.view.propsList.addEventListener('click', e => {
      if (e.target.tagName === 'LI' || e.target.tagName === 'SPAN') {
        const id = e.target.id || e.target.parentElement.id;
        if (id.split('-')[0] === 'block') {
          this.view.toggleBlock(id);
          this.model.setActiveBlockProp(id);
        } else {
          this.view.toggleProps(id);
          this.model.setActiveProp(id);
        }
        this.model.saveToStorage();
      }
    });
  }
}
