function createStyledElement (className, element = 'div') {
  const el = document.createElement(element)
  el.setAttribute('class', className)
  return el
}

class TicTacToe {
  constructor() {
    this.rows = 3
    this.columns = 3
    this.board = document.getElementById('board')
    this.boardData = this.createInitialBoardData()
    this.touched = []
    this.playerOne = {
      letter: "X"
    }
    this.playerTwo = {
      letter: "O"
    }
    this.activePlayer = this.playerOne
    this.winner = null
  }

  checkTouchedForWinner() {
    for (let i = 0; i < this.touched.length; i++) {
      // for each touched coordinate
          // check up and down that column
          // check left and right that row
          // if center touched check diagonal left to right and diagonal right to left
    }
  }

  updateIsWinner() {
    // horizontal check
    for (let i = 0; i < this.rows; i++) {
      let winStack = []
      let lastLetter = ''
      for (let j = 0; j < this.columns; j++) {
        if (this.boardData[i][j].letter) {
          if (winStack.length === 0) {
            winStack.push(this.boardData[i][j])
            lastLetter = this.boardData[i][j].letter
          } else if (this.boardData[i][j].letter === lastLetter) {
            winStack.push(this.boardData[i][j])
          } else {
            winStack = [this.boardData[i][j]]
            lastLetter = this.boardData[i][j].letter
          }
          if (winStack.length === 3) {
            this.winner = lastLetter
            const winnerEl = document.getElementById('winner')
            winnerEl.innerText = `The winner is ${lastLetter}!`
            return
          }
        } else {
          winStack = []
          lastLetter = ''
        }
      }
    }

    // vertical check
    for (let i = 0; i < this.columns; i++) {
      let winStack = []
      let lastLetter = ''
      for (let j = 0; j < this.rows; j++) {
        if (this.boardData[j][i].letter) {
          if (winStack.length === 0) {
            winStack.push(this.boardData[j][i])
            lastLetter = this.boardData[j][i].letter
          } else if (this.boardData[j][i].letter === lastLetter) {
            winStack.push(this.boardData[j][i])
          } else {
            winStack = []
            lastLetter = ''
          }
          if (winStack.length === 3) {
            this.winner = lastLetter
            const winnerEl = document.getElementById('winner')
            winnerEl.innerText = `The winner is ${lastLetter}!`
            return
          }
        } else {
          winStack = []
          lastLetter = ''
        }
      }
    }

    // diagonal left to right check
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let winStack = []
        let lastLetter = ''
        for (let k = i, m = j; k < this.rows && m < this.columns; k++, m++) {
          if (this.boardData[k][m].letter) {
            if (winStack.length === 0) {
              winStack.push(this.boardData[k][m])
              lastLetter = this.boardData[k][m].letter
            } else if (this.boardData[k][m].letter === lastLetter) {
              winStack.push(this.boardData[k][m])
            } else {
              winStack = [this.boardData[k][m]]
              lastLetter = this.boardData[k][m].letter
            }
            if (winStack.length === 3) {
              this.winner = lastLetter
              const winnerEl = document.getElementById('winner')
              winnerEl.innerText = `The winner is ${lastLetter}!`
              return
            }
          }  else {
            winStack = []
            lastLetter = ''
          }
        }
      }
    }

    // diagonal right to left check
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let winStack = []
        let lastLetter = ''
        for (let k = i, m = j; k < this.rows && m >= 0; k++, m--) {
          if (this.boardData[k][m].letter) {
            if (winStack.length === 0) {
              winStack.push(this.boardData[k][m])
              lastLetter = this.boardData[k][m].letter
            } else if (this.boardData[k][m].letter === lastLetter) {
              winStack.push(this.boardData[k][m])
            } else {
              winStack = [this.boardData[k][m]]
              lastLetter = this.boardData[k][m].letter
            }
            if (winStack.length === 3) {
              this.winner = lastLetter
              const winnerEl = document.getElementById('winner')
              winnerEl.innerText = `The winner is ${lastLetter}!`
            }
          } else {
            winStack = []
            lastLetter = ''
          }
        }
      }
    }
  }

  createInitialBoardData() {
    const tempBoard = []
  
    for (let row = 0; row < this.rows; row++) {
      const currRow = []
      for (let col = 0; col < this.columns; col++) {
        currRow.push({
          letter: null,
        })
      }
      tempBoard.push(currRow)
    }
  
    return tempBoard
  }

  handleClick = (event) => {
    if (this.winner) {
      window.alert(`The winner is ${this.winner}.  Please start a new game to continue playing.`)
      return
    }

    const [pRow, pCol] = event.target.id.split('-')
    // this.touched.push([pRow, pCol])

    const pieceIsEmpty = (this.boardData[pRow][pCol].letter === null)

    if (pieceIsEmpty) {
      event.target.innerText = 'X'
      this.boardData[pRow][pCol].letter = 'X' // update board status

      this.updateIsWinner()

      if (this.winner) return

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (!this.boardData[i][j].letter) {
            this.boardData[i][j].letter = 'O'
            console.log("this.boardData[i][j]")
            const elId = `${i}-${j}`
            const oElement = document.getElementById(elId)
            oElement.innerText = 'O'

            this.updateIsWinner()

            return
          }
        }
      }

      // if (this.activePlayer === this.playerOne) {
      //   this.activePlayer = this.playerTwo
      // } else {
      //   this.activePlayer = this.playerOne
      // }

      // const activePlayerEl = document.getElementById('active-player')
      // activePlayerEl.innerText = `Active player: ${this.activePlayer.letter}`

      console.log("this.touched:", this.touched)

     
      
    } else {
      window.alert("Only spaces that are empty and have no empty spaces below them can be played.")
    }
  }

  renderBoard() {
    for (let row = 0; row < this.rows; row++) {
      const rowEl = createStyledElement('row')
      for (let col = 0; col < this.columns; col++) {
        const currRow = row
        const currCol = col
        const id = `${currRow}-${currCol}`

        const pieceBackground = createStyledElement(`game-square`)
        const piece = createStyledElement('square white-background', 'button')

        piece.setAttribute('id', id)
        piece.addEventListener('click', this.handleClick)

        pieceBackground.append(piece)
        rowEl.append(pieceBackground)
      }
      this.board.append(rowEl)
    }
  }
}

const startNewGame = () => {
  const board = document.getElementById('board')
  while (board.lastElementChild) {
    board.removeChild(board.lastElementChild)
  }

  const winnerEl = document.getElementById('winner')
  winnerEl.innerText = 'No winner yet'

  const game = new TicTacToe
  game.renderBoard()

  const activePlayerEl = document.getElementById('active-player')
  activePlayerEl.innerText = `Active player: ${game.activePlayer.letter}`
}

const startNewGameEl = document.getElementById('new-game')
startNewGameEl.addEventListener('click', startNewGame)

const game = new TicTacToe
game.renderBoard()
