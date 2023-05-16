import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors'
import path from 'path'
import { router } from './routes'

const app = express();
const server = http.createServer(app)
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

app.use(express.json());
app.use(cors())

app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        //Se for uma instancia do tipo ERROR(c for do tipo erro)
        return res.status(400).json({
            error:err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'internal server error.'
    })
})

server.listen(3333,()=> console.log("Servidor Online! -> http://localhost:3333"));

io.on('connection', (socket) => {
    console.log('Novo cliente conectado!', socket.id);
    socket.on('message', ()=>{
        console.log("recebeu message");
        
        socket.broadcast.emit('refresh');
        console.log("enviou mensagem refresh");
        
    })
    socket.on("disconnect", (x)=>{
        console.log(socket.id, "desconectado");
    })
});



