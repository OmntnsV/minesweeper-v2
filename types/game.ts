import {Difficulty, FieldSize, CellContent} from "~/types/enums";

export class Game {

    static fieldSizeDictionary = {
        [FieldSize.Small]: 10,
        [FieldSize.Medium]: 15,
        [FieldSize.Large]: 20
    };

    static difficultyDictionary = {
        [Difficulty.Easy]: 0.2,
        [Difficulty.Moderate]: 0.25,
        [Difficulty.Hard]: 0.3,
        [Difficulty.PureEvil]: 0.5
    }

    initialized: boolean = false;
    field: Cell[][] = [];
    flagMode: Ref<boolean> = ref(false);

    constructor(public difficulty: Difficulty, public fieldSize: FieldSize, restarter: Ref<boolean>) {
        console.log('Game created with difficulty:', Difficulty[difficulty], 'and field size:', FieldSize[fieldSize], 'which is', Game.fieldSizeDictionary[fieldSize], 'cells wide');
        this.generateEmptyField();
        this.initialized = true;
        if (restarter.value) restarter.value = !restarter.value;
    }

    generateEmptyField(): void {
        for (let y = 0; y < Game.fieldSizeDictionary[this.fieldSize]; y++) {
            this.field[y] = [];
            for (let x = 0; x < Game.fieldSizeDictionary[this.fieldSize]; x++) {
                this.field[y][x] = new Cell(x, y, this);
            }
        }
    }

    toggleFlagMode(): void {
        this.flagMode.value = !this.flagMode.value;
    }

    startGame(): void {
        console.log('Starting game');
        this.createMines();
        this.fillCells();
    }

    createMines(): void {
        let plantedMines = 0;
        const bombCount = Math.round(Game.fieldSizeDictionary[this.fieldSize] * Game.fieldSizeDictionary[this.fieldSize] * Game.difficultyDictionary[this.difficulty]);
        console.log('Creating', bombCount, 'mines');
        for (let i = 0; i < bombCount; i++) {
            //Get random coordinates
            const x = Math.floor(Math.random() * Game.fieldSizeDictionary[this.fieldSize]);
            const y = Math.floor(Math.random() * Game.fieldSizeDictionary[this.fieldSize]);
            //Check if cell already has a mine or any other content
            if (this.field[y][x].content.value !== CellContent.Null) {
                i--;
                continue;
            }
            //Plant mine
            this.field[y][x].content.value = CellContent.Mine;
            plantedMines++;
        }
        console.log('Planted', plantedMines, 'mines');
    }

    fillCells(): void {
        for (let y = 0; y < Game.fieldSizeDictionary[this.fieldSize]; y++) {
            for (let x = 0; x < Game.fieldSizeDictionary[this.fieldSize]; x++) {
                if (this.field[y][x].content?.value === CellContent.Mine) {
                    continue;
                }
                let mineCount = 0;
                for (let yOffset = -1; yOffset <= 1; yOffset++) {
                    for (let xOffset = -1; xOffset <= 1; xOffset++) {
                        if (y + yOffset < 0 || y + yOffset >= Game.fieldSizeDictionary[this.fieldSize] || x + xOffset < 0 || x + xOffset >= Game.fieldSizeDictionary[this.fieldSize]) {
                            continue;
                        }
                        if (this.field[y + yOffset][x + xOffset].content.value === CellContent.Mine) {
                            mineCount++;
                        }
                    }
                }
                this.field[y][x].content.value = mineCount;
            }
        }
    }

    onDefeat(): void {
        console.log('Game over');
        for (let y = 0; y < Game.fieldSizeDictionary[this.fieldSize]; y++) {
            for (let x = 0; x < Game.fieldSizeDictionary[this.fieldSize]; x++) {
                this.field[y][x].revealed.value = true;
            }
        }
    }

    //TODO: Implement win condition
}

export class Cell {
    constructor(public x: number, public y: number, public hostedGame: Game) {
        this.id = `${x}-${y}`;
    }

    content: Ref<CellContent> = ref(CellContent.Null);
    id: string;
    revealed: Ref<boolean> = ref(false);
    flagged: Ref<boolean> = ref(false);
    get isMined(): boolean {
        return this.content.value === CellContent.Mine;
    }

    handleClick(): void {

        if (this.content.value === CellContent.Null) {
            this.content.value = CellContent.Empty;
            this.hostedGame.startGame();
        }

        if (this.hostedGame.flagMode.value) {
            this.toggleFlag();
            return;
        }
        if (this.flagged.value) return;
        if (this.content.value === CellContent.Mine) this.hostedGame.onDefeat();
        Cell.cellRevealSequence(this.hostedGame, this);
    }

    toggleFlag() {
        if (this.revealed.value) return;
        this.flagged.value = !this.flagged.value;
    }

    static cellRevealSequence(hostedGame: Game, currentCell: Cell): void {
        if (currentCell.flagged.value) currentCell.flagged.value = false;
        if (currentCell.content.value !== CellContent.Empty) currentCell.revealed.value = true;
        if (currentCell.content.value === CellContent.Empty && !currentCell.revealed.value) {
            currentCell.revealed.value = true;
            const gameField = hostedGame.field;
            for (let yOffset = -1; yOffset <= 1; yOffset++) {
                for (let xOffset = -1; xOffset <= 1; xOffset++) {
                    if (currentCell.y + yOffset < 0 || currentCell.y + yOffset >= Game.fieldSizeDictionary[hostedGame.fieldSize] || currentCell.x + xOffset < 0 || currentCell.x + xOffset >= Game.fieldSizeDictionary[hostedGame.fieldSize]) continue;
                    if (yOffset === 0 && xOffset === 0) continue;
                    const selectedCell = gameField[currentCell.y + yOffset][currentCell.x + xOffset];
                    Cell.cellRevealSequence(hostedGame, selectedCell);
                }
            }
        }
    }

    static cellColorDictionary = {
        [CellContent.Empty]: 'hsl(var(--accent))',
        [CellContent.One]: '#2069e8',
        [CellContent.Two]: '#039dcc',
        [CellContent.Three]: '#1ab6a3',
        [CellContent.Four]: '#00bd52',
        [CellContent.Five]: '#70cf00',
        [CellContent.Six]: '#b6ca00',
        [CellContent.Seven]: '#ffaf03',
        [CellContent.Eight]: '#ff3e03',
        [CellContent.Mine]: '#ff0303',
        [CellContent.Null]: '#000000'
    }
}