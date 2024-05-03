import express from 'express';
const router = express.Router();

import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import Users from '../model/users.js';




router.get('/', async (req, res) => {
    try {
        const result = await Users.find({});
        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'No users data found!' });
        }
    } catch (err) {
        console.error('Error retrieving users data:', err);
        next(err); // Properly pass the error to the Express error handler
    }
});

router.get('/add', (req, res, next) => {

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
            next(res.status(500).send({ message: "Failed to save the user." }));
        })

})


// router.patch('/edit', (req, res, next) => {

//     //add new user in the DB
//     const user = new Users ({
//         username: "PeakClimber",
//         email: "peakclimber@example.com",
//         password: "reachthepeak2024",
//         age: 34,
//         gender: "male",
//         height: 5.9, 
//         weight: 180
//     })

//     user.save()
//         .then((result) => res.send(result))
//         .catch((err) => {
//             console.log(err);
//             next(res.status(500).send({ message: "Failed to save the user." }));
//         })

// })

router.route('/delete/:username')
    .get((req, res) => {
    res.send('Remove user by Username: '+req.params.username);
})
   .delete(async (req, res, next) => {
    console.log(req.params.username);
    try {
        let result = await Users.deleteOne({ username: req.params.username });
        if (result.deletedCount === 0) {
            res.status(404).send({ message: "No user found with the specified username." });
        } else {
            res.send({ message: "User deleted successfully." });
        }
    } catch (err) {
        console.log(err);
        next(err);  // Properly use next to handle errors
    }
});



// router.delete('/delete/:userId', async (req, res, next) => {
//     const userId = req.params.userId;
//     try {
//         // Start a session and transaction
//         const session = await mongoose.startSession();
//         session.startTransaction();
        
//         // Delete user
//         const userDeletionResult = await Users.deleteOne({ _id: userId }, { session });
//         if (userDeletionResult.deletedCount === 0) {
//             throw new Error("User not found");
//         }

//         // Delete posts related to the user
//         await Posts.deleteMany({ userId: userId }, { session });

//         // Delete comments related to the user
//         await Comments.deleteMany({ userId: userId }, { session });

//         // Delete logs related to the user
//         await Logs.deleteMany({ userId: userId }, { session });

//         // Commit the transaction
//         await session.commitTransaction();
//         session.endSession();
        
//         res.send({ message: "User and all related data deleted successfully." });
//     } catch (err) {
//         // Abort the transaction in case of error
//         if (session) {
//             await session.abortTransaction();
//             session.endSession();
//         }
//         console.log(err);
//         next(err);  // Forward error to the error-handling middleware
//     }
// });


export default router