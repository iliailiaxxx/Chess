let temporaryDeleteBPieceObj
class WKing extends White{
    constructor(position){
        super(position)
        this.role = "king"
        this.url = "5.png"
        this.isCheck = false
    }

    isChecked(take){
        let counter = 0
        for(let k=0;k<blackPieceInstance.length;k++){
            if(typeof blackPieceInstance[k] === 'object'){
                if(blackPieceInstance[k].position === take){
                    continue
                }
                blackPieceInstance[k].possibleMoves()
                blackPieceInstance[k].possibleMovesAray.forEach((e) => {
                    if(e === king1.position){
                        king1.isCheck = true
                        counter++
                    }
                })
                blackPieceInstance[k].possibleMovesAray = []
            }
        }
        if(counter===0){
            king1.isCheck = false
        }
        Piece.clearFilter()
    }
    temporaryDeleteBPiece(take){
        for(let i = 0;i<blackPieceInstance.length;i++){
            if(blackPieceInstance[i].position === take){
                temporaryDeleteBPieceObj = blackPieceInstance[i]
                blackPieceInstance[i].position = ''
                Black.updateBPosition()
            }
        }
        
    }
    returnTemporaryDeleteBPiece(take){
        temporaryDeleteBPieceObj.position = take
        Black.updateBPosition()
    }
    kingPossibleMoves(position){
        if(whitePieceInstancePosition.includes(position) === false){
            if(whichTurn === 'white'){
            let oldMove = this.position
            this.position = position
            White.updateWPosition()
            if(blackPieceInstancePosition.includes(`${parseInt(this.position[0])}${parseInt(this.position[1])}`)){
                king1.temporaryDeleteBPiece(`${parseInt(this.position[0])}${parseInt(this.position[1])}`)
                king1.isChecked()
                king1.returnTemporaryDeleteBPiece(`${parseInt(this.position[0])}${parseInt(this.position[1])}`)

            }
            else{
                king1.isChecked()            
            }
            this.position = oldMove
            White.updateWPosition()
            if(king1.isCheck != true){
                if(regex.test(position)===true){
                    this.possibleMovesAray.push(position)
                }
            }
            }
            else{
                if(regex.test(position)===true){
                    this.possibleMovesAray.push(position)
                }
            }
        }
    }

    possibleMoves(){
        Piece.clearFilter()

        this.kingPossibleMoves(`${parseInt(this.position[0])-1}${parseInt(this.position[1])-1}`)
        this.kingPossibleMoves(`${parseInt(this.position[0])+1}${parseInt(this.position[1])-1}`)
        this.kingPossibleMoves(`${parseInt(this.position[0])}${parseInt(this.position[1])-1}`)

        this.kingPossibleMoves(`${parseInt(this.position[0])-1}${parseInt(this.position[1])}`)
        this.kingPossibleMoves(`${parseInt(this.position[0])+1}${parseInt(this.position[1])}`)
        
        this.kingPossibleMoves(`${parseInt(this.position[0])-1}${parseInt(this.position[1])+1}`)
        this.kingPossibleMoves(`${parseInt(this.position[0])+1}${parseInt(this.position[1])+1}`)
        this.kingPossibleMoves(`${parseInt(this.position[0])}${parseInt(this.position[1])+1}`)
        

        //castling
        if(this.firstMove === true && rook2.firstMove === true&&rook2.position==='88'){
            if(myPieceInstancePosition.includes('68')!=true && myPieceInstancePosition.includes('78')!=true){
                if(whichTurn === 'white'){
                let oldMove = this.position
                this.position = `78`
                White.updateWPosition()
                king1.isChecked()
                this.position = oldMove
                White.updateWPosition()
                if(king1.isCheck != true){
                    king1.isChecked()
                    if(king1.isCheck != true){
                        this.possibleMovesAray.push(`78`)
                    }
                }
                }
            }
        }
        if(this.firstMove === true && rook1.firstMove === true&&rook1.position==='18'){
            if(myPieceInstancePosition.includes('28')!=true && myPieceInstancePosition.includes('38')!=true && myPieceInstancePosition.includes('48')!=true){
                if(whichTurn === 'white'){
                let oldMove = this.position
                this.position = `38`
                White.updateWPosition()
                king1.isChecked()
                this.position = oldMove
                White.updateWPosition()
                if(king1.isCheck != true){
                    king1.isChecked()
                    if(king1.isCheck != true){
                        this.possibleMovesAray.push(`38`)
                    }
                }
                }
            }
        }
        this.renderPossibleMoves()
    }
    castlingR(){
        rook2.possibleMoves()
        rook2.move('68')
        Piece.changeTurn()
    }
    castlingL(){
        rook1.possibleMoves()
        rook1.move('48')
        Piece.changeTurn()
    }
    move(id, take){
        if(this.possibleMovesAray.includes(id)){
            if(this.firstMove ===true && id ==='78'){
                this.castlingR()
            }
            if(this.firstMove ===true && id ==='38'){
                this.castlingL()
            }
            this.firstMove = false
            document.getElementById(`${this.position[0]}${this.position[1]}`).innerHTML = "";
            document.getElementById(`${id}`).innerHTML = `<img src="${this.url}">`;
            this.position = id
            this.possibleMovesAray = []
            if(take === true){Black.deleteBlackPiece(id)}
            Piece.changeTurn()
            Piece.clearFilter()
            White.updateWPosition()  
            White.drawOrWin()
        }
        else{
            return
        }
    }
}
