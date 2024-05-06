
import express from 'express';
import mongoose from 'mongoose';
import Users from '../model/users.js';
import DailyHealth from '../model/dailyHealth.js';

// import {allData, postData, removeData, editData} from '../controllers/dailyHealthControllers.js'
import {allData} from '../controllers/dailyHealthControllers.js'

const router = express.Router();
router.get('/', allData);

router.post('/add',async (req, res) => {
try { 
    const user = await Users.findOne({ username: req.params.username }).select('_id');
    if (!user) {
        return res.status(404).send({ message: "User not found." });
    }

    const userId = user._id;

     // Normalize the date to midnight UTC
    const inputDate = new Date(req.body.date);
    const normalizedDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()));

    // Prepare the exercises and snacks from the request body
    const exercises = req.body.exercises;  
    const snacks = req.body.snacks.map(snack => ({ snack })); 

    //add new sleepLog in the DB
    const dayActivity = new DailyHealth({
    userId: userId, 
    date: normalizedDate,
    diet: {
           breakfast: req.body.breakfast,
           lunch: req.body.lunch,
           dinner: req.body.dinner,
           snacks: snacks
       },
        exercises: exercises 
   });

   const savedDayActivity = await dayActivity.save();
   res.status(201).send(savedDayActivity);

   }
   catch (err) {
    console.error(err); 
    if (err.code === 11000) {
        res.status(409).send({ message: 'A sleep log for this user and date has already been added.' });
    } else {
        res.status(400).send({ message: err.message });
    }
}  
});

router.delete('/remove/:userId/:date', async (req, res) => {
    try {
        const { userId, date } = req.params;

        // Normalize the date to midnight UTC
        const inputDate = new Date(date);
        const normalizedDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()));

        // Delete the DailyHealth log from the database
        const result = await DailyHealth.deleteOne({ userId: userId, date: normalizedDate });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "No health log found for the specified user and date." });
        }

        res.send({ message: "Health log deleted successfully." });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});


export default router