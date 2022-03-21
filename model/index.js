const mongoose = require('mongoose');
const Directory = require('../model/directory');

mongoose.connect('mongodb://localhost:27017/projectsIB');

const directory = new Directory ({
    name: "40 East 88th Street, Apt3A",
    address: "40 East 88th Street, Apt3A",
    estimate:610.291,
    startingDate:18/10/2021,
    endingDate: 31/05/2022,
    collectedAmount: 612.694,
    changeOrder: 55.991
})


