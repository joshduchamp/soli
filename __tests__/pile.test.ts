/// <reference types="jest" />

import { Pile } from '../src/pile';
import { Card } from '../src/card';

test('can put King on empty pile', () => {
    let pile = new Pile();
    let king = Card.KingOfHearts;
    pile.put([king]);
    expect(pile.size).toBe(1);
    expect(king.collection).toBe(pile);
});

test('cannot put non-king card on empty pile', () => {
    let pile = new Pile();
    let ace = Card.AceOfClubs;
    pile.put([ace]);
    expect(pile.isEmpty).toBe(true);
});

test('can put cards on pile in descending rank of alternating color', () => {
    let pile = new Pile();
    pile.put([Card.KingOfClubs]);
    pile.put([Card.QueenOfDiamonds]);
    pile.put([Card.JackOfSpades]);
    pile.put([Card.TenOfHearts]);
    pile.put([Card.NineOfClubs]);
    pile.put([Card.EightOfDiamonds]);
    pile.put([Card.SevenOfClubs]);
    pile.put([Card.SixOfHearts]);
    pile.put([Card.FiveOfSpades]);
    pile.put([Card.FourOfHearts]);
    pile.put([Card.ThreeOfSpades]);
    pile.put([Card.TwoOfDiamonds]);
    pile.put([Card.AceOfSpades]);
    expect(pile.size).toBe(13);
});

test('cannot put card of same color as last card on pile', () => {
    let pile = new Pile();
    pile.put([Card.KingOfDiamonds]);
    pile.put([Card.QueenOfHearts]);
    expect(pile.size).toBe(1);
});

test('cannot put card of higher rank than last card on pile', () => {
    let pile = new Pile();
    pile.put([Card.KingOfDiamonds]);
    pile.put([Card.QueenOfClubs]);
    pile.put([Card.KingOfHearts]);
    expect(pile.size).toBe(2);
});

test('cannot put card of several ranks lower on pile', () => {
    let pile = new Pile();
    pile.put([Card.KingOfDiamonds]);
    pile.put([Card.JackOfSpades]);
    expect(pile.size).toBe(1);
});

test('can take top card from pile', () => {
    let pile = new Pile();
    pile.put([Card.KingOfDiamonds]);
    let card = pile.take(Card.KingOfDiamonds);
    expect(card[0].name).toBe(Card.KingOfDiamonds.name);
});

test('can deal hidden card on pile', () => {
    let pile = new Pile();
    let card1 = Card.EightOfSpades;
    let card2 = Card.NineOfClubs;
    pile.dealHidden(card1);
    pile.dealHidden(card2);
    expect(pile.size).toBe(2);
    expect(card1.isHidden).toBe(true);
    expect(card2.isHidden).toBe(true);
    expect(card1.collection).toBe(pile);
    expect(card2.collection).toBe(pile);
});

test('can deal visible card on pile', () => {
    let pile = new Pile();
    let card = Card.EightOfSpades;
    pile.deal(card);
    expect(pile.size).toBe(1);
    expect(card.isHidden).toBe(false);
    expect(card.collection).toBe(pile);
});

test('make top card visible after taking a card', () => {
    let pile = new Pile();
    let card = Card.SixOfHearts;
    pile.dealHidden(card);
    pile.deal(Card.FourOfHearts);
    expect(card.isHidden).toBe(true);
    pile.take(Card.FourOfHearts);
    expect(card.isHidden).toBe(false);
});

test('can take multiple cards from pile', () => {
    let pile = new Pile();
    pile.put([Card.KingOfClubs]);
    pile.put([Card.QueenOfHearts]);
    pile.put([Card.JackOfClubs]);
    pile.put([Card.TenOfHearts]);
    expect(pile.size).toBe(4);
    let cards = pile.take(Card.QueenOfHearts);
    expect(pile.size).toBe(1);
    expect(cards.length).toBe(3);
});

test('can peak multiple cards from pile', () => {
    let pile = new Pile();
    pile.put([Card.KingOfClubs]);
    pile.put([Card.QueenOfHearts]);
    pile.put([Card.JackOfClubs]);
    pile.put([Card.TenOfHearts]);
    expect(pile.size).toBe(4);
    let cards = pile.peak(Card.QueenOfHearts);
    expect(pile.size).toBe(4);
    expect(cards.length).toBe(3);
});

test('when taking pile, return null if card is not found in pile', () => {
    let pile = new Pile();
    pile.put([Card.KingOfClubs]);
    pile.put([Card.QueenOfHearts]);
    expect(pile.size).toBe(2);
    let cards = pile.take(Card.SixOfHearts);
    expect(pile.size).toBe(2);
    expect(cards).toBe(null);
});

test('when taking pile, return null if card is hidden', () => {
    let pile = new Pile();
    pile.dealHidden(Card.KingOfClubs);
    pile.deal(Card.TwoOfDiamonds);
    expect(pile.size).toBe(2);
    let pile2 = pile.take(Card.KingOfDiamonds);
    expect(pile.size).toBe(2);
    expect(pile2).toBe(null);
});

test('can get pile state', () => {
    let pile = new Pile('Pile 1', [
        Card.AceOfDiamonds.hide(),
        Card.FiveOfSpades.hide(),
        Card.JackOfHearts.hide(),
        Card.JackOfSpades,
        Card.TenOfHearts
    ]);
    let pileState = pile.getState();
    expect(pileState.name).toBe('Pile 1');
    expect(pileState.cards.length).toBe(5);
});

test('can create pile from pile state', () => {
    let pileState = {
        name: 'Pile 1',
        cards: [
            Card.AceOfDiamonds.hide().getState(),
            Card.FiveOfSpades.hide().getState(),
            Card.JackOfHearts.hide().getState(),
            Card.JackOfSpades.getState(),
            Card.TenOfHearts.getState()
        ]
    };
    let pile = Pile.fromState(pileState);
    expect(pile.name).toBe('Pile 1');
    expect(pile.size).toBe(5);
});

test('constructor can deal cards and set name', () => {
    let name = 'Pile 1';
    let cards = [
        Card.AceOfSpades.hide(), 
        Card.KingOfClubs.hide(), 
        Card.JackOfClubs
    ];
    let pile = new Pile(name, cards);
    expect(pile.name).toBe(name);
    expect(pile.size).toBe(3);
    let isCollectionSet = pile.cards.every(c => c.collection?.name == pile.name);
    expect(isCollectionSet).toBe(true);
});

test('can put multiple cards on pile', () => {
    let pile = new Pile('Pile1', [
        Card.FourOfClubs
    ]);
    let cards = [
        Card.ThreeOfHearts,
        Card.TwoOfClubs
    ];
    expect(pile.size).toBe(1);
    pile.put(cards);
    expect(pile.size).toBe(3);
})