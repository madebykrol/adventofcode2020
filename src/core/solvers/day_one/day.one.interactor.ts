import {Interactor} from 'interactr/Interactor';
import {UseCaseResult} from 'interactr/UseCaseResult';
import DayOne from './day.one';
import IDayOneOutputPort from './day.one.output';


export default class DayOneInteractor implements Interactor<DayOne, IDayOneOutputPort>  {
    
    private foundSets: number[][] = new Array<Array<number>>();
    
    async execute(usecase: DayOne, outputPort: IDayOneOutputPort): Promise<UseCaseResult> {
        
        let report = usecase.report.split('\n').map(x => +x);
        let workingSet: Array<number> = new Array<number>();

        this.generateSubSets(report.sort((a,b) => a-b), workingSet, 0, report.length, 0, usecase.target);
       
        outputPort.displaySets(this.foundSets);

        return new UseCaseResult(true);
    }

    private generateSubSets(completeSet: number[], workingSet: number[], beginFrom: number, readTo: number, setSum: number, target: number ) {

        if (setSum == target) {
            this.foundSets.push(Object.assign([], workingSet));
            return;
        }

        for (let i:number = beginFrom; i < readTo; i++) {
            
            if(setSum + completeSet[i] <= target) {
                workingSet.push(completeSet[i]);

                this.generateSubSets(completeSet, workingSet, i+1, readTo, setSum + completeSet[i], target);

                workingSet.pop();
            }
        } 
    }
}