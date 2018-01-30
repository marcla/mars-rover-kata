
(function () {
    const Mars = new Planet({
      width: 6,
      height: 6,
      rateObstacle: 6,
    });
    const Explorer = new Rover(Mars, { name: 'Explorer' });
    const Display = new View(Mars, Explorer);

    // console.log(Mars.store.map);
    console.log(Explorer.getPosition());

    Explorer.sendCommands(Display.generateRoute(), {
      next: (data) => {
        console.log(JSON.stringify(data));
        if (data.success === true) {
          Display.moveRover(data);
        }
      },
      complete: (data) => {
        console.log('=== COMPLETE ===');
        console.log(data);
      },
      onerror: (e) => {
        console.log('=== ERROR ===');
        console.log(e);
      }
    });

    // Explorer.sendCommands(['f','b','b','b','b','r','b','b','b','l','r','b','b','b','l','b','l','f','l','b'], {
    //   next: (data) => {
    //     Display.moveRover(data.position);
    //     console.log(JSON.stringify(data));
    //   },
    //   complete: (data) => {
    //     console.log('=== COMPLETE ===');
    //     console.log(data);
    //   }
    // });
})();
