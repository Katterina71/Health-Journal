const express =  require ('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');

//connect ot MongoDB
const dbURI = 'mongodb+srv://beviatori:i5VL7U26Z3NzZDEy@healthlog.broafjs.mongodb.net/healthLog?retryWrites=true&w=majority&appName=HealthLog'
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then((result)=> 
        // Start the Express server
        app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
        })
    )
    .catch((err) => console.log(err));

const users = require("./routes/usersRoute.js");
const dailyHealth =require("./routes/dailyHealthRoute.js");
const sleepLogs =require("./routes/SleepLogsRoute.js");

// Use our Routes
app.use("/api/users", users);
app.use("/api/dailyHealth", dailyHealth);
app.use("/api/sleepLogs", sleepLogs);


// Global error handling
app.use((err, req, res, next) => {
    console.error(err);  

    if (res.headersSent) {
        return next(err);
    }

    res.status(500); 

    if (app.get('env') === 'development') {
        res.send(`Error: ${err.message}`);
    } else {
        res.send("Seems like we messed up somewhere...");
    }
});
  
