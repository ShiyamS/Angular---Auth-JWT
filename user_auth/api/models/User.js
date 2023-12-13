import mongoose, { Schema } from "mongoose";


const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profileImage: {
            type: String,
            required: false,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQezTJNezTs00LEX4uen9LhodNnE-cwv8iCsuEIOTcEjTfVRoa2u4Qi8bVPtPO2IgKnZC4&usqp=CAU'
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        roles: {
            types: [Schema.Types.ObjectId],
            requied: true,
            ref: 'Role'
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', UserSchema);