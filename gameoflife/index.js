var game = [],
    counts = [],
    neighbors = [],
    squares = [],
    N = 10, 
    size = 1000, 
    alive = 0, 
    interval=500,
    redraw,
    mousedown,
    drag,
    playing = true,
    draw = SVG('game').size(size, size);
newGame();

function generateGame(){
    game.length = counts.length = neighbors.length = squares.length = 0;
    for (let i=0;i<N;i++) for (let j=0;j<N;j++){
        j || (game.push([]), counts.push([]), neighbors.push([]), squares.push([]));
        game[i].push(Math.random()>.5?0:1);
        counts[i].push(0);
        let x = [
            [i-1, j-1],
            [i-1, j  ],
            [i-1, j+1],
            [i+1, j-1],
            [i+1, j  ],
            [i+1, j+1],
            [i  , j-1],
            [i  , j+1]
        ];
        let n = new Set(x.map(a => [(a[0]+N)%N, (a[1]+N)%N]));
        // i     || (n.delete(x[0]), n.delete(x[1]), n.delete(x[2]));
        // i<N-1 || (n.delete(x[3]), n.delete(x[4]), n.delete(x[5]));
        // j     || (n.delete(x[0]), n.delete(x[3]), n.delete(x[6]));
        // j<N-1 || (n.delete(x[2]), n.delete(x[5]), n.delete(x[7]));
         
        neighbors[i].push(n);
    }
    for (let i=0;i<N;i++) for (let j=0;j<N;j++){
        j || (squares[i].length = 0);
        squares[i][j] = (
            draw.rect(size/N, size/N)
                .attr({ class: game[i][j]?'on':'off' })
                .move(j*size/N, i*size/N)
                .on('mousedown', function(){
                    if (!playing) {
                        game[i][j] = +!game[i][j];
                        mousedown = true;
                        drag = game[i][j];
                        squares[i][j].attr({ class: game[i][j]? 'on':'off' });
                    }
                })
                .on('mouseup', function(){
                    mousedown = false;
                })
                .on('mouseover', function(){
                    if (mousedown && !playing) {
                        game[i][j] = drag;
                        squares[i][j].attr({ class: game[i][j]? 'on':'off' });
                    }
                })
        );
    }
}
function tick(){
    alive = 0;
    for (row of counts) row.fill(0);
    for (let i=0;i<N;i++) for (let j=0;j<N;j++){
        if (game[i][j]) neighbors[i][j].forEach(x => counts[x[0]][x[1]]++)
    }
    for (let i=0;i<N;i++) for (let j=0;j<N;j++){
        let prev = game[i][j],
            n = counts[i][j];
        n == 3 && (game[i][j] = 1);
        n != 2 && n != 3 && (game[i][j] = 0);
        squares[i][j].attr({ class: game[i][j]? 'on':'off' });
        game[i][j] && alive++;
    }
    alive || stopPlay();
}

function stopPlay(){
    clearInterval(redraw);
    playing = false;
}

function changeSize(){
    N = +this.id.slice(4);
    newGame();
}

function newGame(){
    clearInterval(redraw);
    generateGame();
    playing = true;
    redraw = setInterval(tick, interval);
}

document.getElementById('start').addEventListener('click',function(){
    clearInterval(redraw);
    redraw = setInterval(tick, interval);
    playing = true;
});
document.getElementById('clear').addEventListener('click',function(){
    stopPlay();
    for (row of game) row.fill(0);
    tick();
});

document.getElementById('stop').addEventListener('click', stopPlay);
document.getElementById('tick').addEventListener('click', tick);
document.getElementById('reset').addEventListener('click', newGame);
document.getElementById('size10').addEventListener('click', changeSize);
document.getElementById('size25').addEventListener('click', changeSize);
document.getElementById('size50').addEventListener('click', changeSize);
document.getElementById('size100').addEventListener('click', changeSize);



