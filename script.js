var audio = new Audio('./assets/audio/pirates-intro-loop-147177.mp3');

function playSong() {
  if (audio.paused) {
    audio.play();
    audio.volume = 0.5;
    audio.paused = false;
  } else {
    audio.pause();
    console.log('paused');
  }
}
