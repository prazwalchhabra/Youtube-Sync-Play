var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo(){
    player.stopVideo();
}

function playVideo(){
    console.log(player.getCurrentTime());
    if(YT.PlayerState.PLAYING){
        player.pauseVideo();
        video_playing = false;
    }
    else{
        player.playVideo();
        video_playing = true;
    }
}

function syncPlay(seek_time){
    player.seekTo(seek_time);
}

function sendSyncMessage(){
    var seek_time = player.getCurrentTime();
    const data = {
        sync_message: true,
        seek_time,
    };
    dataChannel.send(JSON.stringify(data));
}

const play_button = document.getElementById('play');
play_button.addEventListener('click', playVideo);

const sync_button = document.getElementById('sync_brod');
sync_button.addEventListener('click', sendSyncMessage);