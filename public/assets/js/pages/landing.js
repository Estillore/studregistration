const appContainer = document.getElementById("app");

const landingPage = () => {
  appContainer.innerHTML = `
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-success">
      <div class="container">
        <a class="navbar-brand fw-medium" href="#" style="font-size: 15px;">
          <img src="assets/images/cvsu_logo.jpg" alt="CVSU Logo" height="25" class="d-inline-block align-text-top me-2">
          <span class="d-none d-sm-inline">Cavite State University</span>
          <span class="d-inline d-sm-none">CVSU</span>
        </a>
        <div class="ms-auto">
          <a href="/login" class="btn btn-light btn-sm me-2 d-none d-md-inline" style="font-size: 14px;">
            <i class="bi bi-box-arrow-in-right"></i> Sign In
          </a>
          <a href="/signup" class="btn btn-outline-light btn-sm d-none d-md-inline" style="font-size: 14px;">
            <i class="bi bi-person-plus"></i> Sign Up
          </a>
          <button class="btn btn-light btn-sm d-md-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">
            <i class="bi bi-list"></i> <!-- Icon for the menu -->
          </button>
        </div>
      </div>
    </nav>

    <!-- Offcanvas Menu -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel" style="width: 50%;">
      <div class="offcanvas-header">
        <h5 id="offcanvasMenuLabel">Menu</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <a href="/login" class="btn btn-light-outlined btn-sm text-start" style="font-size: 14px; width: 100%;">
          <i class="bi bi-box-arrow-in-right"></i> Sign In
        </a>
        <a href="/signup" class="btn btn-light-outlined btn-sm text-start mt-1" style="font-size: 14px; width: 100%;">
          <i class="bi bi-person-plus"></i> Sign Up
        </a>
      </div>
    </div>

    <div class="container py-3 py-md-4">
      <!-- Hero Section -->
      <div class="card shadow-sm mb-3 mb-md-4">
        <div class="card-body p-3 p-md-5 text-center">
          <img src="assets/images/cvsu_logo.jpg" alt="CVSU Logo" class="mb-3 mb-md-4" style="max-width: 120px;">
          <h1 class="display-5 fw-medium mb-2 mb-md-3" style="font-size: calc(1.5rem + 1vw);">CVSU Student ID Registration & Printing</h1>
          <p class="lead fw-normal mb-3 mb-md-4" style="font-size: 15px;">Your gateway to a seamless campus experience</p>
          <button class="btn btn-success fw-normal" style="font-size: 14px;">Register for Student ID</button>
        </div>
      </div>

      <!-- Features Section -->
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 g-md-4 mb-3 mb-md-4">
        <div class="col">
          <div class="card h-100 shadow-sm">
            <div class="card-body p-3">
              <div class="text-center mb-2 mb-md-3">
                <i class="bi bi-shield-check display-4 text-success"></i>
              </div>
              <h5 class="card-title text-center fw-medium" style="font-size: 15px;">Campus Access</h5>
              <p class="card-text text-center fw-normal small" style="font-size: 14px;">Easy entry to campus facilities, libraries, and laboratories with your official student ID.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100 shadow-sm">
            <div class="card-body p-3">
              <div class="text-center mb-2 mb-md-3">
                <i class="bi bi-credit-card display-4 text-success"></i>
              </div>
              <h5 class="card-title text-center fw-medium" style="font-size: 15px;">Student Services</h5>
              <p class="card-text text-center fw-normal small" style="font-size: 14px;">Access student services, cashless payments, and discounts with your ID card.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100 shadow-sm">
            <div class="card-body p-3">
              <div class="text-center mb-2 mb-md-3">
                <i class="bi bi-person-badge display-4 text-success"></i>
              </div>
              <h5 class="card-title text-center fw-medium" style="font-size: 15px;">Official Identification</h5>
              <p class="card-text text-center fw-normal small" style="font-size: 14px;">Valid government-recognized student identification for various transactions.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Process Section -->
      <div class="card shadow-sm">
        <div class="card-header bg-success text-white py-2">
          <h5 class="card-title mb-0 fw-medium" style="font-size: 15px;">ID Registration Process</h5>
        </div>
        <div class="card-body p-0">
          <div class="list-group list-group-flush">
            <div class="list-group-item py-2">
              <div class="d-flex w-100 justify-content-between align-items-center">
                <h6 class="mb-1 fw-medium" style="font-size: 14px;">Online Registration</h6>
                <small class="text-muted fw-normal" style="font-size: 13px;">Step 1</small>
              </div>
              <p class="mb-1 fw-normal" style="font-size: 14px;">Fill out the online registration form and upload required documents.</p>
            </div>
            <div class="list-group-item py-2">
              <div class="d-flex w-100 justify-content-between align-items-center">
                <h6 class="mb-1 fw-medium" style="font-size: 14px;">Photo Capture</h6>
                <small class="text-muted fw-normal" style="font-size: 13px;">Step 2</small>
              </div>
              <p class="mb-1 fw-normal" style="font-size: 14px;">Visit the ID printing office for your official photo capture.</p>
            </div>
            <div class="list-group-item py-2">
              <div class="d-flex w-100 justify-content-between align-items-center">
                <h6 class="mb-1 fw-medium" style="font-size: 14px;">ID Collection</h6>
                <small class="text-muted fw-normal" style="font-size: 13px;">Step 3</small>
              </div>
              <p class="mb-1 fw-normal" style="font-size: 14px;">Collect your printed ID within 3-5 working days.</p>
            </div>
          </div>
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
};

landingPage();
