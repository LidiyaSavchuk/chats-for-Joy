// Firebase Config
const config = {
    apiKey: "AIzaSyALfhk2ta_qS5D6O2Sx2ABqpkxFC2NhXnw",
    authDomain: "fir-chat-a6417.firebaseapp.com",
    databaseURL: "https://fir-chat-a6417.firebaseio.com",
    projectId: "fir-chat-a6417",
    storageBucket: "fir-chat-a6417.appspot.com",
    messagingSenderId: "342669420955",
    appId: "1:342669420955:web:0645ee8956390db6"
};

firebase.initializeApp(config);

const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("name-input");
const nameBtn = document.getElementById("name-btn");
const messageScreen = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const msgInput = document.getElementById("msg-input");
const msgBtn = document.getElementById("msg-btn");
const db = firebase.database();
const msgRef = db.ref("/msgs");
const id = uuid();
let name;

messageForm.addEventListener("submit", event => {
  event.preventDefault();

  const text = msgInput.value;

  if (!name) {
    return alert("You have to set up some name");
  } else if (!text.trim()) return alert("You have to type in some msg");

  const msg = {
    id,
    name,
    text
  };

  msgRef.push(msg);
  msgInput.value = "";
});

const updateMsges = data => {
  const { id: userID, name, text } = data.val();
  const msg = `<li class="msg ${id == userID && "my"}"><span>
      <i class="name">${name}: </i> ${_.escape(text)}
        </span>
              </li>`;
  messageScreen.innerHTML += msg;
};

msgRef.on("child_added", updateMsges);

nameForm.addEventListener("submit", e => {
  e.preventDefault();
  if (nameInput.value.trim().length < 4)
    return alert("Name should be more than 4 characters");

  nameForm.style.display = "none";
  msgInput.removeAttribute("disabled");
  msgBtn.removeAttribute("disabled");
  return (name = nameInput.value);
});
