function Organism(sex) {
    return {
        id: guid(),
        type: 'organism',
        sex: sex || Math.random() < 0.5 ? 'male' : 'female',
        position: {
            x: Math.floor(Math.random() * canvas.width) + 1,
            y: Math.floor(Math.random() * canvas.height) + 1
        },
        task: 'idle',
        target: '',
        step: function () {
            if (this.task === 'idle') {
                if (this.resourceExists()) {
                    this.findClosestResource();
                }

                this.idle();
            }

            if (this.task === 'gather') {
                this.gather();
            }

            if (this.task === 'build') {
                this.build();
            }
        },
        checkBlocked: function () {
            var margin = 5;

            if (this.position.x <= margin) {
                this.position.x += 1;
            }

            if (this.position.x >= canvas.width - margin) {
                this.position.x -= 1;
            }

            if (this.position.y <= margin) {
                this.position.y += 1;
            }

            if (this.position.y >= canvas.height - margin) {
                this.position.y -= 1;
            }
        },
        targetExists: function (type) {
            for (var i = 0; i < entities[type].length; i++) {
                if (entities[type][i].id === this.target.id) {
                    return true;
                }
            }

            return false;
        },
        resourceExists: function () {
            return entities.resources.length > 0 ? true : false;
        },
        findClosestResource: function () {
            var closestResource = shortestDist = null;

            for (r in entities.resources) {
                var dist = Math.sqrt(Math.pow(this.position.x - entities.resources[r].position.x, 2), Math.pow(this.position.y - entities.resources[r].position.y, 2));
                if (dist < shortestDist || shortestDist === null) {
                    shortestDist = dist;
                    closestResource = entities.resources[r];
                }
            }

            if (closestResource !== null) {
                this.task = 'gather';
                this.target = closestResource;
            }
        },
        idle: function () {
            this.position.x += Math.floor(Math.random() * -3) + 2;
            this.position.y += Math.floor(Math.random() * -3) + 2;
            this.checkBlocked();
        },
        gather: function () {
            if (!this.targetExists('resources')) {
                this.task = 'idle';
                this.findClosestResource();
            }

            if (this.position.x < this.target.position.x) {
                this.position.x += 1;
            }

            if (this.position.x > this.target.position.x) {
                this.position.x -= 1;
            }

            if (this.position.y < this.target.position.y) {
                this.position.y += 1;
            }

            if (this.position.y > this.target.position.y) {
                this.position.y -= 1;
            }

            this.checkBlocked();

            if (this.position.x === this.target.position.x && this.position.y === this.target.position.y) {
                for (var i = 0; i < entities.resources.length; i++) {
                    if (entities.resources[i].id === this.target.id) {
                        entities.resources.splice(i, 1);
                        this.task = 'idle';
                        this.target = '';
                        break;
                    }
                }
            }
        },
        build: function () {

        },
        render: function () {
            if (this.sex === 'male') {
                ctx.fillStyle = '#175ca9';
            } else {
                ctx.fillStyle = '#cc638c';
            }

            ctx.fillText('O', this.position.x, this.position.y);
        }
    }
}