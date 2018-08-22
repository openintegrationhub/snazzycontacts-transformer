/* eslint-disable arrow-body-style */

const expect = require('chai').expect;
const transform = require('../lib/actions/transformPersonFromOih');
const eioUtils = require('elasticio-node').messages;

describe('Transformation test', () => {

  it('should handle simple transforms', () => {
    const exp = {
      "title": "Prof.",
      "salutation": "Mr.",
      "firstName": "John",
      "middleName": "Anthony",
      "lastName": "Doe",
      "gender": "male",
      "birthday": "Wed, 14 Jun 1999 07:00:00 GMT",
      "notes": "Private notes",
      "displayName": "johndoe",
      "language": "english",
      "nickname": "johny",
      "jobTitle": "Sales manager",
      "photo": "http://example.org/photo.jpg",
      "anniversary": "14 Jun",
      "addresses": [{
          "street": "Hohestr",
          "streetNumber": "3",
          "unit": "a",
          "zipCode": "50667",
          "city": "Cologne",
          "district": "Alstadt-Sued",
          "region": "NRW",
          "country": "Germany",
          "primaryContact": "Hermann Schmitz",
          "description": "primary"
        },
        {
          "street": "Rudolfplatz",
          "streetNumber": "3",
          "unit": "a",
          "zipCode": "50667",
          "city": "Cologne",
          "district": "Alstadt-Sued",
          "region": "NRW",
          "country": "Germany",
          "primaryContact": "Hermann Schmitz",
          "description": "mailing"
        }
      ],
      "contactData": [{
          "value": "123456789",
          "type": "phone",
          "description": "primary"
        },
        {
          "value": "00224477",
          "type": "phone",
          "description": "private"
        },
        {
          "value": "95248793",
          "type": "phone",
          "description": "mobile"
        },
        {
          "value": "jon@doe.com",
          "type": "email",
          "description": "private"
        },
        {
          "value": "xing.de/yourUsername",
          "type": "xing",
          "description": "xing"
        },
        {
          "value": "98326307",
          "type": "phone",
          "description": "secondary"
        }
      ],
      "calendar": [{
        "calendar": "http://example.org/kalender/emuster",
        "busyCalendar": "http://example.org/kalender/emuster/busy",
        "requestCalendar": "http://example.org/kalender/emuster/appointment",
        "description": "private"
      }],
      "category": [{
        "name": "private",
        "description": "private address data of the person"
      }],
      "oihApplicationRecords": [{
          "applicationUid": 3,
          "recordUid": 98765,
          "created": 23215151,
          "lastModified": 36542364
        },
        {
          "applicationUid": 2,
          "recordUid": 12121,
          "created": 454545454,
          "lastModified": 7878787
        }
      ]
    };

    return transform.process(eioUtils.newMessageWithBody(exp))
    .then(result => {
      console.log(`RESULT: ${result}`);
      // expect(result.body).to.be.an('object');
      expect(result.body).to.deep.equal({
        firstName: "John",
        middleName: "Anthony",
        lastName: "Doe"
      });
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
