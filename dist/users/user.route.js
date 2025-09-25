import express from 'express';
import { userController } from './user.controller.js';
const Router = express.Router();
Router.route('/register').post(userController.createNew);
Router.route('/get/:user_id').get(userController.getUser);
Router.route('/update/:user_id').put(userController.update);
export const userRoute = Router;
//# sourceMappingURL=user.route.js.map