import { navBar } from "../templates/header.js";
import { updateAvatar } from "../pages/profilepage.js";
import { approvalPage } from "../pages/approval.js";

const appContainer = document.getElementById("app");
const sessionData = JSON.parse(localStorage.getItem("sessionData"));

let userData = [];
const sessions = sessionData.session;
userData.push(sessions);

navBar(appContainer, userData);

export const userpage = async (appContainer) => {
  appContainer.innerHTML += `
        <div class="container-fluid text-center"> 
            <div class="container border mt-3 p-3" style="width:800px; height:780px;">
                <div class="container-fluid">
                    <h4 class="fw-normal mb-3">Student Registration</h4>
                    <hr class="mt-2 mb-2">
                    <div class="progress m-3" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" style="width: 25%" id="progressBar">Student Form</div>
                    </div>
                </div>
                <form id="myform" class="position-relative justify-content-center">
                    <div class="container-fluid p-3" style="font-size:14px; width:762px; height:500px;" id="display">
                        <div class="row mb-3">
                            <div class="col-md-6 text-start">
                                <label for="studentName" class="form-label fw-semibold">Student Name</label>
                                <input type="text" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="studentName" name="studentName" placeholder="John Doe">
                            </div>
                            <div class="col-md-6 text-start">
                                <label for="studentEmail" class="form-label fw-semibold">Student Email</label>
                                <input type="email" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="studentEmail" name="studentEmail" placeholder="student@example.com">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 text-start">
                                <label for="studentPhone" class="form-label fw-semibold">Student Mobile Number</label>
                                <input type="tel" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="studentPhone" name="studentPhone" placeholder="(555) 555-1234">
                            </div>
                            <div class="col-md-6 text-start">
                                <label for="studentAddress" class="form-label fw-semibold">Student Address</label>
                                <input type="text" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="studentAddress" name="studentAddress" placeholder="123 Student St, Apt 4B">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 text-start">
                                <label for="guardianName" class="form-label fw-semibold">Guardian Name</label>
                                <input type="text" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="guardianName" name="guardianName" placeholder="Jane Doe">
                            </div>
                            <div class="col-md-6 text-start">
                                <label for="guardianPhone" class="form-label fw-semibold">Guardian Mobile Number</label>
                                <input type="tel" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="guardianPhone" name="guardianPhone" placeholder="(555) 555-5678">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 text-start">
                                <label for="guardianEmail" class="form-label fw-semibold">Guardian Email</label>
                                <input type="email" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="guardianEmail" name="guardianEmail" placeholder="guardian@example.com">
                            </div>
                            <div class="col-md-6 text-start">
                                <label for="alternativeAddress" class="form-label fw-semibold">Alternative Address (if applicable)</label>
                                <input type="text" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="alternativeAddress" name="alternativeAddress" placeholder="456 Guardian Ave, Suite 5">
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-md-6 text-start">
                                <label for="emergencyContact" class="form-label fw-semibold">Emergency Contact Number</label>
                                <input type="tel" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="emergencyContact" name="emergencyContact" placeholder="(555) 555-9999">
                            </div>
                            <div class="col-md-6 text-start">
                                <label for="studentnumber" class="form-label fw-semibold">Student Number</label>
                                <input type="text" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="studentnumber" name="studentnumber" placeholder="20190410">
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-md-6 text-start">
                                <label for="emergencyContact" class="form-label fw-semibold">Course</label>
                                <input type="tel" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="course" name="course" placeholder="(555) 555-9999">
                            </div>
                            <div class="col-md-6 text-start">
                                <label for="studentnumber" class="form-label fw-semibold">Blood Type</label>
                                <input type="text" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="bloodtype" name="bloodtype" placeholder="20190410">
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-md-6 text-start">
                                <label for="emergencyContact" class="form-label fw-semibold">Gender</label>
                                <input type="tel" class="form-control form-control-sm fw-normal" style="font-size: 14px;" id="gender" name="gender" placeholder="(555) 555-9999">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 text-start"></div>
                            <div class="col-md-6 text-start text-end">
                                <button class="btn btn-sm btn-primary fw-semibold" type="submit" id="submitBtn" style="width:156px; height:32px; font-size:14px;">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;

  const form = document.getElementById("myform");
  const bar = document.getElementById("progressBar");
  const page = "stage1";

  document
    .getElementById("submitBtn")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      const myForm = new FormData(form);
      const response = await fetch("createUser", {
        method: "POST",
        body: myForm,
      });
      const data = await response.json();

      form.innerHTML = "";
      form.innerHTML += `
        <div class="container-fluid p-3" style="width:762px; height:500px;" id="display">
            <div class="position-absolute top-50 start-50 translate-middle">
                <div class="spinner-border" role="status" id="loader">
                    <span class="visually-hidden"></span>
                </div>
            </div>
        </div>
      `;

      bar.style.width = "50%";
      bar.textContent = "Update Avatar";

      const session_data = localStorage.getItem("sessionData");
      console.log(session_data);
      let user_id = null;
      let user_name = null;
      if (session_data) {
        const parsed_data = JSON.parse(session_data);
        const user_data = parsed_data.session;
        user_name = user_data.studname;
        user_id = user_data.studid;
      }

      const progress_response = await fetch("/updateProgress", {
        method: "POST",
        body: JSON.stringify({
          userid: user_id,
          stage: page,
          progress: "100",
        }),
      });

      const progress_data = await progress_response.json();
      console.log(progress_data);

      const updateUserId = await fetch("/updateUserId", {
        method: "POST",
        body: JSON.stringify({
          userid: user_id,
          username: user_name,
        }),
      });

      const update_promise = await updateUserId.json();
      console.log(update_promise);

      setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) {
          loader.remove();
        }

        const display = document.getElementById("display");
        display.innerHTML = "";
        updateAvatar(display, form);
      }, 0);
    });

  userData.forEach((user) => {
    if (user.user_stage === "stage1") {
      const display = document.getElementById("display");
      display.innerHTML = "";
      updateAvatar(display, form);
    }

    if (user.user_stage === "stage2") {
      const display = document.getElementById("display");
      display.innerHTML = "";
      approvalPage(user);
    }
  });
};

userpage(appContainer);
