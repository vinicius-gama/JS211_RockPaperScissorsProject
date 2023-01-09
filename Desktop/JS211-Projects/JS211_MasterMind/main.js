'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) => {
  let solutionArray = solution.split("")
  let guessArray = guess.split("")

  let correctLetterLocations = 0
  for (let i= 0;i < solutionArray.length;i++) {
    if (solutionArray[i]===guessArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null 
    }
  }
  let correctLetters = 0
  for (let i= 0; i < solutionArray.length; i++){
    let targetIndex = solutionArray.indexOf(guessArray[i])
    if(targetIndex > -1) {
      correctLetters++
      solutionArray[targetIndex] = null
    }

  }

return `${correctLetterLocations}-${correctLetters}`


}
//   // your code here
//  // Initialize the counts for exact and color matches
//   let exactMatches = 0;
//   let colorMatches = 0;

//   // Create an array of booleans to keep track of which elements in the code have been matched
//   const codeMatched = Array(code.length).fill(false);
//   // Iterate through the guess and check for exact matches
//   for (let i = 0; i < guess.length; i++) {
//     if (guess[i] === code[i]) {
//       exactMatches += 1;
//       codeMatched[i] = true;

//   // Iterate through the guess again and check for color matches
//      for (let i = 0; i < guess.length; i++) {
//     if (code.includes(guess[i]) && !codeMatched[code.indexOf(guess[i])]) {
//       colorMatches += 1;
//       codeMatched[code.indexOf(guess[i])] = true;
//     }
//   }

//   return [exactMatches, colorMatches];



// }
//   }‘

// }

  const mastermind = (guess) => {
    solution = 'abcd'
    let hint = generateHint(guess)
    board.push(`${guess}-${hint}`)
    if (guess === solution ) {
      console.log ('You guessed it!')

      return 'You guessed it!'
    }
    console.log()
    if (board.length===10){
      console.log('You ran out of turns! The solution was '+ solution)
      return 'You ran out of turns! The solution was '+ solution
      } else {
        console.log('Guess again.')
      return  'Guess again.'
  
      }

  }

//    // Comment this out to generate a random solution
//   // your code here
//   // Generate the hint for the guess
//   const hint = generateHint(code, guess);
//   const exactMatches = hint[0];
//   const colorMatches = hint[1];

//   // Check if the guess is correct
//   if (exactMatches === code.length) {
//     return "You won!";
//   }

//   // Check if there are no exact or color matches
//   if (exactMatches === 0 && colorMatches === 0) {
//     return "You lost.";
//   }

//   // Otherwise, return "Guess again."
//   return "Guess again.";

// }


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}