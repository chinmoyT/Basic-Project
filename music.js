let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;

let index_no =0;
let playing_song = false;

// creating an audio element
let track = document.createElement('audio');

// all songs list
let all_song = [
    {
        name: "first song",
        path:  "song1.mp3",
        img: "img1.jpg",
        singer: "first singer"
    },
    {
        name: "second song",
        path:  "song2.mp3",
        img: "img2.jpg",
        singer: "second singer"
    },
    {
        name: "third song",
        path:  "song3.mp3",
        img: "img3.jpg",
        singer: "third singer"
    }
];

function load_track(index_no){
    clearInterval(timer);
    reset_slider();
    track.src = all_song[index_no].path;
    title.innerHTML = all_song[index_no].name;
    track_image.src = all_song[index_no].img;
    artist.innerHTML = all_song[index_no].singer;
    track.load();
    total.innerHTML = all_song.length;
    present.innerHTML = index_no +1;
    timer = setInterval(range_slider,1000);
}
load_track(index_no);

//mute sound
function mute_sound(){
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML =0;
}

//reset song slider
function reset_slider(){
    slider.value = 0;
}


// check the song is playing or nor
function justplay(){
    if(playing_song == false){
        playsong();
    }else{
        pause_song();
    }
}

//play song
function playsong(){
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause"></i>'
}

//pause song
function pause_song(){
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play"></i>';
}

//next song
function next_song(){
    if(index_no < all_song.length-1){
        index_no += 1;
        load_track(index_no);
        justplay();
    }else{
        index_no =0;
        load_track(index_no);
        justplay();
    }
}

//previous song
function previous_song(){
    if(index_no > 0){
        index_no -= 1;
        load_track(index_no);
        justplay();
    }else{
        index_no = all_song.length -1;
        load_track(index_no);
        justplay();
    } 
}

//change volume
function volume_change(){
    volume_show.innerHTML = recent_volume.ariaValueMax;
    track.volume = recent_volume.value / 100;
}

//change slider position
function change_duration(){
    slider_postion = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

//autoplay function 

function autoplay_switch(){
    if(autoplay ==1){
        autoplay = 0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    }else{
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }
}

function range_slider(){
    let position = 0;
    //update slider position
    if(!isNaN(track.duration)){
        position = track.currentTime * (100/ track.duration);
        slider.value = position;
    }
}

//this function will run when the song is over
if(track.ended){
    play.innerHTML = '<i class = "fa fa-play"></i>'
    if(autoplay ==1){
        index_no += 1;
        load_track(index_no);
        playsong();
    }
}