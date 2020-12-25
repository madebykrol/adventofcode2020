"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const day_one_interactor_1 = __importDefault(require("./day.one.interactor"));
const day_one_1 = __importDefault(require("./day.one"));
const fs_1 = __importDefault(require("fs"));
describe('Day One Tests', () => {
    let interactor;
    let outputPort;
    let inputData;
    beforeAll(() => {
        inputData = fs_1.default.readFileSync('src/infrastructure/day.one.input.txt', 'utf-8');
    });
    beforeEach(() => {
        interactor = new day_one_interactor_1.default();
        outputPort = new OutputPortUnderTest();
    });
    it('Should return atleast one set', async () => {
        await interactor.execute(new day_one_1.default(inputData, 2020), outputPort);
        var sets = outputPort.present();
        expect(sets.length).toBeGreaterThanOrEqual(1);
    });
    it('Should return atleast one set with two elements', async () => {
        await interactor.execute(new day_one_1.default(inputData, 2020), outputPort);
        var sets = outputPort.present();
        expect(sets.filter(set => set.length == 2).length).toBeGreaterThanOrEqual(1);
    });
    it('Should return atleast one set with three elements', async () => {
        await interactor.execute(new day_one_1.default(inputData, 2020), outputPort);
        var sets = outputPort.present();
        expect(sets.filter(set => set.length == 3).length).toBeGreaterThanOrEqual(1);
    });
    it('Sets should sum up to target', async () => {
        await interactor.execute(new day_one_1.default(inputData, 2020), outputPort);
        var sets = outputPort.present();
        console.log(sets);
        expect(sets.filter(set => set.reduce((sum, num) => sum + num) === 2020).length).toBe(sets.length);
    });
});
class OutputPortUnderTest {
    constructor() {
        this.sets = new Array();
    }
    displaySets(sets) {
        this.sets = sets;
    }
    present() {
        return this.sets;
    }
}
