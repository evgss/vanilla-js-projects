const items = document.querySelectorAll('img');
const itemCount = items.length;
const nextItem = document.querySelector('.next');
const previousItem = document.querySelector('.previous');
let count = 0;

function showNextItem() {
    items[count].classList.remove('active');

    if (count < itemCount - 1) {
        count++;
    } else {
        count = 0;
    }
    items[count].classList.add('active');
}

function showPreviousItem() {
    items[count].classList.remove('active');

    if (count > 0) {
        count--;
    } else {
        count = itemCount - 1;
    }

    items[count].classList.add('active');
}

function keyPress(e) {
    if (e.keyCode === 37) {
        showPreviousItem();
    } else if (e.keyCode === 39) {
        showNextItem();
    }
}

nextItem.addEventListener('click', showNextItem);
previousItem.addEventListener('click', showPreviousItem);
document.addEventListener('keydown', keyPress);
