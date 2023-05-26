import  {Schema, model} from 'mongoose';


const AlertMessages = new Schema({
    title: {type: String, require: true},
    author: {type: Schema.Types.ObjectId, ref: "Users"},
    alertType: {type: String, require: true},
    location: {type: String, require: true},
    comment: {type: String, require: true},
    photos : [{type: String}],
    status: {type: String, default: 'notProcessed'},
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
});
export default model("AlertMessages", AlertMessages);