import { navBar } from "../templates/header.js";
import { sideBar } from "../templates/sidebar.js";

const appContainer = document.getElementById("app");
const sessionData = JSON.parse(localStorage.getItem("sessionData"));

let userData = [];
const sessions = sessionData.session;
userData.push(sessions);
navBar(appContainer, userData);

const homepage = async () => {
  const displayContainer = await sideBar(appContainer);
  const students_credentials = await fetch("getStudents", { method: "GET" });

  const students_promise = await students_credentials.json();
  let students_list = [];
  students_list.push(students_promise.data);

  let user_list = [];
  for (let i = 0; i < students_list.length; i++) {
    const user_credentials = students_list[i];
    for (let j = 0; j < user_credentials.length; j++) {
      user_list.push(user_credentials[j]);
    }
  }

  //admin user inside this function;
  const adminUsers = user_list.find((users) => {
    return users.studid === "admin" && users.studpass === "admin";
  });

  //user only on this function
  let valid_users = [];
  const valid_user = user_list.filter((users) => {
    return users.studid !== "admin" || users.studpass !== "admin";
  });

  valid_users.push(valid_user);

  valid_users.forEach((users) => {
    for (let j = 0; j < users.length; j++) {
      console.log(users[j]);
      if (users[j].status === "waiting") {
        displayContainer.innerHTML += `
          <div class="accordion" id="accordion${users[j].id}">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${users[j].id}" aria-expanded="true" aria-controls="collapse${users[j].id}">
                  Student ID: <span class="fw-bold">${users[j].studid}</span>
                </button>
              </h2>
              <div id="collapse${users[j].id}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body d-flex">
                  approval of student number student credentials here. ${users[j].id}
                  <button class="btn btn-success btn-sm ms-auto">approve</button>
                  <button class="btn btn-danger btn-sm ms-2">reject</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
  });
};

homepage();
