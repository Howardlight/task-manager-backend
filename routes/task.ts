import express from "express";
import "express-async-errors";
const router = express.Router();
const { create, findAll } = require("../controllers/task");

router.route(`/create`).post(create);
router.route(`/`).get(findAll);

module.exports = router;