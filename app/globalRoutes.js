import express from "express";
import appRouter from "../router/appRouter.js";
import authRouter from "../router/authRouter.js";
import jobRoute from '../router/jobsRoute.js';
import userRoute from '../router/userRoutes.js';
import { handleHealth } from "./controller.js";
import { handleCustomError, handleError } from "./error.js";

const router = express.Router();

// auth route
router.use("/auth", authRouter);
// app route
router.use("/", appRouter);
// user route
router.use('/user', userRoute)
// job route
router.use('/job', jobRoute)

// Health Check
router.use("/health", handleHealth);

// Error Handle
router.use(handleCustomError);
router.use(handleError);

export default router;
