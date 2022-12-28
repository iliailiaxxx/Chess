const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const PORT = process.env.PORT ||3000
let user1 = undefined
let user2 = undefined

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.use(express.static(__dirname+"/assets"))

io.on('connection', (socket)=>{
    if(user1 === undefined){
        user1 = socket.id
    }
    else if(user1!==undefined){ 
        user2 = socket.id
        socket.emit('change board')
    }    


    socket.on('disconnect',()=>{
        user1 = undefined
        user2 = undefined
        io.emit('reloadPage')
    })

    socket.on('win',(data)=>{
        io.emit('win',data)
    })
    

    socket.on("move",(data)=>{
        
        if(data.whichTurn === 'white' && socket.id === user1){
            io.emit('move', {
                take:data.take,
                number:data.number,
                possibleMovesAray:data.possibleMovesAray,
                currentPiece:data.currentPiece,
                move:data.move
            })
        }

        if(data.whichTurn === 'black' && socket.id === user2){
            io.emit('move', {
                take:data.take,
                number:data.number,
                possibleMovesAray:data.possibleMovesAray,
                currentPiece:data.currentPiece,
                move:data.move
            })
        }
    })
})


http.listen(PORT,()=>{
})

