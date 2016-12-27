//mixins/movement.js
import Ember from 'ember';

export default Ember.Mixin.create({
    x: null,
    y: null,
    level: null,
    direction: 'down',

    move() {
        if (this.animationCompleted()) {
            this.finalizeMove();
            this.changeDirection();
        } else if (this.get('direction') === 'stopped') {
            this.changeDirection();
        } else {
			this.incrementProperty('frameCycle');
        }
    },

    animationCompleted(){
        return this.get('frameCycle') === this.get('framesPerMovement');
    },

    finalizeMove(){
        let direction = this.get('direction');
        this.set('x', this.nextCoordinate('x', direction));
        this.set('y', this.nextCoordinate('y', direction));

        this.set('frameCycle', 1);
    },

	restart() {
		this.set('x', this.get('level.startingPac.x'));
		this.set('y', this.get('level.startingPac.y'));
  		this.set('frameCycle', 0);
  		this.set('direction', 'stopped');
	},

	pathBlockedInDirection(direction) {
		let cellTypeInDirection = this.cellTypeInDirection(direction);
		return Ember.isEmpty(cellTypeInDirection) || cellTypeInDirection === 1;
	},

	cellTypeInDirection(direction) {
		let nextX = this.nextCoordinate('x', direction);
		let nextY = this.nextCoordinate('y', direction);

		return this.get(`level.grid.${nextY}.${nextX}`);
	},

	nextCoordinate(coordinate, direction){
		return this.get(coordinate) + this.get(`directions.${direction}.${coordinate}`);
	}
});