const mongoose=require('mongoose');

require('dotenv').config();
exports.connect=()=>{

    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("DB connection established")})
    .catch((error)=>{

        console.log("DB connection issue");
        console.error(error);
        process.exit(1);
    })
}