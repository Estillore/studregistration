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
            <div class="container border mt-3 p-3" style="width:800px; height:auto;">
                <div class="container-fluid">
                    <div class="progress m-3" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" style="width: 25%" id="progressBar">Student Form</div>
                    </div>
                </div>
                <form id="myform" class="position-relative justify-content-center">
                    <div class="container-fluid p-3" style="font-size:15px; width:762px; height:500px;" id="display">
                        <div class="row mb-3">
                            <div class="col-md-6 text-start">
                                <label for="studentName" class="form-label">Student Name</label>
                                <input type="text" class="form-control form-control-sm" id="studentName" name="studentName" placeholder="John Doe">
                            </div>
                            <div class="col-md-6 text-start">
                                <label for="studentEmail" class="form-label">Student Email</label>
                                <input type="email" class="form-control form-control-sm" id="studentEmail" name="studentEmail" placeholder="student@example.com">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 text-start">
                                <label for="studentPhone" class="form-label">Student Mobile Number</label>
                                <input type="tel" class="form-control form-control-sm" id="studentPhone" name="studentPhone" placeholder="(555) 555-1234">
                            </div>
                            <div class="col-md-6 text-start">
                                <label for="studentAddress" class="form-label">Student Address</label>
                                <input type="text" class="form-control form-control-sm" id="studentAddress" name="studentAddress" placeholder="123 Student St, Apt 4B">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 text-start">
                                <label for="guardianName" class="form-label">Guardian Name</label>
                                <input type="text" class="form-control form-control-sm" id="guardianName" name="guardianName" placeholder="Jane Doe">
                            </div>
                            <div class="col-md-6 text-start">
                                <label for="guardianPhone" class="form-label">Guardian Mobile Number</label>
                                <input type="tel" class="form-control form-control-sm" id="guardianPhone" name="guardianPhone" placeholder="(555) 555-5678">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 text-start">
                                <label for="guardianEmail" class="form-label">Guardian Email</label>
                                <input type="email" class="form-control form-control-sm" id="guardianEmail" name="guardianEmail" placeholder="guardian@example.com">
                            </div>
                            <div class="col-md-6 text-start">
                                <label for="alternativeAddress" class="form-label">Alternative Address (if applicable)</label>
                                <input type="text" class="form-control form-control-sm" id="alternativeAddress" name="alternativeAddress" placeholder="456 Guardian Ave, Suite 5">
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-md-6 text-start">
                                <label for="emergencyContact" class="form-label">Emergency Contact Number</label>
                                <input type="tel" class="form-control form-control-sm" id="emergencyContact" name="emergencyContact" placeholder="(555) 555-9999">
                            </div>
                            <div class="col-md-6 text-start">
                                <label for="studentnumber" class="form-label">Student Number</label>
                                <input type="text" class="form-control form-control-sm" id="studentnumber" name="studentnumber" placeholder="20190410">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 text-start"></div>
                            <div class="col-md-6 text-start text-end">
                                <button class="btn btn-sm btn-primary" type="submit" id="submitBtn" style="width:150px;">Submit</button>
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
        body: myForm
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

      if (session_data) {
        const parsed_data = JSON.parse(session_data);
        const user_data = parsed_data.session;
        user_id = user_data.studid;
      }

      const progress_response = await fetch("/updateProgress", {
        method: "POST",
        body: JSON.stringify({
          userid: user_id,
          stage: page,
          progress: "100"
        })
      });

      const progress_data = await progress_response.json();
      console.log(progress_data);

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
      approvalPage();
    }
  });
};

userpage(appContainer);
