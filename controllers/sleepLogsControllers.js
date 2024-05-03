import SleepLogs from '../model/sleepLogs.js';
import Users from '../model/users.js'; 

async function allData(req, res, next) {
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
}

async function postData (req, res, next) {
  
try {
    const user = await Users.findOne({ username: req.params.username }).select('_id');
    if (!user) {
        return res.status(404).send({ message: "User not found." });
    }

    const userId = user._id;

     // Normalize the date to midnight UTC
    const inputDate = new Date(req.body.date);
    const normalizedDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()));

     //add new sleepLog in the DB
     const sleepLog = new SleepLogs ({
        userId: userId,
        date: normalizedDate,
        hoursSlept: req.body.hoursSlept
    })

    const savedSleepLog = await sleepLog.save();
    res.status(201).send(savedSleepLog);
    }
    catch (err) {
        console.error(err); 
        if (err.code === 11000 && err.keyPattern.userId && err.keyPattern.date) {
            res.status(409).send({ message: 'A sleep log for this user and date has already been added.' });
        } else {
            res.status(400).send({ message: err.message });
        }
    }  
}

async function removeData (req, res, next) {

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
}


async function editData (req, res, next) {

    let sleepLogId = req.params.id;

    // const dateString = req.query.date;
    // let formattedDate = dateString.replace(' ', '+'); 
    // let dateObject = new Date(formattedDate);

    // Normalize the date to midnight UTC
    const inputDate = new Date(req.body.date);
    const normalizedDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()));

    try {
        const updatedSleepLog = await SleepLogs.findByIdAndUpdate(
            sleepLogId,
            {
                date: normalizedDate,
                hoursSlept: req.body.hoursSlept
            },
            {
                new: true,  
                runValidators: true  
            }
        );

        if (!updatedSleepLog) {
            return res.status(404).send({ message: "User not found." });
        }

        // Send the updated user back
        res.send(updatedSleepLog);
    } catch (err) {
        console.error(err);
        next(err);
    }


 }
export {allData, postData, removeData, editData}