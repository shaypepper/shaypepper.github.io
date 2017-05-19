var activeSquare, puzzle, rows=[], columns=[], groups=[], N=8;
var candidateMode = false;
var random = (arr) => arr[Math.floor(Math.random()*arr.length)];

class Square{
    constructor(i,j){
        this.currentActive = i+j? false: true;
        this.digit = ((i+j) % N) + 1;
        this.group = null;
        this.hint = '';
        this.conflicted = false;
        this.guess = null;
        this.column = null;
        this.row = null;
    }
    set position(ij){
        var [i,j] = ij;
        this.i = i;
        this.j = j;
        this.move = [
            j?      puzzle[i][j-1] : this,  // left
            i?      puzzle[i-1][j] : this,  // above
            j<N-1?  puzzle[i][j+1] : this,  // right
            i<N-1?  puzzle[i+1][j] : this   // down
        ];
        this.neighbors = this.move.filter(x => x != this);
        this.column = columns[j];
        this.row = rows[i];
    }
    get check(){ 
        return this.guess == this.digit; 
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
    let border = (this.move[3].group.i != this.group.i) ? " bottom-border" : "";
    border += (this.move[2].group.i != this.group.i) ? " right-border" : "";
    let dom = $('<td>', { id:'s'+this.id, class: 'square'+border+' bg'+ this.group.color });
    let answer = $('<p>', { id:'a'+this.id, class: 'answer' });
    let hint = $('<div><table><tr><td class="hint" colspan="3">'+
        this.hint+'</td></tr></table></div>');
    dom.append(answer);
    dom.append(hint);
    let candidateRow = $("<tr>", { class: "candidate-row" });
    for (let n=1; n<=N; n++){
        if (!((n-1) % 3)) {
              candidateRow = candidateRow.clone();
              dom.find("table").append(candidateRow);
        }
        let candidate = $("<td>", { class: "candidates c"+n }).text(n);
        candidateRow.append(candidate);  
    }
    return dom;
  }

  set answer(x){
    this.guess = x;
    this.answerDom.text(x);
    this.column.check();
    this.row.check();
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
        console.log("setting active!");
        this.squareDom.removeClass("active");
    } 
  }

  set highlight(x){
    if (this.conflicted && !x) {
        this.conflicted = false;
        this.column.digitCheck();
        this.row.digitCheck();
    }
    this.squareDom[(x?"add":"remove")+"Class"]("highlight");
    this.conflicted = x;
  }
}

class SquareList{
    constructor(i){
        this.i = i;
        this.squares = [];
    }

    answerCheck(squares){
        return this.squares.every((sq) => sq.check);
    }

    digitCheck(){
        var digitCounts = [];
        var digits = this.squares.forEach((sq) => {
            if (digitCounts[sq.guess]) {
                digitCounts[sq.guess].push(sq);
                digitCounts[sq.guess][0] = true;
            } else {
                digitCounts[sq.guess] = [false, sq];
            }
        });
        digitCounts.forEach((arr) => {
            if (arr && arr[0]) {
                arr.slice(1).forEach((sq) => {
                    sq.highlight(true);
                });
            } else if (arr && !arr[0]) {
                sq.highlight(false);
            }
        });
    }
}

class Group{
    constructor(i, firstSquare){
        var self = this;
        this.i = i;
        this.squares = [];
        this.color = 0;
        this.neighbors = [];
        
        var size = Math.random();
        size = (size < .8) ? 2 : (size < .95 ? 3 : 4);
        console.log(size);
        var current = firstSquare;
        var digits = [];
        while (size) {
            self.squares.push(current);
            digits.push(current.digit);
            current.group = self;
            size--;

            var nextOptions = current.neighbors.filter((n)=> !n.group );
            console.log('NEXT OPTIONS', this.i, current.i, current.j, nextOptions)
            if (nextOptions.length) {
                current = random(nextOptions);
            } else {
                break;
            }   
        }
        console.log('group!', this.i, digits, this.squares.map(sq => sq.id) )
        if (digits.length == 1) {
            this.squares[0].hint = digits[0];
            return;
        } else if (digits.length == 2){ 
            var nOps = (((digits[0] / digits[1]) % 1 == 0) || ((digits[1] / digits[0]) % 1 == 0)) ? 4 : 3;
        } else {
            var nOps = 2;
        }
        var ops = [ 
          (arr) => arr.reduce((a,b) => a+b, 0) + '+',
          (arr) => arr.reduce((a,b) => a*b, 1) + 'x',
          (arr) => Math.abs(arr[0] - arr[1]) + '-',
          (arr) => (Math.max(...arr) / Math.min(...arr)) + '\u00F7'
        ];
        this.squares[0].hint = random(ops.slice(0, nOps))(digits);
    }

    get size(){
        return this.squares.length;
    }

    findNeighbors(){
        var self = this;
        this.squares.forEach((m) => {
            m.neighbors.forEach((n) => {
                if (n.group != self && self.neighbors.indexOf(n.group) == -1) {
                    self.neighbors.push(n.group);
                }
            });
        });
    }

