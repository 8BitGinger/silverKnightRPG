var werewolf = new Audio('./assets/audio/werewolf-howl.mp3');
var sword = new Audio('./assets/audio/sword-clash.wav');

var options = [werewolf, sword];

function playSong() {
  var audio = options[Math.floor(Math.random() * options.length)];

  if (audio.paused) {
    audio.play();
    audio.paused = false;
  } else {
    audio.pause();
    console.log('paused');
  }
}
