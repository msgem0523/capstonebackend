import mongoose from 'mongoose';

const childSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthdate: { type: Date, required: true },
        gender: { type: String, enum:['Male', 'Female', 'Other'], required: true },
        medicalRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' }],
        milestones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }],
        parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
);

export default mongoose.model('Child', childSchema);