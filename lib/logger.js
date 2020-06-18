
const bunyan = require('bunyan');
const bformat = require('bunyan-format');

const envData = {

};

const formatOut = bformat({
  outputMode: 'long', /* , levelInString: true */
});

const log = bunyan.createLogger({
  name: 'app',
  streams: [{
    level: 'trace',
    type: 'file',
    path: 'error.log', // log ERROR and above to a file

  },
  {
    level: 'trace',
    // stream: process.stdout // log INFO and above to stdout
    stream: formatOut,
  },
  ],
  level: 'trace',
  src: true,
})
  .child(envData);


module.exports = log;
