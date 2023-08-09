"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("../models/Task");
exports.create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, dueDate } = req.body;
    //TODO: Add Validation
    try {
        let task = yield Task_1.Task.create({
            description: description,
            dueDate: dueDate,
            title: title
        });
        res.status(200).send(task.toJSON());
    }
    catch (error) {
        next(error);
    }
});
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tasksCollection;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        let { completed, date } = req.query;
        // This case is pointless
        if (completed && date)
            tasksCollection = yield Task_1.Task
                .find()
                .sort({ "dueDate": date, "completed": completed })
                .skip(offset)
                .limit(limit);
        else if (completed && !date)
            tasksCollection = yield Task_1.Task
                .find()
                .sort({ "completed": completed })
                .skip(offset)
                .limit(limit);
        else if (!completed && date)
            tasksCollection = yield Task_1.Task
                .find()
                .sort({ "dueDate": date })
                .skip(offset)
                .limit(limit);
        else
            tasksCollection = yield Task_1.Task.find().skip(offset).limit(limit);
        const taskCollectionCount = yield Task_1.Task.count();
        const totalPages = Math.ceil(taskCollectionCount / limit);
        const currentPage = Math.ceil(taskCollectionCount % offset);
        res.status(200).send({
            data: tasksCollection,
            paging: {
                total: taskCollectionCount,
                page: currentPage,
                pages: totalPages
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let { description, title, dueDate, completed } = req.body;
        const task = yield Task_1.Task.findById(id);
        if (!task)
            return res.status(404).send(`Task not found`);
        if (!dueDate)
            dueDate = Date.now();
        if (!completed)
            completed = task.completed;
        if (!description)
            throw "Missing description!";
        if (!title)
            throw "Missing title!";
        task.description = description;
        task.title = title;
        task.dueDate = dueDate;
        task.completed = completed;
        yield task.save();
        res.status(200).send(task.toJSON());
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.updateTaskDescription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { newDescription } = req.body;
        const task = yield Task_1.Task.findById(id);
        if (!task)
            return res.status(404).send(`Task not found`);
        task.description = newDescription;
        yield task.save();
        res.status(200).send(`Description of Task ${id} updated`);
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.markTaskCompleted = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { isComplete } = req.body;
        const task = yield Task_1.Task.findById(id);
        if (!task)
            return res.status(404).send(`Task not found`);
        if (!isComplete)
            task.completed = !task.completed;
        else
            task.completed = isComplete;
        yield task.save();
        res.status(200).send(`Marked Task ${id} completed`);
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.updateTaskTitle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const task = yield Task_1.Task.findById(id);
        if (!task)
            return res.status(404).send(`Task not found`);
        task.title = title;
        yield task.save();
        res.status(200).send(`Title of Task ${id} updated`);
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield Task_1.Task.findById(id);
        if (!task)
            return res.status(404).send(`Task not found`);
        yield task.deleteOne();
        res.status(200).send(`Deleted Task ${id}`);
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.sortByCompletion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_1.Task.find().sort({ dueDate: 'ascending' });
        if (!task)
            return res.status(404).send(`Tasks not found`);
        res.status(200).send(task);
    }
    catch (error) {
        next(error);
    }
    ;
});
//# sourceMappingURL=task.js.map