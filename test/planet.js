
const assert = require('chai').assert;
const Planet = require('../src/Planet');

const planetOptions = {
  width: 2,
  height: 2,
  rateObstacle: 0,
  obstacle: ['1-1']
}

describe('Planet', () => {
  it('should pass', () => {
    assert.isTrue(true);
  })

  it('should collision with an obstacle', () => {
    let Jupiter = new Planet(planetOptions);
    const collision = Jupiter.obstacleCollision({x:1, y:1});

    assert.isTrue(collision);
  })
});
