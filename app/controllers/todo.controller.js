const Todo = require("../models/todo.model");
const auth = require("../utils/auth");
const bcrypt = require("bcrypt");

exports.getTodos = async function (
    pageLength = 10,
    pageNumber = 1,
    status = ""
) {
    try {
        const filter = status ? { status: status } : {};
        const findAllDocs = await Todo.find(filter);
        const pages = Math.ceil(findAllDocs.length / pageLength);
        const todo = await Todo.find(filter)
            .skip(pageNumber === 1 ? 0 : (pageNumber - 1) * pageLength)
            .limit(pageLength);
        return {
            status: 200,
            data: {
                list: todo,
                numberOfPages: pages,
                currentPage: parseInt(pageNumber),
            },
        };
    } catch (error) {
        console.log(error);
        return { status: 400, data: null, message: "An error occured" };
    }
};

exports.getTodo = async function (id) {
    try {
        const todo = await Todo.findOne({ _id: id });
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
exports.getTodosByUserId = async function (
    userId,
    pageLength = 10,
    pageNumber = 1,
    status = ""
) {
    try {
        const filter = status
            ? { owner: userId, status: status }
            : { owner: userId };
        const findAllDocs = await Todo.find(filter);
        const pages = Math.ceil(findAllDocs.length / pageLength);
        const todo = await Todo.find(filter)
            .skip(pageNumber === 1 ? 0 : (pageNumber - 1) * pageLength)
            .limit(pageLength);
        return {
            status: 200,
            data: {
                list: todo,
                numberOfPages: pages,
                currentPage: parseInt(pageNumber),
            },
        };
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
