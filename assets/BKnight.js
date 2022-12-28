class BKnight extends Black{
    constructor(position){
        super(position)
        this.role = "knight"
        this.url = "4.png"
    }

    knightPossibleMoves(position){
        if(blackPieceInstancePosition.includes(position) === false){
            if(whichTurn ==='black'){ 
                let oldMove = this.position
                this.position = position
                Black.updateBPosition()
                king2.isChecked(`${parseInt(this.position[0])}${parseInt(this.position[1])}`)
                this.position = oldMove
                Black.updateBPosition()
                if(king2.isCheck != true){
                    this.possibleMovesAray.push(position)
                }
                }
                else{
                    this.possibleMovesAray.push(position)
                }         
        }
    }
    possibleMoves(){
        Piece.clearFilter()
        this.knightPossibleMoves(`${parseInt(this.position[0])-1}${parseInt(this.position[1])-2}`)
        this.knightPossibleMoves(`${parseInt(this.position[0])+1}${parseInt(this.position[1])-2}`)
        this.knightPossibleMoves(`${parseInt(this.position[0])-2}${parseInt(this.position[1])-1}`)
        this.knightPossibleMoves(`${parseInt(this.position[0])-2}${parseInt(this.position[1])+1}`)
        this.knightPossibleMoves(`${parseInt(this.position[0])-1}${parseInt(this.position[1])+2}`)
        this.knightPossibleMoves(`${parseInt(this.position[0])+1}${parseInt(this.position[1])+2}`)
        this.knightPossibleMoves(`${parseInt(this.position[0])+2}${parseInt(this.position[1])-1}`)
        this.knightPossibleMoves(`${parseInt(this.position[0])+2}${parseInt(this.position[1])+1}`)

        this.renderPossibleMoves()
    }
}
