const mongoose = require("mongoose");

async function connectToDB(){
    try{
       await mongoose.connect(process.env.MONGO_URI)

       console.log("Connected To MongoDB ✅")
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports = connectToDB