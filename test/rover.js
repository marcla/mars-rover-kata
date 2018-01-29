
const assert = require('chai').assert;
const Planet = require('../src/Planet');
const Rover = require('../src/Rover');

const Jupiter = new Planet({
  obstacle: ['1-1'],
  width: 5,
  height: 5,
});
const roverOptions = {
  way: 0,
}

describe('Rover', () => {
  it('should pass', () => {
    assert.isTrue(true);
  })

  it('should turn right', () => {
    let Discovery = new Rover(Jupiter, { name:'Discovery' });
    Discovery.state.way = 0;
    Discovery.move('r');

    assert.equal(Discovery.getDirection(), 'E');
  })

  it('should turn left', () => {
    let Discovery = new Rover(Jupiter, { name:'Discovery' });
    Discovery.state.way = 3;
    Discovery.move('l');

    assert.equal(Discovery.getDirection(), 'S');
  })

  it('should move forward (X axis)', () => {
    let Discovery = new Rover(Jupiter, { name:'Discovery' });
    Discovery.state.way = 1;
    Discovery.state.position = {x:0,y:0};
    Discovery.move('f');
    let {x: posX} = Discovery.getPosition();

    assert.equal(posX, 1);
  })

  it('should move forward from one edge to another (X axis)', () => {
    let Discovery = new Rover(Jupiter, { name:'Discovery' });
    Discovery.state.way = 1;
    Discovery.state.position = {x:4,y:0};
    Discovery.move('f');
    let {x: posX} = Discovery.getPosition();

    assert.equal(posX, 0);
  })

  it('should move backward (X axis)', () => {
    let Discovery = new Rover(Jupiter, { name:'Discovery' });
    Discovery.state.way = 1;
    Discovery.state.position = {x:1,y:0};
    Discovery.move('b');
    let {x: posX} = Discovery.getPosition();

    assert.equal(posX, 0);
  })

  it('should move backward from one edge to another (X axis)', () => {
    let Discovery = new Rover(Jupiter, { name:'Discovery' });
    Discovery.state.way = 1;
    Discovery.state.position = {x:0,y:0};
    Discovery.move('b');
    let {x: posX} = Discovery.getPosition();

    assert.equal(posX, 4);
  })

  it('should move forward (Y axis)', () => {
    let Discovery = new Rover(Jupiter, { name:'Discovery' });
    Discovery.state.way = 0;
    Discovery.state.position = {x:0,y:1};
    Discovery.move('f');
    let {y: posY} = Discovery.getPosition();

    assert.equal(posY, 0);
  })

  it('should move forward from one edge to another (Y axis)', () => {
    let Discovery = new Rover(Jupiter, { name:'Discovery' });
    Discovery.state.way = 0;
    Discovery.state.position = {x:0,y:0};
    Discovery.move('f');
    let {y: posY} = Discovery.getPosition();

    assert.equal(posY, 4);
  })

  it('should move backward (Y axis)', () => {
    let Discovery = new Rover(Jupiter, { name:'Discovery' });
    Discovery.state.way = 0;
    Discovery.state.position = {x:0,y:1};
    Discovery.move('b');
    let {y: posY} = Discovery.getPosition();

    assert.equal(posY, 2);
  })

  it('should move backward from one edge to another (Y axis)', () => {
    let Discovery = new Rover(Jupiter, { name:'Discovery' });
    Discovery.state.way = 0;
    Discovery.state.position = {x:0,y:4};
    Discovery.move('b');
    let {y: posY} = Discovery.getPosition();

    assert.equal(posY, 0);
  })
});
