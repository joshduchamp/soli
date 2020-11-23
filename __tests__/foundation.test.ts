/// <reference types="jest" />

import { Foundation } from '../src/foundation';
import { Card, Suit, Rank } from '../src/card';

test('can put ace on foundation', () => {
    let foundation = new Foundation();
    let card = Card.AceOfSpades;
    foundation.put([card]);
    expect(foundation.size).toBe(1);
    expect(card.collection).toBe(foundation);
});

test('can put cards of same suit on foundation in order of rank', () => {
    let foundation = new Foundation();
    foundation.put( [Card.AceOfSpades] );
    foundation.put( [Card.TwoOfSpades] );
    foundation.put( [Card.ThreeOfSpades] );
    foundation.put( [Card.FourOfSpades] );
    foundation.put( [Card.FiveOfSpades] );
    foundation.put( [Card.SixOfSpades] );
    foundation.put( [Card.SevenOfSpades] );
    foundation.put( [Card.EightOfSpades] );
    foundation.put( [Card.NineOfSpades] );
    foundation.put( [Card.TenOfSpades] );
    foundation.put( [Card.JackOfSpades] );
    foundation.put( [Card.QueenOfSpades] );
    foundation.put( [Card.KingOfSpades] );
    expect(foundation.size).toBe(13);
});

test('can get suit of foundation', () => {
    let foundation = new Foundation();
    foundation.put( [Card.AceOfSpades] );
    expect(foundation.suit).toBe(Suit.Spades);
});

test('can put cards of same suit', () => {
    let foundation = new Foundation();
    foundation.put( [Card.AceOfSpades] );
    foundation.put( [Card.TwoOfHearts] );
    expect(foundation.size).toBe(1);
});

test('cannot put card several ranks higher', () => {
    let foundation = new Foundation();
    foundation.put( [Card.AceOfSpades] );
    foundation.put( [Card.ThreeOfSpades] );
    expect(foundation.size).toBe(1);
});

test('cannot place non-ace on empty foundation', () => {
    let foundation = new Foundation();
    foundation.put( [Card.ThreeOfSpades] );
    expect(foundation.isEmpty).toBe(true);
});

test('can take card from foundation', () => {
    let foundation = new Foundation();
    foundation.put([Card.AceOfSpades]);
    expect(foundation.size).toBe(1);
    let cards = foundation.take(Card.AceOfSpades);
    expect(foundation.size).toBe(0);
    expect(cards[0].id).toBe(Card.AceOfSpades.id);
});

test('can peak at cards', () => {
    let foundation = new Foundation();
    foundation.put([Card.AceOfSpades]);
    expect(foundation.size).toBe(1);
    let cards = foundation.peak(Card.AceOfSpades);
    expect(foundation.size).toBe(1);
    expect(cards[0].name).toBe(Card.AceOfSpades.name);
});

test('can get foundation state from foundation', () => {
    let foundation = new Foundation('Foundation 1',
        [Card.AceOfSpades, Card.TwoOfSpades]);
    let foundationState = foundation.getState();
    expect(foundationState.name).toBe('Foundation 1');
    expect(foundationState.cards.length).toBe(2);
});

test('can create foundation from foundation state', () => {
    let foundationState = {
        name: 'Foundation 1',
        cards: [Card.AceOfSpades, Card.TwoOfSpades]
    };
    let foundation = Foundation.fromState(foundationState);
    expect(foundation.name).toBe('Foundation 1');
    expect(foundation.size).toBe(2);
});

test('can create foundation with cards and name from constructor', () => {
    let cards = [
        Card.AceOfSpades,
        Card.TwoOfSpades
    ];
    let name = 'Foundation 1';
    let foundation = new Foundation(name, cards);
    expect(foundation.name).toBe('Foundation 1');
    expect(foundation.size).toBe(2);
    let isCollectionSet = foundation.cards.every(c => c.collection?.name == 'Foundation 1');
    expect(isCollectionSet).toBe(true);
});
