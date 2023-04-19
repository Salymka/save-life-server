import {Schema, model} from 'mongoose';


const Users = new Schema({
    name:  {type: String, require: true},
    secondName: {type: String, require: true},
    email: {type: String, require: true},
    phone: {type: String, default: null},
    password: {type: String, require: true},
    location : {type: Object, default: null},
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
});
export default model("Users", Users);