import MongoService from "../Services/MongoService.js";
import newOperatorIdName from "../Services/OperatorIdName.js";


class OperatorsController{
    async createOperator(req, res){
        try{
            const {name, secondName, email, phone, password} = req.body;
            const idName = newOperatorIdName()
            const message = await MongoService.createOperator({idName, name, secondName, email, phone, password})
            return res.send(message)
        }catch (e){
            console.log(e)
        }

    }

    async updateOperator(req, res){
        try{
            const {operatorID} = req.params;
            const {active} = req.body;
            const message = await MongoService.updateOperatorStatus(operatorID, active)
            return res.send(message)
        }catch (e){
            console.log(e)
        }

    }


}
export default new OperatorsController();