/* eslint no-invalid-this: 0 no-console: 0 */
const eioUtils = require('elasticio-node').messages;
const { getExpression } = require('./../expressions/fromOih.js');
const { transform } = require('./transform.js')

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
async function processAction(msg) {
  try {
    const expression = getExpression(msg);
    const result = await transform(msg, expression);
    return eioUtils.newMessageWithBody(result.body);
  } catch (e) {
    console.log(`ERRPR: ${e}`);
  }
}

module.exports.process = processAction;
