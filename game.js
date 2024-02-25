import inquirer from 'inquirer';
import { LocalStorage } from 'node-localstorage';

global.localStorage = new LocalStorage('./scratch');

global.localStorage.setItem('agree', false);
global.localStorage.setItem('inventory', []);
global.localStorage.setItem('wolf', false);
let hits = 0;

function startGame() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message:
        'Welcome to Silver Knight.  The dreaded Werewolves plague villages all across the Foglands.  Only a Silver Knight can save them. What would you like to do?',
      choices: ['Play', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Play') {
        playGame();
      } else {
        exitScreen();
      }
    });
}

function playGame() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message:
        'You are on the hunt for a particularly menacing Werewolf, when you are attacked from behind.  Luckily his claws missed.  What would you like to do?',
      choices: ['Fight', 'Run', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Fight') {
        console.log(`▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`);

        fight();
      } else if (answer.action === 'Run') {
        console.log(`▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`);
        console.log('The Werewolf is too fast for you.  You are dead.');
        killScreen();
      } else {
        exitScreen();
      }
    });
}

function continueFight() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Fight', 'Run', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Fight') {
        fight();
      } else if (answer.action === 'Run') {
        console.log('The Werewolf is too fast for you.  You are dead.');
        killScreen();
      } else {
        exitScreen();
      }
    });
}

function killScreen() {
  console.log(`        
       @@@@@@@@@@@@@@@@@@
     @@@@@@@@@@@@@@@@@@@@@@@
   @@@@@@@@@@@@@@@@@@@@@@@@@@@
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@/      (@@@/   @
@@@@@@@@@@@@@@@@)      @@  @___@
@@@@@@@@@@@@@ @@@@@@@@@@  | (@@@@@
@@@@@@@@@@@@@ @@@@@@@@@)__@_/@@@@@
 @@@@@@@@@@@@@@@/,/,/./'/_|.)'),)
   @@@@@@@@@@@@@|_ | | | | | | | |_
                  |_|_|_|_|_|_|_|__|
        `);

  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'Would you like to play again?',
      choices: ['Yes', 'No'],
    })
    .then((answer) => {
      if (answer.action === 'Yes') {
        playGame();
      } else {
        exitScreen();
      }
    });
}

function fight() {
  const options = ['Hit', 'Hit', 'Miss', 'Kill', 'Bitten'];
  const randomOption = Math.floor(Math.random() * options.length);

  if (options[randomOption] === 'Hit') {
    console.log('You hit the Werewolf.  He is wounded.');
    continueFight();
  } else {
    if (options[randomOption] === 'Miss') {
      console.log('You missed.  The Werewolf is unharmed.');
      continueFight();
    } else {
      if (options[randomOption] === 'Bitten') {
        console.log('The Werewolf bit you.  You are now a werewolf!.');
        killScreen();
      } else {
        console.log('You killed the Werewolf.  But he is not the Wolf-Lord.');
        continueExplore();
      }
    }
  }
}

function continueExplore() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'Do you want to continue to Explore the woods or Exit?',
      choices: ['Continue', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Continue') {
        crossRoads();
      } else {
        exitScreen();
      }
    });
}

function crossRoads() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'You come to a crossroads.  Which way do you want to go?',
      choices: ['Left', 'Right', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Left') {
        console.log('You go left.');
        leftExplore();
      } else if (answer.action === 'Right') {
        console.log('You go right.');
        rightExplore();
      } else {
        exitScreen();
      }
    });
}

function campFire() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message:
        'You come to an empty campsite with a campfire still burning.  In the flames the shape of a wolf appears and speaks to you.  It says the Wolf-Lord Crux Moonscar has summoned dark energy to create and control an army of Werewolves.  The spirit of the wolf longs to be free.  Free us from the Wolf-Lord and a truce between wolf and man be restored.  What do you do?',
      choices: ['Agree', 'Disagree', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Agree') {
        global.localStorage.setItem('agree', true);
        console.log('You agree to help the spirit of the wolf.');
        // agreeSpirit();
        helpWolf();
      } else if (answer.action === 'Disagree') {
        console.log('You refuse to help the spirit of the wolf.');
        // disagreeSpirit();
        helpWolf();
      } else {
        exitScreen();
      }
    });
}

