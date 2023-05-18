import { Schema, Types, model } from "mongoose";

const jobSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Company name is required']
    },
    position: {
        type: String,
        required: [true, 'Job position is required'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending'
    },
    workType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract'],
        default: 'full-time'
    },
    workLocation: {
        type: String,
        default: 'Gazipur',
        required: [true, 'Work location is required']
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

export default model('Job', jobSchema)