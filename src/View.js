
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

    // document.getElementById(`plot-${roverPosition.x}-${roverPosition.y}`).innerHTML = rover;
    document.getElementById(`plot-${roverPosition.x}-${roverPosition.y}`).appendChild(roverDom);

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
    element.className = 'rover';
    element.id = `item-rover`;

    return element;
  }

  subscribe(data) {

  }
}
