import { Passport } from "../../models/passport";

export interface IDayFourOutputPort {
    displayValidPassports(passports: Array<Passport>): void;
}