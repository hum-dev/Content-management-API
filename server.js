import  Express  from "express";

import config from "./src/db/config.js";

import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";

import jwt from "jsonwebtoken";


const app = Express();


app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        Jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        
        
    });
} else {
    req.user = undefined;
    next();
    }
});

userRoutes(app);
postRoutes(app);
commentRoutes(app);

app.get("/", (req, res) => {
    res.send("Hello World!🫠");
    });



app.listen(config.port, () => {
    console.log(`Server running at ${config.url}`);
});

