const express =  require ('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
const Users = require('./model/users')
const SleepLogs = require('./model/sleepLogs')
const DailyHealth = require('./model/dailyHealth')

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

app.post('/', (req, res) => {

    //add new user in the DB
    const user = new Users ({
        username: "PeakClimber",
        email: "peakclimber@example.com",
        password: "reachthepeak2024",
        age: 34,
        gender: "male",
        height: 5.9, 
        weight: 180
    })

    user.save()
        .then((result) => res.send(result))
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: "Failed to save the user." });
        })

})

app.post('/sleep', (req, res) => {

    //add new sleepLog in the DB
    const sleepLog = new SleepLogs ({
        userId: "6633e4bd28b1b97a261536a4",
        date: "2024-05-02T00:00:00Z",
        hoursSlept: 6.5
    })

    sleepLog.save()
        .then((result) => res.send(result))
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: "Failed to save the Sleep Log." });
        })
})

app.get('/daily', (req, res) => {

 //add new sleepLog in the DB
 const dayActivity = new DailyHealth({
    userId: '6633e51da14fe77af230d6f2', 
    date: "2024-05-01T00:00:00Z",
    diet: {
        "breakfast": "Protein pancakes with maple syrup",
        "lunch": "Chicken Caesar salad",
        "dinner": "Grilled steak with roasted potatoes and green beans",
      snacks: [
        {snack: "Protein bar"},
        {snack: "Apple"}
      ]
    },
    exercises:[
      { type: 'Mountain Climbing', duration: 120, caloriesBurned: 1000 }
    ]
});

    dayActivity.save()
        .then((result) => res.send(result))
        .catch((err) => {
            console.log(err);
            res.status(500).send({ message: "Failed to save the Daily Log." });
        })
})

app.get('/api/sleepLogs', async (req, res) => {
    let result = await SleepLogs.find({});
    res.send(result);
})

app.get('/api/users', async (req, res) => {

   let result = await Users.find({});
   res.send(result);

})

app.get('/api/dailyHealth', async (req, res) => {
    let result = await DailyHealth.find({});
    res.send(result);
})

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
  });
  
