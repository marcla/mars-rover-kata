
(function () {
    const Mars = new Planet({
      width: 6,
      height: 6,
      rateObstacle: 4,
    });
    const Explorer = new Rover(Mars, { name: 'Explorer' });
    const Display = new View(Mars, Explorer);

    const routeCommand = [
      'r','f','f','f','r','b','b','l','f','f','f','f','l','b','l','f','f','f','b',
      'f','f','f','l','b','l','f','f','f','b','r','f','f','f','r','b','b','l','f',
      'b','l','f','f','f','f','l','b','f','f','f','r','b','b','l','f'
    ];

    // Display.generateRoute(50);
    Explorer.sendCommands(routeCommand, {
      next: (data) => {
        Display.moveRover(data);
      },
      complete: (data, arr) => {
        Display.writeLogbook(`Sequence of ${arr.length} commands completed successfully!`);
      },
      onerror: (data) => {
        Display.writeLogbook(`${data.msg}`);
      }
    });
})();
