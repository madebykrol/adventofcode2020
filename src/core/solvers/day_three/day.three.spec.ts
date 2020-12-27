
import fs from 'fs';
import DayThreeInteractor from './day.three.interactor';
import IDayThreeOutputPort from './day.three.output';
import DayThree from './day.three';

describe('Day Three Tests', () => {

    let input: string;
    let interactor: DayThreeInteractor;
    let outputPort: OutputPortInTest;


    beforeAll(() => {
        input = fs.readFileSync('src/infrastructure/day.three.input.txt', 'utf-8');
    });
    beforeEach(() => {
        interactor = new DayThreeInteractor();
        outputPort = new OutputPortInTest();
    });

    it("Hits two threes", async () => {
        +await interactor.execute(new DayThree(
`.#......##..#.....#....#.#.#...
.#.#...#.##.#..........#...##..
......#..#.....#.####........#.`, 3, 1
        ), outputPort);

        const trees = outputPort.presentTreeAmount();

        expect(trees).toBe(2)
    });

    it("Wrap arround and encounter 7 trees for 3,1", async () => {
        await interactor.execute(new DayThree(
`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`, 3,1
        ), outputPort);

        const trees = outputPort.presentTreeAmount();

        expect(trees).toBe(7)
    });
    
    it("Wrap arround and encounter 2 trees for 1,1", async () => {
        await interactor.execute(new DayThree(
`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`, 1,1
        ), outputPort);


        const trees = outputPort.presentTreeAmount();

        expect(trees).toBe(2)
    });

    it("Wrap arround and encounter 3 trees for 5,1", async () => {
        await interactor.execute(new DayThree(
`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`, 5,1
        ), outputPort);


        const trees = outputPort.presentTreeAmount();

        expect(trees).toBe(3)
    });


    it("Wrap arround and encounter 4 trees for 7,1", async () => {
        await interactor.execute(new DayThree(
`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`, 7,1
        ), outputPort);

        const trees = outputPort.presentTreeAmount();

        expect(trees).toBe(4)
    });

    it("Wrap arround and encounter 2 trees for 1,2", async () => {
        await interactor.execute(new DayThree(
`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`, 1,2
        ), outputPort);

        const trees = outputPort.presentTreeAmount();

        expect(trees).toBe(2)
    });

    it("Return correct amount of trees for 3,1", async () => {
        await interactor.execute(new DayThree(input, 3,1), outputPort);

        const trees = outputPort.presentTreeAmount();
        expect(trees).toBe(200)
    });
    
    it("Return correct amount of trees for 1,1", async () => {
        await interactor.execute(new DayThree(input, 1, 1), outputPort);

        const trees = outputPort.presentTreeAmount();

        expect(trees).toBe(66)
    });

    it("Return correct amount of trees for 5,1", async () => {
        await interactor.execute(new DayThree(input, 5,1), outputPort);

        const trees = outputPort.presentTreeAmount();

        expect(trees).toBe(76)
    });

    it("Return correct amount of trees for 7,1", async () => {
        await interactor.execute(new DayThree(input, 7,1), outputPort);

        const trees = outputPort.presentTreeAmount();
        
        expect(trees).toBe(81)
    });

    it("Return correct amount of trees for 1,2", async () => {
        await interactor.execute(new DayThree(input, 1,2), outputPort);

        const trees = outputPort.presentTreeAmount();
        
        expect(trees).toBe(46)
    });
});

class OutputPortInTest implements IDayThreeOutputPort {
    
    private trees = 0;
    
    displayAmountOfTrees(trees: number): void {
        this.trees = trees;
    }

    presentTreeAmount(): number {
        return this.trees;
    }
}