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
const submitBtn = document.querySelector(".submit-container");
const arrowDown = document.getElementById("arrow-down");
const categorySelector = document.querySelector(".categories");
const typeButtons = document.querySelectorAll(".blog-type");
const categoryList = document.querySelector(".category-list");
const selectCategorySpan = document.querySelector(".select-category");
const fourSymblol = document.getElementById("4-symbol");
const headingCharacters = document.querySelector(".symbol-limit");
const twoWords = document.getElementById("two-words");
const georgianSymbol = document.getElementById("georgian-only");
const categoryContainer = document.querySelector(".category-chooser");
const dateContainer = document.querySelector(".date-input");
const emailContainer = document.querySelector(".email-container");
const errorSpan = document.querySelectorAll(".error-span");
const descrSymbol = document.querySelector(".description-symbol");
let blogTypeBtns = document.querySelectorAll(".blog-type-btns");
const emailErr = document.querySelector(".mail-err-container");
let isError;
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
    isError = false;
    selectedImg.style.display = "flex";
    dropZone.style.display = "none";
    imageName.innerHTML = fileInput.files[0].name;
  } else {
    isError = true;
    selectedImg.style.display = "none";
    dropZone.style.display = "flex";
    imageName.innerHTML = "";
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
let buttonArr = [];
async function getButtons() {
  try {
    const response = await fetch(
      "https://george.pythonanywhere.com/api/categories/?fbclid=IwAR2Pd6I_ZErVTAitXhLURdYgc6n9oPHC82KSmODMQCqK3e-lr76xJWawXF8_aem_AUUE9aDvLBti-daJl09LRsicTf-ngylg8US2U_v26VUkXefTFNysCCGj3Gp2K-_1YQRA9O494DL7TNYn0jSpQZs0"
    );
    const data = await response.json();
    const correctData = data.slice(0, 6);
    correctData.forEach((item) => {
      categorySelector.innerHTML += `<button style="color:white; background-color:${item.background_color}" class="blog-type-btns">${item.title}</button>`;
    });

    categorySelector.addEventListener("click", (event) => {
      event.preventDefault();
      if (buttonArr.includes(event.target.textContent.trim())) return;
      buttonArr.push(event.target.textContent.trim());

      if (event.target.classList.contains("blog-type-btns")) {
        selectCategorySpan.style.display = "none";
        const X = document.createElement("span");
        X.append("X");
        let clonedButton = event.target.cloneNode(true);
        clonedButton.classList.add("cloned-btn-styles");
        clonedButton.append(X);
        categoryList.appendChild(clonedButton);
      }
    });

    categoryList.addEventListener("click", (event) => {
      event.preventDefault();
      let parentBtn = event.target.parentElement;
      parentBtn = parentBtn.textContent.trim().split("X")[0];
      buttonArr = buttonArr.filter((item) => {
        return item !== parentBtn;
      });
      if (event.target.textContent === "X") {
        event.target.parentElement.remove();
      }
      if (categoryList.children.length == 1) {
        selectCategorySpan.style.display = "block";
      } else {
        selectCategorySpan.style.display = "none";
      }
      if (categoryList.children.length > 1) {
        categoryContainer.style.outline = "1px solid #14D81C";
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getButtons();

arrowDown.addEventListener("click", () => {
  categoryContainer.style.outline = "1.5px solid #5D37F3";

  arrowDown.classList.toggle("turn-down");
  categorySelector.classList.toggle("visible-selector");

  if (categoryList.children.length > 1) {
    categoryContainer.style.outline = "1px solid  #14D81C";
  } else {
  }
});
authorInput.addEventListener("input", () => {
  authorInput.style.background = "white";
  authorInput.style.outline = "none";
  authorInput.style.outline = "1.5px solid #5D37F3";

  if (authorInput.value.length >= 4) {
    fourSymblol.style.color = "#14D81C";
    isError = false;
  } else {
    isError = true;
  }

  const splitedValue = authorInput.value.split("");
  if (
    splitedValue.includes(" ") &&
    splitedValue[splitedValue.length - 1] !== " "
  ) {
    isError = false;
    twoWords.style.color = "#14D81C";
  } else {
    twoWords.style.color = "#85858D";
    isError = true;
  }

  const georgianRegex = /[\u10A0-\u10FF]/;
  if (georgianRegex.test(authorInput.value)) {
    georgianSymbol.style.color = "#14D81C";
    isError = false;
  } else {
    georgianSymbol.style.color = "#85858D";
    isError = true;
  }
});

authorInput.addEventListener("change", () => {
  if (isError) {
    authorInput.style.outline = "1px solid #EA1919";
    authorInput.style.background = "#FAF2F3";
    errorSpan.forEach((item) => {
      item.style.color = "red";
    });
  } else {
    authorInput.style.background = "white";
    authorInput.style.outline = "1px solid #14D81C";
    errorSpan.forEach((item) => {
      item.style.color = "#14D81C";
    });
  }
});

blogTitle.addEventListener("input", () => {
  blogTitle.style.background = "white";
  blogTitle.style.outline = "none";
  blogTitle.style.outline = "1.5px solid #5D37F3";
  if (blogTitle.value.length >= 4) {
    isError = false;
    headingCharacters.style.color = "#14D81C";
  } else {
    isError = true;
    headingCharacters.style.color = "#85858D";
  }
});
blogTitle.addEventListener("change", () => {
  if (blogTitle.value.length < 4 || blogTitle.value === "") {
    isError = true;
    blogTitle.style.outline = "1px solid #EA1919";
    blogTitle.style.background = "#FAF2F3";
    headingCharacters.style.color = "#EA1919";
  } else {
    isError = false;
    blogTitle.style.outline = "1px solid #14D81C";
    blogTitle.style.background = "white";
  }
});
blogDesr.addEventListener("click", () => {
  blogDesr.style.background = "white";
  blogDesr.style.outline = "1.5px solid #5D37F3";
  descrSymbol.style.color = "#85858D";
});
blogDesr.addEventListener("change", () => {
  if (blogDesr.value === "" || blogDesr.value.length < 4) {
    isError = true;
    blogDesr.style.outline = "1.5px solid #EA1919";
    blogDesr.style.background = "#FAF2F3";
    descrSymbol.style.color = "#EA1919";
  } else {
    isError = false;
    blogDesr.style.outline = " 1.5px solid #14D81C";
    descrSymbol.style.color = "#14D81C";
  }
});
blogDate.addEventListener("click", (e) => {
  dateContainer.style.outline = "1.5px solid #5D37F3";
});
blogDate.addEventListener("change", (e) => {
  if (blogDate.value === "") {
    isError = true;
    dateContainer.style.outline = "1px solid #EA1919";
  } else {
    isError = false;
    dateContainer.style.outline = "1px solid #14D81C";
  }
});

userMail.addEventListener("click", () => {
  if (userMail.classList.contains("email-error")) {
    return;
  }

  userMail.style.outline = "1.5px solid #5D37F3";
});

userMail.addEventListener("change", (e) => {
  e.preventDefault();
  const validEmail = userMail.value.split("@");
  if (validEmail[1] !== "redberry.ge") {
    isError = true;
    userMail.classList.add("email-error");
    emailErr.style.display = "flex";
  } else {
    isError = false;
    userMail.classList.remove("email-error");
    userMail.classList.add("email-success");
    emailErr.style.display = "none";
  }
});

function validateInputs() {
  if (
    fileInput.files.length === 0 ||
    authorInput.value.length < 4 ||
    blogTitle.value.length < 4 ||
    blogDesr.value.length < 4 ||
    blogDate.value === "" ||
    userMail.value.split("@")[1] !== "redberry.ge" ||
    categoryList.children.length === 1
  ) {
    return false;
  }

  return true;
}

function toggleSubmitButton() {
  if (validateInputs()) {
    submitBtn.classList.add("active-submit");
  } else {
    submitBtn.classList.remove("active-submit");
  }
}

fileInput.addEventListener("change", toggleSubmitButton);
authorInput.addEventListener("input", toggleSubmitButton);
blogTitle.addEventListener("input", toggleSubmitButton);
blogDesr.addEventListener("input", toggleSubmitButton);
blogDate.addEventListener("change", toggleSubmitButton);
userMail.addEventListener("change", toggleSubmitButton);
categoryList.addEventListener("click", toggleSubmitButton);
closeBtn.addEventListener("click", toggleSubmitButton);
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
});
