import { PassportValidationPolicy } from "./policy";

export class DayFour {
    input: string;
    validationPolicy: PassportValidationPolicy;
    
    constructor(input: string, validationPolicy: PassportValidationPolicy) {
        this.input = input;
        this.validationPolicy = validationPolicy;
    }
}