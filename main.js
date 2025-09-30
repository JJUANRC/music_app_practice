import createPlaylist from "./utils/playlist.js";

let progress_bar = document.getElementById("progress");
let media = document.getElementById("media");
let play_btn = document.getElementById("play");
const song_img = document.getElementById("song-img");
const lastest = document.getElementById("lastest");
const forward = document.getElementById("forward")

const last = [];

const playlist = createPlaylist(songs.length);

let playingNow;


function loadSong(i){
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");

    const now = songs[i];

    media.src = now.song_url;
    title.innerText = now.song_name;
    artist.innerText = now.artist_name;
    song_img.src = now.caratula;
}


progress_bar.oninput = function() {
    media.currentTime = (this.value/100) * media.duration;
}

play_btn.addEventListener("click", playPause);

function playPause(){
    if(play_btn.classList.contains("pause")){
        media.pause();
        play_btn.classList.remove("pause");
        play_btn.classList.add("play");
        play_btn.innerText = "Play"
    }else{
        media.play();
        play_btn.classList.remove("play");
        play_btn.classList.add("pause");
        play_btn.innerText = "Pause";
    }
}

