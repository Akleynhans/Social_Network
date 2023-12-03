const { User, Thought } = require("../models");

module.exports = {


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

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                // .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' });

            if (!user) {
                return res.status(404).json({ message: 'None Found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
            );

            if (!user) {
                res.status(404).json({ message: 'None Found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                res.status(404).json({ message: 'None Found' });
            }
            Thought.deleteMany(
                { _id: { $in: User.thoughtsId } }
                )
            res.json({ message: 'Deleted' })
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                {runValidators: true, new: true}
            )
            if (!user) {
                res.status(404).json({ message: 'None Found' });
            }
            res.json(user)
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: {friends: req.params.friendId} },
                { runValidators: true, new: true }
            )
            if (!user) {
                res.status(404).json({ message: 'None Found' })
            }
            res.json({ message: "Removed" });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
};