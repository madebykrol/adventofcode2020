import { DayFiveInteractor } from "./day.five.interactor";
import { IDayFiveOutputPort } from "./day.five.output";
import { DayFive } from "./day.five";

import fs from 'fs';

describe("Day five test suite", () =>{

    let input: string;
    let interactor: DayFiveInteractor;
    let outputPort: OutputPortUnderTest;

    beforeAll(() => {
        input = fs.readFileSync('src/infrastructure/day.five.input.txt', 'utf-8');
    });

    beforeEach(() => {
        interactor = new DayFiveInteractor();
        outputPort = new OutputPortUnderTest();
    });

    it("Higest id is 820 for devData", async () => {
        await interactor.execute(new DayFive(
`BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`), outputPort);

        expect(outputPort.presentHighestSeatId()).toBe(820);
    });

    it("Highest id is 842 for live data", async () => {
        await interactor.execute(new DayFive(input), outputPort);

        expect(outputPort.presentHighestSeatId()).toBe(842);
    });

    it("Empty seat id is 617", async () => {
        await interactor.execute(new DayFive(input), outputPort);

        expect(outputPort.presentEmptySeatId()).toBe(617);
    });
});


class OutputPortUnderTest implements IDayFiveOutputPort {

    private highestSeatId = 0;
    private emptySeatId = 0;

    displayHighestSeatId(id: number): void {
        this.highestSeatId = id;
    }

    displayEmptySeat(id: number): void {
        this.emptySeatId = id;
    }

    presentHighestSeatId(): number {
        return this.highestSeatId;
    }

    presentEmptySeatId(): number {
        return this.emptySeatId;
    }
}