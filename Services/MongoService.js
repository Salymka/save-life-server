import Users from "../database/UsersSchema.js";
import Massage from "../database/AlertMassagesSchema.js";
import Operator from "../database/OperatorsSchema.js";
import OperatorsSchema from "../database/OperatorsSchema.js";
import AdminsSchema from "../database/AdminsSchema.js";
import mongoose from "mongoose";

class MongoService{

    async isExistForEmail(email){
        try{
            return await Users.findOne({email});
        }catch (e){
            console.log(e)
        }
    }
    async isExistForPhone(phone){
        try{
            return await Users.findOne({phone});
        }catch (e){
            console.log(e)
        }
    }

    async findUser(userId){
        try{
            return await Users.findOne({_id: userId});
        }catch (e){
            console.log(e)
        }
    }
    async createUser(user){
        try{
            return Users.create(user);
        }catch (e){
            console.log(e)
        }
    }

    async deleteUser(userId){
        try{
            return Users.deleteOne({_id: userId});
        }catch (e){
            console.log(e)
        }
    }

    async updateEmail(userId, email){
        try{
            return Users.updateOne({_id: userId}, {email, updateDate: Date.now()});
        }catch (e){
            console.log(e)
        }
    }


    async createOperator(operator){
        try{
            return Operator.create(operator);
        }catch (e){
            console.log(e)
        }
    }

    async findOperatorByIdName(idName){
        try{
            return await Operator.findOne({idName});
        }catch (e){
            console.log(e)
        }
    }

    async updateOperatorStatus(operatorID, status){
        try{
            return OperatorsSchema.updateOne({_id: operatorID}, {active: status, updateDate: Date.now()})
        }catch (e){
            console.log(e)
        }
    }
    async createAlertMessage(message){
        try{
            return Massage.create(message);
        }catch (e){
            console.log(e)
        }
    }
    async updateAlertMessage(messageId, status){
        try{
            return Massage.updateOne({_id: messageId}, {status});
        }catch (e){
            console.log(e)
        }
    }
    async getMessages(userId){
        try{
            return Massage.find({author: userId});
        }catch (e){
            console.log(e)
        }
    }

    async getRawMessage(){
        try{
            const mes = await Massage.find({status: 'notProcessed'});
            return mes.pop()
        }catch (e){
            console.log(e)
        }
    }


    async updateMessageStatus(messageId, status){
        try{
            return Massage.updateOne({_id: messageId}, {status})
        }catch (e){
            console.log(e)
        }
    }

    async createAdmin(admin){
        try{
            return AdminsSchema.create(admin)
        }catch (e){
            console.log(e)
        }
    }

    async getAdmin(login){
        try{
            return AdminsSchema.findOne({login: login});
        }catch (e){
            console.log(e)
        }
    }


}
export default new MongoService();