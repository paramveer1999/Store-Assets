const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    subCategory : {
        type: String,
    },
    link:{
        type: String,
        required: true
    },
    frameWork : [{
        type: String,
    }]
},
{
    timestamps: true
}); 

module.exports = mongoose.model('Asset',assetSchema)