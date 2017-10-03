/*
* P2P gameplay model,
* created By Efosa,
* All rights reserved.
*/

// a simple JSON construction for every ludo seeds.

const seedsDbQuery = {
  'seed-green-one': {
    'starting-point': 'path-green-home-0',
    'first-path': 'path-green-1',
    'path-completed': 0,
  },
  'seed-green-two': {
    'starting-point': 'path-green-home-0',
    'first-path': 'path-green-1',
    'path-completed': 0,
  },
  'seed-green-three': {
    'starting-point': 'path-green-home-0',
    'first-path': 'path-green-1',
    'path-completed': 0,
  },
  'seed-green-four': {
    'starting-point': 'path-green-home-0',
    'first-path': 'path-green-1',
    'path-completed': 0,
  },
  'seed-red-one': {
    'starting-point': 'path-red-home-0',
    'first-path': 'path-red-1',
    'path-completed': 0,
  },
  'seed-red-two': {
    'starting-point': 'path-red-home-0',
    'first-path': 'path-red-1',
    'path-completed': 0,
  },
  'seed-red-three': {
    'starting-point': 'path-red-home-0',
    'first-path': 'path-red-1',
    'path-completed': 0,
  },
  'seed-red-four': {
    'starting-point': 'path-red-home-0',
    'first-path': 'path-red-1',
    'path-completed': 0,
  },
  'seed-blue-one': {
    'starting-point': 'path-blue-home-0',
    'first-path': 'path-blue-1',
    'path-completed': 0,
  },
  'seed-blue-two': {
    'starting-point': 'path-blue-home-0',
    'first-path': 'path-blue-1',
    'path-completed': 0,
  },
  'seed-blue-three': {
    'starting-point': 'path-blue-home-0',
    'first-path': 'path-blue-1',
    'path-completed': 0,
  },
  'seed-blue-four': {
    'starting-point': 'path-blue-home-0',
    'first-path': 'path-blue-1',
    'path-completed': 0,
  },
  'seed-yellow-one': {
    'starting-point': 'path-yellow-home-0',
    'first-path': 'path-yellow-1',
    'path-completed': 0,
  },
  'seed-yellow-two': {
    'starting-point': 'path-yellow-home-0',
    'first-path': 'path-yellow-1',
    'path-completed': 0,
  },
  'seed-yellow-three': {
    'starting-point': 'path-yellow-home-0',
    'first-path': 'path-yellow-1',
    'path-completed': 0,
  },
  'seed-yellow-four': {
    'starting-point': 'path-yellow-home-0',
    'first-path': 'path-yellow-1',
    'path-completed': 0,
  },
};

// A random number between 0 and 6 is generated and returned 
// from the function below i.e 1,2,3,4,5
const getRandomNumber = () => {
  const firstOutcome = Math.floor((Math.random() * 6) + 0);
  const secondOutcome = Math.floor((Math.random() * 6) + 0);
  return [firstOutcome, secondOutcome];
};

// this takes in values and toss the Dice to reveal the corresponding value
const tossDice = (firstOutcome, secondOutcome) => {
  const dices = [$('#dice-one'), $('#dice-two')];
  const possibleDiceFaces = ['dice dice-1 dice-one', 'dice dice-2 dice-one', 'dice dice-3 dice-one', 'dice dice-4 dice-one', 'dice dice-5 dice-one', 'dice dice-6 dice-one'];
  document.getElementById('shakingdice').play();
  dices[0].effect('shake');
  dices[1].effect('shake');
  dices[0].attr('class', possibleDiceFaces[firstOutcome]);
  dices[1].attr('class', possibleDiceFaces[secondOutcome]);
};

// indicate seeds that can be moved
const indicateSeedsThatCanBeMoved = (seeds) => {
  seeds.forEach((seed) => {
    seed.addClass('animate');
  });
};

// occupied Paths
const occupiedPaths = ['yellow', 'yellow'];

// counting outcomes of a toss event
const countOutcome = (seed) => {
  const seedColors = { g: 'green', r: 'red', y: 'yellow', b: 'blue' };
  const seedRelativePath = '.path-' + '' + seedColors[seed.attr('class').slice(0, 1)] + '-';
  if (seed.parent().attr('class').slice(0, 13) === 'seed-position') {
    if (occupiedPaths.indexOf(seedRelativePath + 0) in occupiedPaths) {
      seed.appendTo(seedRelativePath + 0)
      seed.hide();
      $(seedRelativePath+0).child().text(parseFloat(this.text()) + 1);
  	}
  	else {
      seed.appendTo(seedRelativePath + 0);
      seed.addClass('animate-move');
      occupiedPaths.push(seedRelativePath + 0);
      alert(occupiedPaths);
  	}
  }
};

// calculate the path number of a particular seed
// also calculates the eventual position of +

// executing functions on document model
$(document).ready(() => {
  const allSeeeds = [$('.seed-blue-one'), $('.seed-blue-two'), $('.seed-blue-three'), $('.seed-blue-four'), $('.seed-yellow-one'), $('.seed-yellow-two '), $('.seed-yellow-three'), $('.seed-yellow-four'), $('.seed-green-one')];
  const outcomesContainer = [$('.outcome-one'), $('.outcome-two'), $('.outcome-three')];
  $('.dice').click(() => {
    const getOutcome = getRandomNumber();
    tossDice(getOutcome[0], getOutcome[1]);
    outcomesContainer[0].text(getOutcome[0] + 1);
    outcomesContainer[1].text(getOutcome[1] + 1);
    outcomesContainer[2].text(getOutcome[0] + 1 + getOutcome[1] + 1);
  });
  outcomesContainer.forEach((container) => {
    container.click(() => {
    	container.text(parseFloat(container.text()) - parseFloat(container.text()));
    	indicateSeedsThatCanBeMoved(allSeeeds, { on: true });
    });
  });
  allSeeeds.forEach((seed) => {
  	seed.click(() => {
  	  countOutcome(seed);
  	});
  });
});
