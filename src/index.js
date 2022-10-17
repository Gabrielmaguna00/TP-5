import express, { application } from "express";
import morgan from "morgan";
import path from "path";
import * as url from "url";
import mailRoute from "./routes/mail.js";
import http from "http";
import dotenv from "dotenv";
import { Server as WebSocketServer } from "socket.io";
import sockets from "./Sockets/index.js";
dotenv.config();

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server);

app.use(express.static(path.join(__dirname + "public")));
app.use(express.json());
app.use(morgan("dev"));

// app.use("/mail", mailRoute);
// app.get("/home", (req, res) => {
//   res.send("Home");
// });

// app.use("*", (req, res) => {
//   res.redirect("/home");
// });

// console.log(new Date().toLocaleString());
sockets(io);


server.listen(PORT, () => {
  console.log("Servidor corriendo exitosamente");
});
