
const Mars = new Planet({obstacle: ['1-1']});
const Explorer = new Rover(Mars, { name: 'Explorer' });

console.log(Explorer.getPosition());

Explorer.sendCommands(['f','b','b','b','b','r','b','b','b','l','r','b','b','b','l','b','l','f','l','b'], {
  next: (data) => {
    console.log(`command ${data.cmd} x:${data.position.x} y:${data.position.y} in direction ${data.direction}`);
  },
  complete: (data) => {
    console.log('=== COMPLETE ===');
    console.log(data);
  }
});

// const roadmap = generateRoute();
// console.log(roadmap);
// function generateRoute(size = 20) {
//   const commands = ['f','b','l','r'];
//   return [...Array(size).keys()].map(() => commands[Math.floor(Math.random() * (commands.length - 1 + 1) + 1) - 1]);
// }
