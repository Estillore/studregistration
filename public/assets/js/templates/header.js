export const navBar = (appContainer, userData) => {
  userData.forEach((user) => {
    appContainer.innerHTML += `
    <nav class="navbar bg-body-light border-bottom">
      <div class="container-fluid">
        <h6 class="navbar-brand m-1" href="#">
          Student ${user.studid}
        </h6>
      </div>
    </nav>
  `;
  });
};
