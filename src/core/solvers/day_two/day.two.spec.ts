
import fs from 'fs';
import DayTwoInteractor from './day.two.interactor';
import IDayTwoOutputPort from './day.two.output';
import {DayTwo, Policy} from './day.two';

describe('Day Two Tests', () => {

    let input: string;
    let interactor: DayTwoInteractor;
    let outputPort: OutputPortUnderTest;

    beforeAll(() => {
        input = fs.readFileSync('src/infrastructure/day.two.input.txt', 'utf-8');
    });

    beforeEach(() => {
        interactor = new DayTwoInteractor();
        outputPort = new OutputPortUnderTest();
    });

    it("Returns correct amount of valid password for range policy", async () => {
        var result = await interactor.execute(
            new DayTwo(
`1-3 x: xxxrfvr
5-6 t: tttvfv
2-5 x: axxxxs`, 
            Policy.AmountInRange), outputPort);

        var passwords = outputPort.presentPasswords();

        expect(passwords.length).toBe(2);
    });

    it("Returns correct amount of valid password for xor policy", async () => {
        var result = await interactor.execute(
            new DayTwo(
`1-3 x: adfxxx
5-6 t: aaaatxa
2-5 x: xxxxx
5-7 l: gcqmlol
1-2 w: vwkw`, 
            Policy.XorPosition), outputPort);

        var passwords = outputPort.presentPasswords();


        expect(passwords.length).toBe(2);
    });

    it("Returns a set of passwords for any Policy on actual input", async () => {
        var result = await interactor.execute(new DayTwo(input, Policy.AmountInRange), outputPort);

        var passwords = outputPort.presentPasswords();

        expect(passwords.length).toBeGreaterThanOrEqual(1);
    });

    

});


class OutputPortUnderTest implements IDayTwoOutputPort {

    private foundPasswords: Array<string> = new Array<string>();

    displayValidPasswords(passwords: string[]): void {
        this.foundPasswords = passwords;
    }

    presentPasswords(): Array<string>
    {
        return this.foundPasswords;
    }
}