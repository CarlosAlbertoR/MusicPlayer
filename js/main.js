const cover = document.getElementById('cover');
const music = document.getElementById('music');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const previous = document.getElementById('previous');
const play = document.getElementById('play');
const next = document.getElementById('next');
let indexSong = 0;

//Songs information
const songs = [{
        "id": 0,
        "title": "Back In Black",
        "artist": "AC/DC",
        "sourceSong": "./assets/music/ACDC - Back In Black.mp3",
        "coverPath": "./assets/img/Back In Black.jpeg",
        "duration": "4:14"
    },
    {
        "id": 1,
        "title": "Wake Me Up When September Ends",
        "artist": "Green Day",
        "sourceSong": "./assets/music/Green Day - Wake Me Up When September Ends - HQ.mp3",
        "coverPath": "./assets/img/AmericanIdiot.png",
        "duration": "4:46"
    },
    {
        "id": 2,
        "title": "Fade To Black",
        "artist": "Metallica",
        "sourceSong": "./assets/music/Fade To Black.mp3",
        "coverPath": "./assets/img/RideTheLightning.jpg",
        "duration": "6:57"
    },
    {
        "id": 3,
        "title": "Seven Nation Army.mp3",
        "artist": "The White Stripes",
        "sourceSong": "./assets/music/The White Stripes - Seven Nation Army.mp3",
        "coverPath": "./assets/img/Elephant.jpg",
        "duration": "3:58"
    }
]



//Call the load song function
loadSong(songs[indexSong]);

//Load song function
function loadSong(song) {
    cover.src = song.coverPath;
    music.src = song.sourceSong;
    title.textContent = song.title;
    artist.textContent = song.artist;
    duration.textContent = song.duration;
}

function durationSong(music) {
    let minutes = Math.floor(music.duration / 60);
    let seconds = Math.floor(music.duration % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    duration.textContent = `${minutes}:${seconds}`;
}
music.onloadedmetadata = () => console.log(music.duration);

//Toggle play and pause
function playPauseMedia() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

//Update Icon
function updateIconPlayPause() {
    if (music.paused) {
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    } else {
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    }
}

//Update the progress bar
const updateProgress = () => {
    progress.style.width = (music.currentTime / music.duration) * 100 + '%';
    let minutes = Math.floor(music.currentTime / 60);
    let seconds = Math.floor(music.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    timer.textContent = `${minutes}:${seconds}`;
}

//Reset the progress
const resetProgress = () => {
    progress.style.width = 0 + '%';
    timer.textContent = '0:00';
}

//Go to the previous song
function goToPreviousSong() {
    if (indexSong === 0) {
        indexSong = songs.length - 1;
    } else {
        indexSong = indexSong - 1;
    }

    const isDiscPlayingNow = !music.paused;
    loadSong(songs[indexSong]);
    resetProgress();
    if (isDiscPlayingNow) {
        playPauseMedia();
    }
}

//Go to the next song
function goToNextSong(playInmediately) {
    if (indexSong === songs.length - 1) {
        indexSong = 0;
    } else {
        indexSong = indexSong + 1;
    }

    const isDiscPlayingNow = !music.paused;
    loadSong(songs[indexSong]);
    resetProgress();
    if (isDiscPlayingNow || playInmediately) {
        playPauseMedia();
    }
}

//Change the progress of the song when do click in the progress bar
function setProgress(e) {
    const totalWidth = this.clientWidth;
    const clickWidth = e.offsetX;
    const clickWidthRatio = (clickWidth / totalWidth);
    music.currentTime = clickWidthRatio * music.duration;
}

//Play/pause when do click in the play button
play.addEventListener('click', playPauseMedia);

//Various song events
music.addEventListener('play', updateIconPlayPause);
music.addEventListener('pause', updateIconPlayPause);
music.addEventListener('timeupdate', updateProgress);
music.addEventListener('ended', goToNextSong.bind(null, true));

//Go to next song when do click in the next button
next.addEventListener('click', goToNextSong.bind(null, false));

//Go to previous song when do click in the previous button
previous.addEventListener('click', goToPreviousSong);

//Move to different place in the song
progressContainer.addEventListener('click', setProgress);