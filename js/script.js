const date = new Date();
function showTime() {
    const date = new Date();
    const time = document.querySelector('.time');
    time.textContent = date.toLocaleTimeString();
    setTimeout (showTime, 1000);
    showDate();
}
showTime();

function showDate() {
    
    const newDate = document.querySelector('.date');
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    newDate.textContent = date.toLocaleDateString('en-Br', options);
}

function getTimeOfDay() {//приветствие
    
    let greetingNumber = date.getHours();
    if (greetingNumber <= 5) {
        document.querySelector('.greeting').textContent = `Good night,`;
    } else if (greetingNumber <= 11) {
        document.querySelector('.greeting').textContent = `Good morning,`;
    } else if (greetingNumber <= 17) {
        document.querySelector('.greeting').textContent = `Good afternoon,`;
    } else {
       return document.querySelector('.greeting').textContent = `Good evening,`;
    }
}
getTimeOfDay();


document.addEventListener('DOMContentLoaded', function() {//Ввод имени
    let formData = {};
    const form = document.querySelector('.name');
    const ls = localStorage;

    form.addEventListener('input', function(event) {
        formData["name"] = event.target.value;
        ls.setItem('formData', JSON.stringify(formData));
    })

    if (ls.getItem('formData')) {
        formData = JSON.parse(ls.getItem('formData'));
        for (let key in formData) {
            form.value = formData[key];
        }
    }
    document.querySelector('.city').addEventListener('change', () => getWeather());
    document.querySelector('.city').value = `Minsk`;
    getWeather();
    setInitialPage();
    setBg();
    getQuotes();
    
})

const getRandomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

const numberOfPages = 20;
var initialPageNumber;
var currentPageNumber;

const setInitialPage = () => {
    initialPageNumber = getRandomNum(1, numberOfPages);
    currentPageNumber = initialPageNumber;
}

const setBg = () => {
    
    let greetingNumber = date.getHours();
    var bgNum = currentPageNumber.toString().padStart(2, "0");
    let newBg = document.querySelector('.body').style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";
        if (greetingNumber <= 5) {
            document.querySelector('.body').style.backgroundImage = newBg.concat('night/',bgNum,'.jpg');
        } else if (greetingNumber <= 11) {
            document.querySelector('.body').style.backgroundImage = newBg.concat('morning/',bgNum,'.jpg');
        } else if (greetingNumber <= 17) {
            document.querySelector('.body').style.backgroundImage = newBg.concat('afternoon/',bgNum,'.jpg');
        } else {
            return  document.querySelector('.body').style.backgroundImage = newBg.concat('evening/',bgNum,'.jpg');
        }
}

function getSlideNext() {
    if (currentPageNumber === numberOfPages) {
        currentPageNumber = 1;
    } else {
        currentPageNumber++;
    }
    setBg();
}

function getSlidePrev() {
    if (currentPageNumber === 1) {
        currentPageNumber = numberOfPages;
    } else {
        currentPageNumber--;
    }
    setBg();
}

//Погода
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');

async function getWeather() {
    let city = document.querySelector('.city').value ? document.querySelector('.city').value.trim() : `Minsk`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric&wind_speed&humidity`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    humidity.textContent = `${Math.round(data.main.humidity)}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed)} m/s`;
    weatherDescription.textContent = data.weather[0].description;
}
//Цитаты
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

const getQuotes = () => fetch('assets/data.json', {mode: "no-cors"})
.then((response) => response.json())
.then((data) => {
    console.log(data);
    quote.textContent = `${data.text}`;
    author.textContent = `${data.author}`;
})

//Audio

let list = [
    "Nizkiz – Огонь.mp3",
    "Nizkiz – Блізка.mp3",
    "Nizkiz – Интроверт.mp3",
    "Nizkiz – Небяспечна.mp3"
];

let currentSong = 0;

let player = document.querySelector("audio");
player.src = "audio/" + list[currentSong];

let playBtn = document.getElementById("play");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

playBtn.onclick = play;
nextBtn.onclick = next;
prevBtn.onclick = prev;

function play() {
    player.play();
    playBtn.className = "pause player-icon";
    playBtn.onclick = pause;
    changeColor();
}

function pause() {
    player.pause();
    playBtn.className = "play player-icon";
    playBtn.onclick = play;
}

function next() {
    currentSong = currentSong + 1;
    if (currentSong >= 4) {
        currentSong = 0;
    }
    player.src ="audio/" + list[currentSong];
    play();
}

player.addEventListener ("ended", next, false);

function prev() {
    currentSong = currentSong - 1;
    if (currentSong < 0) {
        currentSong = 3;
    }
    player.src ="audio/" + list[currentSong];
    play();
}

//playlist
let ul = document.getElementById("play-list");

for (let i = 0; i < list.length; i++) {
    let li = document.createElement("li");
    li.textContent = list[i];
    document.getElementById("play-list").appendChild(li);
}

function changeColor() {
    let color = document.getElementsByTagName('li');
    let songName = document.getElementById("liveSong");
    for (let j = 0; j < color.length; j++) {
        if(currentSong == j) {
            color[j].classList.add("active");
            songName.textContent = list[j];
        } else {
            color[j].classList.remove("active");
        }
    }
}

//progressbar

const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}

player.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = player.duration;

    player.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress)