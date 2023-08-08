const Todo = require("../models/todo.model");
const auth = require("../utils/auth");
const bcrypt = require("bcrypt");

exports.getTodos = async function () {
    try {
        const todo = await Todo.find();
        return { status: 200, data: todo };
    } catch (error) {
        console.log(error);
        return { status: 400, data: null, message: "An error occured" };
    }
};

exports.getTodo = async function (id) {
    try {
        const todo = await Todo.findOne(id);
        return { status: 200, data: todo };
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            data: {
                data: null,
                message: "Cannot find todo",
            },
        };
    }
};
exports.getTodosByUserId = async function (userId) {
    try {
        const todo = await Todo.find({ owner: userId });
        return { status: 200, data: todo };
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            data: {
                data: null,
                message: "Cannot find todo",
            },
        };
    }
};

exports.createTodo = async (data) => {
    try {
        const newTodo = await Todo.create(data);
        return { status: 200, data: newTodo };
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            data: {
                data: null,
                message: "Cannot create todo",
            },
        };
    }
};

exports.updateTodo = async (id, data) => {
    try {
        const updatedTodo = await Todo.updateOne({ _id: id }, { $set: data });
        return { status: 200, data: updatedTodo };
    } catch (error) {
        console.log(error);
        return { status: 400, data: { acknowledged: false } };
    }
};

exports.deleteTodo = async (id) => {
    try {
        const deletedTodo = await Todo.deleteOne({ _id: id });
        return { status: 200, data: deletedTodo };
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            data: {
                data: null,
                message: "An error occured",
            },
        };
    }
};
