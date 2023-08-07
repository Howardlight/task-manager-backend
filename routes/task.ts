import express from "express";
import "express-async-errors";
const router = express.Router();
const { create, findAll, updateTaskDescription, markTaskCompleted, updateTaskTitle, deleteTask } = require("../controllers/task");

router.route(`/`).post(create);
router.route(`/`).get(findAll);
router.route(`/:id`).delete(deleteTask);
router.route(`/title/:id`).put(updateTaskTitle);
router.route(`/description/:id`).put(updateTaskDescription);
router.route(`/complete/:id`).put(markTaskCompleted);

module.exports = router;