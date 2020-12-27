import { Interactor } from "interactr/Interactor";
import {UseCaseResult} from 'interactr/UseCaseResult';
import { IDayFourOutputPort } from "./day.four.output";
import { DayFour } from "./day.four";
import { Passport } from "../../models/passport";
import { PassportValidationPolicy } from "./policy";

export class DayFourInteractor implements Interactor<DayFour, IDayFourOutputPort> {

    private policyMap: Map<PassportValidationPolicy, (passport: Passport) => boolean>
        = new Map([
            [PassportValidationPolicy.AllPropertiesAreDefined, this.propertiesDefinedPolicy],
            [PassportValidationPolicy.AllPropertiesHasValidValues, this.propertiesHasValidValuesPolicy.bind(this)]
        ]);

    async execute(usecase: DayFour, outputPort: IDayFourOutputPort): Promise<UseCaseResult> {
        return new Promise((resolve) => {
            const passports = usecase.input.split(/\r\n\r\n|\n\n/gm).map(this.parsePassport);

            outputPort.displayValidPassports(passports.filter(passport => {
                const policyMethod = this.policyMap.get(usecase.validationPolicy);

                if(policyMethod == undefined)
                    return false;

                return policyMethod(passport)
            }));

            resolve(new UseCaseResult(true));
        });
    }

    parsePassport(rawPassport: string): Passport {

        const properties = rawPassport.trim().split(/\s|\r\n|\n/).map(x => x.split(':'));
        const rawObj = Object.fromEntries(properties);

        return new Passport(rawObj.byr, rawObj.iyr, rawObj.eyr, rawObj.hgt, rawObj.hcl, rawObj.ecl, rawObj.pid, rawObj.cid);
    }

    private propertiesDefinedPolicy(passport: Passport): boolean {
        return passport.birthYear !== undefined 
        && passport.expirationYear !== undefined
        && passport.eyeColor !== undefined
        && passport.hairColor !== undefined
        && passport.height !== undefined
        && passport.issueYear !== undefined
        && passport.passportId !== undefined
    }

    private propertiesHasValidValuesPolicy(passport: Passport): boolean {
        try {

            this.guardAgainstOutOfRange(passport.birthYear, 1920, 2002);
            this.guardAgainstOutOfRange(passport.issueYear, 2010, 2020);
            this.guardAgainstOutOfRange(passport.expirationYear, 2020, 2030);
            this.guardAgainstFaultyHeight(passport.height);
            this.guardAgainstFaultyEyeColor(passport.eyeColor);
            this.guardAgainstFaultyPid(passport.passportId);
            this.guardAgainstFaultyHairColor(passport.hairColor);

        } catch(e) {
            return false;
        }

        return true;
    }


    private guardAgainstOutOfRange(value: number, lowerBound: number, upperBound: number): void {
        if (value === undefined || value < lowerBound || value > upperBound)
            throw new Error("Out of bounds");
    }

    private guardAgainstFaultyHeight(height: string): void {
        const matches = height.match(/^(\d{2,3})(cm|in)/);

        if(matches == null)
            throw new Error("Height is not in correct format");

        const unit = matches[2];
        if (unit === 'cm')
            this.guardAgainstOutOfRange(+matches[1], 150, 193);
        else {
            this.guardAgainstOutOfRange(+matches[1], 59, 76);
        }
    }

    private guardAgainstFaultyEyeColor(color: string): void {
        const availableColors: string[] = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
        if(!availableColors.includes(color))
            throw new Error("Eye color not correct");
    }

    private guardAgainstFaultyPid(pid: string): void {
        const matches = pid.match(/^[0-9]{9}$/)

        if(matches == null)
            throw new Error("Pid incorrect");
    }

    private guardAgainstFaultyHairColor(color: string): void {
        const matches = color.match(/^(#[0-9|a-f]{6})/)

        if (matches == null)
            throw new Error("Faulty hair color");
    }

}