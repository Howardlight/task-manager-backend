import { getModelForClass } from "@typegoose/typegoose";
import { Task } from "./Task";

export const TaskModel = getModelForClass(Task);