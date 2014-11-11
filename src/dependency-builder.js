'use strict';

function DependencyBuilder(config) {
    this._config = config;

    this._init(config);
}

DependencyBuilder.prototype = {
    constructor: DependencyBuilder,

    resolve: function(modules) {
        var i,
            isDepsAray,
            module,
            result;

        isDepsAray = Array.isArray ? Array.isArray(modules) :
            Object.prototype.toString.call(modules) === '[object Array]';

        if (!isDepsAray) {
            modules = arguments;
        }

        for (i = 0; i < modules.length; i++) {
            module = this._config.modules[modules[i]];

            if (!module.mark) {
                this._visit(module);
            }
        }

        result = this._result.reverse().slice(0);

        this._cleanup();

        return result;
    },

    _cleanup: function() {
        var hasOwnProperty,
            key = 0,
            module;

        hasOwnProperty = Object.prototype.hasOwnProperty;

        for (key in this._config.modules) {
            if (hasOwnProperty.call(this._config.modules, key)) {
                module = this._config.modules[key];

                module.mark = false;
                module.tmpMark = false;
            }
        }

        this._result.length = 0;
    },

    _init: function(config) {
        var hasOwnProperty,
            key = 0,
            module;

        this._conditionalModules = {};

        hasOwnProperty = Object.prototype.hasOwnProperty;

        for (key in this._config.modules) {
            if (hasOwnProperty.call(this._config.modules, key)) {
                module = this._config.modules[key];

                module.name = key;

                this._initConditionalModule(module);
            }
        }
    },

    _initConditionalModule: function(module) {
        var existingModules;

        if (module.condition) {
            existingModules = this._conditionalModules[module.condition.trigger];

            if (!existingModules) {
                this._conditionalModules[module.condition.trigger] = existingModules = [];
            }

            existingModules.push(module.name);
        }
    },

    _visit: function(module) {
        var i,
            moduleDependency;

        if (module.tmpMark) {
            throw new Error('Fuck, not DAG');
        }

        if (!module.mark) {
            module.tmpMark = true;

            for (i = 0; i < module.deps.length; i++) {
                moduleDependency = this._config.modules[module.deps[i]];

                this._visit(moduleDependency, this._config.modules);
            }

            module.mark = true;

            module.tmpMark = false;

            this._result.unshift(module.name);
        }
    },

    _result: []
};

module.exports = DependencyBuilder;