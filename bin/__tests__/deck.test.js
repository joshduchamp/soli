"use strict";
/// <reference types="jest" />
Object.defineProperty(exports, "__esModule", { value: true });
var card_1 = require("../src/card");
var deck_1 = require("../src/deck");
test('can deal cards to deck', function () {
    var deck = new deck_1.Deck();
    var cards = [card_1.Card.AceOfClubs, card_1.Card.AceOfDiamonds, card_1.Card.ThreeOfSpades];
    deck.deal(cards);
    expect(deck.size).toBe(3);
    expect(cards[0].collection).toBe(deck);
    expect(cards[1].collection).toBe(deck);
    expect(cards[2].collection).toBe(deck);
});
test('can draw card from deck', function () {
    var deck = new deck_1.Deck();
    deck.deal([
        card_1.Card.AceOfClubs,
        card_1.Card.AceOfDiamonds,
        card_1.Card.ThreeOfSpades
    ]);
    expect(deck.draw().id).toBe(card_1.Card.AceOfClubs.id);
    expect(deck.draw().id).toBe(card_1.Card.AceOfDiamonds.id);
    expect(deck.draw().id).toBe(card_1.Card.ThreeOfSpades.id);
    expect(deck.draw().id).toBe(card_1.Card.AceOfClubs.id);
    expect(deck.size).toBe(3);
});
test('draw returns null if deck is empty', function () {
    var deck = new deck_1.Deck();
    expect(deck.isEmpty).toBe(true);
    expect(deck.draw()).toBe(null);
});
test('can take last drawn card', function () {
    var deck = new deck_1.Deck();
    deck.deal([
        card_1.Card.AceOfClubs,
        card_1.Card.AceOfDiamonds,
        card_1.Card.ThreeOfSpades
    ]);
    expect(deck.size).toBe(3);
    var drawnCard1 = deck.draw();
    var drawnCard2 = deck.draw();
    var drawnCard3 = deck.draw();
    var takenCard1 = deck.take(card_1.Card.ThreeOfSpades)[0];
    var takenCard2 = deck.take(card_1.Card.AceOfDiamonds)[0];
    var takenCard3 = deck.take(card_1.Card.AceOfClubs)[0];
    expect(takenCard1.id).toBe(drawnCard3.id);
    expect(takenCard2.id).toBe(drawnCard2.id);
    expect(takenCard3.id).toBe(drawnCard1.id);
    expect(deck.isEmpty).toBe(true);
});
test('can peak last drawn card', function () {
    var deck = new deck_1.Deck();
    deck.deal([
        card_1.Card.AceOfClubs,
        card_1.Card.AceOfDiamonds,
        card_1.Card.ThreeOfSpades
    ]);
    expect(deck.size).toBe(3);
    var drawnCard = deck.draw();
    var takenCard = deck.peak(card_1.Card.AceOfClubs)[0];
    expect(takenCard.name).toBe(drawnCard.name);
    expect(deck.size).toBe(3);
});
test('can get deck state from deck', function () {
    var deck = new deck_1.Deck();
    deck.name = 'Deck';
    deck.drawnCards = [card_1.Card.AceOfSpades, card_1.Card.EightOfSpades];
    deck.hiddenCards = [card_1.Card.KingOfSpades];
    var deckState = deck.getState();
    expect(deckState.name).toBe('Deck');
    expect(deckState.drawnCards.length).toBe(2);
    expect(deckState.hiddenCards.length).toBe(1);
});
test('can create deck from deck state', function () {
    var deckState = {
        name: 'Deck',
        drawnCards: [card_1.Card.AceOfSpades, card_1.Card.EightOfSpades],
        hiddenCards: [card_1.Card.KingOfSpades]
    };
    var deck = deck_1.Deck.fromState(deckState);
    expect(deck.name).toBe('Deck');
    expect(deck.drawnCards.length).toBe(2);
    expect(deck.hiddenCards.length).toBe(1);
});
test('can create deck from name, hidden cards, and drawn cards in constructor', function () {
    var deck = new deck_1.Deck('Deck', [card_1.Card.AceOfSpades, card_1.Card.EightOfSpades], [card_1.Card.KingOfSpades]);
    expect(deck.name).toBe('Deck');
    expect(deck.drawnCards.length).toBe(2);
    expect(deck.hiddenCards.length).toBe(1);
    var isCollectionSetForDrawnCards = deck.drawnCards.every(function (c) { var _a; return ((_a = c.collection) === null || _a === void 0 ? void 0 : _a.name) == 'Deck'; });
    expect(isCollectionSetForDrawnCards).toBe(true);
    var isCollectionSetForHiddenCards = deck.hiddenCards.every(function (c) { var _a; return ((_a = c.collection) === null || _a === void 0 ? void 0 : _a.name) == 'Deck'; });
    expect(isCollectionSetForHiddenCards).toBe(true);
});
