import AlertMassagesSchema from "../database/AlertMassagesSchema.js";
import MongoService from "../Services/MongoService.js";
import url from 'url';
import * as fs from 'fs';

const pathToStatic = url.fileURLToPath(new URL('../', import.meta.url)) + `public/`;

class AlertMessageController {
    async createAlertMessage(req, res) {
        try {
            const {photos} = req.files
            const {title, comment, alertType} = req.body
            const {userId} = req.params
            const photosPath = [];
            if(!fs.existsSync(`${pathToStatic}/${userId}`)){
                fs.mkdirSync(`${pathToStatic}/${userId}`)
            }
            console.log(pathToStatic)
            console.log(userId)
            const alertMessageDate = Date.now()
            fs.mkdirSync(`${pathToStatic}/${userId}/${alertMessageDate}`);
            [...photos].forEach((photo) => {
                fs.writeFileSync(`${pathToStatic}${userId}/${alertMessageDate}/${photo.name}`, photo.data)
                photosPath.push(`${userId}/${alertMessageDate}/${photo.name}`)
            });

            const message = await MongoService.createAlertMessage({title, comment, photos: photosPath, author: userId, alertType})
            return res.send({message: "Message Create", createdMessage: message})
        } catch (e) {
            console.log(e)
            return res.send({message: "NO-OK"})
        }

    }

    async updateMessageStatus(req, res) {
        try {
            const {messageID} = req.params;
            const message = await AlertMassagesSchema.updateOne({_id: messageID}, {status: "inProgress"})
            return res.send(message)
        } catch (e) {
            console.log(e)
        }

    }
}

export default new AlertMessageController();