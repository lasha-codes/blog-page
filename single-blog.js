const queryParams = new URLSearchParams(window.location.search);
console.log(queryParams.get("id"));

async function getSingleBlog() {
  const response = await fetch("http://localhost:4000/get-blogs");
  const data = await response.json();

  const id = queryParams.get("id");
  const blogById = data.find((blog) => {
    return blog._id === id;
  });
  console.log(blogById);
}
getSingleBlog();
