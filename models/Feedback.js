import mongoose from "mongoose";
export const feedbackSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'Task',
        required: true,
        INDEX:true,
    },
    comments:{
        type: String,
        required: true,
    },
})

const Feedback = new mongoose.model("Feedback",feedbackSchema);

export default Feedback