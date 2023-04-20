import {Router} from "express";
import AlertMessageController from "../Controllers/AlertMessageController.js";
const alertMessageRouter = Router();

alertMessageRouter.post('/send_alert_message/:userId', AlertMessageController.createAlertMessage);
alertMessageRouter.post('/update_status/:messageID', AlertMessageController.updateMessageStatus);
alertMessageRouter.get('/user_messages/:userId', AlertMessageController.getUserMessages);


export default alertMessageRouter;