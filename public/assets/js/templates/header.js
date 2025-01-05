export const navBar = (appContainer, userData) => {
  console.log(userData);
  userData.forEach((user) => {
    appContainer.innerHTML += `
    <nav class="navbar border-bottom sticky-top" style="background-color: #007F00;">
      <div class="container-fluid d-flex justify-content-between align-items-center px-2 px-sm-3 px-md-4" style="min-height: 60px;">
        <h6 class="navbar-brand m-1 fw-semibold text-truncate text-white" style="font-size: 15px; max-width: 70%;" href="#">
          <span class="d-none d-sm-inline">Welcome, </span>${user.studid}
        </h6>
        <img class="rounded-5 ms-2" src="/assets/images/cvsu_logo.jpg" alt="logo" height="35" width="35">
      </div>
    </nav>
  `;
  });
};
