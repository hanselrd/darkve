import { Packet, PacketType } from './Packet';

export enum SocketType {
  SERVER,
  CLIENT
}

export interface OnRecvListener<T> {
  (packet: Packet<T>): any;
}

export class PacketHandler<T> {
  constructor(
    private socket: SocketIO.Socket | SocketIOClient.Socket,
    public type: SocketType = SocketType.SERVER
  ) {}

  onrecv(listener: OnRecvListener<T>) {
    if (this.type === SocketType.SERVER) {
      return (<SocketIO.Socket>this.socket).on('darkve', listener);
    } else if (this.type === SocketType.CLIENT) {
      return (<SocketIOClient.Socket>this.socket).on('darkve', listener);
    }
  }

  send(packet: Packet<T>) {
    if (this.type === SocketType.SERVER) {
      return (<SocketIO.Socket>this.socket).emit('darkve', packet);
    } else if (this.type === SocketType.CLIENT) {
      return (<SocketIOClient.Socket>this.socket).emit('darkve', packet);
    }
  }
}
