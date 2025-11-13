import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import { connectDB } from '../config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/task', taskRoutes);

connectDB().then(() => {
  app.listen(5001, () => {
    console.log('Khoi tao server thanh cong');
  });
});
