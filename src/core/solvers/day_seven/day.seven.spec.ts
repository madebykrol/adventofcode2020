import { DaySevenInteractor } from "./day.seven.interactor";
import { IDaySevenOutputPort } from "./day.seven.outputport";

import fs from 'fs';
import { DaySeven } from "./day.seven";


describe("day seven test suite", () => {

    let interactor: DaySevenInteractor;
    let outputPort: OutputPortUnderTest; 
    let input: string;


    beforeAll(() => {
        input = fs.readFileSync('src/infrastructure/day.seven.input.txt','utf-8');
    });
    beforeEach(() => {
        interactor = new DaySevenInteractor();
        outputPort = new OutputPortUnderTest();
    });

    it('4 bag color that can contain atleast one "shiny gold bag" in testData', async () => {
        await interactor.execute(new DaySeven(
`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`, "shiny gold"
        ), outputPort);

        expect(outputPort.presentAmountOfBags()).toBe(4);
    });

    it('139 bag color that can contain atleast one "shiny gold bag" in liveData', async () => {
        await interactor.execute(new DaySeven(input, "shiny gold"), outputPort);

        expect(outputPort.presentAmountOfBags()).toBe(139);
    });

    it('4 bag color that can contain atleast one "shiny gold bag" in testData', async () => {
        await interactor.execute(new DaySeven(
`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`, "shiny gold"
        ), outputPort);

        expect(outputPort.presentTotalCapacityForTarget()).toBe(32);
    });

    it('139 bag color that can contain atleast one "shiny gold bag" in liveData', async () => {
        await interactor.execute(new DaySeven(input, "shiny gold"), outputPort);

        expect(outputPort.presentTotalCapacityForTarget()).toBe(58175);
    });
});

class OutputPortUnderTest implements IDaySevenOutputPort {
    
    private bags = 0;
    private capacity = 0;

    displayAmountOfBags(bags: number): void {
        this.bags = bags;
    }

    displayTotalCapacityForTarget(capacity: number): void {
        this.capacity = capacity;
    }

    presentAmountOfBags(): number {
        return this.bags;
    }

    presentTotalCapacityForTarget(): number {
        return this.capacity;
    }
}