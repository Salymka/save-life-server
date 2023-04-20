import MongoService from "../Services/MongoService.js";
import url from 'url';
import * as fs from 'fs';

const pathToStatic = url.fileURLToPath(new URL('../public', import.meta.url))

class AlertMessageController {
    async createAlertMessage(req, res) {
        try {
            const {photos} = req.files
            const {title, comment, alertType} = req.body
            const {userId} = req.params
            const photosPath = [];

            const user = MongoService.findUser(userId)
            if (!user) {
                return res.send({message: 'Unknown user'})
            }

            if(!fs.existsSync(`${pathToStatic}/${userId}`)){
                fs.mkdirSync(`${pathToStatic}/${userId}`)
            }

            const alertMessageDate = Date.now()

            if (photos.length !== 0){
                fs.mkdirSync(`${pathToStatic}/${userId}/${alertMessageDate}`);
                [...photos].forEach((photo) => {
                    fs.writeFileSync(`${pathToStatic}/${userId}/${alertMessageDate}/${photo.name}`, photo.data)
                    photosPath.push(`${userId}/${alertMessageDate}/${photo.name}`)
                });
            }

            const message = await MongoService.createAlertMessage({title, comment, photos: photosPath, author: userId, alertType, createDate: alertMessageDate})
            return res.send({message: "Message Create", createdMessage: message})
        } catch (e) {
            console.log(e)
            return res.send({message: "NO-OK"})
        }
    }

    async updateMessageStatus(req, res) {
        try {
            const {messageID} = req.params;
            const {status} = req.body;
            const message = await MongoService.updateAlertMessage(messageID, status)
            return res.send(message)
        } catch (e) {
            console.log(e)
            return res.send({message: "NO-OK"})
        }
    }

    async getUserMessages(req, res) {
        try {
            const {userId} = req.params;
            const user = await MongoService.findUser(userId)
            if (!user) {
                return res.send({message: 'Unknown user'})
            }
            const messages = await MongoService.getMessages(userId)
            return res.send(messages)
        } catch (e) {
            console.log(e)
            return res.send({message: "NO-OK"})
        }
    }
}

export default new AlertMessageController();