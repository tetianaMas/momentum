import { Utils } from '../../../helpers/Utils';
import { props } from '../props/props';
import { storage } from '../../../service/storage/LocalStorage';

export class ModelTodo {
  constructor() {
    this.lang = 'en';
    this.props = props;
  }

  setLang(lang) {
    this.lang = lang;
  }

  getProps() {
    const values = storage.get('todos');
    if (values) {
      this.props = values;
    }
    return this.props[this.lang];
  }

  addTodo(args) {
    const [text, id] = args;

    for (let value of Object.values(this.props)) {
      value.props.push({ text, isActive: true, id });
    }

    storage.set('todos', this.props);
  }

  removeTodo(id) {
    for (let val of Object.values(this.props)) {
      const task = val.props.find(todo => String(todo.id) === String(id));
      if (task) {
        val.props.splice(val.props.indexOf(task), 1);
      }
    }

    storage.set('todos', this.props);
  }

  editTodo(args) {
    const [text, id] = args;

    for (let value of Object.values(this.props)) {
      const task = value.props.find(todo => String(todo.id) === String(id));
      task.text = text;
    }

    storage.set('todos', this.props);
  }

  doneTodo(id) {
    for (let value of Object.values(this.props)) {
      const task = value.props.find(todo => String(todo.id) === String(id));
      task.isActive = false;
    }

    storage.set('todos', this.props);
  }
}
