
const NORTH = 'N';
const EST = 'E';
const SOUTH = 'S';
const WEST = 'W';

class Rover {
  constructor(Planet, options = {}) {
    this.planet = Planet;
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

  sendCommands(roadmap = [], subscribe = {}) {
    const { directions } = this.props;
    let plot;

    const traceroute = roadmap.map((command) => {
      plot = this.move(command);
      Object.assign(plot, {
        cmd: command,
        direction: directions[plot.way]
      });
      subscribe.next(plot);

      return plot;
    });

    subscribe.complete(traceroute);
  }

  /**
   * forward/backward (f,b)
   * left/right (l,r)
   */
  move(command) {
    let { way, position } = this.state;

    switch (command) {
      case 'l':
        way = this.turnLeft();
        break;
      case 'r':
        way = this.turnRight();
        break;
      case 'f':
        position = this.moveForward();
        break;
      case 'b':
        position = this.moveBackward();
        break;
      default:
        throw new Error('Abort procedure, unknow command!');
    }

    this.state.way = way;
    this.state.position = position;

    return { position, way };
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

    return position;
  }

  moveBackward() {
    return this.moveForward({ backward: true });
  }

  turnRight() {
    const { directions } = this.props;
    const { way } = this.state;

    return (way + 1 < directions.length) ? way + 1 : 0;
  }

  turnLeft() {
    const { directions } = this.props;
    const { way } = this.state;

    return ((way - 1) >= 0) ? way - 1 : (directions.length - 1);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Rover;
}
