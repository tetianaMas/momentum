import { ViewTodo } from './MVC/ViewTodo';
import { ModelTodo } from './MVC/ModelTodo';
import { ControllerTodo } from './MVC/ControllerTodo';

const view = new ViewTodo();
const model = new ModelTodo();
const controller = new ControllerTodo(model, view);
controller.init();
