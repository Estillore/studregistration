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
          <div class="accordion fetch-id mb-4" id="accordion${users[j].studid}" data-id="${users[j].studid}">
            <div class="accordion-item border-0 shadow-sm bg-white">
              <h2 class="accordion-header" id="heading${users[j].studid}">
                <button 
                  class="accordion-button collapsed fw-semibold bg-white text-dark" 
                  style="font-size: 14px;" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#collapse${users[j].studid}" 
                  aria-expanded="false" 
                  aria-controls="collapse${users[j].studid}"
                >
                  <div class="d-flex align-items-center w-100">
                    <div>
                      <span class="text-muted fw-medium">Student ID:</span>
                      <span class="ms-2 fw-medium">${users[j].studid}</span>
                      <span class="text-muted ms-4 fw-medium">Name:</span>
                      <span class="ms-2 fw-medium">${users[j].studname}</span>
                    </div>
                  </div>
                </button>
              </h2>
              <div 
                id="collapse${users[j].studid}" 
                class="accordion-collapse collapse" 
                aria-labelledby="heading${users[j].studid}"
              >
                <div class="accordion-body p-4 bg-white">
                  <div class="d-flex mb-4" id="studentCredentials${users[j].studid}">
                    <div id="imgContainer${users[j].studid}"></div>
                  </div>
                  <input class="visually-hidden" value="${users[j].studid}" name="student_data[]">
                  <div class="text-end mt-4">
                    <button class="btn btn-outline-success px-4 me-2" style="width: 156px; font-size: 14px;" id="approve${users[j].studid}">Approve</button>
                    <button class="btn btn-outline-danger px-4" style="width: 156px; font-size: 14px;" id="reject${users[j].studid}">Reject</button>
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
    body: formData,
  });

  const user_data = await data_response.json();

  user_data.forEach((user) => {
    console.log(user.userid);

    const studDisplay = document.getElementById(
      "studentCredentials" + user.userid
    );

    const idDisplay = document.getElementById(`imgContainer${user.userid}`);

    idDisplay.innerHTML += `
      <div class="thumbnail-container me-4">
        <img 
          class="img-thumbnail shadow-sm bg-white" 
          src="/uploads/${user.userid}/${user.image}" 
          style="
            height: 150px; 
            width: 150px; 
            object-fit: cover; 
            border-radius: 8px;
          "
          alt="Student ID Photo"
        >
      </div>
    `;

    studDisplay.innerHTML += `
    <div class="container-fluid p-4 bg-white rounded-3 shadow-sm mb-4">
      <!-- Personal Information Section -->
      <h6 class="mb-4 text-dark fw-semibold border-bottom pb-2">Personal Information</h6>
      <div class="row g-4 mb-4">
        <div class="col-md-4">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Student ID</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.userid}" name="studentid${user.userid}" input="${user.userid}" readonly>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Gender</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.gender}" readonly>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Blood Type</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.bloodtype}" readonly>
          </div>
        </div>
      </div>

      <!-- Contact Information Section -->
      <h6 class="mb-4 text-dark fw-semibold border-bottom pb-2">Contact Information</h6>
      <div class="row g-4 mb-4">
        <div class="col-md-6">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Email</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.studentemail}" readonly>
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Phone</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.studentphone}" readonly>
          </div>
        </div>
        <div class="col-md-12">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Address</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.studentaddress}" readonly>
          </div>
        </div>
        <div class="col-md-12">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Alternative Address</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.alternativeaddress}" readonly>
          </div>
        </div>
      </div>

      <!-- Academic Information -->
      <h6 class="mb-4 text-dark fw-semibold border-bottom pb-2">Academic Information</h6>
      <div class="row g-4 mb-4">
        <div class="col-md-6">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Student Number</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.studentnumber}" readonly>
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Course</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.course}" readonly>
          </div>
        </div>
      </div>

      <!-- Emergency Contact Information -->
      <h6 class="mb-4 text-dark fw-semibold border-bottom pb-2">Emergency Contact Information</h6>
      <div class="row g-4">
        <div class="col-md-12">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Emergency Contact</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.emergencycontact}" readonly>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Guardian Name</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.guardianname}" readonly>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Guardian Email</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.guardianemail}" readonly>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group input-group-sm">
            <span class="input-group-text bg-light text-dark border fw-semibold" style="font-size: 14px;">Guardian Phone</span>
            <input type="text" class="form-control bg-white" style="font-size: 14px;" value="${user.guardianphone}" readonly>
          </div>
        </div>
      </div>
    </div>
    `;

    console.log(document.getElementById("approve" + user.userid));

    document
      .getElementById("approve" + user.userid)
      .addEventListener("click", async (e) => {
        const studentIdInput = document.querySelector(
          `input[name="studentid${user.userid}"]`
        );
        const studentIdValue = studentIdInput ? studentIdInput.value : null;
        console.log(studentIdValue);

        const data = {
          studentid: studentIdValue,
        };

        const data_response = await fetch("/userApproval", {
          method: "POST",
          body: JSON.stringify(data),
        });

        const user_identity = await data_response.json();
        const user_details = user_data;
        produceStudentPDF(user_identity, formData, user_details);
      });
  });
};

