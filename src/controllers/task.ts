import { Response, Request } from "express";
import { Task } from "../models/Task";
import { SortOrder } from "mongoose";

exports.create = async (req: Request, res: Response, next: any) => {
    const { title, description, dueDate } = req.body;
    //TODO: Add Validation


    try {
        let task = await Task.create({
            description: description,
            dueDate: dueDate,
            title: title
        });

        res.status(200).send(task.toJSON());
    } catch (error: any) {
        next(error);
    }
}

interface FindAllQuery {
    limit: string;
    offset: string;
    completed: SortOrder | undefined, // 0, complete | 1, incomplete | null, do not sort
    date: SortOrder | undefined, // 0 ascending | 1, descending | null do not sort 
}

exports.findAll = async (req: Request, res: Response, next: any) => {
    try {
        let tasksCollection;

        const limit = parseInt((req.query as unknown as FindAllQuery).limit);
        const offset = parseInt((req.query as unknown as FindAllQuery).offset);
        let { completed, date } = req.query as unknown as FindAllQuery;



        // This case is pointless
        if (completed && date) tasksCollection = await Task
            .find()
            .sort({ "dueDate": date, "completed": completed })
            .skip(offset)
            .limit(limit);

        else if (completed && !date) tasksCollection = await Task
            .find()
            .sort({ "completed": completed })
            .skip(offset)
            .limit(limit);

        else if (!completed && date) tasksCollection = await Task
            .find()
            .sort({ "dueDate": date })
            .skip(offset)
            .limit(limit);

        else tasksCollection = await Task.find().skip(offset).limit(limit);


        const taskCollectionCount = await Task.count();

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
    } catch (error: any) { next(error); }
}

exports.updateTask = async (req: Request, res: Response, next: any) => {
    try {
        const { id } = req.params;
        let { description, title, dueDate, completed } = req.body;

        const task = await Task.findById(id);
        if (!task) return res.status(404).send(`Task not found`);

        if (!dueDate) dueDate = Date.now();
        if (!completed) completed = task.completed;

        if (!description) throw "Missing description!";
        if (!title) throw "Missing title!";

        task.description = description;
        task.title = title;
        task.dueDate = dueDate;
        task.completed = completed;
        await task.save();

        res.status(200).send(task.toJSON());
    } catch (error: any) { next(error); };
}


exports.updateTaskDescription = async (req: Request, res: Response, next: any) => {
    try {
        const { id } = req.params;
        const { newDescription } = req.body;

        const task = await Task.findById(id);
        if (!task) return res.status(404).send(`Task not found`);

        task.description = newDescription;
        await task.save();

        res.status(200).send(`Description of Task ${id} updated`);
    } catch (error: any) { next(error); };
}

exports.markTaskCompleted = async (req: Request, res: Response, next: any) => {
    try {
        const { id } = req.params;
        const { isComplete } = req.body;

        const task = await Task.findById(id);
        if (!task) return res.status(404).send(`Task not found`);

        if (!isComplete) task.completed = !task.completed;
        else task.completed = isComplete;

        await task.save();

        res.status(200).send(`Marked Task ${id} completed`);
    } catch (error: any) { next(error); };
}

exports.updateTaskTitle = async (req: Request, res: Response, next: any) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const task = await Task.findById(id);
        if (!task) return res.status(404).send(`Task not found`);

        task.title = title;
        await task.save();

        res.status(200).send(`Title of Task ${id} updated`);
    } catch (error: any) { next(error); };
}

exports.deleteTask = async (req: Request, res: Response, next: any) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if (!task) return res.status(404).send(`Task not found`);

        await task.deleteOne();

        res.status(200).send(`Deleted Task ${id}`);
    } catch (error: any) { next(error); };
}

exports.sortByCompletion = async (req: Request, res: Response, next: any) => {
    try {

        const task = await Task.find().sort({ dueDate: 'ascending' });
        if (!task) return res.status(404).send(`Tasks not found`);


        res.status(200).send(task);
    } catch (error: any) { next(error); };
}