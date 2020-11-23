/// <reference types="jest" />

import { Game } from '../src/game';
import { Card } from '../src/card';
import { InMemoryGameStateIOHandler } from '../src/gameState';
import { Pile } from '../src/pile';
import { Foundation } from '../src/foundation';

test('can create all 52 cards', () => {
    let cards = Game.createCards();
    expect(cards.length).toBe(52);
});

test('game has 4 foundations', () => {
    let game = new Game();
    expect(game.foundations.length).toBe(4);
});

test('game has 7 piles', () => {
    let game = new Game();
    expect(game.piles.length).toBe(7);
});

test('game has a deck', () => {
    let game = new Game();
    expect(game.deck).not.toBe(undefined);
});

test('can shuffle cards', () => {
    let cards = Game.createCards();
    let cardStatePreShuffle = JSON.stringify(cards.map(c => c.getState()));
    let shuffledCards = Game.shuffle(cards);
    let cardStatePostShuffle = JSON.stringify(shuffledCards.map(c => c.getState()));
    expect(cardStatePreShuffle).not.toBe(cardStatePostShuffle);
});

test('deal cards', () => {
    let game = new Game();
    let cards = Game.createCards();
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

test('can move ace from pile to empty foundation', () => {
    let game = new Game();
    let cards = Game.createCards();
    game.deal(cards);
    // an unshuffled deal results in AceOfSpaces in pile[5]]
    let card = game.cardMap[Card.AceOfSpades.name];
    let foundation = game.foundations[0];
    expect(foundation.isEmpty).toBe(true);
    expect(game.piles[5].topCard.name).toBe(card.name);
    game.move(card.name, foundation.name);
    expect(foundation.topCard.name).toBe(card.name);
    expect(game.piles[5].topCard.name).not.toBe(card.name);
});

test('can get game state', () => {
    let game = new Game();
    let cards = Game.createCards();
    cards = Game.shuffle(cards);
    game.deal(cards);
    let gameState = game.getState();
    expect(gameState.piles.length).toBe(7);
    expect(gameState.foundations.length).toBe(4);
    expect(gameState.deck).not.toBeNull();
})

test('can create game from state', () => {
    let game1 = new Game();
    let cards = Game.createCards();
    cards = Game.shuffle(cards);
    game1.deal(cards);
    let gameState = game1.getState();
    let game2 = Game.fromState(gameState);
    expect(JSON.stringify(game1.getState())).toBe(JSON.stringify(game2.getState()));
    expect(Object.keys(game2.cardMap).length).toBe(52);
});

test('can move King to empty pile', () => {
    let game = new Game();
    let card = Card.KingOfClubs;
    let pile1 = game.piles[0];
    let pile2 = game.piles[1];
    game.cardMap[card.name] = card;
    pile1.put([card]);
    expect(pile1.size).toBe(1);
    expect(pile2.size).toBe(0);
    game.move(card.name, pile2.name);
    expect(pile1.size).toBe(0);
    expect(pile2.size).toBe(1);
});
