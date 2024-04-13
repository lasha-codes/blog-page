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
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");

let similarBlogs = document.getElementById("similarBlogs");
const queryParams = new URLSearchParams(window.location.search);
console.log(queryParams.get("id"));

async function getSingleBlog() {
  const response = await fetch("http://localhost:4000/get-blogs");
  let data = await response.json();
  console.log(data);
  const id = queryParams.get("id");
  const blogById = data.find((blog) => {
    return blog._id === id;
  });
  data = data.filter((data) => data._id !== blogById._id);
  data.map((blog) => {
    if (blog.types.some((type) => blogById.types.includes(type))) {
      let blogDescr = blog.description.slice(0, 90);

      let blogDate = blog.date.slice(0, 10);
      let blogHTML = `
            <div class="user-blog similar-blog">
                <img src="${blog.image}" alt="blog-img" class="blog-img" />
                <div class="blogger-info similar-blog-info">
                    <span class="blogger-name similar-blog-name">${blog.author}</span>
                    <div class="email-and-date">
                        <span class="publish-date">${blogDate} .</span>
                    </div>
                    <div class="blog-title">
                        <h2>${blog.title}</h2>
                    </div>
                    <div class="blog-types-container familiar-types"></div>
                </div>
                <div class="blog-description similar-blog-descr">
                    <p>${blogDescr}</p>
                </div>
                <div class="see-all">
                    <span>სრულად ნახვა</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5.93415 13.0052C5.64125 13.2981 5.64125 13.773 5.93415 14.0659C6.22704 14.3587 6.70191 14.3587 6.99481 14.0659L5.93415 13.0052ZM14.2855 6.46446C14.2855 6.05024 13.9498 5.71445 13.5355 5.71446L6.78555 5.71445C6.37133 5.71445 6.03555 6.05024 6.03555 6.46445C6.03555 6.87867 6.37133 7.21445 6.78555 7.21445H12.7855V13.2145C12.7855 13.6287 13.1213 13.9645 13.5355 13.9645C13.9498 13.9645 14.2855 13.6287 14.2855 13.2145L14.2855 6.46446ZM6.99481 14.0659L14.0659 6.99478L13.0052 5.93412L5.93415 13.0052L6.99481 14.0659Z" fill="#5D37F3"/>
                    </svg>
                </div>
            </div>`;
      similarBlogs.innerHTML += blogHTML;

      let currentBlog = similarBlogs.querySelector(".user-blog:last-child");
      let typesContainer = currentBlog.querySelector(".blog-types-container");

      blog.types.forEach((type) => {
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
    const seeAll = document.querySelectorAll(".see-all");
    seeAll.forEach((link, index) => {
      link.addEventListener("click", () => {
        data.map((blog, idx) => {
          if (index === idx) {
            document.location.href = `single-blog.html?id=${blog._id}`;
          }
        });
      });
    });
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
arrowRight.addEventListener("click", () => {
  const width = Math.round(similarBlogs.getBoundingClientRect().width);
  console.log(width);
  similarBlogs.style.transform = `translateX(${-(
    window.outerWidth +
    400 -
    width
  )}px)`;
  arrowLeft.classList.add("active-arrow");
  arrowRight.classList.remove("active-arrow");
});
console.log(window.outerWidth);
arrowLeft.addEventListener("click", () => {
  similarBlogs.style.transform = "translateX(0)";
  arrowRight.classList.add("active-arrow");
  arrowLeft.classList.remove("active-arrow");
});
