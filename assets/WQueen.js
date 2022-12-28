class WQueen extends White{
    constructor(position){
        super(position)
        this.role = "queen"
        this.url = "11.png"
    }
    possibleMoves(){
        Piece.clearFilter()

        this.moveVertical()
        this.moveDiagonal()
        
        this.renderPossibleMoves()
    }
}
