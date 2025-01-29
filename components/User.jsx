import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Child' }],
    }
);

const User = mongoose.model('User', userSchema);
export default User;