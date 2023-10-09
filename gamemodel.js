class GameModel {
    constructor(context) {
        this.context = context 
        this.currentObject = null 
        this.grid = this.initGrid()
    }

    initGrid() {
        let grid = [] 
        for (var i = 0; i < ROWS; i++) {
            grid.push([])
            for (var j = 0; j < COLS; j++) {
                grid[grid.length - 1].push(0)
            }
        }
        return grid 
    }

    collision(x, y, candidate=null) {
        const shape = candidate || this.currentObject.shape 
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape.length; j++) {
                if (shape[i][j] > 0) {
                    if (x + j >= 0 && x + j < COLS && y + i < ROWS) {
                        if (this.grid[y + i][x + j] > 0) {
                            return true
                        }
                    }
                    else {
                        return true
                    }
                }
            }
        }
        return false
    }

    renderGameState() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                let cell = this.grid[i][j] 
                this.context.fillStyle = COLORS[cell] 
                this.context.fillRect(j, i, 1, 1)
            }
        }

        if (this.currentObject !== null) {
            this.currentObject.renderPiece()
        }
    }


    moveDown() {
        if (this.currentObject === null) {
            this.renderGameState() 
            return
        } else if (this.collision(this.currentObject.x, this.currentObject.y + 1)) {
            const shape = this.currentObject.shape 
            shape.map((row, i) => {
                row.map((cell, j) => {
                    let p = this.currentObject.x + j 
                    let q = this.currentObject.y + i 
                    if (p >= 0 && p < COLS && q < ROWS && cell > 0) {
                        this.grid[q][p] = shape[i][j]
                    }
                })
            })

            // check game over 
            if (this.currentObject.y === 0) {
                alert("Game over!") 
                this.grid = this.makeStartingGrid()
            }
            this.currentObject = null
        } else {
            this.currentObject.y += 1
        }
        this.renderGameState()
    }

    moveRight() {
        if (this.currentObject === null) {
            return
        }
        if (!this.collision(this.currentObject.x + 1, this.currentObject.y)) {
             this.currentObject.x += 1
        }
        this.renderGameState()
    }

    moveLeft() {
        if(this.currentObject === null) {
            return
        }
        if (!this.collision(this.currentObject.x - 1, this.currentObject.y)) {
            this.currentObject.x -= 1
        }
        this.renderGameState()
    }

    rotate() {
        if (this.currentObject !== null) {
            let shape = [...this.currentObject.shape.map((row) => [...row])]
            // transpose of matrix 
            for (let y = 0; y < shape.length; ++y) {
                for (let x = 0; x < y; ++x) {
                    [shape[x][y], shape[y][x]] = [shape[y][x], shape[x][y]]
                }
            }
            // reverse order of rows 
            shape.forEach((row => row.reverse()))
            if (!this.collision(this.currentObject.x, this.currentObject.y, shape)) {
                this.currentObject.shape = shape
            }
        }
        this.renderGameState()
    }
}