const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const DailyHealth = require('../model/dailyHealth');

router.get('/', async (req, res, next) => {
    try {
        const result = await DailyHealth.find({});
        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'No daily health data found!' });
        }
    } catch (err) {
        console.error('Error retrieving daily health data:', err);
        next(err); // Properly pass the error to the Express error handler
    }
});

router.post('/add', (req, res, next) => {

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
               next(res.status(500).send({ message: "Failed to save the Daily Log." }));
           })
   })

module.exports = router;