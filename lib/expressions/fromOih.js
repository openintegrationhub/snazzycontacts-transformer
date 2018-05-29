// const jsonata = require('jsonata');

module.exports.getExpression = function(msg) {
  let input =  JSON.stringify(msg.body, undefined, 2);
  console.log(`MSG BODY: ${input}`);


  const expression = {
    "rowid": msg.body.applicationRecordUid,
    "first_name": msg.body.firstName,
    "name": msg.body.lastName
  };
  return expression;
}
