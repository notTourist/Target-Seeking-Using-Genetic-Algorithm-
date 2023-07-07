class Robo {
    constructor() {
        this.dna = new DNA();
        this.position = createVector(width / 2, height - 100);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.isReached = 0;
        this.isCrashedBottom = 0;
        this.isCrashedUp = 0;
        this.isCrashedLeft = 0;
        this.isCrashedRight = 0;
        this.crashedInObstacles = 0;
        this.flagHitTarget = 0;
    }

    calculateFitness() {
        let d = dist(this.position.x, this.position.y, target.x, target.y);
        d = map(d, 0, width, width, 0);
        if (this.isReached) {
            return d * d;
        }
        if (this.isCrashedUp) {
            return d * 100;
        }
        if (this.isCrashedBottom) {
            return d / 100000;
        }
        if (this.isCrashedLeft || this.isCrashedRight) {
            return d;
        }
        if (this.crashedInObstacles) {
            return d / 100000;
        }
        return d * 10;
    }

    reproduce(other) {
        let childGene = [];
        let ind = random(this.dna.genes.length);
        for (let i = 0; i < this.dna.genes.length; i++) {
            if (i < ind) childGene[i] = this.dna.genes[i];
            else childGene[i] = other.dna.genes[i];
        }
        let childRobo = new Robo();
        childRobo.dna.genes = childGene;
        return childRobo;
    }

    update() {
        let d = dist(this.position.x, this.position.y, target.x, target.y);
        if (d < 20) {
            this.isReached = 1;
            this.position = target.copy();
            if (!this.flagHitTarget) {
                hitTarget++;
                // hitAudio.play();
                this.flagHitTarget = 1;
            }
        }
        if (this.position.y <= 5) {
            this.isCrashedUp = 1;
            this.position = this.position.copy();
        }
        if (this.position.y >= height) {
            this.isCrashedBottom = 1;
            this.position = this.position.copy();
        }
        if (this.position.x <= 5) {
            this.isCrashedLeft = 1;
            this.position = this.position.copy();
        }
        if (this.position.x >= width) {
            this.isCrashedRight = 1;
            this.position = this.position.copy();
        }

        for (let obstacles of obstaclesArray) {
            var x1 = obstacles.x, y1 = obstacles.y, x2 = x1 + obstacles.w, y2 = obstacles.h + y1;
            if (this.position.x >= x1 - 5 && this.position.x <= x2 + 5) {
                if (this.position.y >= y1 - 5 && this.position.y <= y2 + 5) {
                    this.crashedInObstacles = 1;
                    this.position = this.position.copy();
                }
            }
        }

        if (!this.isCrashedLeft && !this.isCrashedRight && !this.isCrashedUp && !this.isCrashedBottom && !this.isReached && !this.crashedInObstacles) {
            this.position.add(this.velocity);
            this.velocity.add(this.acceleration);
            this.acceleration.mult(0);
            this.acceleration.add(this.dna.genes[currAge]);
            this.velocity.limit(20);
        }
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());
        stroke('red');
        fill('white');
        rectMode(CENTER);
        rect(0, 0, 60, 10);
        pop();
    }
}