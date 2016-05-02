(function(){"use strict";function e(e){return"function"==typeof e||"object"==typeof e&&null!==e}function t(e){return"function"==typeof e}function n(e){N=e}function r(e){K=e}function o(){return function(){process.nextTick(l)}}function i(){return function(){G(l)}}function s(){var e=0,t=new H(l),n=document.createTextNode("");return t.observe(n,{characterData:!0}),function(){n.data=e=++e%2}}function u(){var e=new MessageChannel;return e.port1.onmessage=l,function(){e.port2.postMessage(0)}}function a(){return function(){setTimeout(l,1)}}function l(){for(var e=0;Y>e;e+=2){var t=X[e],n=X[e+1];t(n),X[e]=void 0,X[e+1]=void 0}Y=0}function c(){try{var e=require,t=e("vertx");return G=t.runOnLoop||t.runOnContext,i()}catch(n){return a()}}function f(e,t){var n=this,r=n._state;if(r===te&&!e||r===ne&&!t)return this;var o=new this.constructor(h),i=n._result;if(r){var s=arguments[r-1];K(function(){E(r,o,s,i)})}else x(n,o,e,t);return o}function d(e){var t=this;if(e&&"object"==typeof e&&e.constructor===t)return e;var n=new t(h);return M(n,e),n}function h(){}function p(){return new TypeError("You cannot resolve a promise with itself")}function g(){return new TypeError("A promises callback cannot return that same promise.")}function _(e){try{return e.then}catch(t){return re.error=t,re}}function m(e,t,n,r){try{e.call(t,n,r)}catch(o){return o}}function v(e,t,n){K(function(e){var r=!1,o=m(n,t,function(n){r||(r=!0,t!==n?M(e,n):P(e,n))},function(t){r||(r=!0,C(e,t))},"Settle: "+(e._label||" unknown promise"));!r&&o&&(r=!0,C(e,o))},e)}function y(e,t){t._state===te?P(e,t._result):t._state===ne?C(e,t._result):x(t,void 0,function(t){M(e,t)},function(t){C(e,t)})}function b(e,n,r){n.constructor===e.constructor&&r===Z&&constructor.resolve===$?y(e,n):r===re?C(e,re.error):void 0===r?P(e,n):t(r)?v(e,n,r):P(e,n)}function M(t,n){t===n?C(t,p()):e(n)?b(t,n,_(n)):P(t,n)}function w(e){e._onerror&&e._onerror(e._result),O(e)}function P(e,t){e._state===ee&&(e._result=t,e._state=te,0!==e._subscribers.length&&K(O,e))}function C(e,t){e._state===ee&&(e._state=ne,e._result=t,K(w,e))}function x(e,t,n,r){var o=e._subscribers,i=o.length;e._onerror=null,o[i]=t,o[i+te]=n,o[i+ne]=r,0===i&&e._state&&K(O,e)}function O(e){var t=e._subscribers,n=e._state;if(0!==t.length){for(var r,o,i=e._result,s=0;s<t.length;s+=3)r=t[s],o=t[s+n],r?E(n,r,o,i):o(i);e._subscribers.length=0}}function A(){this.error=null}function j(e,t){try{return e(t)}catch(n){return oe.error=n,oe}}function E(e,n,r,o){var i,s,u,a,l=t(r);if(l){if(i=j(r,o),i===oe?(a=!0,s=i.error,i=null):u=!0,n===i)return void C(n,g())}else i=o,u=!0;n._state!==ee||(l&&u?M(n,i):a?C(n,s):e===te?P(n,i):e===ne&&C(n,i))}function L(e,t){try{t(function(t){M(e,t)},function(t){C(e,t)})}catch(n){C(e,n)}}function B(e){return new ce(this,e).promise}function k(e){function t(e){M(o,e)}function n(e){C(o,e)}var r=this,o=new r(h);if(!V(e))return C(o,new TypeError("You must pass an array to race.")),o;for(var i=e.length,s=0;o._state===ee&&i>s;s++)x(r.resolve(e[s]),void 0,t,n);return o}function R(e){var t=this,n=new t(h);return C(n,e),n}function S(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function D(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function q(e){this._id=ae++,this._state=void 0,this._result=void 0,this._subscribers=[],h!==e&&("function"!=typeof e&&S(),this instanceof q?L(this,e):D())}function I(e,t){this._instanceConstructor=e,this.promise=new e(h),Array.isArray(t)?(this._input=t,this.length=t.length,this._remaining=t.length,this._result=new Array(this.length),0===this.length?P(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&P(this.promise,this._result))):C(this.promise,this._validationError())}function F(){var e;if("undefined"!=typeof global)e=global;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=e.Promise;n&&"[object Promise]"===Object.prototype.toString.call(n.resolve())&&!n.cast||(e.Promise=le)}var T;T=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var G,N,U,V=T,Y=0,K=function(e,t){X[Y]=e,X[Y+1]=t,Y+=2,2===Y&&(N?N(l):U())},W="undefined"!=typeof window?window:void 0,z=W||{},H=z.MutationObserver||z.WebKitMutationObserver,J="undefined"!=typeof process&&"[object process]"==={}.toString.call(process),Q="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,X=new Array(1e3);U=J?o():H?s():Q?u():void 0===W&&"function"==typeof require?c():a();var Z=f,$=d,ee=void 0,te=1,ne=2,re=new A,oe=new A,ie=B,se=k,ue=R,ae=0,le=q;q.all=ie,q.race=se,q.resolve=$,q.reject=ue,q._setScheduler=n,q._setAsap=r,q._asap=K,q.prototype={constructor:q,then:Z,"catch":function(e){return this.then(null,e)}};var ce=I;I.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},I.prototype._enumerate=function(){for(var e=this.length,t=this._input,n=0;this._state===ee&&e>n;n++)this._eachEntry(t[n],n)},I.prototype._eachEntry=function(e,t){var n=this._instanceConstructor,r=n.resolve;if(r===$){var o=_(e);if(o===Z&&e._state!==ee)this._settledAt(e._state,t,e._result);else if("function"!=typeof o)this._remaining--,this._result[t]=e;else if(n===le){var i=new n(h);b(i,e,o),this._willSettleAt(i,t)}else this._willSettleAt(new n(function(t){t(e)}),t)}else this._willSettleAt(r(e),t)},I.prototype._settledAt=function(e,t,n){var r=this.promise;r._state===ee&&(this._remaining--,e===ne?C(r,n):this._result[t]=n),0===this._remaining&&P(r,this._result)},I.prototype._willSettleAt=function(e,t){var n=this;x(e,void 0,function(e){n._settledAt(te,t,e)},function(e){n._settledAt(ne,t,e)})};var fe=F,de={Promise:le,polyfill:fe};"function"==typeof define&&define.amd?define(function(){return de}):"undefined"!=typeof module&&module.exports?module.exports=de:"undefined"!=typeof this&&(this.ES6Promise=de),fe()}).call(this),function(){var global={};global.__CONFIG__=window.__CONFIG__,function(e,t){"use strict";var n=t(e);"object"==typeof module&&module&&(module.exports=n),"function"==typeof define&&define.amd&&define(t),e.EventEmitter=n}("undefined"!=typeof global?global:this,function(e){"use strict";function t(){this._events={}}return t.prototype={constructor:t,on:function(e,t){var n=this._events[e]=this._events[e]||[];n.push(t)},off:function(e,t){var n=this._events[e];if(n){var r=n.indexOf(t);r>-1&&n.splice(r,1)}},emit:function(e,t){var n=this._events[e];if(n){n=n.slice(0);for(var r=0;r<n.length;r++){var o=n[r];o.call(o,t)}}}},t}),function(e,t){"use strict";var n=t(e);"object"==typeof module&&module&&(module.exports=n),"function"==typeof define&&define.amd&&define(t),e.ConfigParser=n}("undefined"!=typeof global?global:this,function(e){"use strict";function t(e){this._config={},this._modules={},this._conditionalModules={},this._parseConfig(e)}return t.prototype={constructor:t,addModule:function(e){var t=this._modules[e.name];if(t)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);else this._modules[e.name]=e;return this._registerConditionalModule(e),this._modules[e.name]},getConfig:function(){return this._config},getConditionalModules:function(){return this._conditionalModules},getModules:function(){return this._modules},mapModule:function(e){if(!this._config.maps)return e;var t;t=Array.isArray(e)?e:[e];for(var n=0;n<t.length;n++){var r=t[n],o=!1;for(var i in this._config.maps)if(Object.prototype.hasOwnProperty.call(this._config.maps,i)&&(r===i||0===r.indexOf(i+"/"))){r=this._config.maps[i]+r.substring(i.length),t[n]=r,o=!0;break}o||"function"!=typeof this._config.maps["*"]||(t[n]=this._config.maps["*"](r))}return Array.isArray(e)?t:t[0]},_parseConfig:function(e){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&("modules"===t?this._parseModules(e[t]):this._config[t]=e[t]);return this._config},_parseModules:function(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var n=e[t];n.name=t,this.addModule(n)}return this._modules},_registerConditionalModule:function(e){if(e.condition){var t=this._conditionalModules[e.condition.trigger];t||(this._conditionalModules[e.condition.trigger]=t=[]),t.push(e.name)}}},t}),function(e,t){"use strict";var n=t(e);"object"==typeof module&&module&&(module.exports=n),"function"==typeof define&&define.amd&&define(t),e.DependencyBuilder=n}("undefined"!=typeof global?global:this,function(global){"use strict";function DependencyBuilder(e){this._configParser=e,this._pathResolver=new global.PathResolver,this._result=[]}var hasOwnProperty=Object.prototype.hasOwnProperty;return DependencyBuilder.prototype={constructor:DependencyBuilder,resolveDependencies:function(e){this._queue=e.slice(0);var t;try{this._resolveDependencies(),t=this._result.reverse().slice(0)}finally{this._cleanup()}return t},_cleanup:function(){var e=this._configParser.getModules();for(var t in e)if(hasOwnProperty.call(e,t)){var n=e[t];n.conditionalMark=!1,n.mark=!1,n.tmpMark=!1}this._queue.length=0,this._result.length=0},_processConditionalModules:function(e){var t=this._configParser.getConditionalModules()[e.name];if(t&&!e.conditionalMark){for(var n=this._configParser.getModules(),r=0;r<t.length;r++){var o=n[t[r]];-1===this._queue.indexOf(o.name)&&this._testConditionalModule(o.condition.test)&&this._queue.push(o.name)}e.conditionalMark=!0}},_resolveDependencies:function(){for(var e=this._configParser.getModules(),t=0;t<this._queue.length;t++){var n=e[this._queue[t]];n||(n=this._configParser.addModule({name:this._queue[t],dependencies:[]})),n.mark||this._visit(n)}},_testConditionalModule:function(testFunction){return"function"==typeof testFunction?testFunction():eval("false || "+testFunction)()},_visit:function(e){if(e.tmpMark)throw new Error("Error processing module: "+e.name+". The provided configuration is not Directed Acyclic Graph.");if(this._processConditionalModules(e),!e.mark){e.tmpMark=!0;for(var t=this._configParser.getModules(),n=0;n<e.dependencies.length;n++){var r=e.dependencies[n];if("exports"!==r&&"module"!==r){r=this._pathResolver.resolvePath(e.name,r);var o=this._configParser.mapModule(r),i=t[o];i||(i=this._configParser.addModule({name:o,dependencies:[]})),this._visit(i)}}e.mark=!0,e.tmpMark=!1,this._result.unshift(e.name)}},_queue:[]},DependencyBuilder}),function(e,t){"use strict";var n=t(e);"object"==typeof module&&module&&(module.exports=n),"function"==typeof define&&define.amd&&define(t),e.URLBuilder=n}("undefined"!=typeof global?global:this,function(e){"use strict";function t(e){this._configParser=e}var n=/^https?:\/\/|\/\/|www\./;return t.prototype={constructor:t,build:function(e){var t=[],r=[],o=[],i=[],s=[],u=this._configParser.getConfig(),a=u.basePath||"",l=this._configParser.getModules();a.length&&"/"!==a.charAt(a.length-1)&&(a+="/");for(var c=0;c<e.length;c++){var f=l[e[c]];if(f.fullPath)s.push({modules:[f.name],url:f.fullPath});else{var d=this._getModulePath(f),h=0===d.indexOf("/");n.test(d)?s.push({modules:[f.name],url:d}):!u.combine||f.anonymous?s.push({modules:[f.name],url:u.url+(h?"":a)+d}):h?(t.push(d),o.push(f.name)):(r.push(d),i.push(f.name))}f.requested=!0}return r.length&&(s=s.concat(this._generateBufferURLs(i,r,{basePath:a,url:u.url,urlMaxLength:u.urlMaxLength})),r.length=0),t.length&&(s=s.concat(this._generateBufferURLs(o,t,{url:u.url,urlMaxLength:u.urlMaxLength})),t.length=0),s},_generateBufferURLs:function(e,t,n){var r,o=n.basePath||"",i=[],s=n.urlMaxLength||2e3,u={modules:[e[0]],url:n.url+o+t[0]};for(r=1;r<t.length;r++){var a=e[r],l=t[r];u.url.length+o.length+l.length+1<s?(u.modules.push(a),u.url+="&"+o+l):(i.push(u),u={modules:[a],url:n.url+o+l})}return i.push(u),i},_getModulePath:function(e){var t=e.path||e.name,r=this._configParser.getConfig().paths||{},o=!1;return Object.keys(r).forEach(function(e){t!==e&&0!==t.indexOf(e+"/")||(t=r[e]+t.substring(e.length))}),o||"function"!=typeof r["*"]||(t=r["*"](t)),n.test(t)||t.indexOf(".js")===t.length-3||(t+=".js"),t}},t}),function(e,t){"use strict";var n=t(e);"object"==typeof module&&module&&(module.exports=n),"function"==typeof define&&define.amd&&define(t),e.PathResolver=n}("undefined"!=typeof global?global:this,function(e){"use strict";function t(){}return t.prototype={constructor:t,resolvePath:function(e,t){if("exports"===t||"module"===t||0!==t.indexOf(".")&&0!==t.indexOf(".."))return t;var n=e.split("/");n.splice(-1,1);for(var r=t.split("/"),o=r.splice(-1,1),i=0;i<r.length;i++){var s=r[i];if("."!==s)if(".."===s){if(!n.length){n=n.concat(r.slice(i));break}n.splice(-1,1)}else n.push(s)}return n.push(o),n.join("/")}},t}),function(e,t){"use strict";var n=t(e);"object"==typeof module&&module&&(module.exports=n),"function"==typeof define&&define.amd&&define(t),e.Loader=new n,e.require=e.Loader.require.bind(e.Loader),e.define=e.Loader.define.bind(e.Loader),e.define.amd={}}("undefined"!=typeof global?global:this,function(e){"use strict";function t(n){t.superclass.constructor.apply(this,arguments),this._config=n||e.__CONFIG__,this._modulesMap={}}t.prototype=Object.create(e.EventEmitter.prototype),t.prototype.constructor=t,t.superclass=e.EventEmitter.prototype;var n={addModule:function(e){return this._getConfigParser().addModule(e)},define:function(e,t,n,r){var o=this;r=r||{};var i=arguments.length;if(r.anonymous=!1,2>i?(n=arguments[0],t=["module","exports"],r.anonymous=!0):2===i&&("string"==typeof e?(t=["module","exports"],n=arguments[1]):(t=arguments[0],n=arguments[1],r.anonymous=!0)),r.anonymous){var s=function(e){if(o.off("scriptLoaded",s),1!==e.length)throw new Error("Multiple anonymous modules cannot be served via combo service. Please set `combine` to `false` or describe the modules in the config and mark them as anonymous.",e);var i=e[0];o._define(i,t,n,r)};o.on("scriptLoaded",s)}else this._define(e,t,n,r)},getConditionalModules:function(){return this._getConfigParser().getConditionalModules()},getModules:function(){return this._getConfigParser().getModules()},require:function(){var e,t,n,r,o=this;if(Array.isArray(arguments[0]))n=arguments[0],r="function"==typeof arguments[1]?arguments[1]:null,e="function"==typeof arguments[2]?arguments[2]:null;else for(n=[],t=0;t<arguments.length;++t)if("string"==typeof arguments[t])n[t]=arguments[t];else if("function"==typeof arguments[t]){r=arguments[t],e="function"==typeof arguments[++t]?arguments[t]:null;break}var i,s=o._getConfigParser(),u=s.mapModule(n);new Promise(function(e,t){o._resolveDependencies(u).then(function(r){var a=s.getConfig();0!==a.waitTimeout&&(i=setTimeout(function(){var e=s.getModules(),o=new Error("Load timeout for modules: "+n);o.dependecies=r,o.mappedModules=u,o.missingDependencies=r.filter(function(t){return!e[t].implementation}),o.modules=n,t(o)},a.waitTimeout||7e3)),o._loadModules(r).then(e,t)},t)}).then(function(e){if(clearTimeout(i),r){var t=o._getModuleImplementations(u);r.apply(r,t)}},function(t){clearTimeout(i),e&&e.call(e,t)})},_createModulePromise:function(e){var t=this;return new Promise(function(n,r){var o=t._getConfigParser().getModules(),i=o[e];if(i.exports){var s=t._getValueGlobalNS(i.exports);if(s)n(s);else{var u=function(o){if(o.indexOf(e)>=0){t.off("scriptLoaded",u);var s=t._getValueGlobalNS(i.exports);s?n(s):r(new Error("Module "+e+" does not export the specified value: "+i.exports))}};t.on("scriptLoaded",u)}}else{var a=function(r){r===e&&(t.off("moduleRegister",a),t._modulesMap[e]=!0,n(e))};t.on("moduleRegister",a)}})},_define:function(e,t,n,r){var o=r||{},i=this._getConfigParser(),s=this._getPathResolver();t=t.map(function(t){return s.resolvePath(e,t)}),o.name=e,o.dependencies=t,o.pendingImplementation=n,i.addModule(o),this._modulesMap[o.name]||(this._modulesMap[o.name]=!0),this.emit("moduleRegister",e)},_getConfigParser:function(){return this._configParser||(this._configParser=new e.ConfigParser(this._config)),this._configParser},_getDependencyBuilder:function(){return this._dependencyBuilder||(this._dependencyBuilder=new e.DependencyBuilder(this._getConfigParser())),this._dependencyBuilder},_getValueGlobalNS:function(e){return(0,eval)("this")[e]},_getMissingDepenencies:function(e){for(var t=this._getConfigParser(),n=t.getModules(),r=Object.create(null),o=0;o<e.length;o++)for(var i=n[e[o]],s=t.mapModule(i.dependencies),u=0;u<s.length;u++){var a=s[u],l=n[a];"exports"===a||"module"===a||l&&l.pendingImplementation||(r[a]=1)}return Object.keys(r)},_getModuleImplementations:function(e){for(var t=[],n=this._getConfigParser().getModules(),r=0;r<e.length;r++){var o=n[e[r]];t.push(o?o.implementation:void 0)}return t},_getPathResolver:function(){return this._pathResolver||(this._pathResolver=new e.PathResolver),this._pathResolver},_getURLBuilder:function(){return this._urlBuilder||(this._urlBuilder=new e.URLBuilder(this._getConfigParser())),this._urlBuilder},_filterModulesByProperty:function(e,t){var n=t;"string"==typeof t&&(n=[t]);for(var r=[],o=this._getConfigParser().getModules(),i=0;i<e.length;i++){var s=e[i],u=o[e[i]];if(u){if("exports"!==u&&"module"!==u){for(var a=0,l=0;l<n.length;l++)if(u[n[l]]){a=!0;break}a||r.push(s)}}else r.push(s)}return r},_loadModules:function(e){var t=this;return new Promise(function(n,r){var o=t._filterModulesByProperty(e,["requested","pendingImplementation"]);if(o.length){for(var i=t._getURLBuilder().build(o),s=[],u=0;u<i.length;u++)s.push(t._loadScript(i[u]));Promise.all(s).then(function(n){return t._waitForModules(e)}).then(function(e){n(e)})["catch"](function(e){r(e)})}else t._waitForModules(e).then(function(e){n(e)})["catch"](function(e){r(e)})})},_loadScript:function(e){var t=this;return new Promise(function(n,r){var o=document.createElement("script");o.src=e.url,o.onload=o.onreadystatechange=function(){this.readyState&&"complete"!==this.readyState&&"load"!==this.readyState||(o.onload=o.onreadystatechange=null,n(o),t.emit("scriptLoaded",e.modules))},o.onerror=function(){document.head.removeChild(o),r(o)},document.head.appendChild(o)})},_resolveDependencies:function(e){var t=this;return new Promise(function(n,r){try{var o=t._getDependencyBuilder().resolveDependencies(e);n(o)}catch(i){r(i)}})},_setModuleImplementation:function(e){for(var t=this._getConfigParser().getModules(),n=0;n<e.length;n++){var r=e[n];if(!r.implementation)if(r.exports)r.pendingImplementation=r.implementation=this._getValueGlobalNS(r.exports);else{for(var o,i=[],s=this._getConfigParser(),u=0;u<r.dependencies.length;u++){var a=r.dependencies[u];if("exports"===a)o={},i.push(o);else if("module"===a)o={exports:{}},i.push(o);else{var l=t[s.mapModule(a)],c=l.implementation;i.push(c)}}var f;f="function"==typeof r.pendingImplementation?r.pendingImplementation.apply(r.pendingImplementation,i):r.pendingImplementation,f?r.implementation=f:o&&(r.implementation=o.exports||o)}}},_waitForModule:function(e){var t=this,n=t._modulesMap[e];return n||(n=t._createModulePromise(e),t._modulesMap[e]=n),n},_waitForModules:function(e){var t=this;return new Promise(function(n,r){for(var o=[],i=0;i<e.length;i++)o.push(t._waitForModule(e[i]));Promise.all(o).then(function(o){var i=t._getConfigParser().getModules(),s=function(){for(var r=[],o=0;o<e.length;o++)r.push(i[e[o]]);t._setModuleImplementation(r),n(r)},u=t._getMissingDepenencies(e);u.length?t.require(u,s,r):s()},r)})}};return Object.keys(n).forEach(function(e){t.prototype[e]=n[e]}),t}),window.Loader=global.Loader,window.require=global.require,window.define=global.define}();