# Calcudoku

### [Play here](http://shaypepper.github.io/calcudoku/react-redux)

This is my first React web app. I decided to take a simple game I previously made in jQuery and refactor it in React/Redux. Yes, I am well aware this is overkill.

## Rules
1. Each digit can only appear once in each column/row
2. The digits in any given group will give you the amount in the hint for that group when the operation in that hint is applied. Example: 45x as a hint for a two box group would mean 9 and 5 were in the two boxes since 9 times 5 is 45. Order doesn't matter.

You can also see more robust rules [here](https://www.conceptispuzzles.com/index.aspx?uri=puzzle/calcudoku/rules).

## Interesting features
* Randomly generates new puzzle every time it is reset.
* Groupings mostly do not touch other groupings with the same background color. The algorithm is imperfect, but mostly effective.
* Candidate mode allows you to mark which digits are possibilities in that particular square.
* Switch between candidate mode and guessing mode by pressing the space bar.

## Things to be considered/fixed
* Randomly generated puzzles that have multiple solutions. Is it possible to quickly check for these cases or draw the grouping in a way to eliminate this possibility?
* Can we make the colored grouping algorithm right 100% of the time?
* Is there a way to make this mobile friendly?

## Design
* The design of the interface is based on the [New York Times sudoku puzzles](https://www.nytimes.com/crosswords/game/sudoku/hard). 
