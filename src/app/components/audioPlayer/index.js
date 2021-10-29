import { ViewPlayer } from './MVC/ViewPlayer';
import { ModelPlayer } from './MVC/ModelPlayer';
import { ControllerPlayer } from './MVC/ControllerPlayer';

const view = new ViewPlayer();
const model = new ModelPlayer();
const controller = new ControllerPlayer(model, view);
controller.init();
