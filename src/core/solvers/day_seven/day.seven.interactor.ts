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

            for(let i = 0; i < bagRules.length; i++) {
                const bag = bagRules[i];
                if(this.traverseBagTree(bagRules, bag, "shiny gold")) {
                    this.addContainerIfUnique(bag);
                }
            }

            outputPort.displayAmountOfBags(this.containers.length);

            resolve(new UseCaseResult(true));
        });
    }

    private traverseBagTree(bagRules: Array<Bag>, currentBag: Bag, target: string): boolean {
        if (currentBag.capacity.size == 0)
            return false;
        
        let inTree = false;
        currentBag.capacity.forEach((value, key) => {
            const bag = bagRules.find(x => x.name.trim() == key.trim());
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

    private parseBagRules(rules: string): Array<Bag> {
        
        const bagRules: Array<Bag> = new Array<Bag>();
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
                
            bagRules.push(new Bag(rule[1].trim(), capacity));
        }

        return bagRules;
    }
}