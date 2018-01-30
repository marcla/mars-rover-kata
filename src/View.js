
class View {
  constructor(Planet, Rover) {
    this.planet = Planet;
    this.rover = Rover;

    this.props = {
      // obstacle: '🌋',
      // rover: '🤖',
      // extra: '👾',
      roverDom: this.createRoverDomElement()
    }

    this.prepareGridLayout();
  }

  prepareGridLayout() {
    const { roverDom } = this.props;
    const { obstacleCoords } = this.planet.store;
    const roverPosition = this.rover.getPosition();

    this.moveRover(roverPosition);

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
  }

  directionClassName(dir = '') {
    return `direction-${dir.toLowerCase()}`;
  }

  subscribe(data) {

  }

  generateRoute(size = 20) {
    const commands = ['f','b','l','r'];
    return [...Array(size).keys()].map(() => commands[Math.floor(Math.random() * (commands.length - 1 + 1) + 1) - 1]);
  }
}
