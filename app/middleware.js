import cors from "cors";
import express from "express";
import morgan from "morgan";

export const middleware = [morgan("dev"), cors(), express.json()];
