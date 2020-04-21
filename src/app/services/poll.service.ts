import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from '../entities/message';


@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(
    private socket: Socket
  ) { }

  sendMessage(text: string, name: string, roomId: string): void {
    this.socket.emit('message', {message: text, username: name, room: roomId});
  }

  public getMessage(): Observable<Message> {
    return this.socket.fromEvent<Message>('getMessage');
  }

  public joinRoom(roomId: string, name: string, role: string): void {
    this.socket.emit('joinRoom', {room: roomId, username: name, roles: role});
  }
}
