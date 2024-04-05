const fileInput = document.getElementById('upload-input')
const dropZone = document.getElementById('dropZone')
const selectedImg = document.querySelector('.selected-img')
const imageName = document.getElementById('image-name')
const closeBtn = document.getElementById('close-btn')
const form = document.querySelector('form')
const authorInput = document.getElementById('author')
const blogTitle = document.getElementById('blog-title')
const blogDesr = document.getElementById('blog-description')
const blogDate = document.getElementById('blog-date')
const userMail = document.getElementById('email')
const submitBtn = document.getElementById('submit')
const arrowDown = document.getElementById('arrow-down')
const categorySelector = document.querySelector('.categories')
const typeButtons = document.querySelectorAll('.blog-type')
const categoryList = document.querySelector('.category-list')
let deleteImages = document.querySelectorAll('.delete-image')

let base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

selectedImg.style.display = 'none'
dropZone.addEventListener('dragover', (event) => {
  event.preventDefault()
  dropZone.classList.add('drag-over')
})

dropZone.addEventListener('dragleave', (event) => {
  dropZone.classList.remove('drag-over')
})
dropZone.addEventListener('drop', (event) => {
  event.preventDefault()
  dropZone.classList.remove('drag-over')
  const files = event.dataTransfer.files
  fileInput.files = files
  checkSelected()
})
function checkSelected() {
  if (fileInput.files[0].name) {
    selectedImg.style.display = 'flex'
    dropZone.style.display = 'none'
    imageName.innerHTML = fileInput.files[0].name
  } else {
    selectedImg.style.display = 'none'
    dropZone.style.display = 'flex'
    imageName.innerHTML = fileInput.files[0].name
  }
}
fileInput.addEventListener('change', checkSelected)
closeBtn.addEventListener('click', (e) => {
  fileInput.value = ''
  dropZone.style.display = 'flex'
  selectedImg.style.display = 'none'
  imageName.innerHTML = ''
})
fileInput.addEventListener('change', async () => {
  base64 = await convertToBase64(fileInput.files[0])
})

const addBlog = async () => {
  const response = await fetch('http://localhost:4000/add-blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image: base64,
      author: authorInput.value,
      title: blogTitle.value,
      description: blogDesr.value,
      date: blogDate.value,
      email: userMail.value,
      types: ['მარკეტი', 'კვლევა'],
    }),
  })
  console.log(response)
}
arrowDown.addEventListener('click', () => {
  arrowDown.classList.toggle('turn-down')
  categorySelector.classList.toggle('visible-selector')
})

let typesArr = []
let error = []

typeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    error = []
    typesArr.forEach((type, index) => {
      if (type.name === button.innerText.trim()) {
        error.push('err')
      }
    })
    if (error.length > 0) return
    error = []
    typesArr.push({
      name: button.innerText.trim(),
      className: button.className,
    })
    updateList()
  })
})

window.addEventListener('click', () => {
  deleteImages = document.querySelectorAll('.delete-image')
  rerun()
})

const rerun = () => {
  deleteImages.forEach((item, idx) => {
    item.addEventListener('click', () => {
      console.log(idx)
      typesArr = typesArr.filter((type, index) => {
        return index !== idx
      })
      updateList()
    })
  })
}

const updateList = () => {
  categoryList.innerHTML = ''

  typesArr.forEach((type) => {
    const button = document.createElement('button')
    const image = document.createElement('img')
    const firstClass = type.className.split(' ')[0]
    button.textContent = type.name
    image.setAttribute('src', '../imgs/close.png')
    image.classList.add('delete-image')
    button.setAttribute('type', 'button')
    button.appendChild(image)
    button.classList.add(firstClass)
    categoryList.appendChild(button)
    console.log(typesArr)
  })
}
