const collisionsLevel1 =[
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,292,292,292,292,292,292,292,292,292,292,292,292,292,292,0,
    0,292,0,0,0,0,0,0,0,0,0,0,0,0,292,0,
    0,292,0,0,0,0,0,0,0,0,0,0,0,0,292,0,
    0,292,292,0,0,0,0,0,0,0,0,0,0,0,292,0,
    0,292,292,292,292,292,292,292,292,292,292,292,292,292,292,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
]
Array.prototype.parse2D = function() {
    const rows = []
    for (let i = 0; i < this.length; i+=16) {
        rows.push(this.slice(i, i + 16))
    }
    return rows
}
class CollisonBlock {
    constructor( { position }) {
        this.position = position
        this.width = 64
        this.height = 64
    }
    draw() {
     c.fillStyle = 'red'
     c.fillRect(this.position.x, this.position.y, this.width, this.height)   
    }
}
const collisionBlocks = []
 const parsedCollisions = collisionsLevel1.parse2D()
 //console.log(parsedCollisions)
 parsedCollisions.forEach((row, y) => {
    //console.log(row) 
    row.forEach((symbol, x) => {
        //console.log(symbol)
        if (symbol === 292) {
           //push a new collision into collision blocks array
           collisionBlocks.push(new CollisonBlock({
                position: {
                    x: x *64,
                    y: y * 64,
                },
           })
           )
        }
    })
})