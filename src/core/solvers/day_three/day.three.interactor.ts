import { Interactor } from "interactr/Interactor";
import { UseCaseResult} from 'interactr/UseCaseResult';

import DayThree from "./day.three";
import IDayThreeOutputPort from "./day.three.output";

export default class DayThreeInteractor implements Interactor<DayThree, IDayThreeOutputPort> {
    async execute(usecase: DayThree, outputPort: IDayThreeOutputPort): Promise<UseCaseResult> {
        return new  Promise((resolve) => {
            const terrain: string[][] = this.generateTerrainGrid(usecase.input);
            const terrainSliceWidth: number = terrain[0].length;
            
            let columnPos: number = 0;
            let trees: number = 0;

            for (let i: number = usecase.rowIncrement; i < terrain.length; i+=usecase.rowIncrement) {
                columnPos = (columnPos + usecase.columnIncrement) % terrainSliceWidth
            
                if(this.treeOnCoordinate(terrain, i, columnPos))
                    trees++;
            }

            outputPort.displayAmountOfTrees(trees);
            
            resolve(new UseCaseResult(true));
        });
    }

    private generateTerrainGrid(terrain: string): string[][] {
        return terrain.split('\n').map(row => row.trim().split(''))
    }

    private treeOnCoordinate(terrain: string[][], x: number, y: number): boolean {
        return terrain[x][y] === "#"
    }
}