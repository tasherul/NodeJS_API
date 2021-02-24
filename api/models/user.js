const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    UserName: { type: String, required: true, unique :true },
    Password: { type: String, required: true },
    DateTime: {type:String, default: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') }
});

module.exports = mongoose.model('User', UserSchema);