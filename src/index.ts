import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import dns from 'node:dns';
import userRoutes from './routes/user.routes';
import conferenceRoomRoutes from './routes/conferenceRoom.routes';

dns.setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes)
app.use('/rooms', conferenceRoomRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});