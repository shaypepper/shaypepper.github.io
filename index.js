var N = 8;
var puzzle;
var activeSquare = {
  i: 0,
  j: 0
};
var candidateMode = false;
var square = () => $("#s"+activeSquare.i+activeSquare.j);
var answer = () => $("#a"+activeSquare.i+activeSquare.j);
var ops = [ 
  (arr) => arr.reduce((a,b) => a+b, 0) + '+',
  (arr) => arr.reduce((a,b) => a*b, 1) + 'x',
  (arr) => Math.abs(arr[0] - arr[1]) + '-',
  (arr) => (Math.max(...arr) / Math.min(...arr)) + '\u00F7'
];

function catchKeyStroke(x){
  let X = x.keyCode;
  console.log(X);
  if (X >= 37 && X <= 40) {
    if (X == 38 && activeSquare.i){
      activeSquare.i--;
    } else if (X == 37 && activeSquare.j){
      activeSquare.j--;
    } else if (X == 40 && activeSquare.i < N-1){
      activeSquare.i++;
    } else if (X == 39 && activeSquare.j < N-1){
      activeSquare.j++;
    }
    square().trigger("click");
  } else if (X >= 49 && X <= N+48) {
    if (candidateMode) {
      $(".active .c"+(X-48)).toggleClass("selected-candidate");
      answer().text("");
      square().removeClass("answered");
    } else {
      answer().text(X - 48);
      square().addClass("answered");
      if (endOfTurnCheck()) {
        console.log("YOU WIN!");
      } else {
        console.log("KEEP GOING");
      }
    }
  } else if (X == 32) {
    candidateMode = !candidateMode;
  } else if (X == 8) {
    if (answer().text()) {
      answer().text("");
    } else {
      $(".active .candidates").removeClass("selected-candidate");
    }
  }
}

function endOfTurnCheck(){
  var nCorrect = 0;
  iLoop:
  for (i=0; i<N; i++){
    for (j=0; j<N; j++){
      console.log($("#a" + i + j).text(), puzzle[i][j])
      if ($("#a" + i + j).text() == puzzle[i][j].digit) {
        nCorrect += 1;
      } else {
        break iLoop;
      }
    }
  }
  return nCorrect == N*N;
}

function moveActiveSquare(){
  var id = $(this).attr('id');
  $(".active").removeClass("active");
  $(this).addClass("active");
  activeSquare.i = Number(id.charAt(1)); 
  activeSquare.j = Number(id.charAt(2));
}

function print(puzzle){
  console.log("PUZZLE");
  for (x=0; x<N; x++){
    console.log(puzzle[x].map((a) => a.digit + ' ' + a.group));
  }
}

function generatePuzzle(){
  var puzzle = [];
  // Generate randum numbers
  for (r=0; r<N; r++){
    puzzle.push([]);
    for (s=0; s<N; s++){
      puzzle[r].push({
        digit: ((s+r) % N) + 1,
        group: 0,
        hint: '',
        active: false,
        guess: null
      });
    }
  }

  for (x=0; x<50; x++){
    var i = Math.floor(Math.random() * 2);
    var j = Math.floor(Math.random() * N);

    if (i) {
      var removed = puzzle.splice(j,1);
      puzzle.push(removed[0]);
    } else {
      for (r=0; r<N; r++){
        var removed = puzzle[r].splice(j,1);
        puzzle[r].push(removed[0]);
      }
    }
  }

  var g = 0;

  for (i=0; i<N; i++){
    for (j=0; j<N; j++){
      if (puzzle[i][j].group) {
        continue;
      }
      g++;
      var I = i;
      var J = j;
      var size = Math.random();
      if (size < .8) {
        size = 2;
      } else if (size < .95) {
        size = 3;
      } else {
        size = 4;
      }

      var digits = [];
      while (size) {
        digits.push(puzzle[I][J].digit);
        puzzle[I][J].group = g;
        size--;

        var options = [];
        if (I > 0 && !puzzle[I-1][J].group)   options.push([I-1, J]);
        if (I < N-1 && !puzzle[I+1][J].group) options.push([I+1, J]);
        if (J > 0 && !puzzle[I][J-1].group)   options.push([I, J-1]);
        if (J < N-1 && !puzzle[I][J+1].group) options.push([I, J+1]);

        if (options.length) {
          [I, J] = options[Math.floor(Math.random()*options.length)];
        } else {
          break;
        }
      }

      if (digits.length == 1) {
        puzzle[i][j].hint = digits[0];
        continue;
      } else if (digits.length == 2){ 
        var nOps = (((digits[0] / digits[1]) % 1 == 0) || ((digits[1] / digits[0]) % 1 == 0)) ? 4 : 3;
      } else {
        var nOps = 2;
      }
      puzzle[i][j].hint = ops[Math.floor(Math.random()*nOps)](digits);
    }
  }
  return puzzle;
}

function drawPuzzle(n){
  N = n || N;
  activeSquare.i = 0;
  activeSquare.j = 0;
  puzzle = generatePuzzle();

  document.body.style.setProperty('--N', N);
  $("#puzzle").empty();

  // setup
  for (r=0; r<N; r++){
    $("#puzzle").append('<tr id="r'+r+'" class="row"></tr>');
    var rowId = '#r' + r;
    for (s=0; s<N; s++){
      var border = (r<N-1 && puzzle[r][s].group != puzzle[r+1][s].group) ? "bottom-border" : "";
      border += (s<N-1 && puzzle[r][s].group != puzzle[r][s+1].group) ? " right-border" : "";
      $(rowId).append('<td id="s'+r+s+'" class="square '+  border +'"><p id="a'+r+s+'" class="answer"></p><div><table><tr><td class="hint" colspan="3">'+puzzle[r][s].hint+'</td></tr></table></div></td>');
      for (n=1; n<=N; n++){
        if (!((n-1) % 3)) {
          $('#s' + r + s +' table ').append('<tr class="candidate-row"></tr>');
        }
        $('#s' + r + s +' .candidate-row:last-child').append('<td class="candidates c'+n+'">'+n+'</td>');  
      }
    }
  }

  $(".square").click(moveActiveSquare);
  $(".candidates").click(function(){
    if (candidateMode && $(this).parents(".square.active").length) {
      $(this).toggleClass("selected-candidate");
    }
  });
  print(puzzle);
  $("#s00").addClass("active");
};

$(document).ready(function(){
  drawPuzzle();

  $(".size-btn").click(function(){
    drawPuzzle($(this).attr("data-n"));
  });

  $(document).keyup(catchKeyStroke);
});
