const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

exports.connect = () => {
    mongoose.connect(MONGO_URI)
        .then((conn) => {
            console.log(`DB Connected: ${conn.connection.host}`);
        })
        .catch((err) => {
            console.log(err.message);
            console.log("DB Connection failed");
            process.exit(1);
        })
}