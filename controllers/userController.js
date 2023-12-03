const { User, Thought } = require("../models");

model.exports = {


    async getAllUsers(req, res) {
        try {
            const users = await User.find()
                // .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' });
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
            console.log('None Found');
        }
    },