import DayOneInteractor from "./day.one.interactor";
import DayOne from "./day.one";
import IDayOneOutputPort from "./day.one.output";

import fs from 'fs';
import { start } from "repl";

describe('Day One Tests', () => {

    let interactor: DayOneInteractor;
    let outputPort: OutputPortUnderTest;
    let inputData: string;


    beforeAll(() => {
        inputData = fs.readFileSync('src/infrastructure/day.one.input.txt', 'utf-8');
    })
    
    beforeEach(() => {
        interactor = new DayOneInteractor();
        outputPort = new OutputPortUnderTest();
    });

    it('Should return atleast one set' , async () => {
        await interactor.execute(new DayOne(inputData, 2020), outputPort);
        var sets = outputPort.present();

        expect(sets.length).toBeGreaterThanOrEqual(1);
    });

    it('Should return atleast one set with two elements', async() => {
        await interactor.execute(new DayOne(inputData, 2020), outputPort);
        var sets = outputPort.present();

        expect(sets.filter(set => set.length == 2).length).toBeGreaterThanOrEqual(1);
    });

    it('Should return atleast one set with three elements', async() => {
        await interactor.execute(new DayOne(inputData, 2020), outputPort);
        var sets = outputPort.present();

        expect(sets.filter(set => set.length == 3).length).toBeGreaterThanOrEqual(1);
    });

    it('Sets should sum up to target', async() => {
        await interactor.execute(new DayOne(inputData, 2020), outputPort);
        var sets = outputPort.present();
        expect(sets.filter(set => set.reduce((sum, num) => sum+num) === 2020).length).toBe(sets.length);
    });
});


class OutputPortUnderTest implements IDayOneOutputPort {
    
    private sets: number[][] = new Array<Array<number>>();
    
    displaySets(sets: number[][]): void {
        this.sets = sets;
    }

    present(): number[][] {
        return this.sets;
    }
}