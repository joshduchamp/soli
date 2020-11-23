/// <reference types="jest" />

import { Card, Suit, Rank, Color } from '../src/card';

test('When suit is diamonds then color is red', () => {
    let card = new Card(Suit.Diamonds, Rank.Ace);
    expect(card.color).toBe(Color.Red);
});

test('When suit is hearts then color is red', () => {
    let card = new Card(Suit.Hearts, Rank.Ace);
    expect(card.color).toBe(Color.Red);
});

test('When suit is spades then color is black', () => {
    let card = new Card(Suit.Spades, Rank.Ace);
    expect(card.color).toBe(Color.Black);
});

test('When suit is clubs then color is black', () => {
    let card = new Card(Suit.Clubs, Rank.Ace);
    expect(card.color).toBe(Color.Black);
});

test('Can get card state', () => {
    let card = Card.KingOfHearts;
    card.isHidden = true;
    let cardState = card.getState();
    expect(cardState.rank).toBe(card.rank);
    expect(cardState.suit).toBe(card.suit);
    expect(card.isHidden).toBe(card.isHidden);
});

test('Can initialize card with card state', () => {
    let cardState = {
        rank: Rank.Jack,
        suit: Suit.Diamonds,
        isHidden: true
    };
    let card = Card.fromState(cardState);
    expect(card.rank).toBe(cardState.rank);
    expect(card.suit).toBe(cardState.suit);
    expect(card.isHidden).toBe(cardState.isHidden);
});

test('Can hide card', () => {
    let card = Card.AceOfSpades;
    expect(card.isHidden).toBe(false);
    card.hide();
    expect(card.isHidden).toBe(true);
});

test('Can unhide card', () => {
    let card = Card.AceOfSpades.hide()
    expect(card.isHidden).toBe(true);
    card.hide(false);
    expect(card.isHidden).toBe(false);
})