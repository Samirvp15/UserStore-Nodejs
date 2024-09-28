import mongoose from "mongoose";



const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Nme is required!!']
    },
    email: {
        type: String,
        required: [true, 'Nme is required!!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    },
    img: {
        type: String,
    },
    role: {
        type: [String],
        enum: ['ADMIN_ROLE','USER_ROLE'],
        default: ['USER_ROLE']
    },
});

export const UserModel = mongoose.model('User', userSchema);