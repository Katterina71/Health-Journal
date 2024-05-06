
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

// export {allData, addUser, removeUser, editUser}
export {allData}