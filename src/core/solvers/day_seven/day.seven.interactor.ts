import {Interactor} from 'interactr/Interactor';
import {UseCaseResult} from 'interactr/UseCaseResult';
import { DaySeven } from './day.seven';
import { IDaySevenOutputPort } from './day.seven.outputport';
import { Bag } from '../../models/bag';

export class DaySevenInteractor implements Interactor<DaySeven, IDaySevenOutputPort> {

    private containers: Array<Bag> = [];
    execute(usecase: DaySeven, outputPort: IDaySevenOutputPort): Promise<UseCaseResult> {
        return new Promise(resolve => {

            const bagRules = this.parseBagRules(usecase.input);

            bagRules.forEach((value, key) => {
                if (this.traverseBagTree(bagRules, value, usecase.targetBag)) {
                    this.addContainerIfUnique(value);
                }
            });

            outputPort.displayAmountOfBags(this.containers.length);

            resolve(new UseCaseResult(true));
        });
    }

    private parseBagRules(rules: string): Map<string, Bag> {
        
        const bagRules: Map<string, Bag> = new Map<string, Bag>();
        const bagRuleStrings = rules.split(/\r\n\r\n|\n/gm);
        
        for(let i = 0; i < bagRuleStrings.length; i++) {

            const rule = bagRuleStrings[i].match(/(.+?\s.+?)\sbags\scontain\s(.+)/);
            
            if(rule == null) 
                continue;

            const capacity: Map<string, number> = new Map<string, number>();

            rule[2].split(',').map(x => 
                {
                    const capd = x.trim().match(/(\d{1,})\s(.+)ba[gs|g]/);
                    if(capd == null)
                        return;

                    capacity.set(capd[2].trim(), +capd[1]);
                }
            );
                
            bagRules.set(rule[1].trim(), new Bag(rule[1].trim(), capacity));
        }

        return bagRules;
    }

    private traverseBagTree(bagRules: Map<string,Bag>, currentBag: Bag, target: string): boolean {
        let inTree = false;
        currentBag.capacity.forEach((value, key) => {
            const bag = bagRules.get(key.trim());
            if (bag != undefined && (bag.name === target || this.traverseBagTree(bagRules, bag, target)))
                inTree = true;
        });

        if (inTree) {
            this.addContainerIfUnique(currentBag);
            return true;
        }

        return false;
    }   

    private addContainerIfUnique(bag:Bag) {
        if (this.containers.find(x => x.name.trim() == bag.name.trim()) == undefined)
            this.containers.push(bag)
    }

}