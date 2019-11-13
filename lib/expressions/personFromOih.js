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
      operation: msg.body.operation,
      oihUid: msg.body.meta.oihUid ? msg.body.meta.oihUid : '',
      applicationUid: msg.body.meta.applicationUid ? msg.body.meta.applicationUid : '',
      iamToken: msg.body.meta.iamToken ? msg.body.meta.iamToken : undefined,
      recordUid: msg.body.meta.recordUid,
    },
    data: {
      firstName: msg.body.data.firstName,
      lastName: msg.body.data.lastName,
      position: msg.body.data.position,
      title: msg.body.data.title,
      jobTitle: msg.body.data.jobTitle,
      salutation: msg.body.data.salutation,
      gender: msg.body.data.gender,
      birthday: msg.body.data.birthday,
      displayName: msg.body.data.displayName,
      middleName: msg.body.data.middleName,
      nickname: msg.body.data.nickname,
      addresses: msg.body.data.addresses,
      contactData: msg.body.data.contactData,
    },
  };
  return expression;
};
