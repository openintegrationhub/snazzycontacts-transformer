const jsonata = require('jsonata');

module.exports.getExpression = function (msg) {
  const expression = {
        "oihLastModified": jsonata("$now()").evaluate(),
        "firstName": msg.body.firstname,
        "middleName": "",
        "lastName": msg.body.name
  };
  return expression;
}
