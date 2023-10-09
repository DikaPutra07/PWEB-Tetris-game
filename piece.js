class Piece {
    constructor(shape, context) {
        this.shape = shape 
        this.context = context 
        this.y = 0 
        this.x = Math.floor(COLS / 2)
    }

    renderPiece() {
        this.shape.map((row, i) => {
            row.map((cell, j) => {
                if (cell > 0) {
                    this.context.fillStyle = COLORS[cell] 
                    this.context.fillRect(this.x + j, this.y + i, 1, 1)
                }
            })
        })
    }
}