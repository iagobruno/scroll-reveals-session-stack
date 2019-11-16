const ipsum = new LoremIpsum()
const main = document.querySelector('main')
let lastSectionAdded = null;
let zIndex = 999999998

function createNewSection() {
  // Pin last session added to DOM
  if (lastSectionAdded !== null) {
    lastSectionAdded.classList.remove('floating')
    lastSectionAdded.classList.add('fixed')
    lastSectionAdded.classList.add('last-fixed')
    if (lastSectionAdded.previousElementSibling) {
      lastSectionAdded.previousElementSibling.classList.remove('last-fixed')
    }
  }

  const newSection = document.createElement('section')
  newSection.innerHTML = `
    <div class="center">
      <header>
        <h1>${ipsum.sentence(9)}</h1>
        <img src="https://picsum.photos/520/300">
      </header>
      <div class="content">
        <p>${ipsum.paragraph(50, 200)}</p>
        <p>${ipsum.paragraph(50, 200)}</p>
        <p>${ipsum.paragraph(50, 200)}</p>
      </div>
    </div>
  `
  newSection.classList.add('floating')
  newSection.style.zIndex = zIndex--

  lastSectionAdded = newSection

  setTimeout(() => {
    main.append(newSection)
  }, 300)
  // "300" Match the transition duration of section element
}

createNewSection()
createNewSection()

window.addEventListener('scroll', (event) => {
  if (window.scrollY >= document.body.offsetHeight) {
    createNewSection()
  }
})
