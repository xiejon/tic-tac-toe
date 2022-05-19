# Tic Tac Toe

This Tic Tac Toe game was an attempt to practice modular patterns in JS as part of The Odin Project's Full-Stack Javascript course. 

Viewable at https://xiejon.github.io/tic-tac-toe/

## Objectives 

1. Create a simple tic-tac-toe game that displays player turn, alerts winner, and has a reset button. 
2. Write as little global code as possible. Use modules or factories to compartmentalize and organize code. 

## Motivation

After watching a video series on [Modular Javascript](https://www.youtube.com/watch?v=HkFlM73G-hk&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f&index=2), I realized how disorganized my code up to this point has been. Not only that, but modules and factory functions offer data privacy and namespacing, issues I didn't previously consider. 

## Overview of Game
 
1. 'Player One', the default, is highlighted on the screen. 
2. When Player One clicks on a box to make a move, 'X' is placed on the grid. 
3. 'Player Two' is highlighted to signal that it is their turn to play. 
4. Player two selects a box, 'O' is placed on the grid. 
5. Repeat steps 1-4 until Player One or Player Two wins, or there is a tie. 
6. The outcome of the game is alerted. 
7. The game is automatically reset. Alternatively, there is a button to reset while mid-game. 

## Challenges 

1. Determining outcome of game
    - My solution to this problem was not ideal. I added row/column/diagonal properties to each box on the gameboard. Once a player selected a box, I would copy this object into a new 'entries' array. Finally, while changing player turn through the getSelection function, I checked if there was a winner through another checkSelections function, which kept track of the selected entries and recorded instances of rows/columns/diagonal. Once there were 3 instances, checkSelections returned a true boolean.
    - There is very likely a simpler and more elegant solution that doesn't require the use of so many arrays or the individual prescription of row/column/diagonal properties. 

## Areas for Improvement
- With better planning, I might have been able to design a more efficient solution and to structure the code better. Right now, I have two modules: gameBoard and displayController, but the functions that each module contains are intertwined.  
- Giving players the option to choose X or O 
- Allowing players to play 'best of 3' or 'best of 5' 
- Creating an AI to for an individual to play against