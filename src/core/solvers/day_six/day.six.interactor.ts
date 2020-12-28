import { Interactor } from "interactr/Interactor";
import {UseCaseResult} from 'interactr/UseCaseResult';
import { DaySix } from "./day.six";
import { IDaySixOutputPort } from "./day.six.output";

export class DaySixInteractor implements Interactor<DaySix, IDaySixOutputPort> {
    async execute(usecase: DaySix, outputPort: IDaySixOutputPort): Promise<UseCaseResult> {
        return new Promise(resolve => {

            const groups = usecase.input.split(/\r\n\r\n|\n\n/gm);
            const sortedGroups = groups.map(group => group.split(/\r\n|\n/gm).sort((a, b) => a.length - b.length));

            let allYesAnswers: number = 0;
            let yesAnswers = 0;

            for(let i = 0; i < sortedGroups.length; i++) {

                var intersectResult: string[] = sortedGroups[i][0].split('');
                var unionResult: string[] = intersectResult;

                for(let j = 1; j < sortedGroups[i].length; j++) {
                    const charSplit = sortedGroups[i][j].split('');
                    
                    unionResult = this.union(unionResult, charSplit)
                    intersectResult = this.intersect(intersectResult, charSplit);
                }
                yesAnswers += unionResult.length;
                allYesAnswers += intersectResult.length
            }

            outputPort.displayAmountsOfYesAnswers(yesAnswers);
            outputPort.displayAmountOfAllYesAnswers(allYesAnswers);
            resolve(new UseCaseResult(true));
        })
    }

    private intersect<T extends any[]>(set1: T, set2: T): T {
        return set1.filter(v => set2.includes(v)) as T;
    }

    private union<T extends any[]>(set1: T, set2: T): T {
        return [...new Set([...set1, ...set2])] as T;
    }
}