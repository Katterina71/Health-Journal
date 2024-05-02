import mongoose from "mongoose";

//connect ot MongoDB
const dbURI = 'mongodb+srv://beviatori:i5VL7U26Z3NzZDEy@healthlog.broafjs.mongodb.net/?retryWrites=true&w=majority&appName=HealthLog'
mongoose.connect(dbURI, {userNewUrlParser:true, userUnifiedTopology:true})
    .then((result)=> console.log('connect to db'))
    .catch((err) => console.log(err));

