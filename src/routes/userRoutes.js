import {getUsers,getUser, updateUser,deleteUser, register, login, loginRequired } from "../controllers/userController.js";

const userRoutes = (app) => {
    app.route("/users")
    .get(getUsers);

    
    app.route("/users/:user_id")
    .get(loginRequired ,getUser)
    .put( loginRequired ,updateUser)
    .delete(loginRequired , deleteUser);


    app.route("/register")
    .post(register);

    //auth routes
    app.route("/auth/register")
    .post(register);

    app.route("/auth/login")
    .post(login);
}

export default userRoutes;