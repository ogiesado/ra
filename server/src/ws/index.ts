import { IncomingMessage } from 'http';
import { Socket } from 'net';
import ws from 'ws';

const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', (socket) => {
  socket.send(JSON.stringify({ message: 'SUCCESS' }));
});

/**
 * Upgrades only ws connections at /rates
 */
export const upgradeWebSocketConnection = (
  request: IncomingMessage,
  socket: Socket,
  head: Buffer
) => {
  if (request.url === '/rates') {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit('connection', socket, request);
    });
  }
};

/**
 * Sends the rates to all clients
 * @param data The rates
 */
export const websocketBroadcast = (data: any) => {
  wsServer.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
