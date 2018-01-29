
const Mars = new Planet({obstacle: ['1-1']});
const Explorer = new Rover(Mars, { name: 'Explorer' });
Explorer.state.position = {x:4,y:0};
Explorer.state.way = 1;

console.log(Explorer);

console.log(Explorer.getDirection());
console.log(Explorer.getPosition());
Explorer.move('f');
console.log(Explorer.getPosition());


// const roadmap = generateRoute();
function generateRoute(size = 20) {
  const commands = ['f','b','l','r'];
  return [...Array(size).keys()].map(() => commands[Math.floor(Math.random() * (commands.length - 1 + 1) + 1) - 1]);
}
