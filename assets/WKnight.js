class WKnight extends White{
    constructor(position){
        super(position)
        this.role = "knight"
        this.url = "3.png"
    }
    knightPossibleMoves(position){
        if(whitePieceInstancePosition.includes(position) === false){
            if(whichTurn ==='white'){ 
            let oldMove = this.position
            this.position = position
            White.updateWPosition()
            king1.isChecked(`${parseInt(this.position[0])}${parseInt(this.position[1])}`)
            this.position = oldMove
            White.updateWPosition()
            if(king1.isCheck != true){
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
