
(function () {
    const Mars = new Planet({
      width: 6,
      height: 6,
      rateObstacle: 6,
    });
    const Explorer = new Rover(Mars, { name: 'Explorer' });
    const Display = new View(Mars, Explorer);

    Explorer.sendCommands(Display.generateRoute(), {
      next: (data) => {
        // console.log(JSON.stringify(data));
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
