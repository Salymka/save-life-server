import {Schema, model} from 'mongoose';

const Operators = new Schema({
    idName: {type: String, require: true},
    name:  {type: String, require: true},
    secondName: {type: String, require: true},
    email: {type: String, require: true},
    phone: {type: String, require: true},
    password: {type: String, require: true},
    active: {type: Boolean, default: false},
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
});
export default model("Operators", Operators)