function helpWolf() {
  var agree = global.localStorage.getItem('agree');
  console.log(agree);
  if ((agree = true)) {
    burnPieces();
  } else {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'Are you Sure?',
        choices: ['Yes', 'No', 'Exit'],
      })
      .then((answer) => {
        if (answer.action === 'Yes') {
          console.log(
            'The wolf is upset and turns you into a werewolf.  You have a limited time before the ugres are beyond your control.  You must defeat the Wolf-Lord before the transformation is complete.  You must hurry!'
          );
          global.localStorage.setItem('wolf', true);
          burnPieces();
        } else {
          if (answer.action === 'No') {
            campFire();
          } else {
            exitScreen();
          }
        }
      });
  }
}

function burnPieces() {
  var inventory = global.localStorage.getItem('inventory');
  console.log('The fire rages in front of you.');

  if (inventory.includes('Willow Tree')) {
    console.log('You take the pieces from your bag and burn the Willow Tree.');
    global.localStorage.removeItem('inventory', 'Willow Tree');
    console.log(
      'You have released the spirit of the wolf.  It guides you to Wolf-Lord Crux Moonscar.  The path winds through the Deepest, Darkest part of the woods.  Where the fog is thickest and the trees are twisted.  The Wolf-Lord is waiting!'
    );
    travelCrux();
  } else {
    console.log(
      'You do not have the Willow Tree pieces guide you.  You must find them and repeat your oath. Check for clues by the river.'
    );
    riverExplore();
  }
}

function travelCrux() {
  console.log(
    'You arrive at the cave of forgotten curses.  You must get inside that cave!'
  );
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'How do you want to get inside the cave?',
      choices: ['Cave Entrance', 'Climb', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Cave Entrance') {
        console.log('You enter the cave.');
        enterCave();
      } else if (answer.action === 'Climb') {
        console.log('You climb the cave.');
        climbCave();
      } else {
        exitScreen();
      }
    });
}

function enterCave() {
  console.log(
    'You enter the cave and see the Wolf-Lord Crux Moonscar.  A strange energy emits from his hand. He is summoning more werewolves.  You must fight him!'
  );
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What do you want to do?',
      choices: ['Fight', 'Run', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Fight') {
        console.log('You begin fighting the Wolf-Lord.');
        fightCrux();
      } else if (answer.action === 'Run') {
        console.log('You attempt to run away.');
        runCrux();
      } else {
        exitScreen();
      }
    });
}

function climbCave() {
  console.log(
    'You attempt to scale the jagged cave walls, looking for a less conspicuous entrance.'
  );
  const outcomes = ['Success', 'Failure'];
  const randomOutcome = Math.floor(Math.random() * outcomes.length);

  if (outcomes[randomOutcome] === 'Success') {
    console.log('You find a hidden entrance to the cave.');
    enterCave();
  } else {
    console.log(
      'You fall but are not injured.  You are back at the base of the cave.'
    );
    travelCrux();
  }
}

function runCrux() {
  console.log(
    'The Wolf-Lord has strange control over your mind.  You feel yourself succumbing to the curse of the werewolf.  You can no longer fight him.  You are now part of his army!'
  );
  killScreen();
}

function fightCrux() {
  const outcomes = [
    'Hit',
    'Hit',
    'Miss',
    'Kill',
    'Bitten',
    'Hit',
    'Hit',
    'Hit',
    'Hit',
    'Miss',
    'Miss',
    'Miss',
    'Miss',
  ];

  const randomOutcome = Math.floor(Math.random() * outcomes.length);

  if (outcomes[randomOutcome] === 'Hit') {
    console.log('You hit the Wolf-Lord.  He is wounded.');
    hits++;
    fightCrux();
  } else {
    if (outcomes[randomOutcome] === 'Miss') {
      console.log('You missed.  The Wolf-Lord is unharmed.');
      fightCrux();
    } else {
      if (outcomes[randomOutcome] === 'Bitten') {
        global.localStorage.getItem(wolf);
        console.log('The Wolf-Lord bit you.  You are now a werewolf!.');

        if ((wolf = true)) {
          console.log(
            'You have a limited time before the ugres are beyond your control.  You must defeat the Wolf-Lord before the transformation is complete.  You must hurry!'
          );
          fightCrux();
        } else {
          global.localStorage.setItem('wolf', true);
          console.log(
            'You are now a werewolf!  You have a limited amount of time before the transformation is complete, you must kill him.'
          );
        }
      } else {
        deathBlow();
      }
    }
  }
}

