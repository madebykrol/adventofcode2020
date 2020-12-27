import { PasswordPolicy } from "./policy";

export class DayTwo {
    input: string;
    policy: PasswordPolicy;

    constructor(input: string, policy: PasswordPolicy) {
        this.input = input;
        this.policy = policy;
    }
}