const ipsum = new LoremIpsum()
const main = document.querySelector('main')
let lastSectionCreated = undefined;
let lastFixedSection = undefined;
let zIndex = 999999998

function createNewSection() {
  // Pin last session added to DOM
  if (lastSectionCreated) {
    lastSectionCreated.classList.remove('floating')
    lastSectionCreated.classList.add('fixed')
    lastSectionCreated.classList.add('last-fixed')

    if (lastFixedSection) lastFixedSection.style.marginBottom = '0px'
    lastFixedSection = lastSectionCreated

    if (lastSectionCreated.previousElementSibling) {
      lastSectionCreated.previousElementSibling.classList.remove('last-fixed')
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

  lastSectionCreated = newSection

  // Only add the new element after fade animation of last pinned element
  setTimeout(() => {
    main.append(newSection)
    if (lastFixedSection) {
      lastFixedSection.style.marginBottom = newSection.offsetHeight+'px'
    }
  }, 300)
  // "300" Match the transition duration of section element
}

createNewSection()
createNewSection()

window.addEventListener('scroll', (event) => {
  if (
    lastFixedSection &&
    window.scrollY >= (lastFixedSection.offsetTop + lastFixedSection.offsetHeight)
  ) {
    createNewSection()
  }
})
