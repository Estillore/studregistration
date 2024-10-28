export const approvalPage = () => {
  const form = document.getElementById("myform");
  const display = document.getElementById("display");
  const bar = document.getElementById("progressBar");

  bar.style.width = "75%";
  bar.textContent = "Waiting for Approval";

  console.log(display);
  display.innerHTML += "waiting for approval";
};
