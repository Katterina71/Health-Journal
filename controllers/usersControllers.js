
// import db from '../db/conn.js';
// import { Collection, ObjectId } from 'mongodb';

import DailyHealth from '../model/dailyHealth.js';
import SleepLogs from '../model/sleepLogs.js';
import Users from '../model/users.js';

async function allData (req, res) {
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
}

async function addUser(req, res, next){
 try {
    //add new user in the DB
    const user = new Users ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight
    })

    const savedUser = await user.save();
    res.status(201).send(savedUser);
}
catch (err) {
    if (err.code === 11000) { // MongoDB duplicate key error
        res.status(409).send({ message: 'Username or email already exists' });
    } else {
        res.status(400).send({ message: err.message });
    }
}
}

async function removeUser (req, res, next){
    const userId = req.params.userId;
    console.log('Remove user by userId: '+req.params.userId)
    try {
        // Start a session and transaction
        // const session = await mongoose.startSession();
        // session.startTransaction();
        
        // Delete user
        const userDeletionResult = await Users.deleteOne({ _id: userId }, { session });
        if (userDeletionResult.deletedCount === 0) {
            throw new Error("User not found");
        }

        // Delete sleepLogs related to the user
        await SleepLogs.deleteMany({ userId: userId }, {});
        // await SleepLogs.deleteMany({ userId: userId }, { session });

        // Delete DailyHealth related to the user
        await DailyHealth.deleteMany({ userId: userId }, {});
        // await DailyHealth.deleteMany({ userId: userId }, { session });


        // Commit the transaction
        // await session.commitTransaction();
        // session.endSession();
        
        res.send({ message: "User and all related data deleted successfully." });
    } catch (err) {
  
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.log(err);
        next(err);  
    }
}

async function editUser (req, res, next) {

    let userId = req.params.userId;

    try {
        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            {
                $set: req.body
            },
            {
                new: true,  
                runValidators: true  
            }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: "User not found." });
        }

        // Send the updated user back
        res.send(updatedUser);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export {allData, addUser, removeUser, editUser}