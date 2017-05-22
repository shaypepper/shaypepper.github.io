var activeSquare, puzzle=[], groups=[], N=8, candidateMode;
var random = (arr) => arr[Math.floor(Math.random()*arr.length)];

class Square{
    constructor(i,j){
        this.digit = ((i+j) % N) + 1;
        this.hint = '';
    }
    position(i, j){
        this.i = i;
        this.j = j;
        this.friends = [
            j?      puzzle[i][j-1] : this,  // left
            i?      puzzle[i-1][j] : this,  // above
            j<N-1?  puzzle[i][j+1] : this,  // right
            i<N-1?  puzzle[i+1][j] : this   // down
        ];
        this.neighbors = this.friends.filter(x => x!=this);
    }
    move(x){
        this.friends[x].squareDom.trigger("click");
    }
    get check(){
        return (this.guess == this.digit); 
    }
    checkSquare(){
        if (!this.check) {
            this.squareDom.addClass("highlight");
        }
    }
    get squareDom() {
        return $("#s"+ this.id);
    }
    get answerDom(){
        return $("#a"+ this.id);
    }
    get id(){
        return ''+this.i+this.j;
    }
    createDom(){
        var self = this;
        let classes = "square bg"+this.group.color;
        if (this.friends[3].group != this.group) classes += " bottom-border";
        if (this.friends[2].group != this.group) classes += " right-border";
        let dom = $('<div>', { id:'s'+this.id, class: classes });
        let answer = $('<p>', { id:'a'+this.id, class: 'answer' });
        let div = $('<div><table><tr></tr></table></div>');
        let hint = $('<td>', { class:'hint', colspan: 3}).text(self.hint);
        dom.append(answer);
        dom.append(div);
        div.find("tr").append(hint);
        let candidateRow = $("<tr>", { class: "candidate-row" });
        for (let n=1; n<=N; n++){
            if (!((n-1) % 3)) {
                  candidateRow = $("<tr>", { class: "candidate-row" });
                  dom.find("table").append(candidateRow);
            }
            let candidate = $("<td>", { class: "candidates c"+n }).text(n);
            candidate.click(function(){
                if (candidateMode && self.currentActive) {
                    $(this).toggleClass("selected-candidate");
                }
            });
            candidateRow.append(candidate);  
        }

        dom.click(() => { self.active = true; });
        return dom;
    }
    reveal(){
        this.answer = this.digit;
    }
    set answer(x){
        this.guess = x;
        this.answerDom.text(x);
        this.squareDom[(x?"add":"remove")+"Class"]("answered");
        this.squareDom.removeClass("highlight");
        endOfTurnCheck();
    }
    set candidate(x){
        if (!x) $(".active .candidates").removeClass("selected-candidate"); 
        if (candidateMode) $(".active .c"+x).toggleClass("selected-candidate");
    }
    set active(x){
        this.currentActive = x;
        if (x) {
            if (activeSquare) {
                activeSquare.active = false;
            }
            this.squareDom.addClass("active");
            activeSquare = this;
        } else {
            this.squareDom.removeClass("active");
        } 
    }
    keyStroke(x){
        let X = x.keyCode;
        if (X >= 37 && X <= 40) {
            this.move(X-37);
        } else if (X >= 49 && X <= N+48) {
            this.answer = candidateMode ? '' : X-48;
            this.candidate = X-48;
        } else if (X >= 97 && X <= N+96) {
            this.answer = candidateMode ? '' : X-96;
            this.candidate = X-96;
        } else if (X == 32) {
            candidateMode = !candidateMode;
            $(".mode-btn").toggleClass("btn-selected");
        } else if (X == 8) {
            this[this.guess ? "answer" : "candidate"] = '';
        }
    }
}

