import express from "express";
import "express-async-errors";
const router = express.Router();
const { create } = require("../controllers/task");

router.route(`/create`).post(create);


module.exports = router;