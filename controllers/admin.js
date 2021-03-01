const { sendErrorResponse, sendResponse } = require('../utils/format-response');
const { UNEXPECTED_SERVER_ERROR } = require('../alerts');

module.exports = {
  create: (req, res) => {
    (async () => {
        try {
            const newId = db.collection('usershealth').doc().id;
            await db.collection('usershealth').doc("/"+newId+"/")
            .create({
                username: req.body.username,
                age: req.body.age,
                mobile: req.body.mobile
            });
            return sendResponse(res, req.body, 'User Created', 200);
        } catch (error) {
            return sendErrorResponse(res, error, UNEXPECTED_SERVER_ERROR);
        }
    })();
  },
};
