
class View {
  constructor(Planet, Rover) {
    this.planet = Planet;
    this.rover = Rover;

    this.props = {
      logbook: [],
      roverDom: this.createRoverDomElement(),
      logbookDom: document.getElementById('logbook'),
    }

    this.prepareGridLayout();
  }

  prepareGridLayout() {
    const { roverDom } = this.props;
    const { obstacleCoords } = this.planet.store;
    const rover = this.rover;
    const roverPosition = rover.getPosition();
    const roverDirection = rover.getDirection();

    roverDom.className = this.directionClassName(roverDirection);
    document.getElementById(`plot-${roverPosition.x}-${roverPosition.y}`).appendChild(roverDom);
    this.writeLogbook(`Start position x:${roverPosition.x} y:${roverPosition.y} in direction ${roverDirection}`);

    obstacleCoords.forEach((coord, index) => {
      document.getElementById(`plot-${coord}`).appendChild(this.createObstacleDomElement(index));
    });
  }

  createObstacleDomElement(index) {
    const element = document.createElement('div');
    element.className = 'obstacle';
    element.id = `item-obstacle-${index}`;

    return element;
  }

  createRoverDomElement() {
    const element = document.createElement('div');
    element.className = this.directionClassName(this.rover.getDirection());
    element.id = `item-rover`;

    return element;
  }

  moveRover(data) {
    const { roverDom } = this.props;
    roverDom.className = this.directionClassName(data.direction);

    document.getElementById(`plot-${data.x}-${data.y}`).appendChild(roverDom);

    if (['l','r'].includes(data.command)) {
      this.writeLogbook(`turn rover to ${data.command === 'r' ? 'right' : 'left'} to ${data.direction}`);
    } else {
      this.writeLogbook(`move rover ${data.command === 'f' ? 'forward' : 'backward'} to x:${data.x} y:${data.y} in direction ${data.direction}`);
    }
  }

  directionClassName(dir = '') {
    return `direction-${dir.toLowerCase()}`;
  }

  writeLogbook(message) {
    const { logbookDom } = this.props;
    this.props.logbook.push(message);

    const space = "\r\n";
    logbookDom.prepend(`${this.props.logbook.length} ${message}${space}`);
  }

  generateRoute(size = 20) {
    const commands = ['f','b','l','r'];
    return [...Array(size).keys()].map(() => commands[Math.floor(Math.random() * (commands.length - 1 + 1) + 1) - 1]);
  }
}
