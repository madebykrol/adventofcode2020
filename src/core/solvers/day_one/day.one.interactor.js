"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UseCaseResult_1 = require("interactr/UseCaseResult");
class DayOneInteractor {
    constructor() {
        this.foundSets = new Array();
    }
    async execute(usecase, outputPort) {
        let report = usecase.report.split('\n').map(x => +x);
        let workingSet = new Array();
        this.generateSubSets(report.sort((a, b) => a - b), workingSet, 0, report.length, 0, usecase.target);
        outputPort.displaySets(this.foundSets);
        return new UseCaseResult_1.UseCaseResult(true);
    }
    generateSubSets(completeSet, workingSet, beginFrom, readTo, setSum, target) {
        if (setSum == target) {
            this.foundSets.push(Object.assign([], workingSet));
            return;
        }
        for (let i = beginFrom; i < readTo; i++) {
            if (setSum + completeSet[i] <= target) {
                workingSet.push(completeSet[i]);
                this.generateSubSets(completeSet, workingSet, i + 1, readTo, setSum + completeSet[i], target);
                workingSet.pop();
            }
        }
    }
}
exports.default = DayOneInteractor;
