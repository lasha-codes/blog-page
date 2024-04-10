const blogSection = document.querySelector(".blogs-section");

async function getBlogs() {
  try {
    const response = await fetch("http://localhost:4000/get-blogs");
    const data = await response.json();
    console.log(data);

    data.forEach((blog) => {
      let blogDate = blog.createdAt.slice(0, 10);
      let blogTypes = blog.types;

      blogSection.innerHTML += `<div class="user-blog"> <img src="${blog.image}" alt="blog-img" class="blog-img" />
      <div class="blogger-info">
        <span class="blogger-name">${blog.author}</span>
        <span class="publish-date">${blogDate}</span>
      </div>
      <div class="blog-title">
        <h2>${blog.title}</h2>
      </div>
      <div class="blog-types-container">
        
      </div>
      <div class="blog-description">
        <p>
         ${blog.description}
        </p>
      </div>
      <div class="see-all">
        <span>სრულად ნახვა</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5.93415 13.0052C5.64125 13.2981 5.64125 13.773 5.93415 14.0659C6.22704 14.3587 6.70191 14.3587 6.99481 14.0659L5.93415 13.0052ZM14.2855 6.46446C14.2855 6.05024 13.9498 5.71445 13.5355 5.71446L6.78555 5.71445C6.37133 5.71445 6.03555 6.05024 6.03555 6.46445C6.03555 6.87867 6.37133 7.21445 6.78555 7.21445H12.7855V13.2145C12.7855 13.6287 13.1213 13.9645 13.5355 13.9645C13.9498 13.9645 14.2855 13.6287 14.2855 13.2145L14.2855 6.46446ZM6.99481 14.0659L14.0659 6.99478L13.0052 5.93412L5.93415 13.0052L6.99481 14.0659Z"
            fill="#5D37F3"
          />
          </svg></div>`;
    });
    const typeContainer = document.querySelector(".blog-types-container");
    console.log(blogTypes);
    blogTypes.map((button) => {
      console.log(typeContainer.innerHTML);
      let backgroundColor = "";
      if (button === "მარკეტი") {
        backgroundColor = "#D6961C";
      }
      if (button === "აპლიკაცია") {
        backgroundColor;
      }
      typeContainer.innerHTML += `<button style="color:white; background-color:${backgroundColor}"; min-width:100px; class="blog-type-btns">${button}<span>X</span></button>`;
    });
    if (!response.ok) throw new Error("Error fetching data");
  } catch (e) {
    console.log(e.message);
  }
}
getBlogs();
