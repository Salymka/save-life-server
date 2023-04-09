import MongoService from "../Services/MongoService.js";
import hashPassword from "../Services/HashPassword.js";
import HashPassword from "../Services/HashPassword.js";
class UserController{
    async createUser(req, res){
        try{
            const {name, secondName, phone, location, email, password} = req.body
            const checkPhone = await MongoService.isExistForPhone(phone);
            const checkEmail = await MongoService.isExistForEmail(email);
            if(checkPhone || checkEmail){
                return res.status(500).send({message: 'user exist'});
            }
            const hashedPassword = await hashPassword.hash(password);
            const user = await MongoService.createUser({name, secondName, phone, email, location, password: hashedPassword})
            return res.send({message: "user created", user})
        }catch (e){
            console.log(e)
        }

    }

    async loginUser(req, res){
        try{
            const {login, password} = req.body
            const user = await MongoService.isExistForPhone(login);
            if(user){
                const match = await HashPassword.matchPassword(password, user.password)
                if(match){
                    return res.send(user)
                }
                return res.send({message: "invalid input"})
            }
            return res.send({message: "invalid input"})
        }catch (e){
            console.log(e)
        }
    }

    async deleteUser(req, res){
        try{
            const {userId} = req.params
            console.log(userId)
            const user = await MongoService.findUser(userId)
            console.log(user)
            if(user){
                const deletedUser = await MongoService.deleteUser(userId)
                return res.status(200).send({message: "user delete", user: deletedUser})
            }
        }catch (e){
            console.log(e)
        }
    }

    async updateUserEmail(req, res){
        try{
            const {email} = req.body
            const {userId} = req.params
            const user = await MongoService.isExistForEmail(email)
            if(user) {
                return res.status(500).send({message: `user with ${email} already exist` })
            }
            const updateUser = await MongoService.updateEmail(userId, email)
            return res.status(200).send({message: "user update", user: updateUser})

        }catch (e){
            console.log(e)
        }
    }

    async updateUserPassword(req, res){
        try{
        }catch (e){
            console.log(e)
        }
    }
}
export default new UserController();