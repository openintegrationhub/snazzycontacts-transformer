/* eslint consistent-return: "off" */
/* eslint max-len: 'off' */

/**
 * Copyright 2018 Wice GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* eslint no-invalid-this: 0 no-console: 0 */
const eioUtils = require('elasticio-node').messages;
const { getExpression } = require('./../expressions/testExpression.js');
const { transform } = require('./transform.js');

const log = require('../logger');

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 */
async function processAction(msg) {
  try {
    log.info('processAction called with msg:', msg);
    const expression = getExpression(msg);
    log.info('Created expression:', expression);
    const result = await transform(expression);
    log.info('Created result:', result);
    if (result !== undefined) {
      const message = eioUtils.newMessageWithBody(result.body);
      log.info('Returning message:', message);
      return message;
    }
    return;
  } catch (e) {
    log.error(`ERROR: ${JSON.stringify(e, undefined, 2)}`);
    throw new Error(e);
  }
}

module.exports.process = processAction;
