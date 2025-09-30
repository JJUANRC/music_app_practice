const player = {
    pastSong :[],
    NextSong : [],
    actualSong: null,
    controller: document.getElementById("media"),
    progress_bar: document.getElementById("progress"),
    initializePlayer(){
        this.actualSong = this.actualSong;
        this.progress_bar.max = 100;
        this.progress_bar.value = 100;
        this.initializeControlMedia(false);
        this.controller.addEventListener('mediaupdate', function (){
        const progress_value = (this.currentTime / this.duration) * 100;
        player.progress_bar.value = progress_value;
        })
        this.progress_bar.addEventListener('input', function(){
            player.controller.currentTime = (this.value/100) * player.controller.duration;
        })
    },
    initializeControlMedia: function (play){
        progress_bar.value = 0;
        if(play){
            media.play();
        }
    },
    getNextSong :function(){
        return this.NextSong.pop();
    }
}

export default player