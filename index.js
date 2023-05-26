import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import UserRouter from "./Routers/UserRouter.js";
import AlertMessageRouter from "./Routers/AlertMassageRouter.js";
import OperatorsRouter from "./Routers/OperatorsRouter.js";
import AdminRouter from "./Routers/AdminRouter.js";
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload'
dotenv.config()
const start = async function (){
    try {
        await mongoose.connect(process.env.DB_CONNECT_STRING).then(() => {
            console.log("DB work")
        })
        const app = express();

        app.use(cors())
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(fileUpload({}));
        app.use(express.static('public'));
        app.use('/users', UserRouter);
        app.use('/messages', AlertMessageRouter);
        app.use('/operators', OperatorsRouter);
        app.use('/admins', AdminRouter);

        app.listen(process.env.PORT, () => {
            console.log(`Example app listening on port ${process.env.PORT}`)
        })

    }catch (e) {
        console.log(e)
    }
}

start().then()
