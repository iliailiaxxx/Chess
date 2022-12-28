let temporaryDeleteBPieceObjB
class BKing extends Black{
    constructor(position){
        super(position)
        this.role = "king"
        this.url = "6.png"
        this.isCheck = false
    }

    isChecked(take){
        let counter = 0
        for(let k=0;k<whitePieceInstance.length;k++){
            if(typeof whitePieceInstance[k] === 'object'){
                if(whitePieceInstance[k].position === take){
                    continue
                }
                whitePieceInstance[k].possibleMoves()
                whitePieceInstance[k].possibleMovesAray.forEach((e) => {
                    if(e === king2.position){
                        king2.isCheck = true
                        counter++
                    }
                })
                whitePieceInstance[k].possibleMovesAray = []
            }
        }
        if(counter===0){
            king2.isCheck = false
        }
        Piece.clearFilter()
    }
    temporaryDeleteWPiece(take){
        for(let i = 0;i<whitePieceInstance.length;i++){
            if(whitePieceInstance[i].position === take){
                temporaryDeleteBPieceObjB = whitePieceInstance[i]
                whitePieceInstance[i].position = ''
                White.updateWPosition()
            }
        }
        
    }
    returnTemporaryDeleteWPiece(take){
        temporaryDeleteBPieceObjB.position = take
        White.updateWPosition()
    }

    kingPossibleMoves(position){
        if(blackPieceInstancePosition.includes(position) === false){
            if(whichTurn === 'black'){
            let oldMove = this.position
            this.position = position
            Black.updateBPosition()
            if(whitePieceInstancePosition.includes(`${parseInt(this.position[0])}${parseInt(this.position[1])}`)){
                king2.temporaryDeleteWPiece(`${parseInt(this.position[0])}${parseInt(this.position[1])}`)
                king2.isChecked()
                king2.returnTemporaryDeleteWPiece(`${parseInt(this.position[0])}${parseInt(this.position[1])}`)

            }
            else{
                king2.isChecked()            
            }            
            this.position = oldMove
            Black.updateBPosition()
            if(king2.isCheck != true){
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
        if(this.firstMove === true && rook4.firstMove === true&&rook4.position==='81'){
            if(myPieceInstancePosition.includes('61')!=true && myPieceInstancePosition.includes('71')!=true){
                if(whichTurn === 'black'){
                let oldMove = this.position
                this.position = `71`
                Black.updateBPosition()
                king2.isChecked()
                this.position = oldMove
                Black.updateBPosition()
                if(king2.isCheck != true){
                    king2.isChecked()
                    if(king2.isCheck != true){
                        this.possibleMovesAray.push(`71`)
                    }
                }
                }
            }
        }
        if(this.firstMove === true && rook3.firstMove === true&&rook3.position==='11'){
            if(myPieceInstancePosition.includes('21')!=true && myPieceInstancePosition.includes('31')!=true && myPieceInstancePosition.includes('41')!=true){
                if(whichTurn === 'black'){
                    let oldMove = this.position
                    this.position = `31`
                    Black.updateBPosition()
                    king2.isChecked()
                    this.position = oldMove
                    Black.updateBPosition()
                    if(king2.isCheck != true){
                        king2.isChecked()
                        if(king2.isCheck != true){
                            this.possibleMovesAray.push(`31`)
                        }
                    }
                    }
            }
        }
        this.renderPossibleMoves()
    }
    castlingR(){
        rook4.possibleMoves()
        rook4.move('61')
        Piece.changeTurn()
    }
    castlingL(){
        rook3.possibleMoves()
        rook3.move('41')
        Piece.changeTurn()
    }
    move(id, take){
        if(this.possibleMovesAray.includes(id)){
            if(this.firstMove ===true && id ==='71'){
                this.castlingR()
            }
            if(this.firstMove ===true && id ==='31'){
                this.castlingL()
            }
            this.firstMove = false
            document.getElementById(`${this.position[0]}${this.position[1]}`).innerHTML = "";
            document.getElementById(`${id}`).innerHTML = `<img src="${this.url}">`;
            this.position = id
            this.possibleMovesAray = []
            if(take === true){White.deleteWhitePiece(id)}
            Piece.changeTurn()
            Piece.clearFilter()
            Black.updateBPosition() 
            Black.drawOrWin()  
        }
        else{
            return
        }
    }
}
