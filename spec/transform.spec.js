/* eslint-disable arrow-body-style */

const { expect } = require('chai');
const { assert } = require('chai');
const transformPersonFromOih = require('../lib/actions/transformPersonFromOih');
const eioUtils = require('elasticio-node').messages;
const { person } = require('./seed/person');

describe('Transformation test', () => {

  it('should handle simple person tranformation from OIH', () => {
    const exp = person();
    return transformPersonFromOih.process(eioUtils.newMessageWithBody(exp))
    .then(result => {
      expect(result.body).to.be.an('object');
      expect(result.body).to.deep.include({
        rowid: 98765,
        name: "Doe",
        firstname: "John",
        position: "Sales manager",
        private_street: "Hohestr",
        private_street_number: "3",
        private_zip_code: "50667",
        private_town: "Cologne",
        private_country: "Germany",
        email: "jon@doe.com",
        phone: "123456789",
        mobile_phone: "98326307",
        xing_url: "xing.de/yourUsername",
        last_update: 36542364
      })
    });
  });

  it('should not produce an empty message if transformation returns undefined', () => {
    return transformPersonFromOih.process(eioUtils.newMessageWithBody({}))
    .then(result => {
      expect(result).to.be.undefined;
    });
  });

});
