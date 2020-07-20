/* eslint no-param-reassign: "off" */
/* eslint no-restricted-syntax: "off" */

/**
 * Original code
 * Copyright 2018 elasticio GmbH

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

/**
 * Edited code
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

const jsonata = require('@elastic.io/jsonata-moment');
const { newMessage } = require('../helpers');

const PASSTHROUGH_BODY_PROPERTY = 'elasticio';

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param exp incoming expression object
 */
module.exports.transform = (exp) => {
  const stringifiedExpression = JSON.stringify(exp);
  const compiledExpression = jsonata(stringifiedExpression);

  function handlePassthrough(message) {
    if (message.passthrough && Object.keys(message.passthrough)) {
      if (PASSTHROUGH_BODY_PROPERTY in message.body) {
        throw new Error(`${PASSTHROUGH_BODY_PROPERTY} property is reserved \
              if you are using passthrough functionality`);
      }

      message.body.elasticio = {};
      Object.assign(message.body.elasticio, message.passthrough);
    }
    return message;
  }

  handlePassthrough(exp);
  // console.log('Evaluating expression="%s" on body=%j', stringifiedExpression, exp);
  const result = compiledExpression.evaluate(exp);
  // console.log('Evaluation completed, result=%j', result);
  let counter = 0;
  if (result === undefined) {
    console.log('RESULT IS UNDEFINED!!!');
    counter += 1;
    console.log('COUNTER: ', counter);
  }

  if (result === undefined || result === null || Object.keys(result).length === 0) {
    return Promise.resolve();
  }
  if (typeof result[Symbol.iterator] === 'function') {
    // We have an iterator as result
    for (const item of result) {
      this.emit('data', newMessage(item));
    }
    return Promise.resolve();
  }
  return Promise.resolve(newMessage(result));
};
