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
  //fetch all user that has approved their status.

  const user_progress = await fetch("getUserCredit", { method: "GET" });
  const data_userprogress = await user_progress.json();

  const filter_approved = data_userprogress.user_data.filter(
    (item) => item.status === "approved"
  );

  //getting the student registered credentials to get the files of the student.

  console.log(filter_approved);

  const user_approved = [];
  user_approved.push(data_userprogress);

  const id_data = await fetch("studentIdCredits", { method: "GET" });
  const user_id = await id_data.json();
  const credentials = user_id.studCredentials;

  const matchedCredentials = filter_approved.map((student) => {
    const matchedCredential = credentials.find(
      (cred) => cred.userid === student.studid
    );

    return matchedCredential ? matchedCredential : null;
  });

  const filteredMatchedCredentials = matchedCredentials.filter(
    (cred) => cred !== null
  );

  console.log(filteredMatchedCredentials);

  filteredMatchedCredentials.forEach((cred) => {
    displayContainer.innerHTML += `
        <div>
                Student: ${cred.userid} <br>
                        <a class="icon-link icon-link-hover" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);" href="/uploads/${cred.userid}/${cred.pdf}" download="${cred.pdf}">
                                <svg class="bi" aria-hidden="true"><use xlink:href="#clipboard"></use></svg>
                                ${cred.pdf}
                        </a>
                <hr>
        </div>
        `;
  });
};

homepage();
