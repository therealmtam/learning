import { createContext } from 'react';
import io from 'socket.io';

export const socket = io();
export const SocketContext = createContext();