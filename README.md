# The Insane Coding Challenge

My take on the <a href="https://github.com/terabithian007/InsaneCodingChallenge">
InsaneAI Coding Challenge</a>

Web-game link: https://swords--and--shields.herokuapp.com/

(It's best viewed with a 1920x1080 resolution screen in a maximised Firefox browser window)

The game is built using Node.js and HTML5 game framework Phaser.

# Swords and Shields

### Act 1 || Scene 1

For the time being, '4 in a line' winning combination is set as default tie-breaker pattern. Users can play a 2-player 4x4 tic-tac-toe on the same device. The Play Again functionality is woking fine for a 2-player game, a little bug to be fixed the AI game!

### Act 2 || Scene 2

The first part here is to let the user drag and drop blocks to create a new tie-breaker pattern.

In Phaser, this can be done with setting up drop zones. A 3x4 grid with 4 blocks to drag and drop. After the user has fixed the pattern, on the backend it will be converted into a matrix with replacing empty blocks with 0 and deleting empty rows/columns. This way, the problem will be reduced to finding every instance of a submatrix in the given matrix.


<table>
<tr><td>

|   | # |   |   |            
|---|---|---|---|    
| # | # | # |   |             
|   |   |   |   |

</td><td>

| 0 | # | 0 |
|---|---|---|
| # | # | # |

</td></tr> </table>

<table>
<tr><td>

|   |   | # | # |
|---|---|---|---|
| # | # |   |   |             
|   |   |   |   |


</td><td>

| 0 | 0 | # | # |
|---|---|---|---|
| # | # | 0 | 0 |

</td></tr> </table>

Now, when the 2 players end up in a tie, for both the players, the alogrithm finds all the instances of any of the four rotated forms of the pattern submatrix in the game board matrix.

### Act 3 || Scene 1

Had it been 3x3 board, a simple game algorithm would have sufficed. But, with 4x4 the number of possible moves and the size of game tree in particular increases exponentially.

To address this, I have used the standard Minimax Alpha-Beta pruning algorithm with a few tweaks.
1. When we know the opening move, we can hard-code the next move, optimizing the move and time.
2. With 4x4 grid, the depth of the game tree reaches upto 16, that's a lot. The browser starts to crash as early as reaching the depth of 10. To address this, either we bring in the power of parallel computing and GPUs or we can set a depth limit which of course reduces the quality of our algorithm especially in the initial moves. I have set the depth limit to be 9.
3. Furthermore, before every move, check if tiles of any of the winning combinations have 3 elements of the same type, thus in O(1) the AI can avoid defeat as well as never bother to vist many nodes in the game tree.
