import { number, string } from 'yargs';
import { Card } from './card';

export interface CardCollection {
    readonly name: string;

    /**
     * Returns true if the card can be taken from the collection
     * @param card the card we want to take
     */
    canTake(card: Card): boolean;

    /**
     * Returns true if the cards can be placed on the collection
     * @param cards the cards we want to place
     */
    canPut(cards: Card[]): boolean;

    /**
     * Same as take, but it does not remove the cards from the collection
     * @param card the first card to be removed from the collection. Cards above it will be removed as well.
     */
    peak(card: Card): Card[];
    
    /**
     * Remove and return a card and the cards below it from the collection.
     * @param card the first card to be removed from the collection. Cards above it will  be removed as well.
     */
    take(card: Card): Card[];

    /**
     * Places the cards on the collection
     * @param cards the cards to be placed on the collection
     */
    put(cards: Card[]): void;
}