var express = require("express");
const passport = require("passport");
const {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosByUserId,
} = require("../controllers/todo.controller");
var router = express.Router();

// GET ALL TODOS
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        const todos = await getTodos();

        res.status(todos.status).json(todos.data);
    }
);

// GET TODO BY ID
router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        const id = req.params.id;
        if (id) {
            const todos = await getTodo();
            return res.status(todos.status).json(todos.data);
        }
        res.status(400).json({ data: null, message: "Invalid request" });
    }
);

// GET TODOS BY USER ID
router.get(
    "/owner/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        const id = req.params.id;
        if (id) {
            const todos = await getTodosByUserId(id);
            return res.status(todos.status).json(todos.data);
        }
        res.status(400).json({ data: null, message: "Invalid request" });
    }
);

// CREATE NEW TODO
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        const data = req.body;
        const newTodo = await createTodo(data);
        res.status(newTodo.status).json(newTodo.data);
    }
);

// UPDATE TODO
router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        const id = req.params.id;
        const data = req.body;

        if (id && data) {
            const updatedTodo = await updateTodo(id, data);
            return res.status(updatedTodo.status).json(updatedTodo.data);
        }
        res.status(400).json({ data: null, message: "Invalid request" });
    }
);

// DELETE TODO
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        const id = req.params.id;

        if (id) {
            const deletedTodo = await deleteTodo(id);
            return res.status(deletedTodo.status).json(deletedTodo.data);
        }
        res.status(400).json({ data: null, message: "Invalid request" });
    }
);

module.exports = router;
