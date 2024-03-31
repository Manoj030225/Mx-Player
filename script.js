const playBtn = document.getElementById('play');
const music = document.querySelector('audio');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const image = document.querySelector('img');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');


let songs = [
    {
        name:'harnoor-1',
        displayName:'Moonlight',
        artist:'harnoor'
    },
    {
        name:'harnoor-2',
        displayName:'Waalian',
        artist:'harnoor'  
    },
    {
        name:'harnoor-3',
        displayName:'Parshawan',
        artist:'harnoor'  
    },
    {
        name:'harnoor-4',
        displayName:'Chan Vakheya',
        artist:'harnoor'  
    },
];
let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','pause');
    music.play();
    image.classList.add('image');
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
    music.pause();
    image.classList.remove('image');
}

playBtn.addEventListener('click',() => (isPlaying ? pauseSong() : playSong()));

function loadSong(songs) {
    title.textContent = songs.displayName;
    artist.textContent = songs.artist;
    music.src =`music/${songs.name}.mp3`;
    image.src = `album/${songs.name}.jpg`
}

let songIndex = 0;

function prevSong() {
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong(){
    songIndex++
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex])
    
    playSong();
}

function updateProgressBar(e) {
    if(isPlaying){
        const{duration,currentTime} = e.srcElement;

        const progressPercent = (currentTime/duration)* 100;
        progress.style.width =
        `${progressPercent}%`;
        
        const durationMinutes = Math.floor((duration/60));
        let durationSeconds = Math.floor((duration%60));
        if(durationSeconds < 10){
            durationSeconds = `${durationSeconds}`  
        }

        if(durationSeconds){
            durationEl.textContent = `${durationMinutes} : ${durationSeconds}`
        }

        const currentMinutes = Math.floor((currentTime/60));
        let currentSeconds = Math.floor((currentTime%60));
        if(currentSeconds < 10){
          currentSeconds = `0${currentSeconds}`  
        }
    
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}


function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const{duration} = music;
    music.currentTime = (clickX/width)*duration;
}

nextBtn.addEventListener('click',nextSong);
prevBtn.addEventListener('click',prevSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);