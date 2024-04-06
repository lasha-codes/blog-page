const fileInput = document.getElementById("upload-input");
const dropZone = document.getElementById("dropZone");
const selectedImg = document.querySelector(".selected-img");
const imageName = document.getElementById("image-name");
const closeBtn = document.getElementById("close-btn");
const form = document.querySelector("form");
const authorInput = document.getElementById("author");
const blogTitle = document.getElementById("blog-title");
const blogDesr = document.getElementById("blog-description");
const blogDate = document.getElementById("blog-date");
const userMail = document.getElementById("email");
const submitBtn = document.getElementById("submit");
const arrowDown = document.getElementById("arrow-down");
const categorySelector = document.querySelector(".categories");
const typeButtons = document.querySelectorAll(".blog-type");
const categoryList = document.querySelector(".category-list");
const selectCategorySpan = document.querySelector(".select-category");
let deleteImages = document.querySelectorAll(".delete-image");
const fourSymblol = document.getElementById("4-symbol");
const headingCharacters = document.querySelector(".symbol-limit");
const twoWords = document.getElementById("two-words");
const georgianSymbol = document.getElementById("georgian-only");
const categoryContainer = document.querySelector(".category-chooser");
const dateContainer = document.querySelector(".date-input");
const emailContainer = document.querySelector(".email-container");
let base64;
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

selectedImg.style.display = "none";
dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", (event) => {
  dropZone.classList.remove("drag-over");
});
dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("drag-over");
  const files = event.dataTransfer.files;
  fileInput.files = files;
  checkSelected();
});
function checkSelected() {
  if (fileInput.files[0].name) {
    selectedImg.style.display = "flex";
    dropZone.style.display = "none";
    imageName.innerHTML = fileInput.files[0].name;
  } else {
    selectedImg.style.display = "none";
    dropZone.style.display = "flex";
    imageName.innerHTML = fileInput.files[0].name;
  }
}
fileInput.addEventListener("change", checkSelected);
closeBtn.addEventListener("click", (e) => {
  fileInput.value = "";
  dropZone.style.display = "flex";
  selectedImg.style.display = "none";
  imageName.innerHTML = "";
});
fileInput.addEventListener("change", async () => {
  base64 = await convertToBase64(fileInput.files[0]);
});

const addBlog = async () => {
  const response = await fetch("http://localhost:4000/add-blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: base64,
      author: authorInput.value,
      title: blogTitle.value,
      description: blogDesr.value,
      date: blogDate.value,
      email: userMail.value,
      types: ["მარკეტი", "კვლევა"],
    }),
  });
  console.log(response);
};
arrowDown.addEventListener("click", () => {
  categoryContainer.style.outline = "1.5px solid #5D37F3";
  arrowDown.classList.toggle("turn-down");
  categorySelector.classList.toggle("visible-selector");
  if (categorySelector.classList.contains("visible-selector")) {
    categoryContainer.style.outline = "1.5px solid #5D37F3";
  } else {
    categoryContainer.style.outline = "1px solid #E4E3EB";
  }
});
let array = [];
let finalArray;
const deleteType = document.createElement("img");
deleteType.setAttribute("src", "../imgs/icons8-close-button-32.png");
deleteType.classList.add("delete-blog-type");

typeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    selectCategorySpan.style.display = "none";
    if (!array.includes(button)) {
      let clonedButton = button.cloneNode(true);
      let clonedDeleteBtn = deleteType.cloneNode(true);
      categoryList.appendChild(clonedButton);
      clonedButton.appendChild(clonedDeleteBtn);
      clonedButton.classList.add("darker");
      array.push(button);

      clonedDeleteBtn.addEventListener("click", () => {
        clonedButton.remove();
        array = array.filter((btn) => btn !== button);
        if (array.length === 0) {
          selectCategorySpan.style.display = "block";
        }
      });
    }
  });
});
isError = false;
authorInput.addEventListener("input", () => {
  authorInput.style.outline = "none";
  authorInput.style.outline = "1.5px solid #5D37F3";
  if (authorInput.value.length >= 4) {
    fourSymblol.style.color = "#14D81C";
  } else {
    isError = true;
    fourSymblol.style.color = "#85858D";
  }
  const splitedValue = authorInput.value.split("");
  if (
    splitedValue.includes(" ") &&
    splitedValue[splitedValue.length - 1] !== " "
  ) {
    twoWords.style.color = "#14D81C";
  } else {
    twoWords.style.color = "#85858D";
    isError = true;
  }
  const georgianRegex = /[\u10A0-\u10FF]/;
  if (georgianRegex.test(authorInput.value)) {
    georgianSymbol.style.color = "#14D81C";
  } else {
    georgianSymbol.style.color = "#85858D";
    isError = true;
  }
});
console.log(blogTitle);
blogTitle.addEventListener("input", () => {
  blogTitle.style.outline = "none";
  blogTitle.style.outline = "1.5px solid #5D37F3";
  if (blogTitle.value.length >= 4) {
    headingCharacters.style.color = "#14D81C";
  } else {
    isError = true;
    headingCharacters.style.color = "#85858D";
  }
});

blogDesr.addEventListener("click", () => {
  blogDesr.style.background = "white";
  blogDesr.style.outline = "1.5px solid #5D37F3";
});
blogDesr.addEventListener("change", () => {
  if (blogDesr.value === "") {
    blogDesr.style.outline = "1.5px solid red";
    blogDesr.style.background = "#FAF2F3";
  } else {
    blogDesr.style.outline = "none";
    blogDesr.style.background = "white";
  }
});
blogDate.addEventListener("click", () => {
  dateContainer.style.outline = "1.5px solid #5D37F3";
});
blogDate.addEventListener("blur", () => {
  dateContainer.style.outline = "none";
});

userMail.addEventListener("click", () => {
  userMail.style.outline = "1.5px solid #5D37F3";
});
userMail.addEventListener("change", () => {
  userMail.style.outline = "none";
});
