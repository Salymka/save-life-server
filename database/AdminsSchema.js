import {Schema, model} from 'mongoose';


const Admins = new Schema({
    login:  {type: String, require: true},
    password: {type: String, require: true},
    access: {type: String, require: true, default: "local-admin"},
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
});
export default model("Admins", Admins);