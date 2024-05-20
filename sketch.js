/*
Game project
*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;

var trees_x;
var trees_y;

var clouds;
var mountains;
var collectables;
var canyons;

var cameraPosX;

var platforms;
var enemies;

var game_score;
var flagpole;
var lives;

var jumpSound;
var plummetingSound;
var collectableSound;
var backgroundSound;
var deathSound;

function preload() {
    //loading sounds
    soundFormats('mp3', 'wav');

    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);

    plummetingSound = loadSound('assets/plummeting.wav');
    plummetingSound.setVolume(0.1);

    collectableSound = loadSound('assets/collectable.wav');
    collectableSound.setVolume(0.1);

    deathSound = loadSound('assets/death.wav');
    deathSound.setVolume(0.1);

    backgroundSound = loadSound('assets/background.wav');
    backgroundSound.setVolume(0.01);
}

function setup() {
    createCanvas(1024, 576);

    floorPos_y = height * 3 / 4;
    lives = 3;

    startGame();

    emit = new Emitter(random(0, width), 0, 0, 0.3, 5, color(255));
    emit.startEmitter(80, 10000);
}


function draw() {

    cameraPosX = gameChar_x - width / 2;

    ///////////DRAWING CODE//////////

    // sky
    background(136, 204, 191);

    //ground
    noStroke();
    fill(230, 238, 240);
    rect(0, floorPos_y, width, height - floorPos_y);

    push();
    translate(-cameraPosX, 0);

    //canyon
    for (var i = 0; i < canyons.length; i++) {
        checkCanyon(canyons[i]);
        drawCanyon(canyons[i]);
    }

    // mountains
    drawMountains();

    // trees
    drawTrees();

    // clouds in the sky
    drawClouds();

    // platforms
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }

    // Collectable item
    for (var i = 0; i < collectables.length; i++) {
        if (!collectables[i].isFound) {
            checkCollectable(collectables[i]);
            drawCollectable(collectables[i]);
        }
    }

    noStroke();
    //the game character
    if (isLeft && isFalling) {
        // jumping-left code
        // body
        fill(9, 11, 10);
        ellipse(gameChar_x, gameChar_y - 18, 28, 38);
        ellipse(gameChar_x, gameChar_y - 40, 26, 30);
        triangle(gameChar_x + 22, gameChar_y - 15,
            gameChar_x + 8, gameChar_y - 30,
            gameChar_x, gameChar_y - 20);
        triangle(gameChar_x - 22, gameChar_y - 40,
            gameChar_x - 8, gameChar_y - 30,
            gameChar_x - 5, gameChar_y - 10);

        // face
        fill(240);
        ellipse(gameChar_x - 5, gameChar_y - 18, 19, 30);
        ellipse(gameChar_x - 6, gameChar_y - 35, 12, 15);
        fill(255, 167, 34);
        triangle(gameChar_x - 10, gameChar_y - 35,
            gameChar_x - 10, gameChar_y - 30,
            gameChar_x - 15, gameChar_y - 34);

        fill(9, 11, 10);
        ellipse(gameChar_x - 7, gameChar_y - 36, 5, 5);

        // leggs
        fill(255, 167, 34);
        arc(gameChar_x + 5, gameChar_y + 2, 10, 10, PI, 2 * PI);
        arc(gameChar_x - 13, gameChar_y - 5, 10, 10, PI + 0.5, 2 * PI + 0.5);

    }
    else if (isRight && isFalling) {
        // jumping-right code
        // body
        fill(9, 11, 10);
        ellipse(gameChar_x, gameChar_y - 18, 28, 38);
        ellipse(gameChar_x, gameChar_y - 40, 26, 30);
        triangle(gameChar_x - 22, gameChar_y - 15,
            gameChar_x - 8, gameChar_y - 30,
            gameChar_x, gameChar_y - 20);
        triangle(gameChar_x + 23, gameChar_y - 40,
            gameChar_x + 9, gameChar_y - 30,
            gameChar_x + 5, gameChar_y - 10);

        // face
        fill(240);
        ellipse(gameChar_x + 5, gameChar_y - 18, 19, 30);
        ellipse(gameChar_x + 6, gameChar_y - 35, 12, 15);
        fill(255, 167, 34);
        triangle(gameChar_x + 10, gameChar_y - 35,
            gameChar_x + 10, gameChar_y - 30,
            gameChar_x + 15, gameChar_y - 34);
        fill(9, 11, 10);
        ellipse(gameChar_x + 7, gameChar_y - 36, 5, 5);

        // leggs
        fill(255, 167, 34);
        arc(gameChar_x - 5, gameChar_y + 2, 10, 10, PI, 2 * PI);
        arc(gameChar_x + 13, gameChar_y - 5, 10, 10, PI - 0.5, 2 * PI - 0.5);
    }
    else if (isLeft) {
        // walking left code
        // body
        fill(9, 11, 10);
        ellipse(gameChar_x, gameChar_y - 18, 28, 38);
        ellipse(gameChar_x, gameChar_y - 40, 26, 30);
        triangle(gameChar_x + 22, gameChar_y - 15,
            gameChar_x + 8, gameChar_y - 30,
            gameChar_x, gameChar_y - 20);

        // face
        fill(240);
        ellipse(gameChar_x - 5, gameChar_y - 18, 19, 30);
        ellipse(gameChar_x - 6, gameChar_y - 35, 12, 15);
        fill(255, 167, 34);
        triangle(gameChar_x - 10, gameChar_y - 35,
            gameChar_x - 10, gameChar_y - 30,
            gameChar_x - 15, gameChar_y - 32);
        fill(9, 11, 10);
        ellipse(gameChar_x - 7, gameChar_y - 36, 5, 5);

        // leggs
        fill(255, 167, 34);
        arc(gameChar_x + 5, gameChar_y + 2, 10, 10, PI, 2 * PI);
        arc(gameChar_x - 10, gameChar_y - 2, 10, 10, PI + 0.5, 2 * PI + 0.5);


    }
    else if (isRight) {
        // walking right code
        // body
        fill(9, 11, 10);
        ellipse(gameChar_x, gameChar_y - 18, 28, 38);
        ellipse(gameChar_x, gameChar_y - 40, 26, 30);
        triangle(gameChar_x - 22, gameChar_y - 15,
            gameChar_x - 8, gameChar_y - 30,
            gameChar_x, gameChar_y - 20);

        // face
        fill(240);
        ellipse(gameChar_x + 5, gameChar_y - 18, 19, 30);
        ellipse(gameChar_x + 6, gameChar_y - 35, 12, 15);
        fill(255, 167, 34);
        triangle(gameChar_x + 10, gameChar_y - 35,
            gameChar_x + 10, gameChar_y - 30,
            gameChar_x + 15, gameChar_y - 32);
        fill(9, 11, 10);
        ellipse(gameChar_x + 7, gameChar_y - 36, 5, 5);

        // leggs
        fill(255, 167, 34);
        arc(gameChar_x - 5, gameChar_y + 2, 10, 10, PI, 2 * PI);
        arc(gameChar_x + 10, gameChar_y - 2, 10, 10, PI - 0.5, 2 * PI - 0.5);


    }
    else if (isFalling || isPlummeting) {
        // jumping facing forwards code
        // body
        fill(9, 11, 10);
        ellipse(gameChar_x, gameChar_y - 18, 32, 38);
        ellipse(gameChar_x, gameChar_y - 40, 30, 30);
        triangle(gameChar_x - 22, gameChar_y - 40,
            gameChar_x - 8, gameChar_y - 30,
            gameChar_x - 5, gameChar_y - 10);
        triangle(gameChar_x + 23, gameChar_y - 40,
            gameChar_x + 9, gameChar_y - 30,
            gameChar_x + 5, gameChar_y - 10);

        // face
        fill(240);
        ellipse(gameChar_x, gameChar_y - 20, 25, 30);
        ellipse(gameChar_x - 5, gameChar_y - 35, 12, 12);
        ellipse(gameChar_x + 5, gameChar_y - 35, 12, 12);
        fill(255, 167, 34);
        triangle(gameChar_x - 5, gameChar_y - 32,
            gameChar_x, gameChar_y - 27,
            gameChar_x + 5, gameChar_y - 32);
        fill(9, 11, 10);
        ellipse(gameChar_x - 5, gameChar_y - 36, 5, 5);
        ellipse(gameChar_x + 5, gameChar_y - 36, 5, 5);

        // leggs
        fill(255, 167, 34);
        arc(gameChar_x - 12, gameChar_y - 1, 10, 10, PI + 0.5, 2 * PI + 0.5);
        arc(gameChar_x + 12, gameChar_y - 1, 10, 10, PI - 0.5, 2 * PI - 0.5);


    }
    else {
        // standing front facing code
        // leggs
        fill(255, 167, 34);
        arc(gameChar_x - 8, gameChar_y + 2, 10, 10, PI, 2 * PI);
        arc(gameChar_x + 8, gameChar_y + 2, 10, 10, PI, 2 * PI);

        // body
        fill(9, 11, 10);
        ellipse(gameChar_x, gameChar_y - 18, 32, 38);
        ellipse(gameChar_x, gameChar_y - 40, 30, 30);
        triangle(gameChar_x - 22, gameChar_y - 15,
            gameChar_x - 8, gameChar_y - 40,
            gameChar_x, gameChar_y - 20);
        triangle(gameChar_x + 23, gameChar_y - 15,
            gameChar_x + 9, gameChar_y - 40,
            gameChar_x, gameChar_y - 20);

        // face
        fill(240);
        ellipse(gameChar_x, gameChar_y - 20, 25, 30);
        ellipse(gameChar_x - 5, gameChar_y - 35, 12, 12);
        ellipse(gameChar_x + 5, gameChar_y - 35, 12, 12);
        fill(255, 167, 34);
        triangle(gameChar_x - 5, gameChar_y - 32,
            gameChar_x, gameChar_y - 27,
            gameChar_x + 5, gameChar_y - 32);
        fill(9, 11, 10);
        ellipse(gameChar_x - 5, gameChar_y - 36, 5, 5);
        ellipse(gameChar_x + 5, gameChar_y - 36, 5, 5);

    }

    // flagpole
    renderFlagpole();

    // enemies
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();

        var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);

        if (isContact) {

            if (lives > 0) {
                deathSound.play();
                lives -= 1;
                startGame();
                break;
            }
        }
    }

    emit.updateParticles();

    pop();

    // score
    fill(255);
    noStroke();
    textSize(12);
    textAlign(LEFT);
    text('score: ' + game_score, 20, 20);

    // lives
    text('lives: ', 20, 40);
    fill(230, 145, 145);
    for (var i = 0; i < lives; i++) {
        ellipse(56 + i * 12, 37, 10, 10);
    }

    // game over / completion
    textSize(24);
    textAlign(CENTER);
    if (lives < 1) {
        text('Game over. Press space to continue.', width / 2, height / 3);
        backgroundSound.stop();
        return;
    } else if (flagpole.isReached == true) {
        text('Level complete. Press space to continue.', width / 2, height / 3.5);
        if (gameChar_y <= floorPos_y) {
            gameChar_y += 2;
            isFalling = false;
        }
        backgroundSound.stop();
        return;
    }


    ///////////INTERACTION CODE//////////
    // conditional statements to move the game character

    if (isLeft == true && !isPlummeting) {
        gameChar_x -= 5;
    } else if (isRight == true && !isPlummeting) {
        gameChar_x += 5;
    }

    if (gameChar_y < floorPos_y) {
        var isContact = false;
        for (var i = 0; i < platforms.length; i++) {
            if (platforms[i].checkContack(gameChar_x, gameChar_y)) {
                isContact = true;
                isFalling = false;
                break;
            }
        }
        if (isContact == false) {
            gameChar_y += 2;
            isFalling = true;
        }

    } else {
        isFalling = false;
    }

    if (isPlummeting == true) {
        gameChar_y += 5;
    }

    if (flagpole.isReached == false) {
        checkFlagpole();
    }

    checkPlayerDie();
}


function keyPressed() {
    // if statements to control the animation of the character when
    // keys are pressed

    if (keyCode == 65 && !isPlummeting && flagpole.isReached == false && lives > 0) {
        isLeft = true;
    } else if (keyCode == 68 && !isPlummeting && flagpole.isReached == false && lives > 0) {
        isRight = true;
    }
    else if (keyCode == 87 && !isPlummeting && !isFalling && flagpole.isReached == false && lives > 0) {
        if (gameChar_y <= floorPos_y) {
            gameChar_y -= 100;
            jumpSound.play();
        }
    }
}

function keyReleased() {
    // if statements to control the animation of the character when
    // keys are released

    if (keyCode == 65) {
        isLeft = false;
    }

    else if (keyCode == 68) {
        isRight = false;
    }
}
// clouds
function drawClouds() {
    for (var j = 0; j < clouds.length; j++) {
        // cloud shadow
        fill(175, 222, 214);
        rect(clouds[j].x_pos + 20, clouds[j].y_pos, 150, clouds[j].size, 40);
        ellipse(clouds[j].x_pos + 100, clouds[j].y_pos, clouds[j].size + 35);
        ellipse(clouds[j].x_pos + 60, clouds[j].y_pos, clouds[j].size);
        ellipse(clouds[j].x_pos + 140, clouds[j].y_pos - 3, clouds[j].size - 10);

        // cloud itself
        fill(228, 253, 247);
        rect(clouds[j].x_pos, clouds[j].y_pos, 150, clouds[j].size, 40);
        ellipse(clouds[j].x_pos + 80, clouds[j].y_pos, clouds[j].size + 35);
        ellipse(clouds[j].x_pos + 40, clouds[j].y_pos, clouds[j].size);
        ellipse(clouds[j].x_pos + 120, clouds[j].y_pos - 3, clouds[j].size - 10);
    }
}

//mountains
function drawMountains() {
    for (var y = 0; y < mountains.length; y++) {
        stroke(202, 223, 224);
        strokeWeight(0.5);
        fill(217, 244, 237);
        triangle(mountains[y].x_pos, mountains[y].y_pos,
            mountains[y].x_pos + mountains[y].size * 5, mountains[y].y_pos - mountains[y].size * 11.2,
            mountains[y].x_pos + mountains[y].size * 8, mountains[y].y_pos);
        fill(197, 232, 226);
        triangle(mountains[y].x_pos + mountains[y].size * 8, mountains[y].y_pos,
            mountains[y].x_pos + mountains[y].size * 5, mountains[y].y_pos - mountains[y].size * 11.2,
            mountains[y].x_pos + mountains[y].size * 11, mountains[y].y_pos);

        fill(217, 244, 237);
        triangle(mountains[y].x_pos + mountains[y].size * 5, mountains[y].y_pos,
            mountains[y].x_pos + mountains[y].size * 17, mountains[y].y_pos - mountains[y].size * 8.2,
            mountains[y].x_pos + mountains[y].size * 23, mountains[y].y_pos);
        fill(197, 232, 226);
        triangle(mountains[y].x_pos + mountains[y].size * 23, mountains[y].y_pos,
            mountains[y].x_pos + mountains[y].size * 17, mountains[y].y_pos - mountains[y].size * 8.2,
            mountains[y].x_pos + mountains[y].size * 26, mountains[y].y_pos);

        fill(217, 244, 237);
        triangle(mountains[y].x_pos + mountains[y].size * 5, mountains[y].y_pos,
            mountains[y].x_pos + mountains[y].size * 11, mountains[y].y_pos - mountains[y].size * 17.2,
            mountains[y].x_pos + mountains[y].size * 14, mountains[y].y_pos);
        fill(197, 232, 226);
        triangle(mountains[y].x_pos + mountains[y].size * 14, mountains[y].y_pos,
            mountains[y].x_pos + mountains[y].size * 11, mountains[y].y_pos - mountains[y].size * 17.2,
            mountains[y].x_pos + mountains[y].size * 17, mountains[y].y_pos);

        noStroke();
    }
}
// trees
function drawTrees() {
    for (var i = 0; i < trees_x.length; i++) {
        fill(202, 223, 224);
        ellipse(trees_x[i] + 12, trees_y + 102, 40, 7);

        fill(228, 253, 247);
        arc(trees_x[i] + 5, trees_y, 130, 130, HALF_PI, PI * 1.5);
        fill(175, 222, 214);
        arc(trees_x[i] + 5, trees_y, 130, 130, PI * 1.5, HALF_PI);

        fill(89, 91, 88);
        rect(trees_x[i], trees_y, 10, 100);

        strokeCap(SQUARE);
        stroke(89, 91, 88);
        strokeWeight(7);
        line(trees_x[i] + 5, trees_y + 50, trees_x[i] + 40, trees_y + 10);
        line(trees_x[i] + 5, trees_y + 60, trees_x[i] - 20, trees_y + 10);
        noStroke();
    }
}
// collectables
function drawCollectable(t_collectable) {
    if (t_collectable.isFound == false) {
        stroke(252, 239, 187);
        strokeWeight(0.5);
        fill(246, 201, 141);
        triangle(t_collectable.x_pos, t_collectable.y_pos + t_collectable.size,
            t_collectable.x_pos + t_collectable.size, t_collectable.y_pos,
            t_collectable.x_pos + t_collectable.size * 2, t_collectable.y_pos + t_collectable.size);
        triangle(t_collectable.x_pos + t_collectable.size * 2, t_collectable.y_pos + t_collectable.size,
            t_collectable.x_pos + t_collectable.size * 3, t_collectable.y_pos,
            t_collectable.x_pos + t_collectable.size * 4, t_collectable.y_pos + t_collectable.size);
        triangle(t_collectable.x_pos + t_collectable.size * 4, t_collectable.y_pos + t_collectable.size,
            t_collectable.x_pos + t_collectable.size * 5, t_collectable.y_pos,
            t_collectable.x_pos + t_collectable.size * 6, t_collectable.y_pos + t_collectable.size);

        fill(249, 221, 160);
        triangle(t_collectable.x_pos + t_collectable.size, t_collectable.y_pos,
            t_collectable.x_pos + t_collectable.size * 2, t_collectable.y_pos + t_collectable.size,
            t_collectable.x_pos + t_collectable.size * 3, t_collectable.y_pos);
        triangle(t_collectable.x_pos + t_collectable.size * 3, t_collectable.y_pos,
            t_collectable.x_pos + t_collectable.size * 4, t_collectable.y_pos + t_collectable.size,
            t_collectable.x_pos + t_collectable.size * 5, t_collectable.y_pos);

        fill(244, 183, 93);
        triangle(t_collectable.x_pos, t_collectable.y_pos + t_collectable.size,
            t_collectable.x_pos + t_collectable.size * 3, t_collectable.y_pos + t_collectable.size * 4,
            t_collectable.x_pos + t_collectable.size * 2, t_collectable.y_pos + t_collectable.size);
        triangle(t_collectable.x_pos + t_collectable.size * 2, t_collectable.y_pos + t_collectable.size,
            t_collectable.x_pos + t_collectable.size * 3, t_collectable.y_pos + t_collectable.size * 4,
            t_collectable.x_pos + t_collectable.size * 4, t_collectable.y_pos + t_collectable.size);
        triangle(t_collectable.x_pos + t_collectable.size * 4, t_collectable.y_pos + t_collectable.size,
            t_collectable.x_pos + t_collectable.size * 3, t_collectable.y_pos + t_collectable.size * 4,
            t_collectable.x_pos + t_collectable.size * 6, t_collectable.y_pos + t_collectable.size);
        noStroke();
    }
}

function checkCollectable(t_collectable) {
    if (dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 25) {
        t_collectable.isFound = true;
        game_score += 1;
        collectableSound.play();
    }
}

function drawCanyon(t_canyon) {
    fill(207, 225, 225);
    rect(t_canyon.x_pos - 5, floorPos_y, 5, height - floorPos_y);
    rect(t_canyon.x_pos + t_canyon.width, floorPos_y, 5, height - floorPos_y);

    fill(138, 214, 202);
    rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);

    strokeCap(ROUND);
    stroke(162, 225, 214);
    strokeWeight(7);
    line(t_canyon.x_pos + 30, floorPos_y + 68, t_canyon.x_pos + 60, floorPos_y + 68);
    line(t_canyon.x_pos + 40, floorPos_y + 73, t_canyon.x_pos + 50, floorPos_y + 73);
    line(t_canyon.x_pos + 20, floorPos_y + 78, t_canyon.x_pos + 45, floorPos_y + 78);
    line(t_canyon.x_pos + 50, floorPos_y + 120, t_canyon.x_pos + 70, floorPos_y + 120);
    strokeWeight(0);
}

function checkCanyon(t_canyon) {
    if (gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width && gameChar_y == floorPos_y) {
        isPlummeting = true;

        plummetingSound.play();
    }
}

function renderFlagpole() {
    push();

    strokeWeight(5);
    stroke(180, 225, 225);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(165, 162, 232);
    noStroke();

    if (flagpole.isReached) {
        rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
    } else {
        rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
    }

    pop();
}

function checkFlagpole() {
    var d = abs(gameChar_x - flagpole.x_pos);

    if (d < 15) {
        flagpole.isReached = true;
    }
}

function checkPlayerDie() {
    if (gameChar_y > height + 20) {
        lives -= 1;

        if (lives > 0) {
            startGame();
        }
    }
}

function createPlatforms(x, y, length) {
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function () {
            fill(89, 91, 88);
            rect(this.x, this.y, this.length, 20);
        },
        checkContack: function (gc_x, gc_y) {
            if (gc_x > this.x && gc_x < this.x + this.length) {
                var d = this.y - gc_y;
                if (d >= 0 && d < 3) {
                    return true;
                }
            }
            return false;
        }
    }
    return p;
}

function Enemy(x, y, range) {
    this.x = x;
    this.y = y;
    this.range = range;

    this.currentX = x;
    this.inc = 1;

    this.update = function () {
        this.currentX += this.inc;

        if (this.currentX >= this.x + this.range) {
            this.inc = -1;
        } else if (this.currentX < this.x) {
            this.inc = 1;
        }
    }

    this.draw = function () {
        this.update();

        fill(84, 184, 210);
        rect(this.currentX, this.y - 20, 40, 30, 10);
        rect(this.currentX + 10, this.y, 20, 20, 5);
        fill(20);
        ellipse(this.currentX + 12, this.y - 1, 10, 10);
        ellipse(this.currentX + 27, this.y - 1, 10, 10);
        triangle(this.currentX + 20, this.y + 1, this.currentX + 16, this.y + 5, this.currentX + 24, this.y + 5);
        rect(this.currentX + 14, this.y + 10, 3, 2, 5);
        rect(this.currentX + 18, this.y + 10, 3, 2, 5);
        rect(this.currentX + 22, this.y + 10, 3, 2, 5);
        rect(this.currentX + 14, this.y + 13, 3, 2, 5);
        rect(this.currentX + 18, this.y + 13, 3, 2, 5);
        rect(this.currentX + 22, this.y + 13, 3, 2, 5);
    }

    this.checkContact = function (gc_x, gc_y) {
        var d = dist(gc_x, gc_y, this.currentX, this.y);

        if (d < 20) {
            return true;
        }
        return false;
    }
}

// Additional functionality (start)
// create snow
function Particle(x, y, xSpeed, ySpeed, size, colour) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = size;
    this.colour = colour;
    this.age = 0;

    this.drawParticle = function () {
        fill(this.colour);
        ellipse(this.x, this.y, this.size);
    }

    this.updateParticle = function () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.age++;
    }
}

function Emitter(x, y, xSpeed, ySpeed, size, colour) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = size;
    this.colour = colour;

    this.startParticles = 0;

    this.particles = [];

    this.addParticle = function () {
        var p = new Particle(random(this.x - width, this.x + width + 100),
            random(this.y - height, this.y + height),
            random(this.xSpeed - 0.3, this.xSpeed + 0.3),
            random(this.ySpeed, this.ySpeed + 0.5),
            random(this.size - 10, this.size + 10),
            this.colour);
        return p;
    }

    this.startEmitter = function (startParticles) {
        this.startParticles = startParticles;

        // start emitter with initial particles 
        for (var i = 0; i < startParticles; i++) {
            this.particles.push(this.addParticle());
        }
    }
    this.updateParticles = function () {
        // iterate through particles and draw them to the screen
        var deadParticles = 0;
        for (var i = this.particles.length - 1; i > 0; i--) {
            this.particles[i].drawParticle();
            this.particles[i].updateParticle();
            if (this.particles[i].y > height) {
                this.particles.splice(i, 1);
                deadParticles++;
            }
        }
        if (deadParticles > 0) {
            for (var i = 0; i < deadParticles; i++) {
                this.particles.push(this.addParticle());
            }
        }
    }
}
// Additional functionality (end)

function startGame() {
    backgroundSound.loop();

    gameChar_x = width / 2 - 400;
    gameChar_y = floorPos_y;

    isLeft = false;
    isRight = false;
    isPlummeting = false;
    isFalling = false;

    trees_x = [70, 600, 700, 1200, 1500, 1600];
    trees_y = height / 2 + 45;

    clouds = [
        {
            x_pos: -150,
            y_pos: 80,
            size: 40
        },
        {
            x_pos: 300,
            y_pos: 100,
            size: 40
        },
        {
            x_pos: 500,
            y_pos: 60,
            size: 40
        },
        {
            x_pos: 900,
            y_pos: 130,
            size: 40
        },
        {
            x_pos: 1300,
            y_pos: 60,
            size: 40
        },
        {
            x_pos: 1500,
            y_pos: 130,
            size: 50
        }
    ];

    mountains = [
        {
            x_pos: -350,
            y_pos: 432,
            size: 10
        },
        {
            x_pos: 400,
            y_pos: 432,
            size: 7
        },
        {
            x_pos: 900,
            y_pos: 432,
            size: 8
        },
        {
            x_pos: 1000,
            y_pos: 432,
            size: 5
        },
        {
            x_pos: 1300,
            y_pos: 432,
            size: 10
        }
    ];

    cameraPosX = 0;

    collectables = [{
        x_pos: 550,
        y_pos: 411,
        size: 5,
        isFound: false
    },
    {
        x_pos: 750,
        y_pos: 411,
        size: 5,
        isFound: false
    },
    {
        x_pos: 1020,
        y_pos: 411,
        size: 5,
        isFound: false
    },
    {
        x_pos: 1150,
        y_pos: 411,
        size: 5,
        isFound: false
    },
    {
        x_pos: 1350,
        y_pos: 411,
        size: 5,
        isFound: false
    }];

    canyons = [
        {
            x_pos: 300,
            width: 80
        },
        {
            x_pos: 800,
            width: 80
        },
        {
            x_pos: 1050,
            width: 80
        },
        {
            x_pos: 1700,
            width: 80
        }
    ];

    platforms = [];
    platforms.push(createPlatforms(200, floorPos_y - 70, 100));
    platforms.push(createPlatforms(1000, floorPos_y - 70, 100));

    game_score = 0;

    flagpole = {
        x_pos: 1900,
        isReached: false
    };

    enemies = [];
    enemies.push(new Enemy(400, floorPos_y - 10, 100), new Enemy(1300, floorPos_y - 10, 100));
}