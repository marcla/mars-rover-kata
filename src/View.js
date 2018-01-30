
class View {
  constructor(Planet, Rover) {
    this.planet = Planet;
    this.rover = Rover;

    this.props = {
      obstacle: '🌋',
      rover: '🤖',
    }

    this.prepareGridLayout();
  }

  prepareGridLayout() {
    const { obstacle, rover } = this.props;
    const { obstacleCoords } = this.planet.store;
    const roverPosition = this.rover.getPosition();

    document.getElementById(`plot-${roverPosition.x}-${roverPosition.y}`).innerHTML = rover;

    obstacleCoords.forEach((coord) => {
      document.getElementById(`plot-${coord}`).innerHTML = obstacle;
    });
  }

  subscribe(data) {

  }
}
