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
            const boardingPasses:Array<BoardingPass> = usecase.input.split('\n').map(boardingPassBSP => {
                const foundRow = this.traverseBSP(boardingPassBSP.substr(0, 7).split(''), 0, 0, 127);
                const foundCol = this.traverseBSP(boardingPassBSP.substr(7, 3).split(''), 0, 0, 7);

                return new BoardingPass(foundRow, foundCol, (foundRow * 8) + foundCol);
            });

            outputPort.displayHighestSeatId(boardingPasses.sort((a,b) => {
                return b.seatId - a.seatId
            })[0].seatId);
           
            let prevSeat: BoardingPass|undefined;

            done:
            for(let i = 1; i < 126; i++) {
                for(let j = 0; j < 7; j++) {
                    const seat = boardingPasses.find(x => x.row == i && x.column == j);
                    
                    if(prevSeat != undefined && seat == undefined) {
                        outputPort.displayEmptySeat(prevSeat.seatId+1);
                        break done;
                    }

                    prevSeat = seat;
                }
            }

            resolve(new UseCaseResult(true));
        })
        
    }

    private traverseBSP(bsp: string[], nodePos: number, lowerBound: number, upperBound: number): number {
        const node = bsp[nodePos];
        const middle = (upperBound + lowerBound) / 2;

        if (node === DayFiveInteractor.FRONT || node === DayFiveInteractor.LEFT) {
            if (nodePos == bsp.length-1)
                return Math.floor(middle);

            return this.traverseBSP(bsp, nodePos+1, lowerBound, Math.floor(middle))
        } 

        if (nodePos == bsp.length-1)
            return Math.ceil(middle)

        return this.traverseBSP(bsp, nodePos+1, Math.ceil(middle), upperBound)
    }
}