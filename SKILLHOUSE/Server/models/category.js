const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }],
    description: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);