const mongoose = require("mongoose")

const connectDB = async () => {

    await mongoose.connect(
        "mongodb+srv://jagadeeshsetlem2424:YGiVwjHiHuFAtdrQ@namastenode.niyfwyr.mongodb.net/devTinder"
    )

}

module.exports = connectDB