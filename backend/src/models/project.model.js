const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: [{
        type: String,
        required: true
    }],
    images: [{
        type: String,
        required: true
    }],
    githubUrl: String,
    liveUrl: String,
    featured: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'desktop', 'other'],
        required: true
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; 