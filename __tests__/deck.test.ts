/// <reference types="jest" />

import { Card } from '../src/card';
import { Deck } from '../src/deck';

test('can deal cards to deck', () => {
    let deck = new Deck();
    let cards = [Card.AceOfClubs, Card.AceOfDiamonds, Card.ThreeOfSpades];
    deck.deal(cards);
    expect(deck.size).toBe(3);
    expect(cards[0].collection).toBe(deck);
    expect(cards[1].collection).toBe(deck);
    expect(cards[2].collection).toBe(deck);
});

test('can draw card from deck', () => {
    let deck = new Deck();
    deck.deal([
        Card.AceOfClubs,
        Card.AceOfDiamonds,
        Card.ThreeOfSpades
    ]);    
    expect(deck.draw().id).toBe(Card.AceOfClubs.id);
    expect(deck.draw().id).toBe(Card.AceOfDiamonds.id);
    expect(deck.draw().id).toBe(Card.ThreeOfSpades.id);
    expect(deck.draw().id).toBe(Card.AceOfClubs.id);
    expect(deck.size).toBe(3);
});

test('draw returns null if deck is empty', () => {
    let deck = new Deck();
    expect(deck.isEmpty).toBe(true);
    expect(deck.draw()).toBe(null);
});

test('can take last drawn card', () => {
    let deck = new Deck();
    deck.deal([
        Card.AceOfClubs,
        Card.AceOfDiamonds,
        Card.ThreeOfSpades
    ]);
    expect(deck.size).toBe(3);
    let drawnCard1 = deck.draw();
    let drawnCard2 = deck.draw();
    let drawnCard3 = deck.draw();
    let takenCard1 = deck.take(Card.ThreeOfSpades)[0];
    let takenCard2 = deck.take(Card.AceOfDiamonds)[0];
    let takenCard3 = deck.take(Card.AceOfClubs)[0];
    expect(takenCard1.id).toBe(drawnCard3.id);
    expect(takenCard2.id).toBe(drawnCard2.id);
    expect(takenCard3.id).toBe(drawnCard1.id);
    expect(deck.isEmpty).toBe(true);
});

test('can peak last drawn card', () => {
    let deck = new Deck();
    deck.deal([
        Card.AceOfClubs,
        Card.AceOfDiamonds,
        Card.ThreeOfSpades
    ]);
    expect(deck.size).toBe(3);
    let drawnCard = deck.draw();
    let takenCard = deck.peak(Card.AceOfClubs)[0];
    expect(takenCard.name).toBe(drawnCard.name);
    expect(deck.size).toBe(3);
});

test('can get deck state from deck', () => {
    let deck = new Deck();
    deck.name = 'Deck';
    deck.drawnCards = [Card.AceOfSpades, Card.EightOfSpades];
    deck.hiddenCards = [Card.KingOfSpades];
    let deckState = deck.getState();
    expect(deckState.name).toBe('Deck');
    expect(deckState.drawnCards.length).toBe(2);
    expect(deckState.hiddenCards.length).toBe(1);
});

test('can create deck from deck state', () => {
    let deckState = {
        name: 'Deck',
        drawnCards: [Card.AceOfSpades, Card.EightOfSpades],
        hiddenCards: [Card.KingOfSpades]
    };
    let deck = Deck.fromState(deckState);
    expect(deck.name).toBe('Deck');
    expect(deck.drawnCards.length).toBe(2);
    expect(deck.hiddenCards.length).toBe(1);
});

test('can create deck from name, hidden cards, and drawn cards in constructor', () => {
    let deck = new Deck('Deck',
        [Card.AceOfSpades, Card.EightOfSpades],
        [Card.KingOfSpades]
    );
    expect(deck.name).toBe('Deck');
    expect(deck.drawnCards.length).toBe(2);
    expect(deck.hiddenCards.length).toBe(1);
    let isCollectionSetForDrawnCards = 
        deck.drawnCards.every(c => c.collection?.name == 'Deck');
    expect(isCollectionSetForDrawnCards).toBe(true);
    let isCollectionSetForHiddenCards = 
        deck.hiddenCards.every(c => c.collection?.name == 'Deck');
    expect(isCollectionSetForHiddenCards).toBe(true);
});