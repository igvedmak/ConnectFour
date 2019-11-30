//Vectors that help in directions and help to check for connect 4
const vectors = [
   [1, -1],
   [0, 1],
   [1 ,0],
   [1, 1]
]
// Vue instance
var app = new Vue({
   el: '#app',
   created() { // when the instance creating - create the board game
      this.initGame()
   },
   // the data about game board 
   data() {
      return {
         grid: [],
         width: 7,
         height: 6,
         gameover: false,
         states: {
            NONE: 1,
            PLAYER1: 2,
            PLAYER2: 3,
         }
      };
   },
   methods: {
      //===============================initGame=========================
      /* Purpose: This method create the board game and makes the turn to first player*/
      initGame() {
         this.grid = [...Array(this.height)].map(x=>Array(this.width).fill(this.states.NONE));
         this.currentPlayer = this.states.PLAYER1;
         this.gameover = false;
      },
      //===============================cellClicked=========================
      /* Purpose: This method checks if the click on cell empty
      and checks if the player which clicked on the game board may be win*/
      cellClicked(rowIndex, colIndex) {
         if(!this.gameover) {
            unoccupiedCellRowIndex = this.getButtomUnoccupiedCellInCol(colIndex)
            if(unoccupiedCellRowIndex !== undefined) {
               this.grid[unoccupiedCellRowIndex][colIndex] = this.currentPlayer;
               if(this.isGameOver(unoccupiedCellRowIndex, colIndex)) {
                  this.gameover = true;
               } else {
                  this.currentPlayer = this.currentPlayer == this.states.PLAYER1 ? this.states.PLAYER2 : this.states.PLAYER1;
               }
            }
            this.$forceUpdate(); // The vue instance have this method and it's update the board game
         }
      },
      //===============================getButtomUnoccupiedCellInCol=========================
      /* Purpose: This method checks if the cell is empty*/
      getButtomUnoccupiedCellInCol(colIndex) {
         for(var i = this.height - 1; i >= 0; i--) {
            if(this.grid[i][colIndex] === this.states.NONE) {
               return i;
            }
         }
         return undefined
      },
      //===============================getButtomUnoccupiedCellInCol=========================
      /* Purpose: This method checks if the player can win*/
      isGameOver(rowIndex, colIndex) {
         for(var vector_index = 0; vector_index < vectors.length; vector_index++) {
            vector = vectors[vector_index] // the vector which contain the directions.
            // the limits where to run
            var start_row = rowIndex - (vector[0] * 3);
            var start_col = colIndex - (vector[1] * 3);
            var end_row = rowIndex + (vector[0] * 3);
            var end_col = colIndex + (vector[1] * 3);
            // runs simultany on row and col and checks if the player can win
            for(var curr_row = start_row, curr_col = start_col; 
                !(curr_row === end_row && curr_col === end_col); 
                curr_row+=vector[0], curr_col+=vector[1]) {
                  next_row = curr_row+vector[0];
                  next_col = curr_col+vector[1];
                  if(this.isInBoundries(curr_row, curr_col) && 
                     this.isInBoundries(next_row, next_col) &&
                     this.grid[curr_row][curr_col] !== this.states.NONE && 
                     this.grid[curr_row][curr_col] === this.grid[next_row][next_col]) {
                     counter++;
                     if(counter == 3) {
                        return true;
                     }
                  } else {
                     counter = 0;
                  }
               }
         }
         return false;
      },
      //===============================isInBoundries=========================
      /* Purpose: This method checks if the cell is on the game board*/
      isInBoundries(rowIndex, colIndex) {
         return rowIndex >= 0 && rowIndex < this.height && colIndex >= 0 && colIndex < this.width;
      },
   }
})
