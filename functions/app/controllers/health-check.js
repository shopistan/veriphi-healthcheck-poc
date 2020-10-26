const functions = require('firebase-functions');

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { base_url } = require('../config/keys');
const { admin } = require('../config/db');

exports.updateFlaginDB = async (value) => {
  try {
    await admin.firestore().collection('utils').doc('flags').set({
      underMaintenance: value,
    });
  } catch (err) {
    console.log('Unable to update database ', err);
  }
};

exports.fetchSiteResponse = async () => {
  try {
    let html = await fetch(base_url).then((response) => {
      return response.text();
    });

    let $ = cheerio.load(html);
    if ($('under-maintenance').text()) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Error in fetching response ', err);
    return true;
  }
};

exports.runAndUpdate = async (admin) => {
  const response = {
    success: true,
  };
  try {
    let res = await exports.fetchSiteResponse();
    await exports.updateFlaginDB(res, admin);
    functions.logger.info('Site under maintainence:', res);
    response['underMaintenance'] = res;
  } catch (err) {
    response['success'] = false;
  }
  return response;
};
