let myPieceInstance = []
let myPieceInstancePosition = []
let whichTurn = 'white'
var sheet = window.document.styleSheets[0];
let movesHistory = []

class Piece{
    constructor(position){
        this.url = ''
        this.position = position
        this.possibleMovesAray = []
        this.firstMove = true
        this.secondMove = false
        myPieceInstance.push(this)
        myPieceInstancePosition.push(this.position)
    }
    static changeTurn(){
        if(whichTurn==='white'){
            whichTurn = 'black'
        }
        else if(whichTurn==='black'){
            whichTurn = 'white'
        }
    }
    static clearFilter(){
        document.body.querySelectorAll('div').forEach(e => e.style.filter = `none`);
    }
    static updatePosition(){
        myPieceInstancePosition = []
        for(i=0;i<myPieceInstance.length;i++){
            myPieceInstancePosition.push(myPieceInstance[i].position)
        }
    }
    static deletePiece(obj){
        myPieceInstance[myPieceInstance.indexOf(obj)] = ''
        myPieceInstancePosition[myPieceInstance.indexOf(obj.position)] = ''
        obj.position = ''
        Piece.updatePosition()
    }

    static clearField(){
        for(let i=1;i<9;i++){
            for(let k=1;k<9;k++){
                document.getElementById(`${i}${k}`).innerHTML = "";
            }
        }
    }
    static saveMoves(){
        movesHistory.push(myPieceInstance)
        {myPieceInstance,whichTurn,previousMove}
    }
    static takeMoveBack(){
        Piece.clearField()
        let previousInstanceArray = movesHistory[movesHistory.length-1].myPieceInstance
        whichTurn = movesHistory[movesHistory.length-1].whichTurn
        previousMove = movesHistory[movesHistory.length-1].previousMove


        movesHistory.legth = movesHistory[movesHistory.length-1]
        for(let i=0;i<previousInstanceArray.length;i++){
            myPieceInstance[i] = previousInstanceArray[i]
        }
    
    }
    
    renderPossibleMoves(){
        if(this.position!=''){
            try{
                document.getElementById(`${this.position}`).style.filter = `hue-rotate(90deg)`
            }
            catch{}
            for(i=0;i<this.possibleMovesAray.length;i++){
                try{
                    document.getElementById(`${this.possibleMovesAray[i]}`).style.filter = `hue-rotate(90deg)`
                }
                catch{}
            }
        }
    }
}