class Group{
    constructor(i, current){
        var self = this;
        this.i = i;
        this.squares = [];
        this.color = 0;
        this.neighbors = [];
        
        var size = Math.random();
        size = (size < .8) ? 2 : (size < .95 ? 3 : 4);  
        while (size-- && current) {
            self.squares.push(current);
            current.group = self;
            current = random(current.neighbors.filter(n => !n.group));
        }
        var d = this.squares.map(sq => sq.digit);
        var ops = [ 
            x => x.reduce((a,b) => a+b) + '+',
            x => x.reduce((a,b) => a*b) + 'x',
            x => x.reduce((a,b) => Math.abs(a-b)) + '-',
            x => x.reduce((a,b) => Math.max(a/b, b/a))+ '\u00F7'
        ];

        if (d.length == 2 && (d[0] % d[1] && d[0] % d[1])) ops.splice(3,1);
        if (d.length == 2 && (d[0] == 1 || d[1] == 1)) ops.splice(1,1);
        if (d.length > 2) ops.splice(2,2)
        this.squares[0].hint = d.length == 1? d[0] : random(ops)(d);
    }

    findNeighbors(){
        var self = this;
        this.squares.forEach(m => {
            m.neighbors.forEach(n => {
                if (n.group != self && !self.neighbors.includes(n.group)) {
                    self.neighbors.push(n.group);
                }
            });
        });
    }

    setColor(stack){
        let colors = [0,1,2,3,4];
        this.neighbors.forEach(function(neighbor, i){
            colors[neighbor.color] = 0;
            if (!neighbor.color) {
                neighbor.color = 5;
                stack.push(neighbor);
            }
        });
        this.color = random(colors.filter(x=>x)) || random([1,2,3,4]);
    }
}

function endOfTurnCheck(){
    if(puzzle.every(row => row.every((sq) => sq.check))) {
        $("#puzzle").addClass("win");
    }
}

function generatePuzzle(){
    if ($(this).attr("data-n")) {
        N = Number($(this).attr("data-n"));
        $(".size-btn").removeClass("btn-selected");
        $(this).addClass("btn-selected").blur();
    }
    $("#puzzle").removeClass("win");
    puzzle = [];
    groups = [];
    for (let i=0; i<N; i++){
        puzzle.push([]);
        for (let j=0; j<N; j++){
          puzzle[i].push(new Square(i,j));
        }
    }

    for (let x=0, j=0; x<50; x++, j=Math.floor(Math.random()*N)){
        if (Math.floor(Math.random() * 2)) {
            puzzle.push(puzzle.splice(j,1)[0]);
        } else {
            puzzle.forEach(row => row.push(row.splice(j,1)[0]));
        }
    }
    var g = 0;
    puzzle.forEach((row,i) => row.forEach((sq,j) => sq.position(i,j)));
    puzzle.forEach((row,i) => row.forEach((sq,j) => {
        if (!sq.group) groups.push(new Group(++g, sq));
    }));
    groups.forEach(g => g.findNeighbors());
    var stack = [ puzzle[Math.floor(N/2)][Math.floor(N/2)].group ];
    while (current = stack.shift()) current.setColor(stack);
    drawPuzzle();
    return puzzle;
}

function drawPuzzle(){
    document.body.style.setProperty('--N', N);
    $("#puzzle").empty();

    for (r=0; r<N; r++){
        let row = $('<div>', { id: 'r'+r, class:"row square-row" });
        $("#puzzle").append(row);
        for (s=0; s<N; s++){
          let square = puzzle[r][s].createDom();
          row.append(square);
        }
    }
    puzzle.forEach(row => console.log( row.map(a => a.digit+' '+a.group.i)) );
    puzzle[0][0].active = true;
};

$(function(){
    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
    $(".size-btn").click(generatePuzzle);
    
    $(".mode-btn").click(function(){
        candidateMode = $(this).attr("data-mode") == "candidate";
        $(".mode-btn").removeClass("btn-selected");
        $(this).addClass("btn-selected");
    });
    $("#reveal-btn").click(function(){
        activeSquare.reveal();
        $(this).blur();
    });
    $("#check-btn").click(function(){
        activeSquare.checkSquare();
        $(this).blur();
    });
    $("#reset-btn").click(function(){
        $(this).blur();
        $("#puzzle").removeClass("win");
        puzzle.forEach((row,i) => 
            row.forEach((sq,j) => {
                sq.answer = '';
            })
        );
    });
    $("#new-puzzle-btn").click(function(){
        $(this).blur();
        $(".size-btn.btn-selected").click();
    });
    $("[data-n=4]").click();
    $(document).keyup((x) => { activeSquare.keyStroke(x) });
});
