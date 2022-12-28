let whiteElPassantArray = ['14','24','34','44','54','64','74','84']
class WPawn extends White{
    constructor(position){
        super(position)
        this.role = "pawn"
        this.url = '1.png'
    }
    pawnMove(position){
        if(whichTurn ==='white'){ 
            let oldMove = this.position
            this.position = position
            White.updateWPosition()
            king1.isChecked(position)
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
    possibleMoves(){
        Piece.clearFilter()
        //En Passant
        if(previousMove){
            if(previousMove.position===(`${parseInt(this.position[0])-1}${parseInt(this.position[1])}`)&&
            previousMove.secondMove === true&&
            previousMove.role ==="pawn"&&
            whiteElPassantArray.includes(this.position)){
                this.pawnMove(`${parseInt(this.position[0])-1}${parseInt(this.position[1])-1}`)
            }
            if(previousMove.position===(`${parseInt(this.position[0])+1}${parseInt(this.position[1])}`)&&
            previousMove.secondMove === true&&
            previousMove.role ==="pawn"&&
            whiteElPassantArray.includes(this.position)){
                this.pawnMove(`${parseInt(this.position[0])+1}${parseInt(this.position[1])-1}`)
            }
        }


        //En Passant
        

        //one forward
        if(myPieceInstancePosition.includes(`${this.position[0]}${parseInt(this.position[1])-1}`) === false){
            this.pawnMove(`${parseInt(this.position[0])}${parseInt(this.position[1])-1}`)
        }
        
        //if two in front taken by enemy
        if(blackPieceInstancePosition.includes(`${parseInt(this.position[0])+1}${parseInt(this.position[1])-1}`)){
            this.pawnMove(`${parseInt(this.position[0])+1}${parseInt(this.position[1])-1}`)
        }

        if(blackPieceInstancePosition.includes(`${parseInt(this.position[0])-1}${parseInt(this.position[1])-1}`)){
            this.pawnMove(`${parseInt(this.position[0])-1}${parseInt(this.position[1])-1}`)  
        }

        //two forward
        if(this.firstMove === true){
            if(myPieceInstancePosition.includes(`${this.position[0]}${parseInt(this.position[1])-2}`) === false){
                if(myPieceInstancePosition.includes(`${this.position[0]}${parseInt(this.position[1])-1}`) === false){
                    this.pawnMove(`${parseInt(this.position[0])}${parseInt(this.position[1])-2}`)  
                }
            }
        }
        this.renderPossibleMoves()
        
    }
    move(id, take){
        if(this.possibleMovesAray.includes(id)){
            //first/second move
            if(this.firstMove===true){
                this.firstMove = false
                this.secondMove = true
            }
            else if(this.secondMove===true){
                this.secondMove = false
            }
            //el passant
            if(id===`${parseInt(this.position[0]-1)}${parseInt(this.position[1]-1)}`&&
            blackPieceInstancePosition.includes(`${parseInt(this.position[0]-1)}${parseInt(this.position[1]-1)}`)===false){
                Black.deleteBlackPiece(`${parseInt(this.position[0]-1)}${parseInt(this.position[1])}`)
                document.getElementById(`${this.position[0]-1}${this.position[1]}`).innerHTML = "";

            }
            if(id===`${parseInt(this.position[0])+1}${parseInt(this.position[1])-1}`&&
            blackPieceInstancePosition.includes(`${parseInt(this.position[0])+1}${parseInt(this.position[1]-1)}`)===false){
                Black.deleteBlackPiece(`${parseInt(this.position[0])+1}${parseInt(this.position[1])}`)
                document.getElementById(`${parseInt(this.position[0])+1}${this.position[1]}`).innerHTML = "";

            }
            //move
            document.getElementById(`${this.position[0]}${this.position[1]}`).innerHTML = "";
            document.getElementById(`${id}`).innerHTML = `<img src="${this.url}">`;
            this.position = id
            this.possibleMovesAray = []
            if(take === true){Black.deleteBlackPiece(id)}
            Piece.changeTurn()
            Piece.clearFilter()
            White.updateWPosition()   
            if(this.role === 'pawn' && lastRow.includes(id)){
                White.newQueen(id)
            }
            White.drawOrWin()
            previousMove=this
        }
        else{
            return
        }
    }
}
