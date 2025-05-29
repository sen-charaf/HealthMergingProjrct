import mongoose from 'mongoose';

const healthConditionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        enum: ['Common Health Issues', 'Chronic Conditions', 'Mental Health', 'Specialized Care'],
        required: true
    },
    icon: String,
    specialties: [String]
});

export default mongoose.models.HealthCondition ||
mongoose.model('HealthCondition', healthConditionSchema);