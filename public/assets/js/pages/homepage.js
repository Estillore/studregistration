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

  const adminUsers = user_list.find((users) => {
    return users.studid === "admin" && users.studpass === "admin";
  });

  let valid_users = [];
  const valid_user = user_list.filter((users) => {
    return users.studid !== "admin" || users.studpass !== "admin";
  });

  valid_users.push(valid_user);
  displayContainer.innerHTML += `
    <form id="myForm"></form>
  `;

  const form = document.getElementById("myForm");
  valid_users.forEach((users) => {
    for (let j = 0; j < users.length; j++) {
      console.log(users[j].studid);
      if (users[j].status === "waiting") {
        form.innerHTML += `
          <div class="accordion fetch-id" id="accordion${users[j].id}" data-id="${users[j].studid}">
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${users[j].studid}" aria-expanded="true" aria-controls="collapse${users[j].studid}">
                  Student ID: <span class="fw-bold" student-id="${users[j].studid}">${users[j].studid}</span>
                </button>
              </h2>
              <div id="collapse${users[j].studid}" class="accordion-collapse collapse show">
                <div class="accordion-body">
                  <div class="d-flex" id="studentCredentials${users[j].studid}">
                    <div id="imgContainer${users[j].studid}"></div>
                  </div>
                  <input class="visually-hidden" value="${users[j].studid}" name="student_data[]">
                  <div class="text-end">
                    <button class="btn btn-success btn-sm ms-auto" id="approve${users[j].studid}">approve</button>
                    <button class="btn btn-danger btn-sm ms-2">reject</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
  });

  const formData = new FormData(form);

  const data_response = await fetch("/getStudentCredits", {
    method: "POST",
    body: formData
  });

  const user_data = await data_response.json();

  user_data.forEach((user) => {
    console.log(user.userid);

    const studDisplay = document.getElementById(
      "studentCredentials" + user.userid
    );

    const idDisplay = document.getElementById(`imgContainer${user.userid}`);

    idDisplay.innerHTML += `
      <img class="img-thumbnail" src="/uploads/${user.userid}/${user.image}" style="height:200px; width:300px;"></img>
    `;

    studDisplay.innerHTML += `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text" id="basic-addon1">Student Id</span> 
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="${user.userid}" name="studentid${user.userid}" input="${user.userid}" readonly>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text" id="basic-addon1">Alternative Address</span>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="${user.alternativeaddress}" readonly>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text" id="basic-addon1">Emergency Contact</span>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="${user.emergencycontact}" readonly>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text" id="basic-addon1">Guardian Email</span>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="${user.guardianemail}" readonly>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text" id="basic-addon1">Guardian Name</span>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="${user.guardianname}" readonly>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text" id="basic-addon1">Guardian Phone</span>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="${user.guardianphone}" readonly>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text" id="basic-addon1">Student Address</span>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="${user.studentaddress}" readonly>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text" id="basic-addon1">Student Email</span>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="${user.studentemail}" readonly>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text" id="basic-addon1">Student Number</span>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="${user.studentnumber}" readonly>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="input-group input-group-sm">
            <span class="input-group-text" id="basic-addon1">Student Phone</span>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="${user.studentphone}" readonly>
          </div>
        </div>
      </div>
    </div>
    `;

    console.log(document.getElementById("approve" + user.userid));

    document
      .getElementById("approve" + user.userid)
      .addEventListener("click", async (e) => {
        e.preventDefault();

        const studentIdInput = document.querySelector(
          `input[name="studentid${user.userid}"]`
        );
        const studentIdValue = studentIdInput ? studentIdInput.value : null;
        console.log(studentIdValue);

        const data = {
          studentid: studentIdValue
        };

        const data_response = await fetch("/userApproval", {
          method: "POST",
          body: JSON.stringify(data)
        });

        const user_data = await data_response.json();
        produceStudentPDF(user_data, formData);
      });
  });
};

const produceStudentPDF = async (user_data) => {
  const form = document.getElementById("myForm");
  const formData = new FormData(form);

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  let yPosition = 10;

  const back = "/assets/images/back-1.jpg";
  const front = "/assets/images/front-1.jpg";

  pdf.addImage(front, "JPEG", 50, 10, 100, 100);
  pdf.addImage(back, "JPEG", 50, 120, 100, 100);

  Object.entries(user_data).forEach(([key, value]) => {
    pdf.text(`${key}: ${value}`, 10, yPosition);
    yPosition += 10;
    console.log(`${key}: ${value}`);
  });

  const pdfBlob = pdf.output("blob");

  formData.append("pdf", pdfBlob, "student_report.pdf");

  const studentIds = [];
  Object.entries(user_data).forEach(([key, value]) => {
    if (key.startsWith("studid")) {
      studentIds.push(value);
    }
  });

  studentIds.forEach((id, index) => {
    formData.append(`studid`, id);
  });

  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const response = await fetch("/generatepdf", {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  //todo: compare user_data array to the idcredentials array table. then match the id to get the idcredentials user row.
};

homepage();
