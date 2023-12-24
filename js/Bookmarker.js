var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var validMessage = document.querySelector(".lightBoxContainer");
var closeBtn = document.querySelector(".close");
var siteList;

if (localStorage.getItem("siteList") == null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("siteList"));
  display(siteList);
  //console.log(  localStorage.getItem("siteList",JSON.parse(siteList)))
}

function addSite() {
  if (validate() == true) {
    var site = {
      name: siteName.value,
      url: siteUrl.value,
    };

    siteList.push(site);
    localStorage.setItem("siteList", JSON.stringify(siteList));
    display(siteList);
    clear();
  } else {
    validMessage.classList.replace("d-none", "d-block");
    clear();
  }
}

function clear() {
  siteName.value = ``;
  siteUrl.value = ``;
}

function display(siteList) {
  var cartona = "";
  for (let i = 0; i < siteList.length; i++) {
    cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${siteList[i].name}</td>
        <td><a class="text-decoration-none text-white" href="${
          siteList[i].url
        }" target="blank"><button class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i> Visit</button></a></td>

        <td><button class="btn btn-danger " onclick = "deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>
        `;
  }

  document.getElementById("tBody").innerHTML = cartona;
}

function validate() {
  const patern =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/g;
  const regex = /^[A-Z][a-z]{2,18}$/;
  if (patern.test(siteUrl.value) && regex.test(siteName.value) == true) {
    return true;
  } else return false;
}

closeBtn.addEventListener("click", function () {
  validMessage.classList.replace("d-block", "d-none");
});

function deleteSite(index) {
  siteList.splice(index, 1);
  console.log("deleted");

  localStorage.setItem("siteList", JSON.stringify(siteList));
  display(siteList);
}
