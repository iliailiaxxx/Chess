class BRook extends Black{
    constructor(position){
        super(position)
        this.role = "rook"
        this.url = "10.png"
    }
    possibleMoves(){
        Piece.clearFilter()

        this.moveVertical()
        
        this.renderPossibleMoves()
    }
}
