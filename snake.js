import { Head } from 'http://localhost:8000/modules/head.js';
import { Body, Apple } from 'http://localhost:8000/modules/body.js';

const blockWidth = 28;
const size = 20;
var dir = [0, 0];
var game_over = false;
var prev_key;
window.addEventListener("keydown", onKeyDown, false);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drawBackground() {
    const canvas = document.querySelector('.background');
    const ctx = canvas.getContext('2d');
    const width = canvas.width = size * (blockWidth + 2);
    const height = canvas.height = width;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let bgimage = new Image(width, height);
            bgimage.src = 'http://localhost:8000/modules/bg.png';
            bgimage.onload = function() {
                ctx.drawImage(bgimage, i*(blockWidth+2), j*(blockWidth+2), blockWidth+2, blockWidth+2);
            };
        }
    }
}

function generateApple(head, body) {
    let x;
    let y;
    let x_list = [];
    let y_list = [];
    if (body != []) {
        for (let i = 0; i < body.length; i++) {
            x_list.push(body[i].x);
        }
        for (let i = 0; i < body.length; i++) {
            y_list.push(body[i].y);
        }
    }

    do {
        x = Math.floor(Math.random() * 19);
        x *= (blockWidth + 2);
    } while (x === head.x || x_list.includes(x));
    do {
        y = Math.floor(Math.random() * 19);
        y *= (blockWidth + 2);
    } while (y === head.y || y_list.includes(y));
    
    var apple = new Apple(x, y, blockWidth);
    var appleimage = apple.drawApple();
    return [apple, appleimage];
}

function onKeyDown(event) {
    var keyCode = event.keyCode;
    // keys in order W A S D
    if (keyCode == 87 && prev_key != 83) {
        dir = [0, -1];
        prev_key = 87;
    } else if (keyCode == 65 && prev_key != 68) {
        dir = [-1, 0];
        prev_key = 65;
    } else if (keyCode == 83 && prev_key != 87) {
        dir = [0, 1];
        prev_key = 83;
    } else if (keyCode == 68 && prev_key != 65) {
        dir = [1, 0];
        prev_key = 68;
    } else if (keyCode == 81) {
        game_over = true;
    } else if (keyCode == 82) {
        location = location;
    }
}

function addPoint(points) {
    points += 1;
    document.getElementById("points_number").innerHTML = points;
    return points;
}

async function main() {
    let to_do;
    drawBackground();
    let head = new Head((size/2-1)*(blockWidth+2), (size/2-1)*(blockWidth+2), blockWidth);
    head.draw();
    let body = [];
    let points = 0;
    let bodypart;
    let apple = generateApple(head, body);
    let old_headx;
    let old_heady;

    while (!game_over) {
        old_headx = head.x;
        old_heady = head.y;
        // speed
        await sleep(90);
        to_do = head.move(dir, body, apple[0]);
        if (body.length > 0) {
            if (body.length == 1) {
                body[0].hide();
            }
            for (let i = body.length - 1; i > 0; i--) {
                
                if(i == body.length-1) {
                    body[i].hide();
                }
                body[i].x = body[i-1].x;
                body[i].y = body[i-1].y;
                body[i].move();
            }
            body[0].x = old_headx;
            body[0].y = old_heady;
            body[0].move();
        }

        if (to_do === 1) {
            apple[1].style.display='none';
            apple = generateApple(head, body);
            if (body.length > 2) {
                let last_body = body[body.length - 1];
                let last_xdir = (body[body.length - 2].x - last_body.x)/(blockWidth+2);
                let last_ydir = (body[body.length - 2].y - last_body.y)/(blockWidth+2);
                bodypart = new Body(last_body.x-last_xdir*(blockWidth+2), last_body.y-last_ydir*(blockWidth+2), blockWidth);
            } else if (body.length === 0) {
                bodypart = new Body(head.x-dir[0]*(blockWidth+2), head.y-dir[1]*(blockWidth+2), blockWidth);
            } else {
                bodypart = new Body(body[0].x-dir[0]*(blockWidth+2), body[0].y-dir[1]*(blockWidth+2), blockWidth);
            }
            points = addPoint(points);
            body.push(bodypart);
            bodypart.draw();
        } else if (to_do === 2) {
            game_over = true;
            window.alert("Game over! Refresh the page to start again.");
        }
    }

    head.draw();
}


main();