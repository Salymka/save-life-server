import  {Schema, model} from 'mongoose';


const AlertMessages = new Schema({
    title: {type: String, require: true},
    author: {type: Schema.Types.ObjectId, ref: "Users"},
    comment: String,
    status: {type: String, default: 'notProcessed'},
    date: { type: Date, default: Date.now },
});
export default model("AlertMessages", AlertMessages);