const mongoose = require('mongoose');

const connectToDB = async (res,req) => {
    try {
        const mongoURL = "mongodb://127.0.0.1:27017/students-api";

        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });

        console.log("Connected to MongoDB");
    } catch (Err) {
        console.log("Error: ", Err);
    }
}

module.exports = connectToDB;