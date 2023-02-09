let player_one = document.querySelector('.player-one') || null
let player_two = document.querySelector('.player-two') || null
const body = document.querySelector('body')
const screens = document.querySelectorAll('.screen')
const screen_form = document.querySelector('.screen__form')
const firstSize = document.querySelector('.first-player-size')
const secondSize = document.querySelector('.second-player-size')
const firstSpeed = document.querySelector('.first-player-speed')
const secondSpeed = document.querySelector('.second-player-speed')
const field = document.querySelector('.field')
const width = document.querySelector('.field').offsetWidth

let player_one_size = 50
let player_two_size = 50
let player_one_speed = 10
let player_two_speed = 10

let player_one_x = null
let player_one_y = null
let player_two_x = null
let player_two_y = null


function firstSizeChange(value) {
    firstSize.innerHTML = value;
    player_one_size = parseInt(value)
}

function secondSizeChange(value) {
    player_two_size = parseInt(value)
    secondSize.innerHTML = value;
}

function firstSpeedChange(value) {
    player_one_speed = parseInt(value)
    firstSpeed.innerHTML = value;
}

function secondSpeedChange(value) {
    player_two_speed = parseInt(value)
    secondSpeed.innerHTML = value;
}

screen_form.addEventListener('submit', startGame)

function startGame(event) {
    event.preventDefault()
    screens[0].classList.add('up')
    initPlayers()
    const gameMode = setInterval(() => {
        const {isGameOver, loser, winner} = checkIsGameOver()
        if (isGameOver) {
            clearInterval(gameMode)
            gameOver(loser, winner)
        } else movementController()
    }, 30)
}

function checkIsGameOver() {
    checkCoordinates()
    return isWinner()
}

function checkCoordinates() {
    const first_size = player_one_size + Math.ceil(player_one_y / 5) + 'px'
    const second_size = player_two_size + Math.ceil((width - player_two_x - player_two_size) / 5) + 'px'
    player_one.style.width = first_size
    player_one.style.height = first_size
    player_two.style.width = second_size
    player_two.style.height = second_size
    player_one_x = getStyle(player_one, 'left')
    player_one_y = getStyle(player_one, 'top')
    player_two_x = getStyle(player_two, 'left')
    player_two_y = getStyle(player_two, 'top')
}

function isWinner() {
    const player_one_current_size = getStyle(player_one, 'size')
    const player_two_current_size = getStyle(player_two, 'size')
    if (player_one_x < 0 ||
        player_one_y < 0 ||
        player_one_x + player_one_current_size > width ||
        player_one_y + player_one_current_size > width) {
        return {isGameOver: true, loser: 'Игрок 1', winner: null}
    } else if (player_two_x < 0 ||
        player_two_y < 0 ||
        player_two_x + player_two_current_size > width ||
        player_two_y + player_two_current_size > width) {
        return {isGameOver: true, loser: 'Игрок 2', winner: null}
    } else if (player_two_x - player_one_x - player_one_current_size < 0 &&
        player_two_y - player_one_y - player_one_current_size < 0 &&
        player_one_y - player_two_y - player_two_current_size < 0 &&
        player_one_x - player_two_x - player_two_current_size < 0) {
        const winner = player_one_current_size > player_two_current_size ? 'Игрок 1' : 'Игрок 2'
        return {isGameOver: true, loser: null, winner}
    } else {
        return {isGameOver: false, loser: null, winner: null}
    }
}

let directions = []

body.addEventListener('keydown', addKey);
body.addEventListener('keyup', dropKey);

function addKey(e) {
    !directions.includes(e.key) && directions.push(e.key)
}

function dropKey(e) {
    directions = directions.filter(key => key !== e.key)
}

function movementController() {
    const first_moved = ['w', 's', 'a', 'd']
    const second_moved = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    delay(() => {
        const firstInMove = first_moved.some(f => directions.includes(f))
        const secondInMove = second_moved.some(f => directions.includes(f))
        player_one.style.backgroundImage = firstInMove ? 'url("./images/p1-move.gif")' : 'url("./images/p1-stop.png")'
        player_two.style.backgroundImage = secondInMove ? 'url("./images/p2-move.gif")' : 'url("./images/p2-stop.png")'

        directions.includes('w') && move(player_one, 'up', player_one_speed)
        directions.includes('s') && move(player_one, 'down', player_one_speed)
        directions.includes('a') && move(player_one, 'left', player_one_speed)
        directions.includes('d') && move(player_one, 'right', player_one_speed)
        directions.includes('ArrowUp') && move(player_two, 'up', player_two_speed)
        directions.includes('ArrowDown') && move(player_two, 'down', player_two_speed)
        directions.includes('ArrowLeft') && move(player_two, 'left', player_two_speed)
        directions.includes('ArrowRight') && move(player_two, 'right', player_two_speed)

    })

}

function move(player, direction, speed) {
    direction === 'up' ? player.style.top = getStyle(player, 'top') - parseInt(speed) + 'px' : null
    direction === 'down' ? player.style.top = getStyle(player, 'top') + parseInt(speed) + 'px' : null
    direction === 'left' ? player.style.left = getStyle(player, 'left') - parseInt(speed) + 'px' : null
    direction === 'right' ? player.style.left = getStyle(player, 'left') + parseInt(speed) + 'px' : null
}

function getStyle(player, style) {
    switch (style) {
        case 'top':
            return parseInt(window.getComputedStyle(player).top.split('p')[0])
        case 'left':
            return parseInt(window.getComputedStyle(player).left.split('p')[0])
        case 'size':
            return parseInt(window.getComputedStyle(player).width.split('p')[0])
    }
}

function gameOver(loser, winner) {
    directions = []
    player_one.parentNode.removeChild(player_one)
    player_two.parentNode.removeChild(player_two)
    screens[0].classList.remove('up')
    loser ? alert(`${loser} проиграл`) : alert(`${winner} выйграл`)
}

function initPlayers() {
    const first = document.createElement('div')
    first.classList.add('player')
    first.style.backgroundColor = '#c2dec2'
    first.style.width = player_one_size + 'px'
    first.style.height = player_one_size + 'px'
    first.style.top = '10px'
    first.style.left = '10px'
    field.append(first)
    const second = document.createElement('div')
    second.classList.add('player')
    second.style.backgroundColor = '#f1e0e0'
    second.style.width = player_two_size + 'px'
    second.style.height = player_two_size + 'px'
    second.style.right = '10px'
    second.style.bottom = '10px'
    field.append(second)
    player_one = first
    player_two = second
}

function delay(callback) {
    setInterval(callback, 30)
}
