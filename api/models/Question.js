const mongoose = require('mongoose');
const uuid = require('uuid-random');

const QuestionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ID: { type: Number, default:0, unique :true},
    Uuid: { type: String, default:uuid() , unique :true },
    question: { type: String, required: true },
    CreatedAt: {type:Date, default: Date.now() },//new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') },
    CreatedBy:{ type: mongoose.Schema.Types.ObjectId, required: true,ref:'User' },
    UpdatedAt: { type: Date, default:null },
    UpdatedBy: { type: mongoose.Schema.Types.ObjectId, default:null,ref:'User'  },
    IsActive: { type: Boolean, default:true },
});

module.exports = mongoose.model('Question', QuestionSchema);