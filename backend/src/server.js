import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import { connectDB } from '../config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
dotenv.config();

const app = express();
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173' }));
}

app.use('/api/task', taskRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

connectDB().then(() => {
  app.listen(5001, () => {
    console.log('Khoi tao server thanh cong');
  });
});
