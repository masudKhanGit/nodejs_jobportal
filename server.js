import dotenv from "dotenv";
import http from "http";
import app from "./app/app.js";
import connectionDB from "./config/db.js";
import colors from 'colors'
dotenv.config();


const server = http.createServer(app);

// db connection
connectionDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`.bgGreen.white);
  console.log(`http://localhost:4000`.bgBlue.white);
});