import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';


//export 안했기때문에 외부에서 사용할수없고 내부에서만 가능하다.
class Socket {
	constructor(server){
		this.io = new Server(server, {
			cors: {
				origin: '*',
			},
		});
		//검증 부분
		this.io.use((socket, next)=> {
			const token = socket.handshake.auth.token;
			if (!token){
				return next(new Error('Authentication error'));
			}
			jwt.verify(token, config.jwt.secretKey, (error, decoded)=> {
				if (error){
					return next(new Error('Authentication error'));
				}
				next();
			});
		});

		this.io.on('connection', (socket)=> {
			console.log('Socket client connected');
		});
	}
}

let socket;
export function initSocket(server){
	if(!socket){
		socket = new Socket(server);
	}
}
export function getSocketIO(){
	if(!socket){
		throw new Error('pleas call init first');
	}
	return socket.io;
}
