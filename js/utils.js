Array.prototype.parse2D = function() {
    const rows = []
    for (let i = 0; i < this.length; i+=16) {
        rows.push(this.slice(i, i + 16))
    }
    return rows
}
Array.prototype.createObjectsFrom2D = function () {
    const objects = []
    this.forEach((row, y) => {
        //console.log(row) 
        row.forEach((symbol, x) => {
            //console.log(symbol)
            if (symbol === 292) {
               //push a new collision into collision blocks array
              objects.push(new CollisonBlock({
                    position: {
                        x: x *64,
                        y: y * 64,
                    },
               })
               )
            }
        })
    }) 
    return objects 
}