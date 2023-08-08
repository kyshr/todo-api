const mongoose = require("mongoose");

exports.connect = () => {
    mongoose
        .connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then(() => {
            console.log("Connected to db...");
        })
        .catch((err) => {
            console.log(err.message);
        });
};
