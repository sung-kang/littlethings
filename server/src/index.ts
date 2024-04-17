import { startServer, stopServer } from './server';

startServer().catch((error) => console.error(error));

// graceful server shutdowns
['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGBREAK'].forEach((signal) => {
  process.on(signal, async () => {
    try {
      await stopServer(signal);
    } catch (error) {
      console.error(error);
    }
  });
});
