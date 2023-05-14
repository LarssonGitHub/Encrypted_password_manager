"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.db = void 0;
// import * as SQL from "sqlite3";
var SQL = require("sqlite3").verbose();
var path = __importStar(require("path"));
// Valuable sources for further testing
// https://www.youtube.com/watch?v=mnH_1YGR2PM&ab_channel=CodingWithMike
// https://blog.pagesd.info/2019/10/29/use-sqlite-node-async-await/
var createSQLtable = "CREATE TABLE IF NOT EXISTS books (\n  book_id SERIAL PRIMARY KEY,\n  title VARCHAR(100) NOT NULL,\n  author VARCHAR(100) NOT NULL,\n  comments TEXT\n);";
var insertIntoTable = "INSERT INTO Books (Title, Author, Comments) VALUES\n  ('Mrs. Bridge', 'Evan S. Connell', 'First of the series'),\n  ('Mr. Bridge', 'Evan S. Connell', 'Second in the series'),\n  ('Ling\u00E9nue libertine', 'Colette', 'Minne + Les \u00E9garements de Minne');";
var getTable = "SELECT * FROM Books ORDER BY Title";
// If error 14 occurs, check if data.db exists in src folder
exports.db = new SQL.Database(path.resolve(__dirname, "./data.db"), SQL.OPEN_READWRITE, function (err) {
    if (err)
        return console.log("Couldn't connect to DB: Error:", err);
    console.log("connected to DB!");
    testDB();
});
// TODO rework into async functions
var testDB = function () {
    try {
        // Create table
        exports.db.run(createSQLtable, function (err) {
            if (err)
                return console.log("Couldn't create table", err);
            console.log("created table");
            // insert into table
            exports.db.run(insertIntoTable, function (err) {
                if (err)
                    return console.log("Couldn't insert into table", err);
                console.log("inserted into table");
                // Get data
                exports.db.all(getTable, function (err, rows) {
                    if (err)
                        return console.log("Couldn't create db", err);
                    if (rows.length < 1)
                        return console.log("No table match");
                    return console.log("Rows: ", rows);
                });
            });
        });
    }
    catch (error) {
        console.log("error:", error);
    }
};
