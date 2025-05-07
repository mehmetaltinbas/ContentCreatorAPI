import mongoose from 'mongoose';

interface UserDocument extends mongoose.Document {
    userName: string;
    passwordHash: string;
}

const UserSchema: mongoose.Schema<UserDocument> = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

export default User;
