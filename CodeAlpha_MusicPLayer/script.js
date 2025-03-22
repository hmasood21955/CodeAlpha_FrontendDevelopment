
const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const playlist = document.getElementById('playlist');
const songs = Array.from(playlist.getElementsByTagName('li'));

let currentSongIndex = 0;

// Function to toggle play/pause
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = 'Pause';
  } else {
    audio.pause();
    playPauseButton.textContent = 'Play';
  }
}

// Function to update progress bar
function updateProgress() {
  progress.value = (audio.currentTime / audio.duration) * 100;
}

// Function to set progress
function setProgress() {
  audio.currentTime = (progress.value * audio.duration) / 100;
}

// Function to change volume
function setVolume() {
  audio.volume = volume.value;
}

// Function to load a song
function loadSong(index) {
  const song = songs[index];
  audio.src = song.getAttribute('data-src');
  songTitle.textContent = song.textContent;
  audio.play();
  playPauseButton.textContent = 'Pause';
}

// Function to play next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
}

// Function to play previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
}

// Event listeners
playPauseButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
volume.addEventListener('input', setVolume);

// Load the first song on page load
loadSong(currentSongIndex);

// Add click event to playlist items
songs.forEach((song, index) => {
  song.addEventListener('click', () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
  });
});