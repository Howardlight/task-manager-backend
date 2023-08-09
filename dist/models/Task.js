"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        maxLength: [48, "Title cannot be bigger than 48 characters."],
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
exports.Task = (0, mongoose_1.model)("Task", TaskSchema);
//# sourceMappingURL=Task.js.map