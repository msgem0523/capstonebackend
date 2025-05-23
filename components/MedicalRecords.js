import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema(
    {
        childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Child'},
        date: { type: Date, required: true },
        location: { type: String, enum: ['Doctor Office', 'Hospital', 'Home'], required: true },
        height: { type: Number, required: true }, // in inches
        weight: { type: Number, required: true }, // in pounds
        headCircumference: { type: Number}, // in centimeters
        notes: { type: String },
    }
);

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;