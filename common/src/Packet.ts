export enum PacketType {
  ACTION,
  EVENT
}

export interface RawPacket {
  type: PacketType;
  token?: string;
  data?: any;
}

export interface Packet<T> extends RawPacket {
  data?: T;
}
