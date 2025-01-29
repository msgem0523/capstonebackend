import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Child' }],
    }
);

// const milestoneSchema = new mongoose.Schema(
//     {
//         childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
//         date: { type: Date, required: true },
//         category:{
//             type: String,
//             enum:['Physical', 'Cognitive', 'Social', 'Emotional', 'Language'], 
//             required: true },
//         description: { type: String, required: true },
//     }
// );

// const medicalRecordSchema = new mongoose.Schema(
//     {
//         childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
//         date: { type: Date, required: true },
//         location: { type: String, enum: ['Doctor Office', 'Hospital', 'Home'], required: true },
//         height: { type: Number, required: true }, // in inches
//         weight: { type: Number, required: true }, // in pounds
//         headCircumference: { type: Number, required: true }, // in inches
//         vaccines: { type: mongoose.Schema.Types.ObjectId, ref: 'Vaccines', required: true }, // comma separated list of vaccines
//         notes: { type: String, required: true },
//     }
// );

// const childSchema = new mongoose.Schema(
//     {
//         firstName: { type: String, required: true },
//         lastName: { type: String, required: true },
//         birthdate: { type: Date, required: true },
//         gender: { type: String, enum:['Male', 'Female', 'Other'], required: true },
//         medicalRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' }],
//         milestones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }],
//         parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     }
// );

// mongoose
//     .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.log(err));

export default mongoose.model('User', userSchema);
// export const Milestone = mongoose.model('Milestone', milestoneSchema);
// export const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
// export const Child = mongoose.model('Child', childSchema);