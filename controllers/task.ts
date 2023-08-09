import { Response, Request } from "express";
import { Task } from "../models/Task";

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
    page: string;
    offset: string;
}

exports.findAll = async (req: Request, res: Response, next: any) => {
    try {
        const limit = parseInt((req.query as unknown as FindAllQuery).limit);
        const offset = parseInt((req.query as unknown as FindAllQuery).page);

        const tasksCollection = await Task.find().limit(limit).skip(offset);
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