    setColor(stack){
        if (this.color) { return; }
        let colors = [false, true, true, true, true];
        let colorOptions = [];
        this.neighbors.forEach(function(neighbor, i){
            if (stack.indexOf(neighbor) == -1 && !neighbor.color) {
                stack.push(neighbor);
            } else if (neighbor.color) {
                colors[neighbor.color] = false;
            }
        });
        colors.forEach((x,i) => { if (x) colorOptions.push(i); });
        this.color = random(colorOptions) || random([1,2,3,4]);
        console.log(this.id, 'BECOMES', this.color, colors, colorOptions);
    }

    set newMember(x){
        this.members.push(x);
    }
}

function catchKeyStroke(x){
  let X = x.keyCode;
  if (X >= 37 && X <= 40) {
    activeSquare.move[X-37].squareDom.trigger("click");
  } else if (X >= 49 && X <= N+48) {
    if (candidateMode) {
      $(".active .c"+(X-48)).toggleClass("selected-candidate");
      activeSquare.answerDom.text("");
      activeSquare.squareDom.removeClass("answered");
    } else {
      activeSquare.answerDom.text(X - 48);
      activeSquare.squareDom.addClass("answered");
      activeSquare.row.digitCheck();
      activeSquare.column.digitCheck();
      if (endOfTurnCheck()) {
        console.log("YOU WIN!");
      } else {
        console.log("KEEP GOING");
      }
    }
  } else if (X == 32) {
    switchMode(true);
  } else if (X == 8) {
    if (activeSquare.answerDom.text()) {
      activeSquare.answerDom.text("");
      activeSquare.row.digitCheck();
      activeSquare.column.digitCheck();
    } else {
      $(".active .candidates").removeClass("selected-candidate");
    }
  }
}

function switchMode(spacebar){
  if (spacebar) {
    candidateMode = !candidateMode;
  } else if ($(this).attr("data-mode") == "candidate") {
    candidateMode = true;
  } else {
    candidateMode = false;
  }
  $(".mode-btn").removeClass("btn-selected");
  $("[data-mode="+(candidateMode?"candidate]":"guess]")).addClass("btn-selected").blur();
}

function endOfTurnCheck(){
  var mistake = false;
  for (i=0; i<N; i++){
    if (!rows[i].check){
        mistake = true;
        break;
    }
  }
  return !mistake;
}

function generatePuzzle(){
  puzzle = [];
  for (let i=0; i<N; i++){
    columns.push(new SquareList(i));
    rows.push(new SquareList(i));
    puzzle.push([]);
    for (let j=0; j<N; j++){
      puzzle[i].push(new Square(i,j));
    }
  }

  for (let x=0; x<50; x++){
    let i = Math.floor(Math.random() * 2);
    let j = Math.floor(Math.random() * N);

    if (i) {
        puzzle.push(puzzle.splice(j,1)[0]);
    } else {
        puzzle.forEach((row)=>{
            row.push(row.splice(j,1)[0]);
        });
    }
  }

  for (let i=0; i<N; i++){
    for (let j=0; j<N; j++){
      columns.newMember = puzzle[i][j];
      rows.newMember = puzzle[i][j];
      puzzle[i][j].position = [i,j];
    }
  }

  var g = 0;
  for (i=0; i<N; i++){
    for (j=0; j<N; j++){
      if (puzzle[i][j].group) {
        continue;
      }
      g++;
      groups.push(new Group(g, puzzle[i][j]));
    }
  }

  groups.forEach((g)=>{
    g.findNeighbors();
  });
  // figure out colors
  var g = puzzle[Math.floor(N/2)][Math.floor(N/2)].group;
  g.color = 1;
  var stack = [].concat(g.neighbors);
  while (stack.length) {
    g = stack.shift();
    g.setColor(stack);
  }

  return puzzle;
}

function moveActiveSquare(){
  var id = $(this).attr('id');
  puzzle[id[1]][id[2]].active = true;
}

function drawPuzzle(n){
  N = n || N;
  puzzle = generatePuzzle();

  document.body.style.setProperty('--N', N);
  $("#puzzle").empty();

  // setup 
  for (r=0; r<N; r++){
    let row = $('<tr>', { id: 'r'+r, class:"square-row" });
    $("#puzzle").append(row);
    for (s=0; s<N; s++){
      let square = puzzle[r][s].createDom();
      row.append(square);
    }
  }

  $(".square").click(moveActiveSquare);
  $(".candidates").click(function(){
    if (candidateMode && $(this).parents(".square.active").length) {
      $(this).toggleClass("selected-candidate");
    }
  });
  print(puzzle);
  puzzle[0][0].active = true;
};

$(function(){
  drawPuzzle();

  $(".size-btn").click(function(){
    drawPuzzle(Number($(this).attr("data-n")));
    $(".size-btn").removeClass("btn-selected");
    $(this).addClass("btn-selected").blur();
  });

  $(".mode-btn").click(switchMode);

  $(document).keyup(catchKeyStroke);
});

function print(puzzle){
  console.log("PUZZLE");
  for (x=0; x<N; x++){
    console.log(puzzle[x].map((a) => a.digit + ' ' + a.group.i));
  }
}


