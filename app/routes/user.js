var express = require("express");
const passport = require("passport");
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
} = require("../controllers/user.controller");
var router = express.Router();

// GET ALL USERS
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        const users = await getUsers();

        res.status(users.status).json(users.data);
    }
);

// GET USER BY ID
router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        const id = req.params.id;
        if (id) {
            const users = await getUser();
            return res.status(users.status).json(users.data);
        }
        res.status(400).json({ data: null, message: "Invalid request" });
    }
);

// CREATE NEW USER
router.post("/", async function (req, res, next) {
    const data = req.body;
    const newUser = await createUser(data);
    res.status(newUser.status).json(newUser.data);
});

// LOGIN USER
router.post("/login", async function (req, res, next) {
    const data = req.body;
    if (data) {
        const authenticatedUser = await loginUser(data);
        return res
            .status(authenticatedUser.status)
            .json(authenticatedUser.data);
    }
    res.status(400).json({ data: null, message: "Invalid request" });
});

// UPDATE USER
router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        const id = req.params.id;
        const data = req.body;

        if (id && data) {
            const updatedUser = await updateUser(id, data);
            return res.status(updatedUser.status).json(updatedUser.data);
        }
        res.status(400).json({ data: null, message: "Invalid request" });
    }
);

// DELETE USER
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        const id = req.params.id;

        if (id) {
            const deletedUser = await deleteUser(id);
            return res.status(deletedUser.status).json(deletedUser.data);
        }
        res.status(400).json({ data: null, message: "Invalid request" });
    }
);

module.exports = router;
