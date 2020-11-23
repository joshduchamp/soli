#!/usr/bin/env node

import yargs = require('yargs');
import { Color } from './card';
import { Game } from './game';
import { FileGameStateIOHandler } from './gameState';

yargs.scriptName('soli')
    .usage('$0 <cmd> [args]')
    .command('new [filename]', 'start a new game', (yargs) => {
        yargs.positional('filename', {
            type: 'string',
            default: 'game',
            describe: 'the file to store game data in'
        })
    }, newGame)
    .command('move [cardName] [ontoName]', 'move card onto card', (yargs) => {
        yargs.positional('cardName', {
            type: 'string',
            describe: 'the card to be moved'
        }).positional('ontoName', {
            type: 'string',
            describe:'the card to move onto'
        })
    }, move)
    .command('mv [cardName] [ontoName]', 'move card onto card', (yargs) => {
        yargs.positional('cardName', {
            type: 'string',
            describe: 'the card to be moved'
        }).positional('ontoName', {
            type: 'string',
            describe:'the card to move onto'
        })
    }, move)
    .command('d', 'draw card from the deck', yargs => {}, draw)
    .command('draw', 'draw card from the deck', yargs => {}, draw)
    .command('print', 'show current game state', yargs => {}, function() {
        let gameStateIOHandler = new FileGameStateIOHandler('game');
        let game = Game.fromState(gameStateIOHandler.load());
        print(game);
    })
    .argv;

function newGame(argv: any) {
    let game = new Game();
    game.newGame();
    let gameStateIOHandler = new FileGameStateIOHandler(argv.filename);
    gameStateIOHandler.save(game.getState());
    print(game);
}

function move(argv: any) {
    let cardName = argv.cardName.toUpperCase();
    let ontoName = argv.ontoName.toUpperCase();
    let gameStateIOHandler = new FileGameStateIOHandler('game');
    let game = Game.fromState(gameStateIOHandler.load());;
    if (game.canMove(cardName, ontoName)) {
        game.move(cardName, ontoName);
        gameStateIOHandler.save(game.getState());
    } else {
        console.log('Invalid move\n');
    }
    print(game);
}

function draw(argv: any) {
    let gameStateIOHandler = new FileGameStateIOHandler('game');
    let game = Game.fromState(gameStateIOHandler.load());
    game.deck.draw();
    gameStateIOHandler.save(game.getState());
    print(game);
}

function print(game: Game) {
    const blackFG = '\x1b[30m';
    const redFG = '\x1b[31m';
    const whiteBG = '\x1b[47m';
    let lines = [];
    let line0 = blackFG;
    game.foundations.forEach(f => {
        line0 += f.name.padEnd(6, ' ');
    })
    line0 += '       ' + game.deck.name
    lines.push('');
    lines.push(line0);
    lines.push('---------------------        ---------');
    let line1 = '';
    game.foundations.forEach(f => {
        if (f.topCard == null) {
            line1 += blackFG + '0  ';
        } else {
            line1 += f.topCard.color == Color.Black ? blackFG : redFG;
            line1 += f.topCard.prettyName.padEnd(3, ' ');
        }
        line1 += '   ';
    });
    line1 += '      '
    if (game.deck.lastDrawnCard == null) {
        line1 += blackFG + '0  ';
    } else {
        line1 += game.deck.lastDrawnCard.color == Color.Black ? blackFG : redFG;
        line1 += game.deck.lastDrawnCard.prettyName.padEnd(3, ' ');;
    }
    line1 += '   ';
    line1 += blackFG;
    if (game.deck.hiddenCards.length) {
        line1 += 'X'
    } else {
        line1 += '0'
    }
    lines.push(line1);
    lines.push('');
    let line2 = '';
    game.piles.forEach(p => {
        line2 += p.name + '    ';
    })
    lines.push(line2);
    lines.push('---------------------------------------');
    let maxPileLength = game.piles.reduce((len,p) => len = p.size > len ? p.size : len, 0);
    for(var i = 0; i < maxPileLength; i++) {
        let line = '';
        game.piles.forEach(p => {
            if (p.cards.length > i) {
                let card = p.cards[i];
                if (card.isHidden) {
                    line += blackFG + 'X  ';
                } else {
                    line += card.color == Color.Black ? blackFG : redFG;
                    line += card.prettyName.padEnd(3, ' ');
                }
            } else {
                line += '   ';
            }
            line += '   ';
        });
        lines.push(line);
    }
    lines.push('');
    lines.forEach(line => console.log(whiteBG + '  ' + line.padEnd(50,' ')));
}