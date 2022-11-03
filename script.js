let title = document.querySelector("#title");
let artistName = document.querySelector("#name");
let audio = document.querySelector("audio");
let image = document.querySelector("img");

let progressBar = document.querySelector(".progress");
let shownCurrentTime = document.querySelector(".current-time");
let shownDuration = document.querySelector(".duration");

let play = document.querySelector("#play");
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");
let pause = document.querySelector("#pause");

let songs = [
  { title: "Say You Want It More", name: "Nilo", fileName: "Awhile" },
  { title: "Liar", name: "Malorie", fileName: "Liar" },
  { title: "Hear Me Out", name: "Nilo", fileName: "Hear" },
  { title: "Wildflower", name: "George", fileName: "Wildflower" },
];

let songIndex = 0;
let isPlaying = false;

let loadSong = () => {
  if (songIndex + 1 > songs.length) {
    songIndex = 0;
  } else if (songIndex < 0) {
    songIndex = songs.length - 1;
  } else {
  }
  title.innerText = songs[songIndex].title;
  artistName.innerText = songs[songIndex].name;
  audio.src = `/music/${songs[songIndex].fileName}.mp3`;
  image.src = `/img/${songs[songIndex].fileName}.jpg`;
};

let playSong = () => {
  isPlaying = true;
  audio.play();
  pause.style.display = "block";
  play.style.display = "none";
};

let pauseSong = () => {
  isPlaying = false;
  audio.pause();
  play.style.display = "block";
  pause.style.display = "none";
};

let nextSong = () => {
  songIndex++;
  loadSong();
  playSong();
};

let prevSong = () => {
  songIndex--;
  loadSong();
  playSong();
};

let timestamp = (time) => {
  var mins = Math.floor(time / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  var secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  return mins + ":" + secs;
};

loadSong();

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
play.addEventListener("click", playSong);
pause.addEventListener("click", pauseSong);

audio.addEventListener("timeupdate", (e) => {
  if (isPlaying) {
    let duration = e.srcElement.duration;
    let currentTime = e.srcElement.currentTime;
    progressBar.style.width = `${(currentTime / duration) * 100}%`;

    shownDuration.innerText = timestamp(duration);
    shownCurrentTime.innerText = timestamp(currentTime);
  }
});
