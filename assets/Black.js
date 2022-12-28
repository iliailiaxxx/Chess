let blackPieceInstance = []
let blackPieceInstancePosition = []
let lastRowB = ['18','28','38','48','58','68','78','88']


class Black extends Piece{
    constructor(position){
        super(position)
        this.color = 'black'
        blackPieceInstance.push(this)
        blackPieceInstancePosition.push(this.position)
    }
    static updateBPosition(){
        blackPieceInstancePosition = []
        for(i=0;i<blackPieceInstance.length;i++){
            blackPieceInstancePosition.push(blackPieceInstance[i].position)
        }
        Piece.updatePosition()
    }
    static deleteBlackPiece(id){
        Piece.deletePiece(blackPieceInstance[blackPieceInstancePosition.indexOf(id)])
        document.getElementById("whiteDesk").innerHTML += `<img src="${blackPieceInstance[blackPieceInstancePosition.indexOf(id)].url}" style="width:30px">`
        blackPieceInstance[blackPieceInstancePosition.indexOf(id)] = ''
        blackPieceInstancePosition[blackPieceInstancePosition.indexOf(id)] = ''
        Black.updateBPosition()
    }
    static newQueen(id){
        //delete piece without moving to payers board
        Piece.deletePiece(blackPieceInstance[blackPieceInstancePosition.indexOf(id)])
        blackPieceInstance[blackPieceInstancePosition.indexOf(id)] = ''
        blackPieceInstancePosition[blackPieceInstancePosition.indexOf(id)] = ''
        Black.updateBPosition()

        new BQueen(id)
        document.getElementById(`${id}`).innerHTML = `<img src="${queen2.url}">`;
        Black.updateBPosition()
    }
    static drawOrWin(){
        let drawCounter = 0
        for(let k=0;k<whitePieceInstance.length;k++){
            if(typeof whitePieceInstance[k] === 'object'){
                whitePieceInstance[k].possibleMoves()
                if(whitePieceInstance[k].possibleMovesAray.length > 0){
                    drawCounter++
                    whitePieceInstance[k].possibleMovesAray = []
                    break
                }
                whitePieceInstance[k].possibleMovesAray = []
            }
        }
        if(drawCounter===0){
            king1.isChecked()
            if(king1.isCheck === true){
                socket.emit('win',"black")
            }
            if(king1.isCheck === false){
                socket.emit('win',"draw")
            }
        }
        Piece.clearFilter()
    }
    
    longMove(func1,func2){
        for(let i=1;i<8;i++){
            if (blackPieceInstancePosition.includes(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`)) { 
                break 
            }
            else if (whitePieceInstancePosition.includes(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`)) {
                if(whichTurn ==='black'){ 
                let oldMove = this.position
                this.position = `${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`
                Black.updateBPosition()
                king2.isChecked(`${parseInt(this.position[0])}${parseInt(this.position[1])}`)
                this.position = oldMove
                Black.updateBPosition()
                if(king2.isCheck != true){
                    this.possibleMovesAray.push(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`)
                    break
                }
                }
                else{
                    this.possibleMovesAray.push(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`)
                    break 
                }
            }
            else if(blackPieceInstancePosition.includes(`${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`) === false){
                if(whichTurn ==='black'){ 
                let oldMove = this.position
                this.position = `${func1(parseInt(this.position[0]),i)}${func2(parseInt(this.position[1]),i)}`
                Black.updateBPosition()
                king2.isChecked()
                this.position = oldMove
                Black.updateBPosition()
                if(king2.isCheck === true){
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