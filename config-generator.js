'use strict';

var esprima = require('esprima');
var eswalk = require('eswalk');
var fs = require('fs');
var path = require('path');
var program = require('commander');
var Promise = require('bluebird');
var walk = require('walk');


Promise.promisifyAll(fs);
Promise.promisifyAll(eswalk);

function list(value) {
    return value.split(',').map(String);
}

program
    .option('-f, --file [file name]', 'List of files or folders to parse.', list)
    .option('-o, --output [file name]', 'Output file to store the generated configuration.')
    .option('-c, --config [file name]', 'Already existing template config to be joined with the parsed configuration.')
    .version('0.0.1')
    .parse(process.argv);


var options = {
    followLinks: false
};

function parseFile(file, content) {
    return new Promise(function(resolve, reject) {
        var ast = esprima.parse(content, options);

        resolve(ast);
    });
}

function getConfig(file, ast) {
    return new Promise(function(resolve, reject) {
        eswalk(ast, function(node, parent) {
            if (node.type == 'ExpressionStatement' &&
                node.expression.type == 'CallExpression' &&
                node.expression.callee.object &&
                node.expression.callee.object.type == 'type' &&
                node.expression.callee.object.name == 'Loader' &&
                node.expression.callee.property &&
                node.expression.callee.property.type == 'Identifier' &&
                node.expression.callee.property.name == 'register') {

                debugger;
            }
        });

        resolve();
    });
}

for (var i = 0; i < program.file.length; i++) {
    var walker = walk.walk(program.file[i], options);

    walker.on('file', function(root, fileStats, next) {
        var file = path.join(root, fileStats.name);

        var fileExt = file.substr(file.lastIndexOf('.') + 1);

        if ('js' === fileExt.toLowerCase()) {
            fs.readFileAsync(file, 'utf-8')
                .then(function(content) {
                    return parseFile(file, content);
                })
                .then(function(ast) {
                    return getConfig(file, ast);
                })
                .then(function() {
                    next();
                });
        }
        else {
            next();
        }

    });
}