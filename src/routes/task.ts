import express from "express";
import "express-async-errors";
const router = express.Router();
const { create, findAll, updateTaskDescription, markTaskCompleted, updateTaskTitle, deleteTask, updateTask } = require("../controllers/task");

router.route(`/`).post(create);
router.route(`/`).get(findAll);
router.route(`/:id`).delete(deleteTask);
router.route(`/title/:id`).put(updateTaskTitle);
router.route(`/description/:id`).put(updateTaskDescription);
router.route(`/complete/:id`).put(markTaskCompleted);
router.route(`/edit/:id`).put(updateTask);

module.exports = router;