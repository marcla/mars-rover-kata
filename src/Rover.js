
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
    let plot = {};
    let abort = false;

    const traceroute = roadmap
      .map((command) => this.move(command))
      .forEach((plot, index, arr) => {
        if (abort === false) {
          if (plot.success === false) {
            abort = true;
          }

          ((i, data) => {
            setTimeout( () => {
              if (data.success === false) {
                subscribe.onerror(data, arr);
                return false;
              }

              subscribe.next(data);

              if (i === arr.length) {
                subscribe.complete(data, arr);
              }
            }, i * 1200);
          })( (index + 1), plot );
        }
      });
  }

  /**
   * forward/backward (f,b)
   * left/right (l,r)
   */
  move(command) {
    let { way, position } = this.state;
    const response = { success: true, msg: '', command};

    switch (command) {
      case 'l':
        way = this.turnLeft(way);
        break;
      case 'r':
        way = this.turnRight(way);
        break;
      case 'f':
        position = this.moveForward(position);
        break;
      case 'b':
        position = this.moveBackward(position);
        break;
      default:
        response.success = false;
        response.msg = 'Abort procedure, unknow command!';
    }

    if(this.planet.obstacleCollision(`${position.x}-${position.y}`)) {
      response.success = false;
      response.msg = `Abort procedure, collision detected in x:${position.x} y:${position.y}!`;
    } else {
      this.state.way = way;
      this.state.position = position;
    }

    return Object.assign({}, response, position, { way, direction: this.props.directions[way] });
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

  moveForward(position, { backward = false } = {}) {
    const { width, height } = this.planet.props;
    const { way } = this.state;
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

    return position;
  }

  moveBackward(position) {
    return this.moveForward(position, { backward: true });
  }

  turnRight(way) {
    const { directions } = this.props;

    return (way + 1 < directions.length) ? way + 1 : 0;
  }

  turnLeft(way) {
    const { directions } = this.props;

    return ((way - 1) >= 0) ? way - 1 : (directions.length - 1);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Rover;
}
