import Echo from 'laravel-echo';
import io from 'socket.io-client';

window.io = io;

export function createSocketConnection() {
  if (!window.Echo) {
    window.echo = new Echo({
      broadcaster: 'socket.io',
      // key: '123456', // hard code
      host: 'ws://192.168.0.112:6001',
      // wssHost: 'ws://192.168.0.112:6001',
      // enabledTransports: ['ws', 'wss'],
      // wssPort: 6001,
      client: io,
      // forceTLS: true,
      // disableStats: true,
    });
  }
}
