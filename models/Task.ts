import mongoose, { Schema, model } from "mongoose";

export interface ITask extends Document {
    // _id: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    dueDate: Date;
}

const TaskSchema: Schema = new Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true,
    //     auto: true
    // },
    title: {
        type: String,
        required: true,
        maxLength: [24, "Title cannot be bigger than 24 characters."],
        index: true
    },
    description: {
        type: String,
        required: true,
        maxLength: [1024, "Description cannot be bigger than 255 characters."],
    },
    dueDate: {
        type: Date,
        required: true,
        index: true
    }
});

// export default model<ITask>("Task", TaskSchema)
export const Task = model<ITask>("Task", TaskSchema);