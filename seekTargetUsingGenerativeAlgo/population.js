class Population {
    constructor() {
        this.roboArray = [];
        for (let i = 0; i < mxPopulationSize; i++) {
            this.roboArray[i] = new Robo();
        }
        this.reproductiveChamber = [];
    }

    fillReproductiveChamber() {
        let fitnessArray = [];
        let currMx = 0;
        for (let i = 0; i < mxPopulationSize; i++) {
            fitnessArray[i] = this.roboArray[i].calculateFitness();
            currMx = max(currMx, fitnessArray[i]);
        }
        for (let i = 0; i < mxPopulationSize; i++) { //made fitness value in range of 0-1
            fitnessArray[i] /= currMx;
            fitnessArray[i] = floor(fitnessArray[i] * 100);
            for (let j = 0; j < fitnessArray[i]; j++) {
                this.reproductiveChamber[j] = this.roboArray[i];
            }
        }
        // console.log(fitnessArray);
    }

    generateNextGeneration() {
        let nextGeneration = [];
        for (let i = 0; i < mxPopulationSize; i++) {
            let par1 = random(this.reproductiveChamber);
            let par2 = random(this.reproductiveChamber);
            let child = par1.reproduce(par2);
            nextGeneration[i] = child;
            nextGeneration[i].dna.mutuation();
        }
        this.roboArray = nextGeneration;
    }

    showPopulation() {
        for (let i = 0; i < mxPopulationSize; i++) {
            this.roboArray[i].show();
            this.roboArray[i].update();
        }
    }
}