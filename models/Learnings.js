import mongoose from "mongoose";
import { gradeSchema } from "./Grades.js";
import { feedbackSchema } from "./feedback.js";
// or we can give the below statement as two of them
// const { Schema, model } = mongoose;
// const Schema = mongoose.Schema;
// const model = mongoose.model;

const learningSchema = new mongoose.Schema({
Username:{
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    index:true,

},

password: {
    type: String,
    required: true,
    minlength: 8,
},
Subjects:{
    type:String,
    required:true
},
startDate:{
    type:Date,
    default: Date.now()
},
endDate:{
    type:Date,
},
Grades: [gradeSchema],
createdAt:{
    type:String,
    default:Date.now(),
},
Feedback :[feedbackSchema],

})

const Learnings = new mongoose.model('Learnings',learningSchema);
export default Learnings;