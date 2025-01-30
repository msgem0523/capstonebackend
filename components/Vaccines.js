import mongoose from 'mongoose';

const vaccineSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    ageGroup: {
        type: String,
        enum: ['Birth', '1-2 months', '4 months', '6 months', '12-15 months', '15-18 months', '4-6 years', '11-12 years'],
        required: true,
    },
    description: { type: String },
});

const Vaccine = mongoose.model('Vaccine', vaccineSchema);
export default Vaccine;