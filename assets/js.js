const socket = io()
let currentPieceNumber
let currentPiece 
let previousMove

const pawn1 = new WPawn("87")
const pawn2 = new WPawn("77")
const pawn3 = new WPawn("67")
const pawn4 = new WPawn("57")
const pawn5 = new WPawn("47")
const pawn6 = new WPawn("37")
const pawn7 = new WPawn("27")
const pawn8 = new WPawn("17")

const pawn9 = new BPawn("82")
const pawn10 = new BPawn("72")
const pawn11 = new BPawn("62")
const pawn12 = new BPawn("52")
const pawn13 = new BPawn("42")
const pawn14 = new BPawn("32")
const pawn15 = new BPawn("22")
const pawn16 = new BPawn("12")

const knight1 = new WKnight('28')
const knight2 = new WKnight('78')

const knight3 = new BKnight('21')
const knight4 = new BKnight('71')

const king1 = new WKing('58')

const king2 = new BKing('51')

const bishop1 = new WBishop('38')
const bishop2 = new WBishop('68')

const bishop3 = new BBishop('31')
const bishop4 = new BBishop('61')

const rook1 = new WRook('18')
const rook2 = new WRook('88')

const rook3 = new BRook('11')
const rook4 = new BRook('81')

const queen1 = new WQueen('48')

const queen2 = new BQueen('41')



const selectPieceOrMove = (event) =>{
    if(event.target.tagName === 'IMG'){
        if(currentPiece !=undefined && currentPiece.possibleMovesAray.includes(`${event.target.parentNode.id}`)){
            socket.emit("move", {
                whichTurn:whichTurn,
                take:true,
                number:currentPieceNumber,
                possibleMovesAray:currentPiece.possibleMovesAray,
                currentPiece:currentPiece,
                move:event.target.parentNode.id
            })
        }
        else{
            selectPiece(event)}
    }
    else if(currentPiece !=undefined){
        movePiece(event)
        Piece.clearFilter()
    }
}


const selectPiece = (event) =>{
    Piece.clearFilter()
    for(i=0;i<myPieceInstance.length;i++){
        if(myPieceInstance[i].position === event.target.parentNode.id){
            currentPiece = myPieceInstance[i]
            currentPieceNumber = i
        }
    }
    if(currentPiece.color === whichTurn){
    currentPiece.possibleMovesAray = []
    currentPiece.possibleMoves()
    }
}

const movePiece = (event)=>{
    socket.emit("move", {
        whichTurn:whichTurn,
        number:currentPieceNumber,
        possibleMovesAray:currentPiece.possibleMovesAray,
        currentPiece:currentPiece,
        move:event.srcElement.id
    })
}


outer.addEventListener('click', selectPieceOrMove);





socket.on("move",(data)=>{
    currentPiece = myPieceInstance[data.number]
    currentPiece.possibleMovesAray = data.possibleMovesAray
    if(data.take){
        console.log(movesHistory)
        currentPiece.move(data.move,true)
    }
    else{
        console.log(movesHistory)
        currentPiece.move(data.move)
    }
    currentPiece = undefined
})

socket.on("reloadPage",()=>{ 
    document.location.reload()
})

socket.on("win",(data)=>{ 
    if(data === "draw"){
        alert("DRAW")
    }
    else{
        alert(`${data} win`)
    }
})

socket.on("change board",()=>{
    addCSS("img{ transform : rotate(180deg);}")
        addCSS("#board{ transform : rotate(180deg);}")
        addCSS(".playerDesk{ text-align: right;}")
})












//rotate board
const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML=css;
document.getElementById('rotateButton').addEventListener('click', ()=>{changeBoard()})
let counterBoard=0
function changeBoard(){
    if(counterBoard===1){
        addCSS("img{ transform : rotate(180deg);}")
        addCSS("#board{ transform : rotate(180deg);}")
        addCSS(".playerDesk{ text-align: right;}")
        counterBoard = 0
    }
    else{
        addCSS("img{ transform : rotate(0deg);}")
        addCSS("#board{ transform : rotate(0deg);}")
        addCSS(".playerDesk{ text-align: left;}")
        counterBoard = 1
    }
}
socket.on("change board",()=>{
    addCSS("img{ transform : rotate(180deg);}")
    addCSS("#board{ transform : rotate(180deg);}")
    addCSS(".playerDesk{ text-align: right;}")
})