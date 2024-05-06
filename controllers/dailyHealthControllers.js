
import Users from '../model/users.js'; 
import DailyHealth from '../model/dailyHealth.js';


async function allData (req, res, next) {
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
}

async function getById (req, res,next) {
    try {
        const result = await DailyHealth.findOne({_id: req.params.id});
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'No daily health data found!' });
        }
    } catch (err) {
        console.error('Error retrieving daily health data:', err);
        next(err); 
    }
}


async function getByIdAndDate(req, res, next) {
    try {
        console.log('Requested Date:', req.params.date);
        const user = await Users.findOne({ _id: req.params.userId }).select('_id');
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const userId = user._id;
        const date = req.params.date;
        const inputDate = new Date(date);
        const normalizedDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()));
        console.log('Normalized Date:', normalizedDate);

        // Declare result using let or const
        const result = await DailyHealth.find({ userId: userId, date: normalizedDate });
        console.log('Query Result:', result);

        // Check if result array is empty
        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'No daily health data found!' });
        }
    } catch (err) {
        console.error('Error retrieving daily health data:', err);
        next(err);
    }
}

async function postData (req, res) {
    try { 
        const user = await Users.findOne({ _id: req.params.id }).select('_id');
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
    
        const userId = user._id;
    
         // Normalize the date to midnight UTC
        const inputDate = new Date(req.body.date);
        const normalizedDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()));
    
        // Prepare the exercises and snacks from the request body
        const exercises = req.body.exercises;  
        const diet = req.body.diet;  
        const snacks = req.body.snacks; 
    
        //add new sleepLog in the DB
        const dayActivity = new DailyHealth({
        userId: userId, 
        date: normalizedDate,
        diet: diet,
        exercises: exercises 
       });
    
       const savedDayActivity = await dayActivity.save();
       res.status(201).send(savedDayActivity);
    
       }
       catch (err) {
        console.error(err); 
        if (err.code === 11000) {
            res.status(409).send({ message: 'A health log for this user and date has already been added.' });
        } else {
            res.status(400).send({ message: err.message });
        }
    }  
    }

    async function removeData (req, res) {
        try {
            const { userId, date } = req.params;
    
            // Normalize the date to midnight UTC
            const inputDate = new Date(date);
            const normalizedDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()));
    
            console.log(normalizedDate)
            // Delete the DailyHealth log from the database
            const result = await DailyHealth.deleteOne({ userId: userId, date: normalizedDate });
            console.log(userId)
            console.log(normalizedDate)
            if (result.deletedCount === 0) {
                return res.status(404).send({ message: "No health log found for the specified user and date." });
            }
    
            res.send({ message: "Health log deleted successfully." });
    
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err.message });
        }
    }

async function updateData (req, res) {
        try {
            const { userId, date } = req.params;
    
            // Normalize the date to ensure consistency
            const inputDate = new Date(date);
            const normalizedDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()));
    
            // Update the specified DailyHealth document
            const updatedDoc = await DailyHealth.findOneAndUpdate(
                { userId: userId, date: normalizedDate }, // Query
                { $set: req.body }, // Update
                { new: true, runValidators: true } // Options
            );
    
            if (!updatedDoc) {
                return res.status(404).send({ message: "No health log found for the specified user and date." });
            }
    
            res.send({ message: "Health log updated successfully.", data: updatedDoc });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err.message });
        }
    }
// export {allData, addUser, removeUser, editUser}
export {allData, postData, removeData, updateData, getById, getByIdAndDate}