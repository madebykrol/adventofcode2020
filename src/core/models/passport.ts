export class Passport {

    constructor(
        public birthYear: number, 
        public issueYear: number, 
        public expirationYear: number, 
        public height: string, 
        public hairColor: string,
        public eyeColor: string,
        public passportId: string,
        public countryId?: string) {
    }
}