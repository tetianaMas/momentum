import { ViewQuotes } from './MVC/ViewQuotes';
import { ModelQuotes } from './MVC/ModelQuotes';
import { ControllerQuotes } from './MVC/ControllerQuotes';

const view = new ViewQuotes();
const model = new ModelQuotes();
const controller = new ControllerQuotes(model, view);
controller.init();
