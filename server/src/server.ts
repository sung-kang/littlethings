import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { Server } from 'http';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import router from './modules';
import config from './utils/config';
import migrateDatabase from './db/migrate';
import { pool } from './db';
import customErrorMiddleware from './errors/customErrorMiddleware';
import { NotFoundError } from './errors';

let server: Server | null = null;

const startServer = async () => {
  const app = express();

  // middlewares
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // 100 requests per 15 minutes
      standardHeaders: true,
      legacyHeaders: false,
      message: `Too many requests from this IP, please try again after 10 minutes`,
    })
  );
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const pgSession = connectPgSimple(session);
  app.use(
    session({
      store: new pgSession({
        pool: pool,
        createTableIfMissing: true,
      }),
      name: 'littlethings_sid',
      secret: config.SESSION_SECRET_KEY as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: config.ENV === 'production',
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      },
    })
  );

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
  app.all('*', (req: Request, _res: Response, next: NextFunction) => {
    next(new NotFoundError(`Cannot find ${req.originalUrl}`));
  });

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
