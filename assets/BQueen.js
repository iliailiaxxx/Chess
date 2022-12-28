class BQueen extends Black{
    constructor(position){
        super(position)
        this.role = "queen"
        this.url = "12.png"
    }
    possibleMoves(){
        Piece.clearFilter()

        this.moveVertical()
        this.moveDiagonal()
        
        this.renderPossibleMoves()
    }
}
