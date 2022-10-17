// import * as users from "./users.json" assert { type: "json" };
import fs from "fs";

export function message(username, text, time = new Date().toLocaleString()) {
  return {
    username,
    text,
    time,
  };
}

// I save the new user in the file users.json
export async function userJoin(id, username, room) {
  const user = { id, username, room };
  console.log("function userjoin", user);
  fs.access("users.json", fs.constants.F_OK, (err) => {
    if (err) {
      const users = JSON.stringify({ users: [] });
      fs.writeFile("users.json", users, () => {
        console.log("Users.json creado...");
      });
    } else {
      console.log("Users de chat encontrados!");
    }
    fs.readFile("users.json", "utf8", (error, data) => {
      if (error) {
        console.log(error);
        return error;
      }
      let users = JSON.parse(data);
      users.users.push(user);
      fs.writeFile("users.json", JSON.stringify(users), (err) =>
        err ? console.log(err) : console.log("Usuario guardado con exito")
      );
    });
  });
  return user;
}
// get the user by his id
export function getCurrentUser(id) {
  let user = fs.readFileSync("users.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return error;
    }
    return JSON.parse(data);
  });
  user = JSON.parse(user);
  return user.users.find((e) => e.id === id);
}

//User leaves chat
export function userLeave(id) {
  let user
  let users = fs.readFileSync("users.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return error;
    }
    return JSON.parse(data);
  });
  users = JSON.parse(users);
  const index = users.users.findIndex((user) => user.id === id);
  console.log(index);
  if (index !== -1) {
    user = users.users.splice(index, 1);
    fs.writeFileSync("users.json", JSON.stringify(users), (err) =>
      err ? console.log(err) : console.log("Usuario borrado con exito")
    );
    console.log("antes de mandar, leave:", user);
  }
  return user[0];
}

export function getRoomUsers(room) {
  let users = fs.readFileSync("users.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return error;
    }
    return JSON.parse(data);
  });
  users = JSON.parse(users);
  const user=users.users.filter((user) => user.room === room);
  return user;
}
