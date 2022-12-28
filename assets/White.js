let whitePieceInstance = []
let whitePieceInstancePosition = []
let lastRow = ['11','21','31','41','51','61','71','81']
let regex = /^[1-8][1-8]$/
function plus(a,b){
    return a + b
}
function minus(a,b){
    return a - b
}
function stay(a,b){
    return a 
}

class White extends Piece{
    constructor(position){
        super(position)
        this.color = 'white'
        whitePieceInstance.push(this)
        whitePieceInstancePosition.push(this.position)
    }
    static updateWPosition(){
        whitePieceInstancePosition = []
        for(i=0;i<whitePieceInstance.length;i++){
            whitePieceInstancePosition.push(whitePieceInstance[i].position)
        }
        Piece.updatePosition()
    }
    static deleteWhitePiece(id){
        Piece.deletePiece(whitePieceInstance[whitePieceInstancePosition.indexOf(id)])
        document.getElementById("blackDesk").innerHTML += `<img src="${whitePieceInstance[whitePieceInstancePosition.indexOf(id)].url}" style="width:30px">`
        whitePieceInstance[whitePieceInstancePosition.indexOf(id)] = ''
        whitePieceInstancePosition[whitePieceInstancePosition.indexOf(id)] = ''
        White.updateWPosition()
    }
    static newQueen(id){
        //delete piece without moving to payers board
        Piece.deletePiece(whitePieceInstance[whitePieceInstancePosition.indexOf(id)])
        whitePieceInstance[whitePieceInstancePosition.indexOf(id)] = ''
        whitePieceInstancePosition[whitePieceInstancePosition.indexOf(id)] = ''
        White.updateWPosition()

        new WQueen(id)
        document.getElementById(`${id}`).innerHTML = `<img src="${queen1.url}">`;
        White.updateWPosition()
    }
    static drawOrWin(){
        let drawCounter = 0
        for(let k=0;k<blackPieceInstance.length;k++){
            if(typeof blackPieceInstance[k] === 'object'){
                blackPieceInstance[k].possibleMoves()
                if(blackPieceInstance[k].possibleMovesAray.length > 0){
                    drawCounter++
                    blackPieceInstance[k].possibleMovesAray = []
                    break
                }
                blackPieceInstance[k].possibleMovesAray = []
            }
        }
        if(drawCounter===0){
            king2.isChecked()
            if(king2.isCheck === true){
                socket.emit('win',"white")
            }
            if(king2.isCheck === false){
                socket.emit('win',"draw")
            }
        }
        Piece.clearFilter()
    }

    longMove(func1,func2){
        for(let i=1;i<8;i++){
            if (whitePieceInstancePosition.includes(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`)) { 
                break 
            }
            else if (blackPieceInstancePosition.includes(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`)) { 
                if(whichTurn ==='white'){
                let oldMove = this.position
                this.position = `${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`
                White.updateWPosition()
                king1.isChecked(`${parseInt(this.position[0])}${parseInt(this.position[1])}`)
                this.position = oldMove
                White.updateWPosition()
                if(king1.isCheck != true){
                    this.possibleMovesAray.push(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`)
                    break
                }
                }
                else{
                    this.possibleMovesAray.push(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`)
                    break
                }
            }
            else if(whitePieceInstancePosition.includes(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`) === false){
                if(whichTurn ==='white'){
                    let oldMove = this.position
                    this.position = `${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`
                    White.updateWPosition()
                    king1.isChecked()
                    this.position = oldMove
                    White.updateWPosition()
                    if(king1.isCheck === true){
                        continue
                    }
                    if(regex.test(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`)===false){
                        break
                    }
                    this.possibleMovesAray.push(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`)
                }
                else{
                    if(regex.test(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`)===false){
                        break
                    }
                    this.possibleMovesAray.push(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`)
                }
            }
        }
    }
    moveDiagonal(){
        this.longMove(minus,minus)
        this.longMove(plus,minus)
        this.longMove(minus,plus)
        this.longMove(plus,plus)
    }
    moveVertical(){
        this.longMove(stay,minus)
        this.longMove(plus,stay)
        this.longMove(stay,plus)
        this.longMove(minus,stay)
    }
    move(id, take){
        if(this.possibleMovesAray.includes(id)){
            this.firstMove = false
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