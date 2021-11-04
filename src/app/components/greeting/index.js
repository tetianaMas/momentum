import { ViewGreeting } from './MVC/ViewGreeting';
import { ModelGreeting } from './MVC/ModelGreeting';
import { ControllerGreeting } from './MVC/ControllerGreeting';

const view = new ViewGreeting();
const model = new ModelGreeting();
const controller = new ControllerGreeting(model, view);
controller.init();
