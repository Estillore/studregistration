export const sideBar = async (appContainer) => {
  const response = await fetch("sidebar");
  const data = await response.json();
  const names = data.sidebar;

  appContainer.innerHTML += `
    <div class="d-flex flex-column flex-md-row" style="min-height: 100vh;">
      <div class="bg-body-light sidebar position-sticky" style="height: 100%; min-width: 180px; max-width: auto; overflow-y: auto; top: 0;">
          <ul class="list-unstyled m-1" id="listContainer">
          </ul>
      </div>
      <div class="container-fluid p-3" id="displayContainer"></div>
    </div>
  `;

  const listDisplay = document.getElementById("listContainer");
  names.forEach((nameVal) => {
    listDisplay.innerHTML += `
        <li class="btn btn-sm btn-block hover-btn text-start fw-semibold mb-1 w-100 fs-6">
            <a href="${nameVal.link}" class="text-decoration-none text-dark d-flex align-items-center " style="font-size: 14px;">
                <i class="${nameVal.icons} me-2"></i>
                <span class="text-truncate">${nameVal.sidebar}</span>
            </a>
        </li>
    `;
  });

  const buttonsEl = document.querySelectorAll(".list-unstyled li");
  const currentPage = window.location.pathname;
  buttonActive(buttonsEl, currentPage);

  let display = document.getElementById("displayContainer");
  return display;
};

export const buttonActive = (buttonsEl, currentPage) => {
  buttonsEl.forEach((button) => {
    const pageLink = button.textContent.trim();
    if (currentPage.includes(pageLink)) {
      button.classList.add("btn-success");
    } else {
      button.classList.remove("btn-success");
    }
  });
};
