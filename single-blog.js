const blogSection = document.querySelector(".blogs-section");

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
