var program = require('comander');
var fs = require('fs');
var Promise = require('bluebird');
var walk = require('walk');


Promise.promisifyAll(fs);
Promise.promisifyAll(walk);

function list(value) {
    return value.split(',').map(String);
}

program
    .option('-f, --file [file name]', 'List of files or folders to parse.', list)
    .option('-o, --output [file name]', 'Output file to store the generated configuration.')
    .version('0.0.6')
    .parse(process.argv);