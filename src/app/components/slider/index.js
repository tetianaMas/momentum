import { ViewSlider } from './MVC/ViewSlider';
import { ModelSlider } from './MVC/ModelSlider';
import { ControllerSlider } from './MVC/ControllerSlider';

const view = new ViewSlider();
const model = new ModelSlider();
const controller = new ControllerSlider(model, view);
controller.init();
