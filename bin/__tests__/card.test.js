"use strict";
/// <reference types="jest" />
Object.defineProperty(exports, "__esModule", { value: true });
var card_1 = require("../src/card");
test('When suit is diamonds then color is red', function () {
    var card = new card_1.Card(card_1.Suit.Diamonds, card_1.Rank.Ace);
    expect(card.color).toBe(card_1.Color.Red);
});
test('When suit is hearts then color is red', function () {
    var card = new card_1.Card(card_1.Suit.Hearts, card_1.Rank.Ace);
    expect(card.color).toBe(card_1.Color.Red);
});
test('When suit is spades then color is black', function () {
    var card = new card_1.Card(card_1.Suit.Spades, card_1.Rank.Ace);
    expect(card.color).toBe(card_1.Color.Black);
});
test('When suit is clubs then color is black', function () {
    var card = new card_1.Card(card_1.Suit.Clubs, card_1.Rank.Ace);
    expect(card.color).toBe(card_1.Color.Black);
});
test('Can get card state', function () {
    var card = card_1.Card.KingOfHearts;
    card.isHidden = true;
    var cardState = card.getState();
    expect(cardState.rank).toBe(card.rank);
    expect(cardState.suit).toBe(card.suit);
    expect(card.isHidden).toBe(card.isHidden);
});
test('Can initialize card with card state', function () {
    var cardState = {
        rank: card_1.Rank.Jack,
        suit: card_1.Suit.Diamonds,
        isHidden: true
    };
    var card = card_1.Card.fromState(cardState);
    expect(card.rank).toBe(cardState.rank);
    expect(card.suit).toBe(cardState.suit);
    expect(card.isHidden).toBe(cardState.isHidden);
});
test('Can hide card', function () {
    var card = card_1.Card.AceOfSpades;
    expect(card.isHidden).toBe(false);
    card.hide();
    expect(card.isHidden).toBe(true);
});
test('Can unhide card', function () {
    var card = card_1.Card.AceOfSpades.hide();
    expect(card.isHidden).toBe(true);
    card.hide(false);
    expect(card.isHidden).toBe(false);
});
