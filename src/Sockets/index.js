import {
  message,
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} from "../utils/chat.js";
const users = [];
const bot = "Chat Bot";

export default (io) => {
  io.on("connection", async (socket) => {
    console.log(`Nuevo usuario conectado en: ${socket.id}`);
    await socket.on("user:JoinRoom", async ({ username, room }) => {
      const user = await userJoin(socket.id, username, room);
      console.log(user);
      socket.join(user.room);
      socket.emit("chat:showMessage", message(bot, "Welcome to chat!"));
      //broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          "chat:showMessage",
          message(bot, `${user.username} has joined the chat!`)
        );

      //send users and room info
      io.to(user.room).emit("user:roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    //listen for chatMessage
    socket.on("chat:message", async (msg) => {
      const user = getCurrentUser(socket.id);
      io.to(user.room).emit("chat:showMessage", message(user.username, msg));
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
      const user = userLeave(socket.id);
      console.log(user);
      if (user) {
        io.to(user.room).emit(
          "chat:showMessage",
          message(bot, `${user.username} has left the chat`)
        );
        io.to(user.room).emit("user:roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });
};
