const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorySchema = new Schema({
    name: String,
    address: String,
    owner: String,
    projectManager: String,
    subcontractors: [
        {
        plumber: String,
    },
    { 
        electrical: String,
    },
    {
        mechanical: String,
    }
],

startingDate: Date,
endingDate: Date,
estimate: String,
collectedAmount: String,
changeOrder: String,
architect: String

});

module.exports = mongoose.model('Directory', directorySchema);