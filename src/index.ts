import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import dns from 'node:dns';
import userRoutes from './routes/user.routes';
import conferenceRoomRoutes from './routes/conferenceRoom.routes';
import carRoutes from './routes/car.routes';
import officeDeskRoutes from './routes/officeDesk.routes';
import equipmentRoutes from './routes/equipment.routes';
import reservationRoutes from './routes/reservation.routes';
import { ENV } from './config/env';
import { startEmailJobs } from './utils/reminder';

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
const PORT = ENV.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/rooms", conferenceRoomRoutes);
app.use("/cars", carRoutes);
app.use("/desks", officeDeskRoutes);
app.use("/equipment", equipmentRoutes);
app.use("/reservations", reservationRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
  startEmailJobs();
});