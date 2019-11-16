const request = require('request-promise-native');
const configs = require('../configs/configs');

const verificationEndPoint = 'end_point';
const subscriptionKey = configs.subscriptionKey;

async function verify({ nidNumber, fullName, dob }) {
  let response = await request({
    method: 'POST',
    qs: {
      national_id: nidNumber,
      person_dob: dob,
      person_fullname: fullName
    },
    url: verificationEndPoint,
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey
    },
    json: true
  });

  if (typeof response === 'string') {
    response = response.replace(/'/g, '"');
    response = JSON.parse(response);
  }

  if (response.passKyc && (response.passKyc === 'true' || response.passKyc === 'yes')) {
    return { nid: nidNumber, valid: true };
  }

  return { nid: nidNumber, valid: false };
}

module.exports = {
  verify
};