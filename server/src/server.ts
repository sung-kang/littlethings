import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import router from './modules';
import config from './utils/config';
import migrateDatabase from './db/migrate';
import { pool } from './db';
import { Server } from 'http';
import customErrorMiddleware from './errors/customErrorMiddleware';

let server: Server | null = null;

const startServer = async () => {
  const app = express();

  // middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // API main router
  app.use('/api/v1', router);

  if (config.ENV === 'production') {
    app.use(
      '/client',
      express.static(path.join(__dirname, '../../client/dist'))
    );

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  // 404 not found
  // app.all('*', (req: Request, res: Response, next: NextFunction) => {
  // next(new NotFoundError(`Cannot find ${req.originalUrl}`));
  // });

  await migrateDatabase();

  // custom error middleware
  app.use(customErrorMiddleware);

  server = app.listen(config.PORT as number, config.HOSTNAME, () => {
    console.log(
      `🟢 Server running at http://${config.HOSTNAME}:${config.PORT} 🟢`
    );
  });
};

const stopServer = async (signal: string): Promise<void> => {
  console.log(`🟢 Received ${signal} signal to start graceful shutdown 🟢`);

  if (server) {
    try {
      await pool.end();
      server.close();
      server = null;
      console.log('🟢 Server has been gracefully stopped 🟢');
      if (config.ENV !== 'test') {
        process.exit(0);
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('🔴 No server is running at the moment 🔴');
  }
};

export { startServer, stopServer };
