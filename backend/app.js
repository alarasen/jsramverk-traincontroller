import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import trainsModel from './models/trains.js';
import delayed from './routes/delayed.js';
import tickets from './routes/tickets.js';
import codes from './routes/codes.js';
import trains from './routes/trains.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app); // Create the HTTP server instance

app.use(cors());
app.options('*', cors());

// For logging, uses morgan when not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const io = new Server (httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const port = process.env.PORT || 1337;
// const port = 1337;

app.get('/', (req, res) => {
  res.json({
    data: 'This is the API for the course jsramverk, by students glpa22 and haco22'
  });
});

app.use('/delayed', delayed);
app.use('/tickets', tickets);
app.use('/codes', codes);
app.use('/trains', trains);

// Used for moving trains
trainsModel.fetchTrainPositions(io);

// For 404-errors when accessing a route that doesn't exist
app.use((req, res, next) => {
  const err = new Error("Not Found");

  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
      return next(err);
  }

  res.status(err.status || 500).json({
      "errors": [
          {
              "status": err.status,
              "title":  err.message,
              "detail": err.message
          }
      ]
  });
});

// Start server
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default httpServer;
