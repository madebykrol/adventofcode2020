import {Interactor} from 'interactr/Interactor';
import {UseCaseResult} from 'interactr/UseCaseResult';
import { prependListener } from 'process';
import { BoardingPass } from '../../models/boardingpass';
import { DayFive } from './day.five';
import { IDayFiveOutputPort } from './day.five.output';

export class DayFiveInteractor implements Interactor<DayFive, IDayFiveOutputPort> {

    private static readonly FRONT: string = "F";
    private static readonly LEFT: string = "L";

    async execute(usecase: DayFive, outputPort: IDayFiveOutputPort): Promise<UseCaseResult> {
        return new Promise(resolve => {
            const boardingPasses:Array<BoardingPass> = this.parseBoardingPasses(usecase.input);
            outputPort.displayHighestSeatId(boardingPasses.sort((a,b) => {
                return b.seatId - a.seatId
            })[0].seatId);
           
            outputPort.displayEmptySeat(this.findEmptySeatId(boardingPasses))

            resolve(new UseCaseResult(true));
        })
        
    }

    private findEmptySeatId(boardingPasses: Array<BoardingPass>): number {
        let prevSeat: BoardingPass|undefined;

        for(let i = 1; i < 126; i++) {
            for(let j = 0; j < 7; j++) {
                const seat = boardingPasses.find(x => x.row === i && x.column === j);
                
                if (prevSeat != undefined && seat == undefined)
                    return prevSeat.seatId+1;

                prevSeat = seat;
            }
        }

        return -1;
    }

    private parseBoardingPasses(input: string): Array<BoardingPass> {
        return input.split('\n').map(boardingPassBSP => {
            const foundRow = this.traverseBSP(boardingPassBSP.substr(0, 7).split(''), 0, 0, 127);
            const foundCol = this.traverseBSP(boardingPassBSP.substr(7, 3).split(''), 0, 0, 7);

            return new BoardingPass(foundRow, foundCol, (foundRow * 8) + foundCol);
        });
    }

    private traverseBSP(bsp: string[], nodePos: number, lowerBound: number, upperBound: number): number {
        const node = bsp[nodePos];
        const middle = (upperBound + lowerBound) / 2;

        if (nodePos === bsp.length-1)
            return node === DayFiveInteractor.FRONT || node === DayFiveInteractor.LEFT 
            ? Math.floor(middle) 
            : Math.ceil(middle)

        if (node === DayFiveInteractor.FRONT || node === DayFiveInteractor.LEFT) {
            return this.traverseBSP(bsp, nodePos+1, lowerBound, Math.floor(middle))
        } 

        return this.traverseBSP(bsp, nodePos+1, Math.ceil(middle), upperBound)
    }
}