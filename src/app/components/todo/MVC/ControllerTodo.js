import { eventBus } from '../../../service/eventBus';

export class ControllerTodo {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    eventBus.subscribe('lang-changed', args => {
      this.model.setLang(args[1]);
      this.view.render(this.model.getProps());
    });

    eventBus.subscribe('block-todo-changed', isShown => {
      if (isShown) {
        this.view.showBlock();
      } else {
        this.view.hideBlock();
      }
    });

    eventBus.subscribe('add-todo', value => {
      this.model.addTodo(value);
      this.view.renderTask(value);
    });

    eventBus.subscribe('remove-todo', id => {
      this.model.removeTodo(id);
      this.view.removeTask(id);
    });

    eventBus.subscribe('edit-todo', id => {
      this.view.editTask(id);
    });

    eventBus.subscribe('save-task-text', args => this.model.editTodo(args));

    eventBus.subscribe('done-todo', id => {
      this.model.doneTodo(id);
      this.view.render(this.model.getProps());
    });

    this.view.setEvents();
  }
}
