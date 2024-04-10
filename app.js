async function getBlogs() {
  try {
    const response = await fetch("http://localhost:4000/get-blogs");
    const data = await response.json();
    console.log(data);
    if (!response.ok) throw new Error("Error fetching data");
  } catch (e) {
    console.log(e.message);
  }
}
getBlogs();
