import * as fs from 'fs';
import { Card } from './card';
import { DeckState } from './deck';
import { FoundationState } from './foundation';
import { PileState } from './pile';

export interface GameState {
    piles: PileState[];
    foundations: FoundationState[]
    deck: DeckState
}

export interface GameStateIOHandler {
    save(gameState: GameState): void;
    load(): GameState;
}

export class InMemoryGameStateIOHandler implements GameStateIOHandler {
    gameState: GameState = null;

    save(gameState: GameState): void {
        this.gameState = gameState;
    }
    
    load(): GameState {
        return this.gameState;
    }

}

export class FileGameStateIOHandler implements GameStateIOHandler {
    filename: string;

    constructor(filename: string = 'game') {
        this.filename = filename;
    }

    save(gameState: GameState): void {
        fs.writeFileSync(this.filename, JSON.stringify(gameState));
    }
    load(): GameState {
        let data = fs.readFileSync(this.filename);
        let gameState = JSON.parse(data.toString());
        return gameState;
    }
}