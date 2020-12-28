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
            const targetBag = bagRules.get(usecase.targetBag.trim());

            if(targetBag == undefined) {
                resolve(new UseCaseResult(false))
                return;
            }

            bagRules.forEach((value, key) => {
                if (this.traverseBagTree(bagRules, value, usecase.targetBag)) {
                    this.addContainerIfUnique(value);
                }
            });

            outputPort.displayAmountOfBags(this.containers.length);
            outputPort.displayTotalCapacityForTarget(this.calculateTotalCapacity(bagRules, targetBag))

            resolve(new UseCaseResult(true));
        });
    }

    private parseBagRules(rules: string): Map<string, Bag> {
        
        const bagRules: Map<string, Bag> = new Map<string, Bag>();
        const bagRuleStrings = rules.split(/\r\n\r\n|\n/gm);
        
        for(let i = 0; i < bagRuleStrings.length; i++) {

            const rule = bagRuleStrings[i].match(/(.+?\s.+?)\sbags\scontain\s(.+)/);
            const capacity: Map<string, number> = new Map<string, number>();

            if(rule == null) 
                continue;

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

    private calculateTotalCapacity(bagRules: Map<string, Bag>, bag: Bag): number {

        let capacity = 0;

        bag.capacity.forEach((value, key) => {
            const nextBag = bagRules.get(key);
            if(nextBag == undefined)
                return;
            capacity += value * (1 + this.calculateTotalCapacity(bagRules, nextBag));
        });

        return capacity;
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