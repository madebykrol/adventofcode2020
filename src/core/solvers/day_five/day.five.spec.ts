import { DayFiveInteractor } from "./day.five.interactor";
import { IDayFiveOutputPort } from "./day.five.output";
import { DayFive } from "./day.five";

describe("Day five test suite", () =>{

    let input: string;
    let interactor: DayFiveInteractor;
    let outputPort: OutputPortUnderTest;

    beforeAll(() => {
        input = "";
    })
    beforeEach(() => {
        interactor = new DayFiveInteractor();
        outputPort = new OutputPortUnderTest();
    })

    it("d", () => {
        interactor.execute(new DayFive(input), outputPort);
    })
});


class OutputPortUnderTest implements IDayFiveOutputPort {
    
    private highestSeatId:number;

    displayHighestSeatId(id: number): void {
        this.highestSeatId = id;
    }

    presentHighestSeatId(): number {
        return this.highestSeatId;
    }
}