const { sendErrorResponse, sendResponse } = require('../utils/format-response');
const { UNEXPECTED_SERVER_ERROR } = require('../alerts');
const { generateRandomData } = require('../utils/generators');
const { monitorDiabetes, monitorBronchiectasis, monitorCHD, monitorHypoxemia, monitorAsthma } = require('../utils/health-monitor')

module.exports = {
    createUser: (req, res) => {
        (async () => {
            try {
                const createdDate = new Date();
                const userId = db.collection('usershealth').doc().id;
                await db.collection('usershealth').doc("/"+userId+"/")
                .create({
                    username: req.body.username,
                    age: req.body.age,
                    mobile: req.body.mobile,
                    createdDate: createdDate
                });
                return sendResponse(res, {"userId" : userId }, 'User Created', 200);
            } catch (error) {
                return sendErrorResponse(res, error, UNEXPECTED_SERVER_ERROR);
            }
        })();
    },
    getUserDetails: (req, res) => {
        (async () => {
            try {
                const doc = await db.collection('usershealth').doc("/"+req.params.userId+"/").get();
                if (doc.exists) {
                    return sendResponse(res, doc, 'Details fetched', 200);
                } else {
                    return sendResponse(res, {}, 'No details matching', 200);
                }   
            } catch (error) {
                return sendErrorResponse(res, error, UNEXPECTED_SERVER_ERROR);
            }
        })();
    },
    // create health data for existing user.. Used put method and update method to update
    // existing data in db
    createHealthData: (req, res) => {
        (async () => {
            const healthdata = generateRandomData();    
            const { blood_pressure, cholesterol, glucose, heart_rate, oxygen_saturation, respiration_rate } = healthdata;
            const alerts = {
                diabetes : monitorDiabetes(glucose),
                bronchiectasis : monitorBronchiectasis(respiration_rate),
                chd : monitorCHD(blood_pressure, heart_rate, cholesterol),
                hypoxemia : monitorHypoxemia(oxygen_saturation),
                asthma : monitorAsthma(heart_rate, oxygen_saturation, respiration_rate)
            }
            try {
                const createdDate = new Date();
                healthdata.createdDate = createdDate;
                await db.collection('usershealth').doc("/"+req.params.userId+"/")
                    .collection("healthdata")
                    .add(healthdata);
                return sendResponse(res, {healthdata: healthdata, alerts : alerts}, 'Health Data Created', 200);
            } catch (error) {
                console.log(error)
                return sendErrorResponse(res, error, UNEXPECTED_SERVER_ERROR);
            }
        })();
    },
    getUserHealthData : (req, res) => {
        (async () => {
            try {
                const healthArray = [];
                await db.collection('usershealth').doc("/"+req.params.userId+"/").collection("healthdata").get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            healthArray.push({ id : doc.id, data: doc.data() });
                        });
                        return sendResponse(res, healthArray, 'Health Details fetched', 200);
                    })
                    .catch((error) => {
                        return sendErrorResponse(res, {}, 'No details matching', 200);
                    });
            } catch(error) {
                return sendErrorResponse(res, error, UNEXPECTED_SERVER_ERROR);
            }
        })();
    },
    update: (req, res) => {
        (async () => {
            try {
                await db.collection('usershealth').doc("/"+req.params.userId+"/")
                .update(req.body);
                return sendResponse(res, req.body, 'User Updated', 200);
            } catch (error) {
                console.log(error)
                return sendErrorResponse(res, error, UNEXPECTED_SERVER_ERROR);
            }
        })();
    },
    
};
