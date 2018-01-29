
class Planet {
  constructor(options = {}) {
    const props = {
      width: 5,
      height: 5,
      rateObstacle: 6,
    };

    this.props = Object.assign({}, props, options);
    // this.props = { ...props, ...options };
    this.props.maxObstacle = this.calcolateMaxObstacle();

    this.store = {
      rovers: [],
      obstacleCoords: this.props.obstacle || this.generateObstacleCoords(),
    };
    this.store.map = this.generateMatrix();
  }

  obstacleCollision(pos) {
    const { obstacleCoords } = this.store;

    return obstacleCoords.includes(pos);
  }

  generateObstacleCoords() {
    const {
      width,
      height,
      maxObstacle,
    } = this.props;

    return [...Array(maxObstacle).keys()].map(() => `${this.randomResult(width)}-${this.randomResult(height)}`);
  }

  calcolateMaxObstacle() {
    const {
      width,
      height,
      rateObstacle,
    } = this.props;
    const area = width * height;

    return Math.ceil((area * rateObstacle) / 100);
  }

  randomResult(max = 1) {
    const min = 1;

  	return Math.floor(Math.random() * (max - min + 1) + min) - 1;
  }

  approachRover(name) {
    const { rovers } = this.store;
    const pos = this.generateRoverCoords();

    rovers.push({name, pos});
    return pos;
  }

  generateRoverCoords() {
    const {
      width,
      height,
    } = this.props;

    let data;
    do {
      data = {
        pos: {
          x: this.randomResult(width),
          y: this.randomResult(height),
        },
        way: this.randomResult(4)
      };
    } while (this.obstacleCollision(`${data.pos.x}-${data.pos.y}`));

    return data;
  }

  generateMatrix() {
    const {
      width,
      height,
    } = this.props;

    return [...Array(width).keys()].map(y => [...Array(height).keys()].map((x) => {
      const pos = `${y}-${x}`;
      return {
        pos,
        tipologia: this.obstacleCollision(pos) !== true ? 'free' : 'busy',
      };
    }));
  }

  getRoverCoords() {
    const { roverCoords } = this.store;

    return roverCoords;
  }

  getNextPosition({x, y, way, coord}) {
    const {
      width,
      height,
    } = this.props;



    // Da eseguire dopo il calcolo delle successive coordinate
    // if (this.obstacleCollision(coord) === true) {
    //   throw new Error('Halt! Detect obstacle on the route!');
    // }
  }
}

if (typeof module !== 'undefined') {
  module.exports = Planet;
}
