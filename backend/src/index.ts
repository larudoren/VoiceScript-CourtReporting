import express from 'express';
import cors from 'cors';
import jobRoutes from './routes/jobs';
import reporterRoutes from './routes/reporters';
import editorRoutes from './routes/editors';

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use(express.json());

app.use('/api/jobs', jobRoutes);
app.use('/api/reporters', reporterRoutes);
app.use('/api/editors', editorRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});