import {Interactor} from 'interactr/Interactor';
import {UseCaseResult} from 'interactr/UseCaseResult';
import { DayFive } from './day.five';
import { IDayFiveOutputPort } from './day.five.output';

export class DayFiveInteractor implements Interactor<DayFive, IDayFiveOutputPort> {
    async execute(usecase: DayFive, outputPort: IDayFiveOutputPort): Promise<UseCaseResult> {
        return new Promise(resolve => {
            
            outputPort.displayHighestSeatId(0);

            resolve(new UseCaseResult(true));
        })
        
    }
}