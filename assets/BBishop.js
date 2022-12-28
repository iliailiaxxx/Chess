class BBishop extends Black{
    constructor(position){
        super(position)
        this.role = "bishop"
        this.url = "8.png"
    }
    possibleMoves(){

        Piece.clearFilter()

        this.moveDiagonal()
        
        this.renderPossibleMoves()
    }
}
