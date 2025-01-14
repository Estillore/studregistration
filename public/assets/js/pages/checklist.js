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

  const user_progress = await fetch("getUserCredit", { method: "GET" });
  const data_userprogress = await user_progress.json();

  const filter_approved = data_userprogress.user_data.filter(
    (item) => item.status === "approved"
  );

  const user_approved = [];
  user_approved.push(data_userprogress);

  const id_data = await fetch("studentIdCredits", { method: "GET" });
  const user_id = await id_data.json();
  const credentials = user_id.studCredentials;

  const approvedUsers = data_userprogress.user_data.filter(
    (user) => user.status === "approved"
  );

  displayContainer.innerHTML = `
    <div class="container py-4" style="font-size: 14px;">
      <table class="table table-bordered table-striped table-sm table-hover" id="" style="font-size: 14px;">
        <thead>
          <tr class="text-center">
            <th class="align-middle sort fw-semibold" data-sort="student-id">Student ID</th>
            <th class="align-middle sort fw-semibold" data-sort="gender">Name</th>
            <th class="align-middle sort fw-semibold" data-sort="blood-type">Status</th>
            <th class="align-middle sort fw-semibold" data-sort="blood-type">Actions</th>
          </tr>
        </thead>
        <tbody id="studentCredentials" class="list">

        </tbody>
      </table>
    </div>
  `;

  const studentRow = document.getElementById("studentCredentials");

  approvedUsers.forEach(async (user) => {
    const response = await fetch("getStudentData", {
      method: "POST",
      body: JSON.stringify({ studid: user.studid }),
    });
    const data = await response.json();

    data.forEach((user) => {
      displayContainer.innerHTML += `
        <div class="modal fade" id="exampleModal${user.userid}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Student ID: ${user.userid}</h1>
                <a type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></a>
              </div>
              <div class="modal-body d-flex">
              <div class="container-fluid border capture-section-${user.userid}" style="height:670px; width:430px; background-image: url('assets/images/front-1.jpg'); background-repeat: no-repeat; display: flex; flex-direction: column; align-items: center; justify-content: center;" id="capture-section-${user.userid}">
                  <p class="fw-semibold" style="margin-bottom:55px; margin-right:80px; margin-top: 0px;">${user.userid}</p>
                  <img src="uploads/${user.userid}/${user.image}" alt="Student Image" class="img-fluid" style="width:193px; height:190px; margin-bottom:25px; margin-top: 0px; margin-left: 3px;">
                  <p class="fw-semibold text-center" style="font-size:25px; width:400px;">${user.studentname}</p>
                  <p class="fw-semibold text-center" style="font-size:25px; width:400px;">${user.course}</p>
              </div>
                <div class="container-fluid border d-flex justify-content-center" style="height:670px; width:430px; background-image: url('assets/images/back-1.jpg');" id="back-image">
                </div>
              </div>

              <div class="modal-footer">
                  <a type="button" class="btn btn-success download-front" id="front-download-${user.userid}">Download the front</a>
              </div>
            </div>
          </div>
        </div>
    `;

      const frontDownload = document.querySelectorAll(`.download-front`);

      console.log(frontDownload);

      if (frontDownload) {
        frontDownload.forEach((btn) => {
          btn.addEventListener("click", () => {
            console.log(user);
            const captureSection = document.querySelector(
              `.capture-section-${user.userid}`
            );

            const options = {
              style: {
                backgroundColor: "white",
                paddingRight: "20px",
              },
              width: 420,
              height: 670,
              quality: 1,
              filter: (node) => {
                return true;
              },
            };

            domtoimage
              .toPng(captureSection, options)
              .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = `captured_div_${user.userid}.jpeg`;
                link.href = dataUrl;
                link.click();
              })
              .catch((error) => {
                console.error("Error generating image:", error);
              });
          });
        });
      }
    });
  });

  approvedUsers.forEach((user) => {
    studentRow.innerHTML += `
      <tr>
        <td>${user.studid}</td>
        <td>${user.studname}</td>
        <td>${user.status}</td>
        <td>
          <button class="btn btn-primary btn-sm btn-view" id="${user.studid}" style="font-size: 14px;" data-bs-toggle="modal" data-bs-target="#exampleModal${user.studid}">View</button>
        </td>
      </tr>
    `;
  });

  $("#checkListTable").DataTable({
    paging: true,
    searching: true,
    ordering: true,
    info: true,
    lengthMenu: [5, 10, 25, 50],
    language: {
      search: "Filter records:",
      lengthMenu: "Show _MENU_ entries",
      info: "Showing _START_ to _END_ of _TOTAL_ entries",
    },
    autoWidth: true,
  });
};

homepage();
