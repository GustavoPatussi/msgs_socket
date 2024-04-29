import {Server} from 'socket.io';
import Http from 'http';
import express from 'express';
import path from 'path';
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
const server = Http.createServer(app);
const io = new Server(server);


let mesages: string[] = []
io.on('connection', (Client) => {
    console.log('a user connected');
    io.emit("mensagens", mesages);
    Client.on('disconnect', () => {
        console.log('user disconnected');
    })
    Client.on('message', msg =>{
        mesages.push(msg)
        io.emit("mensagens", mesages);
    })
    
})
const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
    console.log('server listening on port ' + PORT);
})