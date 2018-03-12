import { Packet, PacketType } from './Packet';

export interface OnRecvListener<T> {
  (packet: Packet<T>): any;
}

export class PacketHandler<T> {
  constructor(
    private server?: SocketIO.Socket,
    private client?: SocketIOClient.Socket
  ) {}

  onrecv(listener: OnRecvListener<T>) {
    if (this.server) {
      return this.server.on('darkve', listener);
    } else if (this.client) {
      return this.client.on('darkve', listener);
    }
  }

  send(packet: Packet<T>) {
    if (this.server) {
      return this.server.emit('darkve', packet);
    } else if (this.client) {
      return this.client.emit('darkve', packet);
    }
  }
}
