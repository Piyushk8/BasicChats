import express from "express"
import { Server } from "socket.io";
// import { Socket } from "socket.io-client";
import {createServer} from "http";



const app =express();

const server  = createServer(app)
const io = new Server(server,{
    cors:{
        origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}});

app.get("/",(req,res)=>[
    res.json( "hello!")
])

io.on("connection", (socket)=>{
    console.log("user connectec!");
    console.group("Id:" , socket.id)

    socket.on("disconnect",()=>{
        console.log(`${socket.id} disconencted`)
    })

    socket.on("message", ({message,room})=>{
       console.log({message,room})
        io.to(room).emit("receive-message" ,message);
        // socket.broadcast.emit(message ,room)
        console.log("backend message sent");
    })
    socket.on("join-room" , (room)=>{
        socket.join(room)
    })
})

server.listen(3000,()=>[
    console.log("server is listening at 3000")
])