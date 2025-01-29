import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema(
    {
        childId: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
        date: { type: Date, required: true },
        category:{
            type: String,
            enum:['Physical', 'Cognitive', 'Social', 'Emotional', 'Language'], 
            required: true },
        description: { type: String, required: true },
    }
);

export default mongoose.model('Milestone', milestoneSchema);