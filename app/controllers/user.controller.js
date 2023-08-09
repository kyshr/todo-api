const User = require("../models/user.model");
const auth = require("../utils/auth");
const bcrypt = require("bcrypt");

exports.getUsers = async function () {
    try {
        const user = await User.find().select(["-password"]);
        return { status: 200, data: user };
    } catch (error) {
        console.log(error);
        return { status: 400, data: null, message: "An error occured" };
    }
};

exports.getUser = async function (id) {
    try {
        const user = await User.findOne(id).select(["-password"]);
        return { status: 200, data: user };
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            data: {
                data: null,
                message: "Cannot find user",
            },
        };
    }
};

exports.createUser = async (data) => {
    try {
        const emailExist = await User.findOne({
            email: data.email,
        });
        if (emailExist) {
            return {
                status: 400,
                data: {
                    data: null,
                    message: "Email already exist",
                },
            };
        } else {
            const newUser = await User.create(data);
            if (newUser)
                return {
                    status: 200,
                    data: {
                        _id: newUser._id,
                        firstname: newUser.firstname,
                        lastname: newUser.lastname,
                        email: newUser.email,
                        created_at: newUser.created_at,
                        updated_at: newUser.updated_at,
                        __v: newUser.__v,
                    },
                };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            data: {
                data: null,
                message: "Cannot create user",
            },
        };
    }
};

exports.updateUser = async (id, data) => {
    try {
        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
        }
        const updatedUser = await User.updateOne({ _id: id }, { $set: data });
        return { status: 200, data: updatedUser };
    } catch (error) {
        console.log(error);
        return { status: 400, data: { acknowledged: false } };
    }
};

exports.deleteUser = async (id) => {
    try {
        const deletedUser = await User.deleteOne({ _id: id });
        return { status: 200, data: deletedUser };
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

exports.loginUser = async (data) => {
    try {
        const query = { email: data.email };
        const user = await User.findOne(query);
        if (user) {
            const validPassword = await user.isValidPassword(data.password);
            if (validPassword) {
                return {
                    status: 200,
                    data: {
                        access_token: auth.createToken({
                            _id: user._id,
                        }),
                    },
                };
            }
            return {
                status: 400,
                data: {
                    access_token: null,
                    message: "Invalid email or password",
                },
            };
        } else {
            return {
                status: 404,
                data: {
                    access_token: null,
                    message: "User not found",
                },
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            data: {
                access_token: null,
                message: "An error occured",
            },
        };
    }
};
