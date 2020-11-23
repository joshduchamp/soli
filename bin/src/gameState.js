"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileGameStateIOHandler = exports.InMemoryGameStateIOHandler = void 0;
var fs = require("fs");
var InMemoryGameStateIOHandler = /** @class */ (function () {
    function InMemoryGameStateIOHandler() {
        this.gameState = null;
    }
    InMemoryGameStateIOHandler.prototype.save = function (gameState) {
        this.gameState = gameState;
    };
    InMemoryGameStateIOHandler.prototype.load = function () {
        return this.gameState;
    };
    return InMemoryGameStateIOHandler;
}());
exports.InMemoryGameStateIOHandler = InMemoryGameStateIOHandler;
var FileGameStateIOHandler = /** @class */ (function () {
    function FileGameStateIOHandler(filename) {
        if (filename === void 0) { filename = 'game'; }
        this.filename = filename;
    }
    FileGameStateIOHandler.prototype.save = function (gameState) {
        fs.writeFileSync(this.filename, JSON.stringify(gameState));
    };
    FileGameStateIOHandler.prototype.load = function () {
        var data = fs.readFileSync(this.filename);
        var gameState = JSON.parse(data.toString());
        return gameState;
    };
    return FileGameStateIOHandler;
}());
exports.FileGameStateIOHandler = FileGameStateIOHandler;
