/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { newMessage } = require('../lib/helpers');
const { personFromOih, personToOih } = require('./seed/person');
const transformPersonFromOih = require('../lib/actions/transformPersonFromOih');
const transformPersonToOih = require('../lib/actions/transformPersonToOih');

describe('Transformation test', () => {
  it('should handle simple person tranformation in direction from OIH', () => {
    const exp = personFromOih();
    return transformPersonFromOih.process(newMessage(exp))
      .then((result) => {
        expect(result.body).to.be.an('object');
        expect(result.body.data.firstName).to.be.equal('John');
        expect(result.body.data.lastName).to.be.equal('Doe');
        expect(result.body.data.addresses).to.have.length(2);
        expect(result.body.data.addresses[0].street).to.be.equal('Hohestr');
        expect(result.body.data.addresses[0].streetNumber).to.be.equal('3');
        expect(result.body.data.addresses[0].unit).to.be.equal('a');
        expect(result.body.data.addresses[0].zipCode).to.be.equal('50667');
        expect(result.body.data.addresses[0].city).to.be.equal('Cologne');
        expect(result.body.data.addresses[0].district).to.be.equal('Alstadt-Sued');
        expect(result.body.data.addresses[0].region).to.be.equal('NRW');
        expect(result.body.data.addresses[0].country).to.be.equal('Germany');
        expect(result.body.data.contactData).to.have.length(6);
        expect(result.body.data.contactData[0].value).to.be.equal('123456789');
        expect(result.body.data.contactData[0].type).to.be.equal('phone');
        expect(result.body.data.contactData[0].description).to.be.equal('primary');
      });
  });

  it('should produce an empty message if transformation returns undefined', () => {
    return transformPersonFromOih.process(newMessage({}))
      .then((result) => {
        expect(result).to.be.undefined;
      });
  });

  it('should handle simple person tranformation in direction to OIH', () => {
    const exp = personToOih();
    return transformPersonToOih.process(newMessage(exp))
      .then((result) => {
        expect(result.body).to.be.an('object');
        expect(result.body.data.firstName).to.be.equal('Mark');
        expect(result.body.data.lastName).to.be.equal('Smith');
        expect(result.body.data.addresses[0].street).to.be.equal('Main Str.');
        expect(result.body.data.addresses[0].streetNumber).to.be.equal('120');
        expect(result.body.data.addresses[0].city).to.be.equal('Hamburg');
        expect(result.body.data.addresses[0].country).to.be.equal('Germany');
        expect(result.body.data.contactData[1].type).to.be.equal('email');
        expect(result.body.data.contactData[1].value).to.be.equal('m.smith@mail.com');
      });
  });

  it('should produce an empty message if transformation returns undefined', () => {
    return transformPersonToOih.process(newMessage({}))
      .then((result) => {
        expect(result).to.be.undefined;
      });
  });
});
