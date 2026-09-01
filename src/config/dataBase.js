const mongoose = require("mongoose")

const connectDB = async () => {

    await mongoose.connect(
        "mongodb+srv://jagadeeshsetlem2424:VetGTh7kPO5BKR7r@namastenode.niyfwyr.mongodb.net/devTinder"
    )

}

module.exports = connectDB


