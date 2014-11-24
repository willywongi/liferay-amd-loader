'use strict';

var escodegen = require('escodegen');
var esprima = require('esprima');
var fs = require('fs');
var jsstana = require('jsstana');
var path = require('path');
var program = require('commander');
var Promise = require('bluebird');
var walk = require('walk');


Promise.promisifyAll(fs);

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

function getConfig(file, ast) {
    return new Promise(function(resolve, reject) {
        var result = [];

        jsstana.traverse(ast, function (node) {
            var match = jsstana.match('(call Loader.register ? ? ? ??)', node);

            if (match) {
                result.push({
                    file: file,
                    module: escodegen.generate(node.arguments[0]),
                    dependencies: escodegen.generate(node.arguments[1]),
                    condition: node.arguments[3] ? escodegen.generate(node.arguments[3]) : null
                });
            }
        });

        resolve(result);
    });
}

function parseFile(file, content) {
    return new Promise(function(resolve, reject) {
        var ast = esprima.parse(content, options);

        resolve(ast);
    });
}

var modules = [];

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
                .then(function(config) {
                    modules = modules.concat(config);

                    next();
                });
        }
        else {
            next();
        }

    });

    walker.on('end', function() {
        console.log(modules);
    });
}