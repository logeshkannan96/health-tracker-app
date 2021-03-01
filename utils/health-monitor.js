const { DIABETES_ALERT, PREDIABETES_ALERT, 
    ASTHMA_ALERT, BRONCHIECTASIS_ALERT, CORONARY_HEART_DISEASE_ALERT, HYPOXEMIA_ALERT } = require('../alerts')

// blood_pressure = (120 - 140)/(80 - 120) mmHg
// cholesterol = (190-250) mg/dL
// glucose = (135-220) mg/dL
// heart_rate = (85-130) beats/min
// oxygen_saturation = (91 - 99)%
// respiration_rate = (12 - 16) breaths/min normal

module.exports = {
    monitorDiabetes : (glucose) => {
        if(glucose < 140) 
            return "NA";
        else if(glucose > 200) 
            return DIABETES_ALERT;
        else if(glucose > 140 && glucose < 199 )
            return PREDIABETES_ALERT;
    },
    monitorBronchiectasis: (respiration_rate) => {
       if(respiration_rate < 16 && respiration_rate > 12)
           return "NA";
        else 
           return BRONCHIECTASIS_ALERT;
    },
    monitorCHD: (blood_pressure, heart_rate, cholesterol) => {
        bpFractions = blood_pressure.split("/");
        if((bpFractions[0] > 120 || bpFractions[1] > 80) && (heart_rate > 100) && (cholesterol > 230)) 
            return CORONARY_HEART_DISEASE_ALERT;
        else 
            return "NA";
    },
    monitorHypoxemia: (oxygen_saturation) => {
        if(oxygen_saturation < 96)
            return HYPOXEMIA_ALERT;
        else 
            return "NA";
    },
    monitorAsthma: (heart_rate, oxygen_saturation, respiration_rate) => {
        if((heart_rate <= 125 && heart_rate >= 100) && (oxygen_saturation <= 95 && oxygen_saturation >= 92) || (respiration_rate >= 20 && respiration_rate <= 30))
            return ASTHMA_ALERT;
        else
            return "NA";
    },
};
