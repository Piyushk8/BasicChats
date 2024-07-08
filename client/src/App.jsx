import React, { useEffect, useMemo, useState } from 'react'
import {io} from "socket.io-client"
import {Button,Box,Container, Stack, TextField, Typography} from "@mui/material"

function App() {
  const [messages, setmessages] = useState([])
  const [room, setroom] = useState("")
  const [message, setmessage] = useState("")
  const [socketId, setsocketId] = useState("")
const [roomName, setroomName] = useState("")
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const joinRoomHandler = (e)=>{
    e.preventDefault();
    socket.emit("join-room" , roomName)
    setroomName("");
}
  //all socket events
  useEffect(() => {

    socket.on('connect', () => {
      setsocketId(socket.id)
      console.log(`Connected to server with ID: ${socket.id}`);
    });

    socket.on("receive-message", (data) => {
      console.log(data)
      setmessages((prevItems) => [...prevItems, data]);
      console.log(messages);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    // Clean up the connection when the component unmounts
    return () => { socket.disconnect(); };
  }, [socket]);

const handleSubmit= (e)=>{
e.preventDefault();
socket.emit("message",{message,room})
setmessage("");
}
  return (
    <>
   <Container maxWidth="sm">
    <Box sx={{height : 200}}></Box>
    <Typography >

    User ID:{socket.id}
    </Typography>

    <form onSubmit={joinRoomHandler}>
    <h5>
      Group Name
    </h5>
    <TextField value={roomName} onChange={(e)=>setroomName(e.target.value)} id="outlined-basic" label="Group name" variant='outlined' />
    <Button type='submit' variant='container' color="blue">
      join
    </Button>
    </form>

    <form onSubmit={handleSubmit}> 
    <TextField value={room} onChange={(e)=>setroom(e.target.value)} id="outlined-basic" label="ReceiverID" variant='outlined' />
   <TextField value={message} onChange={(e)=>setmessage(e.target.value)} id="outlined-basic" label="Message" variant='outlined' />
    <Button type='submit' variant='container' color="primary">
      Send
    </Button>
   

    </form>

    <Stack>
  {messages.map((m, i) => (
    <Typography key={i} variant='h6' component="div">
      {m}
    </Typography>
  ))}
</Stack>

   </Container>
    </>
  )
}

export default App
