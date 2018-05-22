// const jsonata = require('jsonata');

module.exports.getExpression = function (msg) {
  const expression = {
        "firstname": msg.body.firstName,
        "name": msg.body.lastName
  };
  return expression;
}
