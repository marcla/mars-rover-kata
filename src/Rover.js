
const NORTH = 'N';
const EST = 'E';
const SOUTH = 'S';
const WEST = 'W';

class Rover {
  constructor(planet, options = {}) {
    this.planet = planet;
    this.props = {
      directions: [NORTH,EST,SOUTH,WEST],
    };

    const { pos, way } = this.planet.approachRover(options.name);

    this.state = {
      way,
      position: options.pos || pos,
    };
  }

  getPosition() {
    const { position } = this.state;

    return position;
  }

  getDirection() {
    const { directions } = this.props;
    const { way } = this.state;

    return directions[way];
  }

  setInstruction(roadmap = []) {
  }

  /**
   * forward/backward (f,b)
   * left/right (l,r)
   */
  move(command) {
    switch (command) {
      case 'l':
        this.turnLeft();
        break;
      case 'r':
        this.turnRight();
        break;
      case 'f':
        this.moveForward();
        break;
      case 'b':
        this.moveBackward();
        break;
      default:
        throw new Error('Abort procedure, unknow command!');
    }
  }

  checkEdgeMap(axis, size) {
    let value = axis;

    switch (true) {
      case value >= size:
        value = 0;
        break;
      case value < 0:
        value = (size - 1);
        break;
    }

    return value;
  }

  moveForward({ backward = false } = {}) {
    const { width, height } = this.planet.props;
    const { way, position } = this.state;
    const direction = this.props.directions[way];

    let increase = [EST, SOUTH].includes(direction) ? 1 : -1;

    if (backward === true) {
      increase *= -1;
    }

    if ([NORTH, SOUTH].includes(direction)) {
      position.y = this.checkEdgeMap((position.y + increase), height);
    } else {
      position.x = this.checkEdgeMap((position.x + increase), width);
    }

    if(this.planet.obstacleCollision(`${position.x}-${position.y}`)) {
      throw new Error('Abort procedure, collision detected!');
    }

    this.state.position = position;

    return true;
  }

  moveBackward() {
    this.moveForward({ backward: true });
  }

  turnRight() {
    const { directions } = this.props;
    const { way } = this.state;

    this.state.way = (way + 1 < directions.length) ? way + 1 : 0;
  }

  turnLeft() {
    const { directions } = this.props;
    const { way } = this.state;

    this.state.way = ((way - 1) > 0) ? way - 1 : (directions.length - 1);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Rover;
}
