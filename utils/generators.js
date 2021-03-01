const dataGenerator = require("../utils/generate-data")
const { blood_pressure, cholesterol, glucose, heart_rate, oxygen_saturation, respiration_rate } = require("./generate-data")

module.exports = {
    generateRandomString : () => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (let i = 0; i < 6; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },
    
    generateRandomData : () => {
        return {
            blood_pressure : blood_pressure(),
            cholesterol : cholesterol(),
            glucose : glucose(),
            heart_rate : heart_rate(),
            oxygen_saturation : oxygen_saturation(),
            respiration_rate : respiration_rate()
        }
    }
}