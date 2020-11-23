"use strict";
/// <reference types="jest" />
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("../src/game");
var card_1 = require("../src/card");
test('can create all 52 cards', function () {
    var cards = game_1.Game.createCards();
    expect(cards.length).toBe(52);
});
test('game has 4 foundations', function () {
    var game = new game_1.Game();
    expect(game.foundations.length).toBe(4);
});
test('game has 7 piles', function () {
    var game = new game_1.Game();
    expect(game.piles.length).toBe(7);
});
test('game has a deck', function () {
    var game = new game_1.Game();
    expect(game.deck).not.toBe(undefined);
});
test('can shuffle cards', function () {
    var cards = game_1.Game.createCards();
    var cardStatePreShuffle = JSON.stringify(cards.map(function (c) { return c.getState(); }));
    var shuffledCards = game_1.Game.shuffle(cards);
    var cardStatePostShuffle = JSON.stringify(shuffledCards.map(function (c) { return c.getState(); }));
    expect(cardStatePreShuffle).not.toBe(cardStatePostShuffle);
});
test('deal cards', function () {
    var game = new game_1.Game();
    var cards = game_1.Game.createCards();
    game.deal(cards);
    expect(game.piles[0].size).toBe(1);
    expect(game.piles[1].size).toBe(2);
    expect(game.piles[2].size).toBe(3);
    expect(game.piles[3].size).toBe(4);
    expect(game.piles[4].size).toBe(5);
    expect(game.piles[5].size).toBe(6);
    expect(game.piles[6].size).toBe(7);
    expect(game.deck.size).toBe(24);
    expect(Object.keys(game.cardMap).length).toBe(52);
});
test('can move ace from pile to empty foundation', function () {
    var game = new game_1.Game();
    var cards = game_1.Game.createCards();
    game.deal(cards);
    // an unshuffled deal results in AceOfSpaces in pile[5]]
    var card = game.cardMap[card_1.Card.AceOfSpades.name];
    var foundation = game.foundations[0];
    expect(foundation.isEmpty).toBe(true);
    expect(game.piles[5].topCard.name).toBe(card.name);
    game.move(card.name, foundation.name);
    expect(foundation.topCard.name).toBe(card.name);
    expect(game.piles[5].topCard.name).not.toBe(card.name);
});
test('can get game state', function () {
    var game = new game_1.Game();
    var cards = game_1.Game.createCards();
    cards = game_1.Game.shuffle(cards);
    game.deal(cards);
    var gameState = game.getState();
    expect(gameState.piles.length).toBe(7);
    expect(gameState.foundations.length).toBe(4);
    expect(gameState.deck).not.toBeNull();
});
test('can create game from state', function () {
    var game1 = new game_1.Game();
    var cards = game_1.Game.createCards();
    cards = game_1.Game.shuffle(cards);
    game1.deal(cards);
    var gameState = game1.getState();
    var game2 = game_1.Game.fromState(gameState);
    expect(JSON.stringify(game1.getState())).toBe(JSON.stringify(game2.getState()));
    expect(Object.keys(game2.cardMap).length).toBe(52);
});
test('can move King to empty pile', function () {
    var game = new game_1.Game();
    var card = card_1.Card.KingOfClubs;
    var pile1 = game.piles[0];
    var pile2 = game.piles[1];
    game.cardMap[card.name] = card;
    pile1.put([card]);
    expect(pile1.size).toBe(1);
    expect(pile2.size).toBe(0);
    game.move(card.name, pile2.name);
    expect(pile1.size).toBe(0);
    expect(pile2.size).toBe(1);
});
