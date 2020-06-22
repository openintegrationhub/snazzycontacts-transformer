# OIH Development Connector template

An simple test transformer component for testing the new OIH ferryman. Modified ferryman versions can be placed and installed in the ferryman sub folder.

This component is based on the Snazzy Contacts Transformer.

## How it works

This component offers one exemplary *action* and one *trigger* each.

The action `testAction` will simulate a transformation process of whatever data is passed to it. However for ease of testing the passed data is not actually manipulated, it will instead simply return the data as it was received.

The trigger `testTrigger` will emit this simple example object: 
```
{
  meta: {
    testMeta: 'Some Meta',
  },
  data: {
    testData: 'Some Data',
  },
}
```


## License

Apache-2.0 © [elastic.io GmbH](http://elastic.io)
