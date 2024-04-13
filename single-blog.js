const blogSection = document.querySelector(".blogs-section");
const logInBtn = document.querySelector(".login");
const loginWindowContainer = document.querySelector(".login-window-container");
const loginWindow = document.querySelector(".login-window");
const emailInput = document.getElementById("email");
const emaiLError = document.querySelector(".mail-err-container");
const shesvla = document.querySelector(".login-container");
const succeed = document.querySelector(".succeed");
const addBlogBtn = document.getElementById("add-blog-btn");
const okBtn = document.querySelector(".ok");
const closeBtn = document.querySelectorAll(".window-close");
const backArrow = document.querySelector(".move-arrow");
const queryParams = new URLSearchParams(window.location.search);
console.log(queryParams.get("id"));

async function getSingleBlog() {
  const response = await fetch("http://localhost:4000/get-blogs");
  const data = await response.json();

  const id = queryParams.get("id");
  const blogById = data.find((blog) => {
    return blog._id === id;
  });

  let blogDescr = blogById.description;
  let blogDate = blogById.date.slice(0, 10);
  let blogHTML = `

              <div class="user-blog">
              <img src="${blogById.image}" alt="blog-img" class="blog-img" />

              <div class="blogger-info">
              <span class="blogger-name">${blogById.author}</span>
              <div class="email-and-date">
              <span class="publish-date">${blogDate} .</span>
              
              <span>${blogById.email}<span>
              </div>
              <div class="blog-title">
                <h2>${blogById.title}</h2>
                </div>
                <div class="blog-types-container">

                </div>
                </div>
                <div class="blog-description">
              <p>${blogDescr}</p>
              </div>
              </div>
              `;

  blogSection.innerHTML += blogHTML;

  let typesContainer = document.querySelector(".blog-types-container");

  blogById.types.forEach((type) => {
    let backgroundColor = "";
    switch (type) {
      case "მარკეტი":
        backgroundColor = "#D6961C";
        break;
      case "აპლიკაცია":
        backgroundColor = "#15C972";
        break;
      case "ხელოვნური ინტელექტი":
        backgroundColor = "#B71FDD";
        break;
      case "Figma":
        backgroundColor = "#08D2AE";
        break;
      case "კვლევა":
        backgroundColor = "#60BE16";
        break;
      case "UI/UX":
        backgroundColor = "#DC2828";
        break;
      default:
        backgroundColor = "#000000";
    }
    let button = document.createElement("button");
    button.classList.add("blog-type-btns");
    button.textContent = type;
    button.style.backgroundColor = backgroundColor;
    button.style.color = "white";
    typesContainer.appendChild(button);
  });
}

getSingleBlog();

if (localStorage.getItem("authenticated")) {
  logInBtn.replaceWith(addBlogBtn);
  addBlogBtn.style.display = "block";
}

logInBtn.addEventListener("click", () => {
  loginWindowContainer.style.display = "flex";
  loginWindow.style.display = "flex";
});
emailInput.addEventListener("click", () => {
  emailInput.style.border = "1.5px solid #5D37F3;";
});
shesvla.addEventListener("click", async () => {
  if (emailInput.value === "tato@redberry.ge") {
    localStorage.setItem("authenticated", JSON.stringify(true));
    loginWindow.style.display = "none";
    succeed.style.display = "flex";
  } else {
    emaiLError.style.display = "flex";
  }
});
closeBtn.forEach((item) => {
  item.addEventListener("click", () => {
    loginWindowContainer.style.display = "none";
    succeed.style.display = "none";
    if (succeed.style.display === "flex") {
      addBlogBtn.style.display = "block";
      logInBtn.style.display = "none";
    }
  });
});

okBtn.addEventListener("click", () => {
  loginWindowContainer.style.display = "none";
  succeed.style.display = "none";
  addBlogBtn.style.display = "block";
  logInBtn.replaceWith(addBlogBtn);
});
storeBlogAddBtn();
function storeBlogAddBtn() {
  if (localStorage.getItem("blogAddBtn")) {
    addBlogBtn.style.display = "block";
    logInBtn.style.display = "none";
  }
}
addBlogBtn.addEventListener("click", () => {
  console.log("sadasd");
  document.location.href = "./add blog/add-blog.html";
});
backArrow.addEventListener("click", () => {
  console.log("gsad");
  document.location.href = "./index.html";
});
