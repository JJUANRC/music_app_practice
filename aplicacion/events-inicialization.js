import * as elements from "./html_element.js"
import player from "../domain/player.js";
import songs from "../ports/multimedia.js"

export default function(){
window.addEventListener('DOMContentLoaded', () => {
    player.initializePlayer();
    const playingNow = songs[player.actualSong];
});
elements.lastest.addEventListener('click', function(){
    if(!last.length == 0){
        playlist.push(playingNow);
        playingNow = last.pop();
        loadSong(playingNow)
    }
});
forward.addEventListener('click', function(){
    if(!playlist.length == 0){
        last.push(playingNow);
        playingNow = playlist.pop();
        loadSong(playingNow)
    }
});

elements,elements.play_btn.addEventListener("click", playPause);
}