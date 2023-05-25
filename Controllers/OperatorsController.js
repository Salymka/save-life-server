import MongoService from "../Services/MongoService.js";
import newOperatorIdName from "../Services/OperatorIdName.js";
import HashPassword from "../Services/HashPassword.js";


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
    async loginOperator(req, res){
        try{
            const {idName, password} = req.body
            const operator = await MongoService.findOperatorByIdName(idName);
            if(operator){
                console.log(operator)
                const match = await HashPassword.matchPassword(password, operator.password)
                if(match){
                    return res.send(operator)
                }
                return res.send({message: "invalid password"})
            }
            return res.send({message: "invalid idNme"})
        }catch (e){
            console.log(e)
        }
    }


}
export default new OperatorsController();