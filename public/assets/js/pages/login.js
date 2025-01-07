const login = () => {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML += `
    <!-- Header Section -->
    <header class="bg-success text-white d-flex justify-content-between align-items-center py-3 px-4">
      <div class="d-flex align-items-center">
        <img src="assets/images/cvsu_logo.jpg" alt="CVSU Logo" height="25" class="d-inline-block align-text-top me-2">
        <h1 class="mb-0" style="font-size: 15px;">Cavite State University</h1>
      </div>
      <div class="d-flex">
        <a href="/login" class="btn btn-light btn-sm me-2 d-none d-md-inline" style="font-size: 14px;">Sign In</a>
        <a href="/signup" class="btn btn-outline-light btn-sm d-none d-md-inline" style="font-size: 14px;">Sign Up</a>
        <button class="btn btn-light btn-sm d-md-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">
          <i class="bi bi-list"></i>
        </button>
      </div>
    </header>

    <!-- Offcanvas Menu -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel" style="width: 50%;">
      <div class="offcanvas-header">
        <h5 id="offcanvasMenuLabel">Menu</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column">
        <a href="/login" class="btn btn-light-outlined btn-sm me-2 text-start" style="font-size: 14px;">
          <i class="bi bi-personbi bi-box-arrow-in-right"></i> Sign In
        </a>
        <a href="/signup" class="btn btn-light-outlined btn-sm text-start mt-1" style="font-size: 14px;">
          <i class="bi bi-person-plus"></i> Sign Up
        </a>
      </div>
    </div>
    <!-- End of Offcanvas Menu -->

    <div class="container-fluid d-flex flex-column vh-100">
        <div class="flex-grow-1 d-flex align-items-center justify-content-center">
            <div class="col-12 col-md-6 col-lg-4" style="max-width: 500px;">
                <form class="border p-4" id="myForm" style="border-radius:15px; background-color: #ffffff; height: 100%; overflow: auto;">
                    <div class="text-center mb-4">
                        <h4 class="fw-medium" style="color: #28a745;">Log In</h4>
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
                        <button class="btn btn-success fw-medium" id="submitBtn" type="submit" 
                                style="font-size:14px; height: 32px; line-height: 1; background-color: #28a745; border-color: #28a745;">
                            <span class="spinner-border spinner-border-sm d-none" id="loadingSpinner"></span>
                            <span id="submitText">Log In</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Footer Section -->
    <footer class="bg-success text-white text-center py-3">
      <div class="container">
        <p class="mb-0" style="font-size: 14px;">&copy; ${new Date().getFullYear()} Cavite State University. All rights reserved.</p>
        <p class="mb-0" style="font-size: 12px;">Follow us on 
          <a href="#" class="text-white">Facebook</a>, 
          <a href="#" class="text-white">Twitter</a>, 
          <a href="#" class="text-white">Instagram</a>
        </p>
      </div>
    </footer>
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
