import {WebSocketServer} from 'ws';
import MongoService from "../Services/MongoService.js";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config()
const wss = new WebSocketServer({port: 5000}, () => console.log('start WS'));

wss.on('connection', async function connection(ws) {
    const db = await mongoose.connect(process.env.DB_CONNECT_STRING)
    let messageId = null;
    ws.on('error', () => {
        if (messageId) {
            console.log('update')
            return MongoService.updateAlertMessage(messageId, {status: 'notProcessed'})
        }

    });
    ws.on('close', () => {
        if (messageId) {
            console.log('update')
            return MongoService.updateAlertMessage(messageId, {status: 'notProcessed'})
        }

    });

    ws.on('message', function message(data) {
        const message = JSON.parse(data);

        switch (message.event) {
            case 'connect':
                const feedback = {
                    event: 'connect',
                    message: `${message.operator} connected`
                }
                ws.send(JSON.stringify(feedback))
                break;

            case 'getMessage':
                MongoService.getRawMessage()
                    .then(message => {
                        const feedback = {
                            event: 'alertMessage',
                            message: message ? message : null
                        }
                        messageId = message?._id
                        ws.send(JSON.stringify(feedback))
                    })
                break;

            case 'changeStatus':
                MongoService.updateAlertMessage(messageId, {status: message.status})
                    .then(() => {
                        messageId = null;
                    })
                break;
        }

    });

});

