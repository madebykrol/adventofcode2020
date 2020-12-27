import {Interactor} from 'interactr/Interactor';
import {UseCaseResult} from 'interactr/UseCaseResult';
import {DayTwo, Policy } from './day.two';
import IDayTwoOutputPort from './day.two.output';


export default class DayTwoInteractor implements Interactor<DayTwo, IDayTwoOutputPort> {

    private readonly pwdPolicyExpression: RegExp = /^(\d{1,})-(\d{1,}) (.): ([a-z]{1,})/;

    private policyMap: Map<Policy, (pos1: number, pos2: number, token:string, password: string) => boolean>
        = new Map([
            [Policy.XorPosition, this.xorPasswordPolicy],
            [Policy.AmountInRange, this.amountInRangePolicy]
        ]);

    async execute(usecase: DayTwo, outputPort: IDayTwoOutputPort): Promise<UseCaseResult> {
        return new Promise((resolve) =>  {
            outputPort.displayValidPasswords(
                usecase.input.split('\n')
                .filter(pwdLine => 
                    this.runPolicy(pwdLine, usecase.policy)
                )
            );
    
            resolve(new UseCaseResult(true));
        })
    }

    private runPolicy(password: string, policy:Policy):boolean {
        const match = password.match(this.pwdPolicyExpression);
                
        const policyMethod = this.policyMap.get(policy);
        if(match == null || policyMethod == null)
            return false;

        return policyMethod(+match[1], +match[2], match[3], match[4]);
    }

    private xorPasswordPolicy(pos1: number, pos2: number, token:string, password: string): boolean {
       return (password.charAt(pos1-1) === token && password.charAt(pos2-1) !== token) 
       || (password.charAt(pos1-1) !== token && password.charAt(pos2-1) === token);
    }

    private amountInRangePolicy(lowerBound: number, upperbound: number, token: string, password: string): boolean {
        const regex:RegExp = new RegExp(token, 'g');
        const matchAmounts = (password.match(regex) ||[]).length;
        return matchAmounts >= lowerBound && matchAmounts <= upperbound;
    }
}