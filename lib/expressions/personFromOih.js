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

module.exports.getExpression = (msg) => {
  if (Object.keys(msg.body).length === 0 && msg.body.constructor === Object) {
    return msg.body;
  }

  const expression = {
    meta: {
      domainId: '5d9b2511d48c29001a202169',
      schemaUri: 'person',
      oihUid: msg.body.meta.oihUid ? msg.body.meta.oihUid : '',
      applicationUid: msg.body.meta.applicationUid ? msg.body.meta.applicationUid : '',
      iamToken: msg.body.meta.iamToken ? msg.body.meta.iamToken : undefined,
    },
    data: {
      uid: msg.body.meta.recordUid,
      lastName: msg.body.data.lastName,
      firstName: msg.body.data.firstName,
      addresses: msg.body.data.addresses,
      contactData: msg.body.data.contactData,
    },
  };
  return expression;
};
