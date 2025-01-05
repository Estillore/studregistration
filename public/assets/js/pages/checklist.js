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

  displayContainer.innerHTML = `
    <div class="container py-4">
      <div class="card shadow-sm mb-4">
        <div class="card-header bg-light">
          <h6 class="card-title mb-0">Student Documents Checklist</h6>
        </div>
        <div class="card-body">
          <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            ${filteredMatchedCredentials
              .map(
                (cred, index) => `
              <div class="col">
                <div class="card h-100 border">
                  <div class="card-body p-3" style="font-size: 14px;">
                    <div class="d-flex align-items-center gap-2 mb-3">
                      <div class="avatar-sm bg-primary text-white border rounded-circle" style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 14px;">
                        ${index + 1}
                      </div>
                      <div class="fw-medium" style="font-size: 14px;">Student ${
                        cred.userid
                      }</div>
                    </div>
                    <a class="btn btn-primary w-100" 
                       href="/uploads/${cred.userid}/${cred.pdf}" 
                       download="${cred.pdf}"
                       style="font-size: 14px; display: flex; align-items: center; justify-content: center; gap: 4px;">
                      <i class="bi bi-clipboard"></i>
                      Download Document
                    </a>
                  </div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;
};

homepage();
