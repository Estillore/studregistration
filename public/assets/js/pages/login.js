const login = () => {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML += `
    <div class="position-relative vh-100">
        <div class="position-absolute top-50 start-50 translate-middle">
          <form class="border p-4" id="myForm" style="width:450px; border-radius:15px;">
                <div class="text-center mb-4">
                    <h4 class="fw-medium">Log In</h4>
                    <p class="text-black-50 fw-normal opacity-75" style="font-size:15px;">Welcome back! Log in to stay updated with all your Details and Requirements.</p>
                </div>
                <div class="alert alert-danger d-none py-2" id="errorMessage" role="alert" style="font-size:14px;"></div>
                <div class="mb-3">
                    <label for="idnumber" class="form-label fw-semibold" style="font-size:14px;">ID Number</label>
                    <input type="text" class="form-control form-control-sm fs-medium" 
                           id="idnumber" name="idnumber" required
                           style="font-size:14px;"
                           placeholder="Enter ID Number">
                    <div class="invalid-feedback">Please enter your ID number</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label fw-semibold" style="font-size:14px;">Password</label>
                    <div class="input-group">
                        <input type="password" class="form-control form-control-sm fs-medium" 
                               id="password" name="password" required
                               style="font-size:14px;"
                               placeholder="Enter Password">
                        <button class="btn btn-outline-secondary btn-sm" type="button" id="togglePassword" style="font-size:14px;">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                    <div class="invalid-feedback">Please enter your password</div>
                </div>
                <div class="mt-4 d-grid">
                    <button class="btn btn-primary fw-medium" id="submitBtn" type="submit" 
                            style="font-size:14px; height: 32px; line-height: 1;">
                        <span class="spinner-border spinner-border-sm d-none" id="loadingSpinner"></span>
                        <span id="submitText">Log In</span>
                    </button>
                </div>
           </form>
        </div>
    </div>
  `;

  const form = document.getElementById("myForm");
  const submitBtn = document.getElementById("submitBtn");
  userLogin(submitBtn, form);

  // Add password toggle functionality
  const togglePassword = document.getElementById("togglePassword");
  const password = document.getElementById("password");
  togglePassword.addEventListener("click", () => {
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    togglePassword.innerHTML =
      type === "password"
        ? '<i class="bi bi-eye"></i>'
        : '<i class="bi bi-eye-slash"></i>';
  });
};

//backend
let sessionData = null;

const userLogin = (submitBtn, form) => {
  const userForm = form;
  const loadingSpinner = document.getElementById("loadingSpinner");
  const submitText = document.getElementById("submitText");
  const errorMessage = document.getElementById("errorMessage");

  const setLoading = (isLoading) => {
    submitBtn.disabled = isLoading;
    loadingSpinner.classList.toggle("d-none", !isLoading);
    submitText.classList.toggle("d-none", isLoading);
  };

  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!userForm.checkValidity()) {
      userForm.classList.add("was-validated");
      return;
    }

    setLoading(true);
    errorMessage.classList.add("d-none");

    try {
      const myForm = new FormData(userForm);
      const response = await fetch("/Home/Login", {
        method: "POST",
        body: myForm,
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("sessionData", JSON.stringify(data));
        window.location.href = data.role === "admin" ? "/Home" : "/userPage";
      } else {
        errorMessage.textContent = data.message || "Invalid login credentials";
        errorMessage.classList.remove("d-none");
      }
    } catch (error) {
      errorMessage.textContent = "An error occurred. Please try again.";
      errorMessage.classList.remove("d-none");
    } finally {
      setLoading(false);
    }
  });
};

login();
