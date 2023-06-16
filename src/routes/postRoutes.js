import { getPosts, getPost, updatePost, deletePost, createPost,  } from "../controllers/postController.js";
import { loginRequired } from "../controllers/userController.js";
const postRoutes = (app) => {
    app.route("/posts")
    .get(loginRequired ,getPosts);

    app.route("/posts/:post_id")
    .get(loginRequired ,getPost)
    .put(loginRequired ,updatePost)
    .delete(loginRequired ,deletePost);

    app.route("/posts")
    .post(loginRequired ,createPost);
    



}


export default postRoutes;