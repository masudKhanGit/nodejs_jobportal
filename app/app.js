import dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./globalRoutes.js";
import { middleware } from "./middleware.js";

// security packges
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';

const app = express();

app.use(middleware);
// middleware
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

// global router
app.use("/api/v1", router);

export default app;
