// setup 

let canvas = document.getElementById("game-canvas") 
let scoreboard = document.getElementById("scoreboard") 
let context = canvas.getContext("2d") 

context.scale(BLOCK_LENGTH, BLOCK_LENGTH) 
let model = new GameModel(context)
let tick = 250

let score = 0 

setInterval(() => {
    newGameState()
}, tick); 


let newGameState = () => {
    fullSend()
    if (model.currentObject ===  null) {
        const rand = Math.round(Math.random() * 6 % 6) + 1
        const newPiece = new Piece(SHAPES[rand], context) 
        model.currentObject = newPiece 
        model.moveDown()
    } else {
        model.moveDown()
    }
}

const fullSend = () => {
    const allFilled = (row) => {
        for (let x of row) {
            // console.log(x)
            if (x === 0) {
                return false
            }
        }
        return true
    }

    for (let i = 0; i < model.grid.length; i++) {
        if (allFilled(model.grid[i])) {
            score += REWARD
            model.grid.splice(i, 1) 
            model.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
    }

    scoreboard.innerHTML = "Score: " + String(score)
}

document.addEventListener("keydown", (e) => {
    e.preventDefault() 
    switch(e.key) {
        case "w":
            model.rotate() 
            break 
        case "d":
            model.moveRight() 
            break 
        case "s": 
            model.moveDown() 
            break 
        case "a":
            model.moveLeft() 
            break
    }
})