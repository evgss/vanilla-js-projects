const board = document.querySelector('#board')
const squaresNumber = 500
const colors = ['red', 'blue', 'green', 'violet', '#494930','#948204','#d9f922','#f9a3a3']

for (let i = 0; i < squaresNumber; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    square.addEventListener('mouseover', () =>
        setColor(square)
    )
    square.addEventListener('mouseleave', () =>
        removeColor(square)
    )

    board.append(square)
}

function setColor(element) {
    const color = randomColor()
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}
function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = '0 0 2px #111'
}

function randomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
