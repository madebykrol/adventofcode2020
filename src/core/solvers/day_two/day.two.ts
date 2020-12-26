export class DayTwo {
    input: string;
    policy: Policy;

    constructor(input: string, policy: Policy) {
        this.input = input;
        this.policy = policy;
    }
}

export enum Policy {
    AmountInRange,
    XorPosition
}