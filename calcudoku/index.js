var N = 8;
var puzzle;
var activeSquare = {
  i: 0,
  j: 0
};
var group = {};
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
  console.log(X, N+48);
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
    switchMode(true);
  } else if (X == 8) {
    if (answer().text()) {
      answer().text("");
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
  group = {};
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
      group[g] = {
        connections: [],
        color: 0,
        colorOptions: [],
        members: []
      };
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
      var bg = [true, true, true, true];
      while (size) {
        group[g].members.push([I,J])
        digits.push(puzzle[I][J].digit);
        puzzle[I][J].group = g;
        size--;

        var options = [];
        if (I > 0 && !puzzle[I-1][J].group)   options.push([I-1, J]);
        if (I < N-1 && !puzzle[I+1][J].group) options.push([I+1, J]);
        if (J > 0 && !puzzle[I][J-1].group)   options.push([I, J-1]);
        if (J < N-1 && !puzzle[I][J+1].group) options.push([I, J+1]);

        if (I > 0 && puzzle[I-1][J].group && puzzle[I-1][J].group != g && (group[g].connections.indexOf(puzzle[I-1][J].group) == -1))   {
          group[g].connections.push(puzzle[I-1][J].group);
          group[puzzle[I-1][J].group].connections.push(g);
        }
        if (I < N-1 && puzzle[I+1][J].group && puzzle[I+1][J].group != g && (group[g].connections.indexOf(puzzle[I+1][J].group) == -1)) {
          group[g].connections.push(puzzle[I+1][J].group);
          group[puzzle[I+1][J].group].connections.push(g);
        }
        if (J > 0 && puzzle[I][J-1].group && puzzle[I][J-1].group != g && (group[g].connections.indexOf(puzzle[I][J-1].group) == -1))   {
          group[g].connections.push(puzzle[I][J-1].group);
          group[puzzle[I][J-1].group].connections.push(g);
        }
        if (J < N-1 && puzzle[I][J+1].group && puzzle[I][J+1].group != g && (group[g].connections.indexOf(puzzle[I][J+1].group) == -1)) {
          group[g].connections.push(puzzle[I][J+1].group);
          group[puzzle[I][J+1].group].connections.push(g);
        }

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
  console.log(group);
  // figure out colors
  var g = puzzle[Math.floor(N/2)][Math.floor(N/2)].group;
  group[g].color = 1;
  var stack = [].concat(group[g].connections);
  while (stack.length) {
    console.log(g, stack);
    let color = group[g].color;
    var g = stack.shift();
    if (!group[g].color) {
      let colors = [false, true, true, true, true];
      group[g].connections.forEach(function(x, i){
        if (stack.indexOf(x) == -1 && !group[x].color) {
          stack.push(x);
        } else if (group[x].color) {
          colors[group[x].color] = false;
        }
      });
      colors.forEach((x,i) => { if (x) group[g].colorOptions.push(i); });
      console.log(g, colors, group[g].colorOptions);
      group[g].color = group[g].colorOptions[Math.floor(Math.random()*group[g].colorOptions.length)]  || ((Number(color)+2) % 4) + 1;
      console.log(g,'BECOMES',group[g].color)
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
    let row = $('<tr>', { id: 'r'+r, class:"square-row" });
    $("#puzzle").append(row);
    for (s=0; s<N; s++){
      let border = (r<N-1 && puzzle[r][s].group != puzzle[r+1][s].group) ? " bottom-border" : "";
      border += (s<N-1 && puzzle[r][s].group != puzzle[r][s+1].group) ? " right-border" : "";
      let square = $('<td>', { id:'s'+r+s, class: 'square'+border+' bg'+ group[puzzle[r][s].group].color });
      let answer = $('<p>', { id:'a'+r+s, class: 'answer' });
      let hint = $('<div><table><tr><td class="hint" colspan="3">'+
        puzzle[r][s].hint+'</td></tr></table></div>');
      row.append(square);
      square.append(answer);
      square.append(hint);
      let candidateRow = $("<tr>", { class: "candidate-row" });
      for (n=1; n<=N; n++){
        if (!((n-1) % 3)) {
          candidateRow = $("<tr>", { class: "candidate-row" });
          square.find("table").append(candidateRow);
        }
        let candidate = $("<td>", { class: "candidates c"+n }).text(n);
        candidateRow.append(candidate);  
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

$(function(){
  drawPuzzle();

  $(".size-btn").click(function(){
    drawPuzzle(Number($(this).attr("data-n")));
    $(this).blur();
    $(".size-btn").removeClass("btn-selected");
    $(this).addClass("btn-selected");
  });

  $(".mode-btn").click(switchMode);

  $(document).keyup(catchKeyStroke);
});
