import { ViewSettings } from './MVC/ViewSettings';
import { ModelSettings } from './MVC/ModelSettings';
import { ControllerSettings } from './MVC/ControllerSettings';

const view = new ViewSettings();
const model = new ModelSettings();
const controller = new ControllerSettings(model, view);
controller.init();
