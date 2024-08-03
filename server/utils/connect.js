const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connect to database successfully');
    } catch (error) {
        console.log('Connect to database failure');
    }
}

module.exports = connect;