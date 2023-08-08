const jwt = require("jsonwebtoken");

exports.createToken = (data) => {
    return jwt.sign(data, process.env.SECRET_TOKEN, { expiresIn: 259200 });
};

exports.verifyToken = (data) => {
    return jwt.verify(data, process.env.SECRET_TOKEN);
};

exports.encrypt = (data) => {
    return jwt.sign(data, process.env.SECRET_TOKEN);
};

exports.decrypt = (encrypted) => {
    return jwt.verify(encrypted, process.env.SECRET_TOKEN);
};
