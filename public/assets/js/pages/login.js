const login = () => {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML += `
    <div class="position-relative vh-100">
        <div class="position-absolute top-50 start-50 translate-middle">
          <form class="border p-4" id="myForm" style="width:450px; border-radius:15px;">
                <div class="text-center">
                    <p class="fw-semibold">Log In</p>
                    <p class="text-black-50 fw-medium opacity-75" style="font-size:15px;">Welcome back! Log in to stay updated with all your Details and Requirements.</p>
                </div>
                <div class="mb-3">
                    <label for="inputLogin" class="form-label fw-semibold" style="font-size:15px;">Id Number</label>
                    <input type="text" class="form-control form-control-sm fs-medium inputLogin" id="idnumber" name="idnumber" placeholder="Enter id Number">
                </div>
                <div class="mb-3">
                    <label for="inputLogin" class="form-label fw-semibold" style="font-size:15px;">Password</label>
                    <input type="" class="form-control form-control-sm fs-medium inputLogin" id="password" name="password" placeholder="Enter Password">
                </div>
                <div class="mt-5 d-grid">
                    <button class="btn btn-sm btn-primary btn-block fw-normal" id="submitBtn">Submit</button>
                </div>
           </form>
        </div>
    </div>
  `;

  const form = document.getElementById("myForm");
  const submitBtn = document.getElementById("submitBtn");
  userLogin(submitBtn, form);
};

//backend
let sessionData = null;

const userLogin = (submitBtn, form) => {
  const userForm = form;
  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(userForm);
    const myForm = new FormData(userForm);
    const response = await fetch("/Home/Login", {
      method: "POST",
      body: myForm
    });

    const data = await response.json();

    if (data.status === "success") {
      localStorage.setItem("sessionData", JSON.stringify(data));
      window.location.href = "/userPage";
    } else {
      console.log("invalid login");
    }
  });
};

login();
