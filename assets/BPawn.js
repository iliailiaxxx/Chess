let blackElPassantArray = ['15','25','35','45','55','65','75','85']
class BPawn extends Black{
    constructor(position){
        super(position)
        this.role = "pawn"
        this.url = '2.png'
    }
    pawnMove(position){
        if(whichTurn ==='black'){ 
            let oldMove = this.position
            this.position = position
            Black.updateBPosition()
            king2.isChecked(position)
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
    possibleMoves(){
        Piece.clearFilter()
        //En Passant
        if(previousMove){
            if(previousMove.position===(`${parseInt(this.position[0])-1}${parseInt(this.position[1])}`)&&
            previousMove.secondMove === true&&
            previousMove.role ==="pawn"&&
            blackElPassantArray.includes(this.position)){
                this.pawnMove(`${parseInt(this.position[0])-1}${parseInt(this.position[1])+1}`)
            }
            if(previousMove.position===(`${parseInt(this.position[0])+1}${parseInt(this.position[1])}`)&&
            previousMove.secondMove === true&&
            previousMove.role ==="pawn"&&
            blackElPassantArray.includes(this.position)){
                this.pawnMove(`${parseInt(this.position[0])+1}${parseInt(this.position[1])+1}`)
            }
        }

        //one forward
        if(myPieceInstancePosition.includes(`${this.position[0]}${parseInt(this.position[1])+1}`) === false){
            this.pawnMove(`${parseInt(this.position[0])}${parseInt(this.position[1])+1}`)
        }
        
        //if two in front taken by enemy
        if(whitePieceInstancePosition.includes(`${parseInt(this.position[0])+1}${parseInt(this.position[1])+1}`)){
            this.pawnMove(`${parseInt(this.position[0])+1}${parseInt(this.position[1])+1}`) 
        }

        if(whitePieceInstancePosition.includes(`${parseInt(this.position[0])-1}${parseInt(this.position[1])+1}`)){
            this.pawnMove(`${parseInt(this.position[0])-1}${parseInt(this.position[1])+1}`)     
        }

        //two forward
        if(this.firstMove === true){
            if(myPieceInstancePosition.includes(`${this.position[0]}${parseInt(this.position[1])+2}`) === false){
                if(myPieceInstancePosition.includes(`${this.position[0]}${parseInt(this.position[1])+1}`) === false){
                    this.pawnMove(`${parseInt(this.position[0])}${parseInt(this.position[1])+2}`) 
                }
            }
        }
        this.renderPossibleMoves()

    }
    move(id, take){
        if(this.possibleMovesAray.includes(id)){

            if(this.firstMove===true){
                this.firstMove = false
                this.secondMove = true
            }
            else if(this.secondMove===true){
                this.secondMove = false
            }

            if(id===`${parseInt(this.position[0]-1)}${parseInt(this.position[1])+1}`&&
            whitePieceInstancePosition.includes(`${parseInt(this.position[0]-1)}${parseInt(this.position[1])+1}`)===false){
                White.deleteWhitePiece(`${parseInt(this.position[0]-1)}${parseInt(this.position[1])}`)
                document.getElementById(`${this.position[0]-1}${this.position[1]}`).innerHTML = "";

            }
            if(id===`${parseInt(this.position[0])+1}${parseInt(this.position[1])+1}`&&
            whitePieceInstancePosition.includes(`${parseInt(this.position[0])+1}${parseInt(this.position[1])+1}`)===false){
                White.deleteWhitePiece(`${parseInt(this.position[0])+1}${parseInt(this.position[1])}`)
                document.getElementById(`${this.position[0]+1}${this.position[1]}`).innerHTML = "";

            }
            
            document.getElementById(`${this.position[0]}${this.position[1]}`).innerHTML = "";
            document.getElementById(`${id}`).innerHTML = `<img src="${this.url}">`;
            this.position = id
            this.possibleMovesAray = []
            if(take === true){White.deleteWhitePiece(id)}
            Piece.changeTurn()
            Piece.clearFilter()
            Black.updateBPosition()  
            if(this.role === 'pawn' && lastRowB.includes(id)){
                Black.newQueen(id)
            } 
            Black.drawOrWin()
            previousMove=this
        }
        else{
            return
        }
    }
}
