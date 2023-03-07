import Users from "../database/UsersSchema.js";
import Massage from "../database/AlertMassagesSchema.js";

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
    async createAlertMessage(message){
        try{
            return Massage.create(message);
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
            return Users.updateOne({_id: userId}, {email});
        }catch (e){
            console.log(e)
        }
    }

}
export default new MongoService();