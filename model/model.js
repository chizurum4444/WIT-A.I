const mongoose = require('mongoose');

// Connect to our local DB:portnumber/database-name
mongoose.connect('localhost:5500/project');

// Alias (neater varname to work with)
let Schema = mongoose.Schema;

// Create Schema instance for users collection. 
// This will be for users of the system
let userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {type: String,
        unique: true,
        index: true},
    email: String,
    hashPassword: {type: String,
        unique: true,
        index: true}
}, {
    collection: 'users'
});

module.exports.User = mongoose.model('user', userSchema);

