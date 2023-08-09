"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const router = express_1.default.Router();
const { create, findAll, updateTaskDescription, markTaskCompleted, updateTaskTitle, deleteTask, updateTask } = require("../controllers/task");
router.route(`/`).post(create);
router.route(`/`).get(findAll);
router.route(`/:id`).delete(deleteTask);
router.route(`/title/:id`).put(updateTaskTitle);
router.route(`/description/:id`).put(updateTaskDescription);
router.route(`/complete/:id`).put(markTaskCompleted);
router.route(`/edit/:id`).put(updateTask);
module.exports = router;
//# sourceMappingURL=task.js.map