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

exports.findAll = async (req: Request, res: Response, next: any) => {
    try {
        const tasks = await Task.find();

        res.status(200).send(tasks);
    } catch (error: any) { next(error); }
}

}