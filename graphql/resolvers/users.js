const {createNewUserController, getAllUsersController} = require("../../controllers/users.controller")

module.exports = {
    Query: {
        users: getAllUsersController,
    },
    Mutation:{
        createNewUser: createNewUserController
    }
};
