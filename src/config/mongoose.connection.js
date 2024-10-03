const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const dbgr = require('debug')("development:mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/bagMart`);
        dbgr("Connected with database");
    } catch (error) {
        dbgr('Failed to connect with database: ' + error);
    }
}

module.exports = connectToDatabase;