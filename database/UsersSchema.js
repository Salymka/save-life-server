import {Schema, model} from 'mongoose';


const Users = new Schema({
    name:  {type: String, require: true},
    secondName: {type: String, require: true},
    email: {type: String, require: true},
    phone: {type: String, require: true},
    password: {type: String, require: true},
    location : {
        city: String,
        street: String,
        building: Number
    },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
});
export default model("Users", Users);