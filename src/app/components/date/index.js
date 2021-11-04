import { ViewDate } from './MVC/ViewDate';
import { ModelDate } from './MVC/ModelDate';
import { ControllerDate } from './MVC/ControllerDate';

const view = new ViewDate();
const model = new ModelDate();
const controller = new ControllerDate(model, view);
controller.init();
