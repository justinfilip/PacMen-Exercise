var pos = 0;
const pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
    ['PacMan3.png', 'PacMan4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {

    let imgId = pacMen.length + 1;

    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(10); // {x:?, y:?}
    let position = setToRandom(200);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.id = imgId;
    newimg.style.position = 'absolute';
    newimg.src = 'images/PacMan1.png';
    newimg.width = 100;
    //
    // set position here 
    //
    newimg.top = position;
    newimg.left = position;

    // add new Child image to game
    game.appendChild(newimg);

    
    let imgNum = 1;
    // return details in an object
    return {
        position,
        velocity,
        newimg,
        imgId,
        imgNum
    }
}

function update() {
    
    if (document.getElementById('gameButton').innerText = "Start Game") {
        document.getElementById('gameButton').innerText = "Faster";
    }


    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)

        document.getElementById(item.imgId).src = 'images/PacMan' + item.imgNum + '.png';

        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
    })
    setTimeout(update, 20);
}

function animateMouths() {

    pacMen.forEach((item) => {
        // The PacMan is facing right
        if (item.imgNum < 3) {

            // The PacMan's mouth is open
            if (item.imgNum == 1) {

                // Close mouth
                item.imgNum = 2;

            // The PacMan's mouth is closed
            } else {

                // Open mouth
                item.imgNum = 1;
            }

        // The PacMan is facing left
        } else {

            // The PacMan's mouth is open
            if (item.imgNum == 3) {

                // Face right, close mouth
                item.imgNum = 4;

            // The PacMan's mouth is closed
            } else {

                // Face right, open mouth
                item.imgNum = 3;
            }
        }
    });
}

function checkCollisions(item) {
    //
    // detect collision with all walls and make pacman bounce
    //
    if (item.position.x >= window.innerWidth - 120 || item.position.x <= 0) {
        item.velocity.x = -(item.velocity.x);

        // The PacMan is facing right
        if (item.imgNum < 3) {

            // The PacMan's mouth is open
            if (item.imgNum == 1) {

                // Face left, open mouth
                item.imgNum = 3;
            
            // The PacMan's mouth is closed
            } else {

                // Face left, close mouth
                item.imgNum = 4;
            }
        
        // The PacMan is facing left
        } else {

            // The PacMan's mouth is open
            if (item.imgNum == 3) {

                // Face right, open mouth
                item.imgNum = 1;
            
            // The PacMan's mouth is closed
            } else {

                // Face right, close mouth
                item.imgNum = 2;
            }
        }
    }

    if (item.position.y >= window.innerHeight - 120 || item.position.y <= 0) {
        item.velocity.y = -(item.velocity.y);
    }
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}

setInterval(animateMouths, 200);