# snazzycontacts-jsonata-transform-component [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Dedicated [Snazzy Contacts](https://snazzycontacts.com) data transformation component for elastic.io platform based on JSONata

## Authentication

This component requires no authentication.

## How it works

The component supports two actions - **Transform to OIH** and **Transform from OIH**. This means that the component takes the incoming message body from the previous step and creates a new expression in a ``JSON`` format. The new generated ``JSON`` object has specific properties which represent the input/output for the next/previous component in the flow.
The usesa fact that JSONata expression is a superset of JSON document so that by default any valid JSON document is
a valid JSONata expression.

For example let's take this sample incoming message body:

```json
{
  "rowid": msg.body.applicationRecordUid,
  "tenant": msg.body.tenant,
  "name": msg.body.lastName,
  "firstname": msg.body.firstName
}
{
  "Account": {
    "Account Name": "Firefly",
    "Order": [
      {
        "OrderID": "order103",
        "Product": [
          {
            "Product Name": "Bowler Hat",
            "ProductID": 858383,
            "SKU": "0406654608",
            "Description": {
              "Colour": "Purple",
              "Width": 300,
              "Height": 200,
              "Depth": 210,
              "Weight": 0.75
            },
            "Price": 34.45,
            "Quantity": 2
          },
          {
            "Product Name": "Trilby hat",
            "ProductID": 858236,
            "SKU": "0406634348",
            "Description": {
              "Colour": "Orange",
              "Width": 300,
              "Height": 200,
              "Depth": 210,
              "Weight": 0.6
            },
            "Price": 21.67,
            "Quantity": 1
          }
        ]
      }
    ]
  }
}
```

You can use following JSONata expressions to transform it:

```jsonata
{
	"account": Account."Account Name",
	"orderCount" : $count(Account.Order)
}
```

result of that transofrmation will be the following JSON document ([jsonata link](http://try.jsonata.org/B1ctn36ub)):

```json
{
  "account": "Firefly",
  "orderCount": 1
}
```

I hope you've got the idea. Now you can also do something more complicated, like this array-to-array transformation:

```jsonata
{
    "account": Account."Account Name",
    "products": Account.Order.Product.({
    	"name": $."Product Name",
        "revenue": (Price * Quantity)
    }),
    "orderIDs": Account.Order[].(OrderID)
}
```

resulting in ([jsonata link](http://try.jsonata.org/B1ctn36ub)):

```json
{
  "account": "Firefly",
  "products": [
    {
      "name": "Bowler Hat",
      "revenue": 68.9
    },
    {
      "name": "Trilby hat",
      "revenue": 21.67
    }
  ],
  "orderIDs": [
    "order103"
  ]
}
```

## License

Apache-2.0 © [elastic.io GmbH](http://elastic.io)


[npm-image]: https://badge.fury.io/js/jsonata-transform-component.svg
[npm-url]: https://npmjs.org/package/jsonata-transform-component
[travis-image]: https://travis-ci.org/elasticio/jsonata-transform-component.svg?branch=master
[travis-url]: https://travis-ci.org/elasticio/jsonata-transform-component
[daviddm-image]: https://david-dm.org/elasticio/jsonata-transform-component.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/elasticio/jsonata-transform-component
