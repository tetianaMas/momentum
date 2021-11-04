import { ViewWeather } from './MVC/ViewWeather';
import { ModelWeather } from './MVC/ModelWeather';
import { ControllerWeather } from './MVC/ControllerWeather';

const view = new ViewWeather();
const model = new ModelWeather();
const controller = new ControllerWeather(model, view);
controller.init();
