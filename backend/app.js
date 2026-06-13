import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Mount
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('Ms Saodat Online Clothing Store API Server is Running...');
});

export default app;
