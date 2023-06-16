import { getComments, getComment, createComment, updateComment, deleteComment } from "../controllers/commentController.js";
import { loginRequired } from "../controllers/userController.js";
const commentRoutes = (app) => {


    app.route("/comments")
    .get(loginRequired ,getComments);

    app.route("/comments/:comment_id")
    .get(loginRequired ,getComment)
    .put(loginRequired ,updateComment)
    .delete(loginRequired ,deleteComment);



    app.route("/comments")
    .post(loginRequired ,createComment);
}

export default commentRoutes;