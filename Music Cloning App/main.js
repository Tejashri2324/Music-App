// for a music control.

// to select query for music player
const music = document.querySelector("audio");
const img = document.querySelector("img")
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

//to select query for a progress bar. 
let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");

// to select query for a playlist.
let playlist = document.querySelector(".playlist");
let btn = document.querySelectorAll('.song #play_btn');

// to toggle active part of playlist.
function open_p() {
    playlist.classList.toggle('active');
};


// All main list of music player
let song = [{
    name: "songs/shershah.mp3",
    title: "MANN BHARRYAA-2.0",
    artist: "Singer- B.Praak",
    img: "images/shershah.jpg",
},
{
    name: "songs/songs_msd.mp3",
    title: "Besabriyaan",
    artist: "Singer- Armaan Malik",
    img: "images/msdjpeg.jpeg",
},

{
    name: "songs/songs_teri mitti.mp3",
    title: "Teri mitti",
    artist: "Singer- B praak",
    img: "images/teri mitti.jpg",
},

{
    name: "songs/scam.mp3",
    title: "DO DIN KI ZINDAGI",
    artist: "Singer- Neeraj Arya",
    img: "images/scam.jpg",
},

{
    name: "songs/songs_marykom.mp3",
    title: "TERI BARI",
    artist: "Singer- Mohit Chauhan",
    img: "images/marykom.jpg",
},
{
    name: "songs/Chale Aana.mp3",
    title: "Chale Aana",
    artist: "Armaan Malik, Amaal Malik",
    img: "images/chale aana_.jpg",
},
{
    name: "songs/songs_believer.mp3",
    title: "BELIEVER",
    artist: "Singer-Imagine Dragons",
    img: "images/believer.jpg",
},
{
    name: "songs/Dil Jaaniye.mp3",
    title: "Dil Janiye",
    artist: "Singer-Jubin & Tulsi Kumar",
    img: "images/dil jaaniye.jpg",
},

{
    name: "songs/songs_superhero.mp3",
    title: "SUPERHERO",
    artist: "Singer- Chris Linton",
    img: "images/superhero.jpg",
},
]




// default value that had already defined
let isPlaying = false;
let songIndex = 0;

  
// for play button.
const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
};


// for pause button.
const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
};

// for playing 
play.addEventListener("click", () => {
    if (isPlaying) {
        pauseMusic();
    }
    else {
        playMusic();
    }
});


//  changing songs.
const loadsong = (song) => {
    title.textContent = song.title;
    artist.textContent = song.artist;
    music.src = song.name;
    img.src = song.img;
};

// loadsong(song[0]);


// for Next-Button-
const nextsong = () => {
    songIndex = (songIndex + 1) % song.length;
    loadsong(song[songIndex]);
    playMusic();
};

// for Previous button- 
const prevsong = () => {
    songIndex = (songIndex - 1 + song.length) % song.length;
    loadsong(song[songIndex]);
    playMusic();
};


// progress-Bar  js work
music.addEventListener("timeupdate", (event) => {
    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    // music duration update
    let min_duration = Math.floor(duration / 60);
    if (min_duration < 10) {
        min_duration = `0` + min_duration;
    }
    let sec_duration = Math.floor(duration % 60);
    if (sec_duration < 10) {
        sec_duration = `0` + sec_duration;
    }
    let tot_duration = `${min_duration}:${sec_duration}`
    if (duration) {
        total_duration.textContent = `${tot_duration}`;
    }

    // current duration update

    // for minutes.
    let min_currentTime = Math.floor(currentTime / 60);
    if (min_currentTime < 10) {
        min_currentTime = `0` + min_currentTime;
    }

    // for seconds.
    let sec_currentTime = Math.floor(currentTime % 60);
    if (sec_currentTime < 10) {
        sec_currentTime = `0` + sec_currentTime;
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`
    current_time.textContent = `${tot_currentTime}`;
});


// progress onclick functionality
progress_div.addEventListener("click", (event) => {
    const { duration } = music;
    let move_progress =
        (event.offsetX / event.srcElement.clientWidth) * duration;
    music.currentTime = move_progress;
})


//if music is end call nextsong function. 
music.addEventListener("ended", nextsong);

// callby function.
next.addEventListener("click", nextsong);
prev.addEventListener("click", prevsong);


// for playlist

let ulTag = document.querySelector("ul");
//creating a list or generating Html
for (let i = 0; i < song.length; i++) {
//  playlist occurs in html in ul tags.
    let liTag = ` 
            <li li-index=${i}>  
                <div class="song">
                    <div class="img">
                        <img src="${song[i].img}"/>
                    </div>
                  <div class="more">
                     <audio src="${song[i].name}" id="music"></audio>
                      <div class="song_info">
                         <p id="title">${song[i].title}</p>
                       </div>
                     <button id="play_btn"><i class="fas fa-headphones-alt"></i></button>
                    </div>
                </div>
            </li> `;
            
    ulTag.insertAdjacentHTML("beforeend", liTag);
};

// play particular song from the list on click of li tag
const allLiTags = ulTag.querySelectorAll("li");
function playingsong(){

    for (let j = 0; j < allLiTags.length; j++) {
        if (allLiTags[j].classList.contains("playing")) {
            allLiTags[j].classList.remove("playing");
        }
    
        // getting li-index clicking by user and compare with main songindex.
        if(allLiTags[j].getAttribute("li-index") == songIndex){
            allLiTags[j].classList.add("playing");
        }
    
       // lets done it as onclick function.
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

window.addEventListener("load",() =>{
    playingsong();
})
 
// playing song after clicking list songs
function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    songIndex = getLiIndex;
    loadsong(song[getLiIndex]);
    playMusic();
    playingsong();
    playlist.classList.remove('active');
}