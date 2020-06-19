/* eslint no-param-reassign: "off" */

/**
 * Copyright 2019 Wice GmbH

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

const Q = require('q');
const { messages } = require('elasticio-node');
const log = require('../logger');
// const { getEntries } = require('./../utils/helpers');
// const { getToken } = require('./../utils/authentication');

/**
 * This method will be called from OIH platform providing following data
 *
 * @param msg - incoming message object that contains ``body`` with payload
 * @param cfg - configuration that is account information and configuration field values
 * @param snapshot - saves the current state of integration step for the future reference
 */
async function processTrigger(msg, cfg, snapshot = {}) {
  log.info('processTrigger called!');

  log.info('Received msg:', msg);
  log.info('Received cfg:', cfg);
  log.info('Received snapshot:', snapshot);

  const self = this;

  async function emitData() {
    /** Create an OIH meta object which is required
    * to make the Hub and Spoke architecture work properly
    */
    log.info('About to emit data');

    const data = {
      meta: {
        testMeta: 'Some Meta',
      },
      data: {
        testData: 'Some Data',
      },
    };

    const message = messages.newMessageWithBody(data);

    log.info('Created message:', message);
    self.emit('data', message);

    log.info('Finished emitting data');

    snapshot.testSnapshot = new Date();

    log.info('About to emit snapshot:', snapshot);

    self.emit('snapshot', snapshot);
  }

  /**
   * This method will be called from OIH platform if an error occured
   *
   * @param e - object containg the error
   */
  function emitError(e) {
    console.log(`ERROR: ${e}`);
    self.emit('error', e);
  }

  /**
   * This method will be called from OIH platform
   * when the execution is finished successfully
   *
   */
  function emitEnd() {
    console.log('Finished execution');
    self.emit('end');
  }

  Q()
    .then(emitData)
    .fail(emitError)
    .done(emitEnd);
}

module.exports = {
  process: processTrigger,
};
