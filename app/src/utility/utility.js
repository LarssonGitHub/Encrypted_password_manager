"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.decryptData = exports.encryptData = exports.isString = exports.generateId = void 0;
var uuid_1 = require("uuid");
var crypto_js_1 = __importDefault(require("crypto-js"));
console.log("You shouldn't see this in frontend");
var generateId = function () { return (0, uuid_1.v4)(); };
exports.generateId = generateId;
var isString = function (value) {
    return typeof value === "string" ? true : false;
};
exports.isString = isString;
var encryptData = function (data, secretKey) {
    throw "crap";
    var encrypt = crypto_js_1["default"].AES.encrypt(JSON.stringify(data), secretKey, {
        iv: crypto_js_1["default"].enc.Hex.parse("be410fea41df7162a679875ec131cf2c"),
        mode: crypto_js_1["default"].mode.CBC,
        padding: crypto_js_1["default"].pad.Pkcs7
    });
    // TODO, throw Error when implementing error handling
    if (encrypt === undefined)
        return "ERROR";
    return encrypt.toString();
};
exports.encryptData = encryptData;
var decryptData = function (encryptedData, secretKey) {
    var decrypt = crypto_js_1["default"].AES.decrypt(encryptedData, secretKey);
    var sanitize = decrypt.toString(crypto_js_1["default"].enc.Utf8);
    // TODO, throw Error, wrong key when implementing error handling
    if (sanitize === "" || sanitize === undefined)
        return "Wrong passkey";
    return JSON.parse(sanitize);
};
exports.decryptData = decryptData;
