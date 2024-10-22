import { navBar } from "../templates/header.js";
import { sideBar } from "../templates/sidebar.js";

const appContainer = document.getElementById("app");
navBar(appContainer);

const homepage = async () => {
  const displayContainer = await sideBar(appContainer);
  displayContainer.innerHTML += `asdadasd`;
};

homepage();