function deathBlow() {
  var inventory = global.localStorage.getItem('inventory');
  if (inventory.includes('Silver Sword')) {
    console.log(
      'The Wolf-Lord is weakening.  You deliver a final devasting blow and chop off his mangy head.  The village is safe.'
    );
    console.log(`
                          |>      |>
                |>        |~~~~~~~|        |>
                |_    |^^^^^^^^^^^^^^^|    |_
               (__)-----------------------(__)
                | |   |      ()       |   | |
                | |   |     |  |      |   | |
      [^^^]     | -[^^^]    |__|     [^^^]- |     [^^^]
      [ o ]--------[ o ]-------------[ o ]--------[ o ]
      [   ]        [   ]      @      [   ]        [   ]
      [   ]        [   ]    (   )    [   ]        [   ]
      [   ]        [   ]   |     |   [   ]        [   ]
      [   ]        [   ]   |     |   [   ]        [   ]
______[___]________[___]___|_____|___[___]_____ __[___]__

The Kingdom rejoices as the Foglands are saved!  You are a hero!

  `);
  } else {
    console.log(
      'After a brutal fight you were able to kill the Wolf-Lord, but the damage you sustained was too much.  You save the village, but you did not survive.  The village will remember you as a hero.  You are dead, but your memory will live on!'
    );
    killScreen();
  }
}

function investigateWindmill() {
  console.log(
    'Inside the Windmill you see piles dead flesh and bones.  Teeth and claw marks cover the walls.  You hear a low growl.  You must fight the Werewolf.'
  );

  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What do you want to do?',
      choices: ['Fight Him', 'Trap Him', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Fight Him') {
        console.log(
          'You fight the Werewolf, but sadly he is too strong after consuming an entire village.  You are dead.  The village is surely doomed.'
        );
        killScreen();
      } else if (answer.action === 'Trap Him') {
        console.log(
          'You trapped the werewolf.  This windmill holds only death and no secrets.  You leave the Windmill.'
        );
        rightExplore();
      } else {
        exitScreen();
      }
    });
}

function leftExplore() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message:
        'You come to a clearing.  In the distance you can see an old Tower, hear the rustling water of a nearby river, or you can go back.  What do you want to do?',
      choices: ['Tower', 'River', 'Back', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Tower') {
        console.log('You go to the Tower.');
        towerExplore();
      } else if (answer.action === 'River') {
        console.log('You go to the River.');
        riverExplore();
      } else if (answer.action === 'Back') {
        console.log('You go back.');
        crossRoads();
      } else {
        exitScreen();
      }
    });
}

function rightExplore() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message:
        'You come to a small pond.  You can see the blades of the old windmill in the distance, you smell the flames and see the smoke of a campfire, or you can go back.  What do you want to do?',
      choices: ['Windmill', 'Campfire', 'Back', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Windmill') {
        console.log('You go to the Windmill.');
        windmillExplore();
      } else if (answer.action === 'Campfire') {
        console.log(
          'As you search for a campfire, you encounter a mysterious figure.  The figure is a werewolf.  You must fight it.'
        );
        fight();
      } else if (answer.action === 'Back') {
        console.log('You go back.');
        crossRoads();
      }
    });
}

function windmillExplore() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message:
        'You come to the Windmill.  The creaking wood and the blades slowing spin in the wind, the howling of the wind through the trees, and the smell of rotting flesh could be detected.  Something dark lurks here.  What do you want to do?',
      choices: ['Investigate', 'Leave', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Investigate') {
        console.log('You investigate the Windmill.');
        investigateWindmill();
      } else if (answer.action === 'Leave') {
        console.log('You leave the Windmill.');
        rightExplore();
      } else {
        exitScreen();
      }
    });
}

function towerExplore() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message:
        'You arrive at the old stone tower.  This tower was rumored to have once been occupied by an evil doctor who conducted experiments on the wolves and eventually the villagers.  What do you want to do?',
      choices: ['Enter', 'Leave', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Enter') {
        console.log('You enter the Tower.');
        enterTower();
      } else {
        if (answer.action === 'Leave') {
          console.log('You leave the Tower.');
          leftExplore();
        } else {
          exitScreen();
        }
      }
    });
}

function enterTower() {
  console.log(
    'You enter the tower.  The air is thick with dust and the smell of decay.  The walls are lined with strange symbols and the floor is covered in blood.  You hear a low growl.  You must fight the Werewolf.'
  );
  towerFight();
}

