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
  <div id="studentList">
    <div class="" style="font-size: 14px;">
      <table class="table table-bordered table-striped table-sm table-hover" id="studentTable" style="font-size: 14px;">
        <thead>
          <tr class="text-center">
            <th class="align-middle sort fw-semibold" data-sort="student-id">Student ID</th>
            <th class="align-middle sort fw-semibold" data-sort="gender">Gender</th>
            <th class="align-middle sort fw-semibold" data-sort="blood-type">Blood Type</th>
            <th class="align-middle sort fw-semibold" data-sort="email">Email</th>
            <th class="align-middle sort fw-semibold" data-sort="phone">Phone</th>
            <th class="align-middle sort fw-semibold" data-sort="address">Address</th>
            <th class="align-middle sort fw-semibold" data-sort="alt-address">Alternative Address</th>
            <th class="align-middle sort fw-semibold" data-sort="student-number">Student Number</th>
            <th class="align-middle sort fw-semibold" data-sort="course">Course</th>
            <th class="align-middle sort fw-semibold" data-sort="emergency-contact">Emergency Contact</th>
            <th class="align-middle sort fw-semibold" data-sort="guardian-name">Guardian Name</th>
            <th class="align-middle sort fw-semibold" data-sort="guardian-email">Guardian Email</th>
            <th class="align-middle sort fw-semibold" data-sort="guardian-phone">Guardian Phone</th>
            <th class="align-middle sort fw-semibold">Actions</th>
          </tr>
        </thead>
        <tbody id="studentCredentials" class="list">
          <!-- Student rows will be populated here -->
        </tbody>
      </table>
    </div>
  </div>
`;

  const studentRow = document.getElementById("studentCredentials");

  const response = await fetch("/getStudentRow", { method: "GET" });
  const data = await response.json();
  let index = 0;
  data.user_data.forEach((user) => {
    index++;
    studentRow.innerHTML += `
    <tr class="text-center">
      <td class="align-middle student-id">${user.userid}</td>
      <td class="align-middle gender">${user.gender}</td>
      <td class="align-middle blood-type">${user.bloodtype}</td>
      <td class="align-middle email">${user.studentemail}</td>
      <td class="align-middle phone">${user.studentphone}</td>
      <td class="align-middle address">${user.studentaddress}</td>
      <td class="align-middle alt-address">${user.alternativeaddress}</td>
      <td class="align-middle student-number">${user.studentnumber}</td>
      <td class="align-middle course">${user.course}</td>
      <td class="align-middle emergency-contact">${user.emergencycontact}</td>
      <td class="align-middle guardian-name">${user.guardianname}</td>
      <td class="align-middle guardian-email">${user.guardianemail}</td>
      <td class="align-middle guardian-phone">${user.guardianphone}</td>
      <td class="align-middle" style="gap: 10px;">
        <a type="button" class="btn btn-success approve-btn m-1" id="approve-${user.userid}" style="height: 32px; width: 32px; text-align: center; padding: 0;">
          <i class="fas fa-check" style="line-height: 32px;"></i>
        </a>
        <a class="btn btn-danger reject-btn m-1" id="reject${user.userid}" style="height: 32px; width: 32px; text-align: center; padding: 0;">
          <i class="fas fa-times" style="line-height: 32px;"></i>
        </a>
      </td>
    </tr>
  `;

    //todo: add event listeners to the approve and reject buttons
  });

  $("#studentTable").DataTable({
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

  // const formData = new FormData(form);

  // const data_response = await fetch("/getStudentCredits", {
  //   method: "POST",
  //   body: formData,
  // });

  // const user_data = await data_response.json();

  // user_data.forEach((user) => {
  //   console.log(user);
  //   console.log(user.userid);

  //   const studDisplay = document.getElementById("studentCredentials");

  //   console.log(studDisplay);

  //   const idDisplay = document.getElementById(`imgContainer${user.userid}`);

  //   idDisplay.innerHTML += `
  //     <div class="thumbnail-container me-4">
  //       <img
  //         class="img-thumbnail shadow-sm bg-white"
  //         src="/uploads/${user.userid}/${user.image}"
  //         style="
  //           height: 150px;
  //           width: 150px;
  //           object-fit: cover;
  //           border-radius: 8px;
  //         "
  //         alt="Student ID Photo"
  //       >
  //     </div>
  //   `;

  //   studDisplay.innerHTML += `
  //   <tr>
  //     <td>${user.userid}</td>
  //     <td>${user.gender}</td>
  //     <td>${user.bloodtype}</td>
  //     <td>${user.studentemail}</td>
  //     <td>${user.studentphone}</td>
  //     <td>${user.studentaddress}</td>
  //     <td>${user.alternativeaddress}</td>
  //     <td>${user.studentnumber}</td>
  //     <td>${user.course}</td>
  //     <td>${user.emergencycontact}</td>
  //     <td>${user.guardianname}</td>
  //     <td>${user.guardianemail}</td>
  //     <td>${user.guardianphone}</td>
  //   </tr>
  //   `;

  //   console.log(document.getElementById("approve" + user.userid));

  //   document
  //     .getElementById("approve" + user.userid)
  //     .addEventListener("click", async (e) => {
  //       const studentIdInput = document.querySelector(
  //         `input[name="studentid${user.userid}"]`
  //       );
  //       const studentIdValue = studentIdInput ? studentIdInput.value : null;
  //       console.log(studentIdValue);

  //       const data = {
  //         studentid: studentIdValue,
  //       };

  //       const data_response = await fetch("/userApproval", {
  //         method: "POST",
  //         body: JSON.stringify(data),
  //       });

  //       const user_identity = await data_response.json();
  //       const user_details = user_data;
  //       produceStudentPDF(user_identity, formData, user_details);
  //     });
  // });
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
