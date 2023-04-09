import MongoService from "../Services/MongoService.js";
import AlertMassagesSchema from "../database/AlertMassagesSchema.js";


class AlertMessageController{
    async createAlertMessage(req, res){
        try{
            const {title, comment, photos} = req.body;
            const {userId} = req.params
            console.log(title)
            console.log(comment)
            console.log(photos)
            console.log(userId)
            const message = await MongoService.createAlertMessage({title, comment, photos, author: userId})
            return res.send(message)
        }catch (e){
            console.log(e)
        }

    }

    async updateMessageStatus(req, res){
        try{
            const {messageID} = req.params;
            const message = await AlertMassagesSchema.updateOne({_id: messageID}, {status: "inProgress"})
            return res.send(message)
        }catch (e){
            console.log(e)
        }

    }
}
export default new AlertMessageController();