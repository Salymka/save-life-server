import MongoService from "../Services/MongoService.js";
import hashPassword from "../Services/HashPassword.js";
import HashPassword from "../Services/HashPassword.js";


class AdminController{
    async createAdmin(req, res){
        try{
            const {login, password} = req.body;
            const hashedPassword = await hashPassword.hash(password);
            const message = await MongoService.createAdmin({login, password: hashedPassword})
            return res.send(message)
        }catch (e){
            console.log(e)
        }

    }

    async loginAdmin(req, res){
        try{
            const {login, password} = req.body
            const admin = await MongoService.getAdmin(login);
            if(admin){
                const match = await HashPassword.matchPassword(password, admin.password)
                if(match){
                    return res.send(admin)
                }
                return res.send({message: "invalid password"})
            }
            return res.send({message: "invalid input"})
        }catch (e){
            console.log(e)
        }

    }




}
export default new AdminController();