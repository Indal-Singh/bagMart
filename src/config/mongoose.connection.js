const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/bagMart", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected with database");
    } catch (error) {
        console.log('Failed to connect with database: ' + error);
    }
}

module.exports = connectToDatabase;