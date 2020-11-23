#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var card_1 = require("./card");
var game_1 = require("./game");
var gameState_1 = require("./gameState");
yargs.scriptName('soli')
    .usage('$0 <cmd> [args]')
    .command('new [filename]', 'start a new game', function (yargs) {
    yargs.positional('filename', {
        type: 'string',
        default: 'game',
        describe: 'the file to store game data in'
    });
}, newGame)
    .command('move [cardName] [ontoName]', 'move card onto card', function (yargs) {
    yargs.positional('cardName', {
        type: 'string',
        describe: 'the card to be moved'
    }).positional('ontoName', {
        type: 'string',
        describe: 'the card to move onto'
    });
}, move)
    .command('mv [cardName] [ontoName]', 'move card onto card', function (yargs) {
    yargs.positional('cardName', {
        type: 'string',
        describe: 'the card to be moved'
    }).positional('ontoName', {
        type: 'string',
        describe: 'the card to move onto'
    });
}, move)
    .command('d', 'draw card from the deck', function (yargs) { }, draw)
    .command('draw', 'draw card from the deck', function (yargs) { }, draw)
    .command('print', 'show current game state', function (yargs) { }, function () {
    var gameStateIOHandler = new gameState_1.FileGameStateIOHandler('game');
    var game = game_1.Game.fromState(gameStateIOHandler.load());
    print(game);
})
    .argv;
function newGame(argv) {
    var game = new game_1.Game();
    game.newGame();
    var gameStateIOHandler = new gameState_1.FileGameStateIOHandler(argv.filename);
    gameStateIOHandler.save(game.getState());
    print(game);
}
function move(argv) {
    var cardName = argv.cardName.toUpperCase();
    var ontoName = argv.ontoName.toUpperCase();
    var gameStateIOHandler = new gameState_1.FileGameStateIOHandler('game');
    var game = game_1.Game.fromState(gameStateIOHandler.load());
    ;
    if (game.canMove(cardName, ontoName)) {
        game.move(cardName, ontoName);
        gameStateIOHandler.save(game.getState());
    }
    else {
        console.log('Invalid move\n');
    }
    print(game);
}
function draw(argv) {
    var gameStateIOHandler = new gameState_1.FileGameStateIOHandler('game');
    var game = game_1.Game.fromState(gameStateIOHandler.load());
    game.deck.draw();
    gameStateIOHandler.save(game.getState());
    print(game);
}
function print(game) {
    var blackFG = '\x1b[30m';
    var redFG = '\x1b[31m';
    var whiteBG = '\x1b[47m';
    var lines = [];
    var line0 = blackFG;
    game.foundations.forEach(function (f) {
        line0 += f.name.padEnd(6, ' ');
    });
    line0 += '       ' + game.deck.name;
    lines.push('');
    lines.push(line0);
    lines.push('---------------------        ---------');
    var line1 = '';
    game.foundations.forEach(function (f) {
        if (f.topCard == null) {
            line1 += blackFG + '0  ';
        }
        else {
            line1 += f.topCard.color == card_1.Color.Black ? blackFG : redFG;
            line1 += f.topCard.prettyName.padEnd(3, ' ');
        }
        line1 += '   ';
    });
    line1 += '      ';
    if (game.deck.lastDrawnCard == null) {
        line1 += blackFG + '0  ';
    }
    else {
        line1 += game.deck.lastDrawnCard.color == card_1.Color.Black ? blackFG : redFG;
        line1 += game.deck.lastDrawnCard.prettyName.padEnd(3, ' ');
        ;
    }
    line1 += '   ';
    line1 += blackFG;
    if (game.deck.hiddenCards.length) {
        line1 += 'X';
    }
    else {
        line1 += '0';
    }
    lines.push(line1);
    lines.push('');
    var line2 = '';
    game.piles.forEach(function (p) {
        line2 += p.name + '    ';
    });
    lines.push(line2);
    lines.push('---------------------------------------');
    var maxPileLength = game.piles.reduce(function (len, p) { return len = p.size > len ? p.size : len; }, 0);
    var _loop_1 = function () {
        var line = '';
        game.piles.forEach(function (p) {
            if (p.cards.length > i) {
                var card = p.cards[i];
                if (card.isHidden) {
                    line += blackFG + 'X  ';
                }
                else {
                    line += card.color == card_1.Color.Black ? blackFG : redFG;
                    line += card.prettyName.padEnd(3, ' ');
                }
            }
            else {
                line += '   ';
            }
            line += '   ';
        });
        lines.push(line);
    };
    for (var i = 0; i < maxPileLength; i++) {
        _loop_1();
    }
    lines.push('');
    lines.forEach(function (line) { return console.log(whiteBG + '  ' + line.padEnd(50, ' ')); });
}
