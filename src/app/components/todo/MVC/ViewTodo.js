import { eventBus } from '../../../service/eventBus';
import { Utils } from '../../../helpers/Utils';

export class ViewTodo {
  constructor() {
    this.todoContainer = document.querySelector('.todo-container-js');
    this.todoBtn = document.querySelector('.todo-btn-js');
    this.todoList = document.querySelector('.todo-list-js');
    this.doneList = document.querySelector('.done-list-js');
    this.todoTitle = document.querySelector('.todo-title-js');
    this.doneTitle = document.querySelector('.todo-title-done-js');
    this.input = document.querySelector('.todo-input-js');
    this.todoTab = document.querySelector('.tab-todo-js');
    this.doneTab = document.querySelector('.tab-done-js');
  }

  render(tasks) {
    let templateActive = '';
    let templateDone = '';

    this.todoTitle.textContent = tasks.todoTitle;
    this.doneTitle.textContent = tasks.doneTitle;
    this.input.setAttribute('placeholder', tasks.placeholder);

    if (!tasks.props.length) {
      return;
    }
    tasks.props.forEach(task => {
      if (task.isActive) {
        templateActive += this.getTaskTemplate(
          task.text,
          task.id,
          task.isActive
        );
      } else {
        templateDone += this.getTaskTemplate(task.text, task.id, task.isActive);
      }
    });

    this.todoList.innerHTML = templateActive;
    this.doneList.innerHTML = templateDone;
  }

  getTaskTemplate(text, id, isActive = true) {
    return `<li class="todo-item ${
      isActive ? '' : 'todo-item-done'
    }" id="${id}">
      <input class="todo-item-checkbox todo-item-checkbox-js" type="checkbox" name="todo" ${
        isActive ? '' : 'checked disabled'
      }>
      <div class="todo-item-text todo-item-text-js">
        <input class="todo-item-input todo-item-input-js" type="text" value="${text}" disabled>
      </div>
      <div class="btn-container btn-container-js">
      ${
        isActive
          ? '<button class="todo-edit-btn todo-edit-btn-js"></button>'
          : ''
      }
        
        <button class="todo-delete-btn todo-delete-btn-js"></button>
      </div>
    </li>`;
  }

  renderTask(args) {
    const [val, id] = args;
    this.todoList.insertAdjacentHTML(
      'beforeend',
      this.getTaskTemplate(val, id, true)
    );
  }

  setEvents() {
    this.todoBtn.addEventListener('click', () => {
      this.toggleContainer();
      this.toggleBtn();
    });

    document.addEventListener('click', e => {
      if (
        !e.target.classList.contains('todo-btn-js') &&
        !e.target.closest('.todo-container-js')
      ) {
        this.closeContainer();
      }
    });

    this.todoTab.addEventListener('click', () => {
      this.doneTab.classList.remove('active');
      this.todoTab.classList.add('active');
      this.todoList.classList.remove('d-none');
      this.doneList.classList.add('d-none');
      this.input.removeAttribute('disabled');
    });

    this.doneTab.addEventListener('click', () => {
      this.todoTab.classList.remove('active');
      this.doneTab.classList.add('active');
      this.todoList.classList.add('d-none');
      this.doneList.classList.remove('d-none');
      this.input.setAttribute('disabled', '');
    });

    this.input.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        const value = this.input.value;
        if (value) {
          const id = Utils.getId();
          eventBus.post('add-todo', [value, id]);
          this.input.value = '';
        }
      }
    });

    this.todoContainer.addEventListener('click', e => {
      e.stopPropagation();
      if (e.target.classList.contains('todo-delete-btn-js')) {
        const id = e.target.closest('.todo-item').id;

        eventBus.post('remove-todo', id);
      }

      if (e.target.classList.contains('todo-edit-btn-js')) {
        const id = e.target.closest('.todo-item').id;

        eventBus.post('edit-todo', id);
      }

      if (e.target.classList.contains('todo-item-checkbox-js')) {
        const id = e.target.closest('.todo-item').id;

        eventBus.post('done-todo', id);
      }
    });
  }

  removeTask(id) {
    document.getElementById(id).remove();
  }

  editTask(id) {
    const taskItem = document.getElementById(id);
    const buttonsContainer = taskItem.querySelector('.btn-container-js');
    const taskInput = taskItem.querySelector('.todo-item-input-js');
    const originalValue = taskInput.value;
    buttonsContainer.classList.add('hidden');
    taskInput.removeAttribute('disabled');
    taskInput.scrollLeft = taskInput.scrollWidth;
    taskInput.setSelectionRange(taskInput.value.length, taskInput.value.length);
    taskInput.focus();
    taskInput.addEventListener('change', () => {
      const value = taskInput.value;
      if (value !== originalValue) {
        eventBus.post('save-task-text', [value, id]);
      }
      buttonsContainer.classList.remove('hidden');
      taskInput.blur();
    });
  }

  hideBlock() {
    this.todoContainer.classList.add('hidden');
    this.todoBtn.classList.add('hidden');
  }

  showBlock() {
    this.todoContainer.classList.remove('hidden');
    this.todoBtn.classList.remove('hidden');
  }

  toggleContainer() {
    this.todoContainer.classList.toggle('open');
    this.todoContainer.classList.toggle('closed');
  }

  toggleBtn() {
    this.todoBtn.classList.toggle('active-btn');
  }

  closeContainer() {
    this.todoContainer.classList.remove('open');
    this.todoContainer.classList.add('closed');
  }
}
