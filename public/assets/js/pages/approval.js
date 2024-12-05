export const approvalPage = async (user) => {
  const form = document.getElementById("myform");
  const display = document.getElementById("display");
  const bar = document.getElementById("progressBar");

  bar.style.width = "75%";
  bar.textContent = "Waiting for Approval";

  console.log(display);
  display.innerHTML = "waiting for approval";

  if (user.status === "approved") {
    bar.textContent = "";
    display.innerHTML = "";

    bar.style.width = "100%";
    display.innerHTML = "Request Approved";
  }
};
