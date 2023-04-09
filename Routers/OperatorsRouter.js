import {Router} from "express";
import OperatorsController from "../Controllers/OperatorsController.js";
const OperatorsRouter = Router();

OperatorsRouter.post('/create_operator', OperatorsController.createOperator);
OperatorsRouter.post('/update_operator/:operatorID', OperatorsController.updateOperator);


export default OperatorsRouter;