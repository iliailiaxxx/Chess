class WRook extends White{
    constructor(position){
        super(position)
        this.role = "rook"
        this.url = "9.png"
    }
    possibleMoves(){
        Piece.clearFilter()

        this.moveVertical()
        
        this.renderPossibleMoves()
    }
}
