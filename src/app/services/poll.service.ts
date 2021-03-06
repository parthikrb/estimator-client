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

  public sendMessage(text: string, name: string, roomId: string): void {
    this.socket.emit('message', { message: text, username: name, room: roomId });
  }

  public sendVote(text: number): void {
    this.socket.emit('vote', { vote: text });
  }

  public getMessage(): Observable<any> {
    return this.socket.fromEvent<any>('message');
  }

  public receiveVote(): Observable<any> {
    return this.socket.fromEvent<any>('collectVotes');
  }

  public joinRoom(roomId: string, name: string, role: string): void {
    this.socket.emit('joinRoom', { room: roomId, username: name, roles: role });
  }

  public getRoomUsers(): Observable<any> {
    console.log('testing');
    return this.socket.fromEvent<any>('roomUsers');
  }

}