function towerFight() {
  const options = ['Hit', 'Hit', 'Miss', 'Kill', 'Bitten'];
  const randomOption = Math.floor(Math.random() * options.length);

  if (options[randomOption] === 'Hit') {
    console.log('You hit the Werewolf.  He is wounded.');
    hits++;
    towerFight();
  } else {
    if (options[randomOption] === 'Miss') {
      console.log('You missed.  The Werewolf is unharmed.');
      towerFight();
    } else {
      if (options[randomOption] === 'Bitten') {
        console.log('The Werewolf bit you.  You are now a werewolf!.');
        global.localStorage.setItem('wolf', true);
        towerFight();
      } else {
        console.log('You killed a Werewolf.');
        continueTower();
      }
    }
  }
}

function continueTower() {
  console.log('You continue to explore the Tower.');
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'You find a chest.  What do you want to do?',
      choices: ['Open', 'Leave', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Open') {
        console.log('You open the chest.');
        global.localStorage.setItem('inventory', ['Silver Sword']);
        openChest();
      } else if (answer.action === 'Leave') {
        console.log('You leave the Tower.');
        leftExplore();
      } else {
        exitScreen();
      }
    });
}

function openChest() {
  console.log(
    'You open the chest and find a Silver Sword.  This tower holds no further secrets.  You leave the Tower.'
  );
  leftExplore();
}

function riverExplore() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message:
        'You arrive at the river.  The water is clear and the fish are plentiful, however you notice somthing odd: the water is running upstream and the fish are swimming backwards.  What do you want to do?',
      choices: ['Look for Clues', 'Return to Clearing', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Look for Clues') {
        console.log('You look for Clues.');
        lookForClues();
      } else {
        if (answer.action === 'Return to Clearing') {
          console.log('You return to the Clearing.');
          leftExplore();
        } else {
          exitScreen();
        }
      }
    });
}

function lookForClues() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message:
        'There is broken tree, a coiled serpent lies nearby the river still, and a strange symbol is painted on a nearby rock.  What do you want to do?',
      choices: ['Inspect Tree', 'Inspect Serpent', 'Inspect Symbol', 'Exit'],
    })
    .then((answer) => {
      if (answer.action === 'Inspect Tree') {
        console.log(
          'You inspect the Tree.  A willow tree is split into 5 parts.  The tree is dead.  You gather the 5 parts of the tree.  They seem important to you.'
        );
        global.localStorage.setItem('inventory', ['Willow Tree']);
        lookForClues();
      }
      if (answer.action === 'Inspect Serpent') {
        console.log(
          'You inspect the Serpent.  As you get closer the Serpent springs to life, and begins to cry with a voice of ghostly maiden, "Free me from this curse, it is the only way to defeat the Wolf-Lord. Find the 5 parts of the willow tree and burn them in the fire.  The fire will reveal the path to the Wolf-Lord."'
        );
        lookForClues();
      }
      if (answer.action === 'Inspect Symbol') {
        console.log(
          'You inspect the Symbol.  It appears to be a symbol of the Wolf-Lord.  The symbol is painted in blood.  The symbol is a circle with a cross in the middle.  The cross has 5 lines.  The symbol is a warning.  Smoke from a fire can be seen in the distance.  I must head there!'
        );
        campFire();
      }
    });
}

function exitScreen() {
  console.log(`
        @
       (_)
       |=|
       |=|
  <(|_|(@)|_|)>
      | Y |
      | | |
      | | |
     _| | |
  __/ | | |)
 /  ) | | | )__        Until next time!
    __|_|_|____)
  (O)      +   |    
   |            )_
 ( | )   (o)      )
_  |/___( | )______)       
  `);
}

function firstStart() {
  console.log(`
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
             ⠀⠀⠀ ⠀⠀⣀⣠⣤⣤⣤⣤⣄⣀⠀⠀⠀⠀⠀
              ⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀
              ⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢿⣿⣷⡀⠀
              ⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⣴⢿⣿⣧⠀
              ⣿⣿⣿⣿⣿⡿⠛⣩⠍⠀⠀⠀⠐⠉⢠⣿⣿⡇
              ⣿⡿⠛⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿
              ⢹⣿⣤⠄⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⡏
    ⠀          ⠻⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⠟⠀
        ⠀⠀     ⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⠀⢻⠟⠁⠀⠀
           )>
  [########[]⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿|>
           )>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
 _____ _ _                _____     _     _   _   
|   __|_| |_ _ ___ ___   |  |  |___|_|___| |_| |_ 
|__   | | | | | -_|  _|  |    -|   | | . |   |  _|
|_____|_|_|:_:|___|_|    |__|__|_|_|_|_  |_|_|_|  
     Text Based RPG Game             |___|       
  `);
  startGame();
}

// deptChoices();

firstStart();
