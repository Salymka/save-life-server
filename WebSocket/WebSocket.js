import { WebSocketServer } from 'ws';
import MongoService from "../Services/MongoService.js";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()
const wss = new WebSocketServer({ port: 5000 }, () => console.log('start WS'));

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        const message = JSON.parse(data);
        switch (message.event){
            case 'connect':
                const feedback = {
                    event: 'connect',
                    message: `${message.operator} connected`
                }
                ws.send(JSON.stringify(feedback))
                break;

            case 'getMessage':
                const data = mongoose.connect(process.env.DB_CONNECT_STRING)
                    .then(() => {
                        MongoService.getRawMessage()
                            .then(message => {
                                const feedback = {
                                    event: 'alertMessage',
                                    message
                                }
                                ws.send(JSON.stringify(feedback))
                            })
                })

                break;
            case 'changeStatus':

        }

    });

});

