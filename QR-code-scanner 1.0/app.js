const main = document.querySelector(".main");
const form = main.querySelector("form");
const fileInp = form.querySelector("input");
const infoTxt = form.querySelector("p");
const textArea = main.querySelector("textarea");
const copyBtn = document.getElementById("copyUrl");
const closeBtn = document.getElementById("close");
const body = document.querySelector(".body");
let data;

form.addEventListener("click", () => fileInp.click());
function fetchRequest(formData, file) {
  infoTxt.innerText = "Scanning your  QR Code...";

  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      textArea.innerText = data = result;
      if (result) infoTxt.innerText = "Upload QR Code to Scan";
      else {
        infoTxt.innerText = "QR Code not found";
        setTimeout(() => {
          document.location.reload();
        }, 3000);
        return;
      }
      form.querySelector("img").src = URL.createObjectURL(file);
      main.classList.add("active");
      body.classList.add("active");
    })
    .catch(() => {
      infoTxt.innerText = "QR Code not found";
    });
}

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(data);
});

closeBtn.addEventListener("click", () => {
  main.classList.remove("active");
  body.classList.remove("active");
});

fileInp.addEventListener("change", (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file);
  fetchRequest(formData, file);
});
