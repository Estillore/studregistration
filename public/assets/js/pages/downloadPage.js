import { navBar } from "../templates/header.js";

const appContainer = document.getElementById("app");
const sessionData = JSON.parse(localStorage.getItem("sessionData"));

let userData = [];
const sessions = sessionData.session;
userData.push(sessions);
navBar(appContainer, userData);

const homepage = async () => {
  console.log("contet here");
  const displayContainer = document.getElementById("app");

  displayContainer.innerHTML = `
  <div class="container">
    <h1>Download Page</h1>
  </div>
  `;
};

homepage();
