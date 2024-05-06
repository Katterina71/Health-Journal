import express from 'express';
import 'dotenv/config';
import connectToDb from './db/conn.js';


const app = express();
const PORT = 3000;

connectToDb();


import users from "./routes/usersRoute.js";
import dailyHealth from "./routes/dailyHealthRoute.js";
import sleepLogs from "./routes/sleepLogsRoute.js";

app.use(express.json());

// Use our Routes
app.use("/api/users", users);
app.use("/api/dailyhealth", dailyHealth);
app.use("/api/sleeplogs", sleepLogs);


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

  
// Start the Express server
app.listen(PORT, () => {
console.log(`Server is running on port: ${PORT}`);
})