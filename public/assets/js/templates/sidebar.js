export const sideBar = async (appContainer) => {
  const response = await fetch("sidebar");
  const data = await response.json();
  const names = data.sidebar;

  appContainer.innerHTML += `
    <div class="d-flex" style="width:100vw; height:863px; d-flex">
      <div class="border-end bg-body-light">
          <ul class="list-unstyled d-grid" id="listContainer">
            
          </ul>
      </div>
      <div class="container-fluid m-3" id="displayContainer"></div>
  </div>
  `;

  const listDisplay = document.getElementById("listContainer");
  names.forEach((nameVal) => {
    listDisplay.innerHTML += `
        <li class="btn btn-sm btn-block hover-btn text-start fw-semibold mb-1" style="width: 250px;">
            <a href="${nameVal.link}" class="text-decoration-none text-dark d-flex align-items-center">
                <i class="${nameVal.icons} me-2"></i>${nameVal.sidebar}
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
      button.classList.add("active", "btn-light");
    } else {
      button.classList.remove("active", "btn-light");
    }
  });
};
