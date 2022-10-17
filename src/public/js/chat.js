const socket = io();
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".show__chat");
const params = new URLSearchParams(location.search);
const username = params.get("username");
const room = params.get("room");
const userList = document.getElementById("users_list");

//Join room
socket.emit("user:JoinRoom", { username, room });

//get room and users
socket.on("user:roomUsers", ({ room, users }) => {
  console.log(users);
  outputUsers(users);
});

//message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.chatMessage.value;
  // emit message to server
  socket.emit("chat:message", msg);
  //Clear input chat
  e.target.elements.chatMessage.value = "";
  e.target.elements.chatMessage.focus();
});

//  message from server
socket.on("chat:showMessage", (message) => {
  outputMessage(message);
  //Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//FUNCTIONS:
function outputMessage(message) {
  const div = document.createElement("div");
  //   div.classList.add("show__chat");
  div.innerHTML = `
    <p>${message.username}</p>
    <p>${message.text}</p>
    <p>${message.time}</p>`;
  document.querySelector(".show__chat").appendChild(div);
}

//add room name to dom
// function outputRoomName(room) {}

function outputUsers(users) {
  userList.innerHTML = `
  ${users.map((user) => `<li>${user.username}</li>`).join('')}`
}
