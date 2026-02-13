import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use(
    session({
        secret: process.env.SECRET_KEY || "fallback-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 5 * 60 * 1000, // 5 minutes
        },
    })
);

app.use(express.static("public"));

app.use((req, res, next) => {
    console.log("Session Data:", req.session);
    next();
});

import userRegister from "./route/students.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { registerLimiter } from "./middlewares/rateLimiter.js";

app.use("/api/v1/student", userRegister);
app.use(registerLimiter);
app.use(errorHandler);

export { app };