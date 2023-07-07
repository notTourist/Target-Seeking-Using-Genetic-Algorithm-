
class DNA {
    constructor(gene) {
        if (gene) this.genes = gene;
        else {
            this.genes = [];
            for (let i = 0; i < lifeOfRobo; i++) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(mxForce);
            }
        }
    }
    mutuation() {
        for (let i = 0; i < lifeOfRobo; i++) {
            if (random(1) < mutuationRate) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(mxForce);
            }
        }
    }
}