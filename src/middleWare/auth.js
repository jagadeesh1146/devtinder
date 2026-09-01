const jwt = require("jsonwebtoken")
const UserModel = require("../models/users")


const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        const decoded = jwt.verify(token, "DEV$tinder");

        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        req.user = user;

        next();

    } catch (err) {
        res.status(401).send(err.message);
    }
};

module.exports = {
    userAuth
};

