// blood_pressure = (120 - 140)/(80 - 120) mmHg
// cholesterol = (190-250) mg/dL
// glucose = (135-220) mg/dL
// heart_rate = (85-130) beats/min
// oxygen_saturation = (91 - 99)%
// respiration_rate = (12- 28) breaths/min range

module.exports = {
    blood_pressure : () => {
        const numeratorMin = Math.ceil(120);
        const numeratorMax = Math.floor(140);
        const denominatorMin = Math.ceil(80);
        const denominatorMax = Math.floor(120);
        const numerator = Math.floor(Math.random() * (numeratorMax - numeratorMin) + numeratorMin);
        const denominator = Math.floor(Math.random() * (denominatorMax - denominatorMin) + denominatorMin);
        return numerator + "/" + denominator
    },   
    cholesterol : () => {
        const min = Math.ceil(190);
        const max = Math.floor(250);
        return Math.floor(Math.random() * (max - min) + min);
    },
    glucose : () => {
        const min = Math.ceil(100);
        const max = Math.floor(205);
        return Math.floor(Math.random() * (max - min) + min);
    },
    heart_rate : () => {
        const min = Math.ceil(85);
        const max = Math.floor(130);
        return Math.floor(Math.random() * (max - min) + min);
    },
    oxygen_saturation : () => {
        const min = Math.ceil(95);
        const max = Math.floor(98);
        return Math.floor(Math.random() * (max - min) + min);
    },
    respiration_rate : () => {
        const min = Math.ceil(14);
        const max = Math.floor(22);
        return Math.floor(Math.random() * (max - min) + min);
    },
}
