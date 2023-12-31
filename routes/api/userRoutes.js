const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController.js');

//   /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)



router.route('/:userId/friends/:friendId').post(addFriend);
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router; 