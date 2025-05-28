const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const usernameInput = document.getElementById("username");
const userLabel = document.getElementById("user-label");
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");

let username = "";

function login() {
  username = usernameInput.value.trim();
  if (!username) return alert("Enter a username");
  localStorage.setItem("cyber_user", username);
  userLabel.textContent = "Logged in as: " + username;
  loginScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
  loadMessages();
}

function logout() {
  localStorage.removeItem("cyber_user");
  location.reload();
}

function sendMessage() {
  const msg = messageInput.value.trim();
  if (!msg) return;
  const chatData = getMessages();
  chatData.push({ user: username, text: msg });
  saveMessages(chatData);
  messageInput.value = "";
  loadMessages();
}

function deleteMessage(index) {
  const chatData = getMessages();
  chatData.splice(index, 1);
  saveMessages(chatData);
  loadMessages();
}

function addEmoji() {
  messageInput.value += " ❤️";
}

function getMessages() {
  return JSON.parse(localStorage.getItem("chat_messages") || "[]");
}

function saveMessages(msgs) {
  localStorage.setItem("chat_messages", JSON.stringify(msgs));
}

function loadMessages() {
  chatBox.innerHTML = "";
  const msgs = getMessages();
  msgs.forEach((m, i) => {
    const div = document.createElement("div");
    div.className = "msg";
    div.innerHTML = `<strong>${m.user}:</strong> ${m.text} <span class="delete" onclick="deleteMessage(${i})">✖</span>`;
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Auto login if user exists
window.onload = () => {
  const savedUser = localStorage.getItem("cyber_user");
  if (savedUser) {
    username = savedUser;
    login();
  }
};
