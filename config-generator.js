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
    .usage('[options] <file ...>', list)
    .option('-o, --output [file name]', 'Output file to store the generated configuration.')
    .option('-c, --config [file name]', 'Already existing template config to be joined with the parsed configuration.')
    .version('0.0.1')
    .parse(process.argv);

var options = {
    followLinks: false
};

function extractObjectValues(idents, ast) {
    var result = Object.create(null);

    var found;
    var ident;

    if (ast) {
        jsstana.traverse(ast, function (node) {
            if (found) {
                found = false;

                result[ident] = node.type === 'Literal' ? node.value : escodegen.generate(node);
            }

            for (var i = 0; i < idents.length; i++) {
                ident = idents[i];

                if (jsstana.match('(ident ' + ident + ')', node)) {
                    found = true;

                    break;
                }
            }
        });
    }

    return result;
}

function getConfig(file, ast) {
    return new Promise(function(resolve, reject) {
        var result = [];

        jsstana.traverse(ast, function (node) {
            var match = jsstana.match('(call Loader.register ? ? ? ??)', node);

            if (match) {
                var config = {
                    file: path.basename(file),
                    module: escodegen.generate(node.arguments[0]),
                    dependencies: escodegen.generate(node.arguments[1])
                };

                var values = extractObjectValues(['path', 'fullPath', 'condition', 'group'], node.arguments[3]);

                Object.keys(values).forEach(function(key) {
                    config[key] = values[key];
                });

                result.push(config);
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

function processFile(file) {
    return new Promise(function(resolve) {
        fs.readFileAsync(file, 'utf-8')
            .then(function(content) {
                return parseFile(file, content);
            })
            .then(function(ast) {
                return getConfig(file, ast);
            })
            .then(function(config) {
                modules = modules.concat(config);

                resolve(config);
            });
    });
}

function onWalkerFile(root, fileStats, next) {
    var file = path.join(root, fileStats.name);

    var fileExt = file.substr(file.lastIndexOf('.') + 1);

    if ('js' === fileExt.toLowerCase()) {
        processFile(file)
            .then(function(config) {
                next();
            });
    }
    else {
        next();
    }
}

function onWalkerEnd(walker){
    return new Promise(function(resolve, reject) {
        walker.on('end', resolve);
    });
}

function saveConfig() {
    return new Promise(function(resolve, reject) {
        debugger;
        resolve(modules);
    });
}

var processors = [];
var modules = [];
var i;

if (program.config) {
    var configBase = require(path.resolve(program.config));
}

// For every file or folder, create a promise,
// parse the file, extract the confing and store it
// in the global modules array.
// Once all files are being processed, store the generated config.
for (i = 0; i < program.args.length; i++) {
    var file = program.args[i];

    var fileStats = fs.statSync(file);

    if (fileStats.isDirectory(file)) {
        var walker = walk.walk(file, options);

        walker.on('file', onWalkerFile);

        processors.push(onWalkerEnd(walker));
    } else if(fileStats.isFile()) {
        processors.push(processFile(file));
    }
}

Promise.all(processors)
    .then(function(uselessPromises) {
        return saveConfig();
    })
    .then(function(config) {
        console.log(config);

        console.log('Done!');
    })
    .catch(function(error) {
        console.error(error);
    });