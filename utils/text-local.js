const axios = require('axios');

const environment = process.env.NODE_ENV;
const { otpApiKey, testSMS, adminMobile } = require('../config')[environment];

const API_URL = 'https://api.textlocal.in/send/';

const _self = {};

_self.sendSMS = (phoneNumber, message) => {
  const sender = 'INFRAMINDS';
  const params = { 
    apiKey: otpApiKey, 
    numbers: phoneNumber, 
    sender, 
    message, 
    test: testSMS 
  };
  return new Promise((resolve, reject) => {
    axios.get(API_URL, { params }).then((res) => {
      const { data } = res;
      if (data.status === 'success') {
        resolve(data);
      } else {
        reject(data);
      }
    }).catch(reject)
  });
};

module.exports = _self;
