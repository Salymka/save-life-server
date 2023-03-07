import  {Schema, model} from 'mongoose';
import UsersSchema from "./UsersSchema";


const AlertMessages = new Schema({
    title:  String,
    author: {type: UsersSchema},
    comment:String,
    date: { type: Date, default: Date.now },
});
export default model("AlertMessages", AlertMessages);