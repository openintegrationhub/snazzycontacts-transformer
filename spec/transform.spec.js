/* eslint-disable arrow-body-style */

const expect = require('chai').expect;
const transform = require('../lib/actions/transformPersonFromOih');
const eioUtils = require('elasticio-node').messages;
const personExpression = require('./seed/person');

describe('Transformation test', () => {

  it('should handle simple transforms', () => {
    return transform.process(eioUtils.newMessageWithBody(personExpression))
    .then(result => {
      console.log(`RESULT: ${JSON.stringify(result, undefined, 2)}`);
      expect(result.body).to.be.an('object');
    });
  });


  // it('should handle simple transforms', () => {
  //   return transform.process(eioUtils.newMessageWithBody({
  //     first: 'Renat',
  //     last: 'Zubairov'
  //   }), {
  //     expression: `{ "fullName": first & " " & last }`
  //   }).then(result => {
  //     expect(result.body).to.deep.equal({
  //       fullName: 'Renat Zubairov'
  //     });
  //   });
  // });
  //
  // it('should not produce an empty message if transformation returns undefined', () => {
  //   return transform.process(eioUtils.newMessageWithBody({
  //     first: 'Renat',
  //     last: 'Zubairov'
  //   }), {
  //     expression: `$[foo=2].({ "foo": boom })`
  //   }).then(result => {
  //     expect(result).to.be.an('undefined');
  //   });
  // });
  //
  // it('should handle passthough properly', () => {
  //   const msg = eioUtils.newMessageWithBody({
  //     first: 'Renat',
  //     last: 'Zubairov'
  //   });
  //   msg.passthrough = {
  //     ps: 'psworks'
  //   };
  //   return transform.process(msg, {
  //     expression: `{ "fullName": first & " " & elasticio.ps}`
  //   }).then(result => {
  //     expect(result.body).to.deep.equal({
  //       fullName: 'Renat psworks'
  //     });
  //   });
  // });
});
