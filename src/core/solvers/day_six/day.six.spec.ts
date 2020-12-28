import { Interactor } from "interactr/Interactor";
import { DaySix } from "./day.six";
import { DaySixInteractor } from "./day.six.interactor";
import { IDaySixOutputPort } from "./day.six.output";
import fs from 'fs';

describe("Day six test suite", () => {

    let interactor: DaySixInteractor;
    let outputPort: OutputPortUnderTest;
    let input: string;

    beforeAll(() => {
        input = fs.readFileSync('src/infrastructure/day.six.input.txt', 'utf-8');
    });
    beforeEach(() => {
        interactor = new DaySixInteractor();
        outputPort = new OutputPortUnderTest();
    });

    it("Dev data results into 11 yes answers", async () => {
        await interactor.execute(new DaySix(
`abc

a
b
c

ab
ac

a
a
a
a

b`), outputPort);

        expect(outputPort.presentAmountOfYesAnswers()).toBe(11);
    });

    it("Live data results into 6726 yes answers", async () => {
        await interactor.execute(new DaySix(input), outputPort);

        expect(outputPort.presentAmountOfYesAnswers()).toBe(6726);
    });

    it("Dev data results into 11 yes answers", async () => {
        await interactor.execute(new DaySix(
`abc

a
b
c

ab
ac

a
a
a
a

b`), outputPort);
        expect(outputPort.presentAmountOfAllYesAnswers()).toBe(6);
    });

    it("Live data results into 6726 yes answers", async () => {
        await interactor.execute(new DaySix(input), outputPort);

        expect(outputPort.presentAmountOfAllYesAnswers()).toBe(3316);
    });

});

class OutputPortUnderTest implements IDaySixOutputPort {    
    private amountOfYesAnswers: number = 0;
    private amountOfAllYesAnswers: number = 0;

    displayAmountsOfYesAnswers(yesAnswers: number): void {
        this.amountOfYesAnswers = yesAnswers;
    }

    displayAmountOfAllYesAnswers(yesAnswers: number): void {
        this.amountOfAllYesAnswers = yesAnswers;
    }
    
    presentAmountOfYesAnswers(): number {
        return this.amountOfYesAnswers;
    }

    presentAmountOfAllYesAnswers(): number {
        return this.amountOfAllYesAnswers;
    }
}