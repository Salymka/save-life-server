import {Router} from "express";
import UserController from "../Controllers/UserController.js";
import AlertMessageController from "../Controllers/AlertMessageController.js";
const alertMessageRouter = Router();

alertMessageRouter.post('/send_alert_message/:id', AlertMessageController.createAlertMessage);
alertMessageRouter.post('/update_status/:messageID', AlertMessageController.updateMessageStatus);


export default alertMessageRouter;