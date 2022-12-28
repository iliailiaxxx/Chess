class WBishop extends White{
    constructor(position){
        super(position)
        this.role = "bishop"
        this.url = "7.png"
    }
    possibleMoves(){
        Piece.clearFilter()

        this.moveDiagonal()

        this.renderPossibleMoves()
    }
}
