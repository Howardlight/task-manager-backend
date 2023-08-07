import { ReturnModelType, prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

export class Task {
    @prop({ default: () => nanoid(9) })
    _id: string;

    @prop()
    title: string | null;

    @prop()
    description: string | null;

    @prop({ default: Date.now() })
    dueDate: Date;
}