const random = x => (
  typeof x === 'object'?
    (Array.isArray(x)? x[random(x.length)] : Array.of(x)[random(x.size)]) :
    Math.floor(Math.random()*x)
  );

class Group{
  constructor(i, current, squares){
    this.squares = [];
    this.color = 0;
    this.id = i;

    var counter = (Math.random()<.8) ? 2 : (Math.random()<.75 ? 3 : 4);
    while (counter-- && current) {
      this.squares.push(current);
      current.group = this;
      current = squares[random(current.neighbors.filter(n => !squares[n].group))];
    }
    this.generateHint();
  }

  generateHint(){
    var digits = this.squares.map(sq => sq.digit),
      [a,b] = digits,
      ops = new Set(`+x`);

    switch(digits.length){
      case 1:
        return this.squares[0].hint = ``+a;
      case 2:
        ops.add('-');
        digits.includes(1) && ops.delete('x');
        a%b && b%a || ops.add('\u00F7');
      case 3:
      case 4:
        var op = random(Array.from(ops));
        this.squares[0].hint = digits.reduce((a,b) => {
            if (b > a) [a, b] = [b, a];
            return { '+':a+b, 'x':a*b, '-':a-b, '\u00F7':a/b }[op];
        }) + op;
    }
  }

  setColor(squares){
    const base = [1,2,3,4];
    var c = new Set(base),
      groupsToBeColored = [];
    this.squares.map( s => s.neighbors.map( neighborId => {
      const n = squares[neighborId];
      n.group == this || c.delete(n.group.color) ||
      n.group.color || groupsToBeColored.push(n.group)
    }));
    this.color = random(c.size ? Array.from(c) : base);
    return groupsToBeColored;
  }
}

function generatePuzzle(N=5){
  const getRange = n => Array.of( ...new Int32Array(n).map((x,i) => i)),
    RANGE = getRange(N),
    OFFSET = random(N),
    CENTER = Math.floor(N/2)-1,
    M  = x => Math.max(x-1, 0),
    m  = x => Math.min(x+1, N-1),
    id = ([x, y]) => x*N + y,
    moveElement = x => arr => arr.splice(x, 0, arr.pop());

  var puzzle = RANGE.map(i => RANGE.map(j => ({ digit: ((i+j+OFFSET) % N) + 1 }) ));

  // scramble puzzle randomly
  for (let i=0, j=0; i++<50; j=random(N)){
      random(2) ? moveElement(j)(puzzle) : puzzle.forEach(moveElement(j));
  }

  var squares = [];
  puzzle.forEach((row, i) => row.forEach((sq, j) => {
    sq.neighbors = [[i, M(j)], [M(i), j], [i, m(j)], [m(i), j]].map(id);
    sq.id = id([i,j]);
    squares.push(sq);
  }));

  // create groups
  var groupId = 0;
  squares.forEach(sq => sq.group || new Group(++groupId, sq, squares));

  //assign colors to groups
  var stack = [puzzle[CENTER][CENTER].group];
  while (stack.length) stack.push(...stack.shift().setColor(squares));

  return squares;
}

export default generatePuzzle
