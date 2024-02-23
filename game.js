import inquirer from 'inquirer';

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
        exitScreen();
      } else {
        exitScreen();
      }
    });
}

function fight() {
  const options = ['Hit', 'Miss', 'Kill'];
  const randomOption = Math.floor(Math.random() * options.length);

  if (options[randomOption] === 'Hit') {
    console.log('You hit the Werewolf.  He is wounded.');
    continueFight();
  } else {
    if (options[randomOption] === 'Miss') {
      console.log('You missed.  The Werewolf is unharmed.');
      continueFight();
    } else {
      console.log('You killed the Werewolf.  The village is safe.');
      exitScreen();
    }
  }
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
