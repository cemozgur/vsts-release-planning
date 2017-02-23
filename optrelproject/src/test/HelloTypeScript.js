"use strict";
var HelloTypeScript = (function () {
    function HelloTypeScript() {
    }
    HelloTypeScript.prototype.greeter = function (name) {
        return "Hello " + name;
    };
    return HelloTypeScript;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HelloTypeScript;
