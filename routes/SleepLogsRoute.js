import express from 'express';
import moment from 'moment';

import mongoose from 'mongoose';
import SleepLogs from '../model/sleepLogs.js';
import Users from '../model/users.js'; 


const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await SleepLogs.find({});
        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'No sleep logs data found!' });
        }
    } catch (err) {
        console.error('Error retrieving sleep logs data:', err);
        next(err); // Properly pass the error to the Express error handler
    }
});

router.post('/add', (req, res, next) => {

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
            next(res.status(500).send({ message: "Failed to save the Sleep Log." }));
        })
})

router.route('/change/:username')
    .get((req, res) => {
    res.send('Remove Sleep Log by Username and Date: '+req.params.username + req.query.date);

})
   .delete(async (req, res, next) => {

    const dateString = req.query.date;
    let formattedDate = dateString.replace(' ', '+'); 
    let dateObject = new Date(formattedDate);

    // console.log(dateString);
    // console.log(formattedDate);
    // console.log(dateObject);

    try {
        // Find the user by username to get the user's ID
        const user = await Users.findOne({ username: req.params.username }).select('_id');
        
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // If user exists, use the user ID to delete the sleep logs
        const userId = user._id;
        const result = await SleepLogs.deleteOne({ userId: userId, date: dateObject});  

        if (result.deletedCount === 0) {
            res.status(404).send({ message: "No sleep logs found for the specified user." });
        } else {
            res.send({ message: "Sleep log deleted successfully." });
        }
    } catch (err) {
        console.error(err);
        next(err);  
    }
})
 .patch(async (req, res, next) => {

    const dateString = req.query.date;
    let formattedDate = dateString.replace(' ', '+'); 
    let dateObject = new Date(formattedDate);

    try {
        // Find the user by username to get the user's ID
        const user = await Users.findOne({ username: req.params.username }).select('_id');
        
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // If user exists, use the user ID to delete the sleep logs
        const userId = user._id;

        const result = await SleepLogs.findOne({ userId: userId, date: dateObject});  

        if (result.deletedCount === 0) {
            res.status(404).send({ message: "No sleep logs found for the specified user." });
        } else {
            res.send({ message: "Sleep log was changed successfully." });
        }
    } catch (err) {
        console.error(err);
        next(err);  
    }


 })

export default router