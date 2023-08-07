import mongoose, { Schema, model } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
}

const TaskSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: [24, "Title cannot be bigger than 24 characters."],
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxLength: [1024, "Description cannot be bigger than 255 characters."],
    },
    dueDate: {
        type: Date,
        required: true,
        index: true,
        default: Date.now
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
});

// export default model<ITask>("Task", TaskSchema)
export const Task = model<ITask>("Task", TaskSchema);