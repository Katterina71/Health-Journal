
import express from 'express';
import mongoose from 'mongoose';
import DailyHealth from '../model/dailyHealth.js';

// import {allData, postData, removeData, editData} from '../controllers/dailyHealthControllers.js'
import {allData} from '../controllers/dailyHealthControllers.js'

const router = express.Router();
router.get('/', allData);

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


export default router