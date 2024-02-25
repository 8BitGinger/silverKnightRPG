var audio = new Audio('./assets/audio/werewolf-howl.mp3');

function playSong() {
  if (audio.paused) {
    audio.play();
    audio.paused = false;
  } else {
    audio.pause();
    console.log('paused');
  }
}
