"use strict";
exports.__esModule = true;
exports.generateId = exports.isString = void 0;
var uuid_1 = require("uuid");
console.log("You shouldn't see this in frontend");
var generateId = function () { return (0, uuid_1.v4)(); };
exports.generateId = generateId;
var isString = function (value) {
    return typeof value === "string" ? true : false;
};
exports.isString = isString;
