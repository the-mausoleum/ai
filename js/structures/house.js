function House(x, y) {
    return {
        id: guid(),
        type: 'house',
        position: {
            x: x,
            y: y
        },
        materials: {
            wood: 2
        },
        occupants: [],
        capacity: 2,
        hasVacancy: function() {
            return this.occupants.length < this.capacity;
        },
        render: function () {
            ctx.fillStyle = '#682e1a';
            ctx.fillText('h', this.position.x, this.position.y);
        }
    }
}