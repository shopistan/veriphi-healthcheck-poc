const { pubsub, https } = require('firebase-functions');
const { runAndUpdate } = require('./app/controllers/health-check');

exports.status = https.onRequest(async (request, response) => {
  let res = await runAndUpdate();
  response.status(res.success === true ? 200 : 400).json(res);
});

exports.scheduledFunction = pubsub
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    return await runAndUpdate();
  });
