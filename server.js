import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI); // Add this line to debug

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
