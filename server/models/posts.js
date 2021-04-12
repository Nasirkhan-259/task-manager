let mongoose = require('mongoose');

let posts = new mongoose.Schema({
    title: {
        type: String
    },
},{ timestamps: true });

module.exports = mongoose.model('posts', posts);