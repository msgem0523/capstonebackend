import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;




// mongoose
//     .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.log(err));


// Start server
app.listen(5000, () => console.log('Server running on port 5000'));