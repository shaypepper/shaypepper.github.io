var activeSquare, puzzle=[], groups=[], squares=[], N=8, candidateMode;
var random = x => Array.isArray(x) ? x[random(x.length)] : Math.floor(Math.random()*x);
var max = Math.max, min=Math.min;

class Square{
    constructor(i,j,o){
        this.digit = ((i+j+o) % N) + 1;
    }
    get check()     { return (this.guess == this.digit); }
    get active()    { return this.currentActive; }
    get dom(){
        if (this.domCreated) return $("#s"+ this.id);
        var f = this.friends, row,
            answer = $('<p>', { id:'a'+this.id, class:'answer' }),
            hint =   $('<td>', { class:'hint', colspan:3 })
                .text(this.hint || ''),
            div =    $('<div><table><tr></tr></table></div>'),
            dom =    $('<div>', { id:'s'+this.id })
                .append(answer)
                .append(div)
                .click(() => this.active = true )
                .addClass("square bg" + this.group.color + 
                    (f[3].group != this.group ? " bottom-border" : "") +
                    (f[2].group != this.group ? " right-border" : ""));
        div.find("tr").append(hint);

        for (let n=0; n<N; n++){
            n%3 || div.find('table').append($('<tr>'));
            let c = $('<td>', { class:'candidates c'+(n+1) })
                .text(n+1)
                .click(e => this.candidate = n+1);
            div.find('tr:last-child').append(c);  
        }
        this.domCreated = true;
        this.i + this.j || (this.active = true);
        return dom;
    }
    set answer(x){
        this.guess = x;
        this.dom.find('.answer').text(x);
        this.dom[(x?"add":"remove")+"Class"]("answered");
        this.dom.removeClass("highlight");
        squares.every(sq => sq.check) && $("#puzzle").addClass("win");
    }
    set candidate(x){
        x || this.dom.find('.candidates').removeClass("selected"); 
        candidateMode && this.active && this.dom.find('.c'+x).toggleClass("selected");
    }
    set active(x){
        x && activeSquare && (activeSquare.active = false);
        x && (activeSquare = this);
        this.currentActive = x;
        this.dom[(x?'add':'remove')+'Class']('active');
    }
    position(i, j){
        this.i = i, this.j = j, this.id = ''+i+j;
        this.friends = [
            puzzle[i][max(j-1,0)],    // left
            puzzle[max(i-1,0)][j],    // above
            puzzle[i][min(j+1,N-1)],  // right
            puzzle[min(i+1,N-1)][j]   // down
        ];
        this.neighbors = this.friends.filter(x => x!=this);
        squares.push(this);
    }
    checkSquare(){
        this.check || this.dom.addClass("highlight");
    }
    reveal(){
        this.answer = this.digit;
    }   
    keyStroke(x){
        let X = x.keyCode, Y;
        if ((Y=X-37) >= 0 && X <= 40) {
            this.friends[Y].active = true
        } else if ((Y=X-48) > 0 && Y <= N || 
                   (Y=X-96) > 0 && Y <= N) {
            this.answer = candidateMode ? '' : Y;
            this.candidate = Y;
        } else if (X == 32) {
            candidateMode = !candidateMode;
            $(".mode.btn").toggleClass("selected");
        } else if (X == 8) {
            this[this.guess ? "answer" : "candidate"] = '';
        }
    }
}

class Group{
    constructor(i, current){
        this.squares = [];
        this.color = 0;
        
        var counter = (Math.random()<.8) ? 2 : (Math.random()<.75 ? 3 : 4); 
        while (counter-- && current) {
            this.squares.push(current);
            current.group = this;
            current = random(current.neighbors.filter(n => !n.group));
        }
        var d = this.squares.map(sq => sq.digit), ops = new Set(['+','x']); 
        if (d.length == 1) { return this.squares[0].hint = d[0] }
        if (d.length == 2){
            ops.add('-');
            d.includes(1) && ops.delete('x');
            d[0] % d[1] && d[1] % d[0] || ops.add('\u00F7');
        }
        var o = random(Array.from(ops));
        this.squares[0].hint = d.reduce((x,y) => {
            let a = max(x,y), b = min(x,y);
            return { '+':a+b, 'x':a*b, '-':a-b, '\u00F7':a/b }[o];
        }) + o;
    }

    setColor(stack){
        var base = [1,2,3,4], c = new Set(base);
        for (let s of this.squares) for (let n of s.neighbors) {
            n.group == this || c.delete(n.group.color) || 
            n.group.color || stack.add(n.group)
        }
        this.color = random(c.size ? Array.from(c) : base);
    }
}

function generatePuzzle(){
    puzzle.length = squares.length = groups.length = 0;
    var g=0, stack, k=Math.floor(N/2)-1; 
    for (let i=0, o=random(N); i<N; i++){
        puzzle.push([]);
        for (let j=0; j<N; j++) puzzle[i].push(new Square(i,j,o));
    }

    for (let i=j=k=0; i++<50; j=random(N), k=random(2)){
        k || puzzle.splice(j, 0, puzzle.pop());
        k || puzzle.forEach(r => r.splice(j, 0, r.pop()));
    }
    for (let i=0;i<N;i++) for (let j=0;j<N;j++) puzzle[i][j].position(i,j);
    squares.forEach(sq => sq.group || groups.push(new Group(++g, sq)));
    stack = new Set([ puzzle[k][k].group ]);
    for (let g of stack) g.setColor(stack);
    drawPuzzle();
}

function drawPuzzle(){
    $('body').css('--N', ''+N);
    $("#puzzle").html(puzzle.map(row => 
        $('<div>', { class:"row" }).append(row.map(sq => sq.dom))
    ));
    puzzle[0][0].active = true;
};

$(function(){
    $(".size.btn").click(function(){
        N = +$(this).attr("data-n");
        $(".size.btn.selected").toggleClass("selected");
        $(this).addClass("selected");
        $("#puzzle").removeClass("win");
        generatePuzzle();
    });
    $("[data-n=4]").click();

    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });

    $(".btn").click(function(){ $(this).blur() });
    
    $("#reveal").click(() => activeSquare.reveal());
    $("#check").click(() => activeSquare.checkSquare());
    $("#new-puzzle").click(() => $(".size.selected").click());

    $("#reset").click(() => {
        $("#puzzle").removeClass("win");
        $('.candidates').removeClass('selected');
        for (sq of squares) sq.answer = '';
    });
    $(".mode").click(function(){
        candidateMode = $(this).attr("data-mode") == "candidate";
        $(".mode").removeClass("selected");
        $(this).addClass("selected");
    });
    
    $(document).keyup(x => activeSquare.keyStroke(x));
});
