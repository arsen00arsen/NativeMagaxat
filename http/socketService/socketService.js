import Echo from 'laravel-echo';
import io from 'socket.io-client';

window.io = io;

export function createSocketConnection() {
  if (!window.Echo) {
    window.Echo = new Echo({
      // broadcaster: 'socket.io',
      // key: '123456', // hard code
      // // host: '192.168.0.124',
      // //http://192.168.0.124
      // // wssHost: 'ws://192.168.0.112:6001',
      // // enabledTransports: ['ws', 'wss'],
      // // wssPort: 6001,
      // client: io,
      // // forceTLS: true,
      // // disableStats: true,
      // broadcaster: 'pusher',
      cluster: 'mt1',
      disableStats: true,
      enabledTransports: Array.ws,
      encrypted: true,
      forceTLS: false,
      key: '123456',
      wsHost: '192.168.0.124',
      wsPort: '6001',
    });
  }
}