const produceStudentPDF = async (user_identity, a, user_idData) => {
  console.log(user_idData);
  const form = document.getElementById("myForm");
  const formData = new FormData(form);

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.setFontSize(12);

  const back = "/assets/images/back-1.jpg";
  const front = "/assets/images/front-1.jpg";
  pdf.addImage(front, "JPEG", 50, 10, 100, 100);
  pdf.addImage(back, "JPEG", 50, 120, 100, 100);

  let yPosition = 10; // Initial vertical position

  // Create variables to store each piece of data
  let imageText = "";
  let nameText = "";
  let phoneText = "";
  let numberText = "";
  let addressText = "";
  let path = "";
  let gender = "";
  let bloodtype = "";
  let course = "";

  user_idData.forEach((item) => {
    const concatData = {}; // Initialize for each item in the array

    // Loop over the keys and values to build concatData
    Object.entries(item).forEach(([key, value]) => {
      concatData[key] = `${value}`; // Add key-value to concatData
    });

    // Concatenate the relevant information for each key into its respective variable
    // imageText += `Image: ${concatData.image}\n`;
    nameText += `${concatData.studentname}\n`;
    phoneText += `${concatData.studentphone}\n`;
    numberText += `${concatData.userid}\n`;
    addressText += `${concatData.studentaddress}\n\n`; // Add spacing between users if needed
    gender = `${concatData.gender}\n`;
    bloodtype = `${concatData.bloodtype}\n`;
    course = `${concatData.course}\n`;
    console.log(concatData);
    path += `/uploads/${concatData.userid}/${concatData.image}`;
  });

  // Now control how to position and add each text outside the loop:

  pdf.setFontSize(12);
  yPosition += 20;
  pdf.text(numberText, 83, yPosition);
  yPosition += 6;
  // const imgPath = `/assets/uploads/${concatData.userid}/${concatData.image}`;
  pdf.addImage(path, 77, yPosition, 46, 31);
  yPosition += 40;

  pdf.setFontSize(30);
  pdf.text(nameText, 84, yPosition);

  pdf.setFontSize(25);
  // yPosition += 10;
  pdf.text(course, 93, yPosition + 10);

  pdf.setFontSize(12);
  yPosition += 94;
  pdf.text(nameText, 75, yPosition);
  yPosition += 6;

  pdf.text(addressText, 77, yPosition);
  yPosition += 13;

  pdf.text(phoneText, 84, yPosition);
  yPosition += 20;

  const pdfBlob = pdf.output("blob");

  formData.append("pdf", pdfBlob, "student_report.pdf");

  const studentIds = [];
  Object.entries(user_identity).forEach(([key, value]) => {
    if (key.startsWith("studid")) {
      studentIds.push(value);
    }
  });

  studentIds.forEach((id, index) => {
    formData.append(`studid`, id);
  });

  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }

  const response = await fetch("/generatepdf", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  //todo: compare user_data array to the idcredentials array table. then match the id to get the idcredentials user row.
};

homepage();
