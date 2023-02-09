const board = document.querySelector('.board')
const body = document.querySelector('body')
const colors = {
    0: 'white',
    2: '#F048AC',
    4: '#F0DD60',
    8: '#78E7F0',
    16: '#A39431',
    32: '#A33978',
    64: '#8DDB3D',
    128: '#AF3DCA',
    256: '#AC3DDB',
    512: '#50D4F2',
    1024: '#FF8C47',
    2048: '#DB763D',
    4096: '#DBA65E',
    8192: '#4793FF',
    16384: '#88F517',
    32768: '#0AFF0E'
}
let data = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
let isGameOver = false
let score = 0

body.addEventListener('keydown', (event) => {
    moveController(event.key)
})

function startGame() {
    addNumber()
    addNumber()
    reDrawField()
}

startGame()

function moveController(key) {
    switch (key) {
        case 'a':
            moveFunc(left, 'left', 'x')
            break
        case 'd':
            moveFunc(right, 'right', 'x')
            break
        case 'w':
            moveFunc(left, 'left', 'y')
            break
        case 's':
            moveFunc(right, 'right', 'y')
            break
    }
}

function left() {
    data.map(row => {
        for (let i = 0; i < row.length; i++) {
            if (row[i] === row[i + 1]) {
                row[i] = row[i] * 2
                score += row[i] * 2
                row[i + 1] = 0
            }
        }
    })
}

function right() {
    data.map(row => {
        for (let i = row.length - 1; i >= 0; i--) {
            if (row[i] === row[i - 1]) {
                row[i] = row[i] * 2
                score += row[i] * 2
                row[i - 1] = 0
            }
        }
    })
}

function moveFunc(direction, dir, axis) {
    axis === 'y' && (data = transpose(data))
    clearZeroesAndFill(dir)
    direction()
    axis === 'y' && (data = transpose(data))
    addNumber()
    reDrawField()
}

function transpose(array) {
    return array.reduce((prev, next) => next.map((item, i) =>
        (prev[i] || []).concat(next[i])
    ), []);
}

function addNumber() {
    checkGameIsOver()
    if (isGameOver) {
        gameOver()
        return
    }
    const random = generateRandomNumber(1, 10)
    let isAdded = false
    while (!isAdded) {
        const num1 = generateRandomNumber(0, 3)
        const num2 = generateRandomNumber(0, 3)
        if (data[num1][num2] === 0) {
            data[num1][num2] = random <= 8 ? 2 : 4
            isAdded = true
        }
    }
}

function checkGameIsOver() {
    let ar = []
    data.forEach(row => row.forEach(el => {
        ar.push(el)
    }))
    isGameOver = ar.indexOf(0) === -1
}

function gameOver() {
    body.innerHTML = `<div><h1 class="game-over">GAME OVER</h1><div class="score">Score: ${score}</div></div>`

}

function generateRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min))
}

function clearZeroesAndFill(direction) {
    data = data.map(row => row.filter(el => el !== 0))
    data.map(row => {
        while (row.length < 4) {
            direction === 'left' ? row.push(0) : row.unshift(0)
        }
    })
}

function reDrawField() {
    board.innerHTML = ""
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            draw(data[i][j])
        }
    }

    function draw(num) {
        const square = document.createElement('div')
        square.classList.add('square')
        square.style.backgroundColor = colors[num]
        square.innerHTML = num ? num : ''
        board.append(square)
    }
}


