const date = new Date();
function showTime() {
    const date = new Date();
    const time = document.querySelector('.time');
    time.textContent = date.toLocaleTimeString();
    setTimeout(showTime, 1000);
    showDate();
}
showTime();

function showDate() {

    const newDate = document.querySelector('.date');
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
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


document.addEventListener('DOMContentLoaded', function () {//Ввод имени
    let formData = {};
    const form = document.querySelector('.name');
    const ls = localStorage;

    form.addEventListener('input', function (event) {
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
        document.querySelector('.body').style.backgroundImage = newBg.concat('night/', bgNum, '.jpg');
    } else if (greetingNumber <= 11) {
        document.querySelector('.body').style.backgroundImage = newBg.concat('morning/', bgNum, '.jpg');
    } else if (greetingNumber <= 17) {
        document.querySelector('.body').style.backgroundImage = newBg.concat('afternoon/', bgNum, '.jpg');
    } else {
        return document.querySelector('.body').style.backgroundImage = newBg.concat('evening/', bgNum, '.jpg');
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

//Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');

async function getWeather() {
    let city = document.querySelector('.city').value ? document.querySelector('.city').value.trim() : `Los Angeles`;
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

//Quotes
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const btn = document.querySelector('.change-quote');

const url = "https://api.quotable.io/random";

const getQuotes = () => fetch(url)
    .then((data) => data.json())
    .then((item) => {
        quote.textContent = item.content;
        author.textContent = item.author;
    });

window.addEventListener("load", getQuotes);
btn.addEventListener("click", getQuotes);

//Audio

let list = [
    "Summer Wind.mp3",
    "River Flows In You.mp3",
    "Ennio Morricone.mp3",
    "Aqua Caelestis.mp3"
];

let currentSong = 0;

let player = document.querySelector("audio");
player.src = "assets/sounds/" + list[currentSong];

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
    player.src = "assets/sounds/" + list[currentSong];
    play();
}

player.addEventListener("ended", next, false);

function prev() {
    currentSong = currentSong - 1;
    if (currentSong < 0) {
        currentSong = 3;
    }
    player.src = "assets/sounds/" + list[currentSong];
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
        if (currentSong == j) {
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
    const { duration, currentTime } = e.srcElement;
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

//music time
const currentTimeContainer = document.querySelector('.current-time');
const durationContainer = document.querySelector('.duration');

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTime() {
    currentTimeContainer.textContent = formatTime(player.currentTime);
    if (player.duration) {
        durationContainer.textContent = formatTime(player.duration);
    }
}

player.addEventListener('loadedmetadata', () => {
    updateTime();
    setInterval(updateTime, 1000);
});

//Volume

const audioElement = document.querySelector('audio');
const volumeBtn = document.querySelector('.volume-btn');
const volumeSlider = document.querySelector('.volume-slider');
let volumeIcon = document.querySelector('.volume-icon');

volumeSlider.addEventListener('input', function () {
    const volume = this.value;
    audioElement.volume = volume;
    if (volume > 0) {
        volumeIcon.src = "assets/svg/volume_up.svg"
    } else {
        volumeIcon.src = "assets/svg/volume_down.svg"
    }
});

volumeBtn.addEventListener('click', function () {
    if (audioElement.volume === 0) {
        audioElement.volume = volumeSlider.value;
        volumeSlider.value = audioElement.volume;
        volumeIcon.src = "assets/svg/volume_up.svg"
    } else {
        audioElement.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.src = "assets/svg/volume_down.svg"
    }
});

//todo-list

let taskInput = document.getElementById("main-task__text");//Add a new task.
let addButton = document.querySelector("#button-add");
let incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incompleteTasks
let completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks

let createNewTaskElement = function (taskString) {

    let listItem = document.createElement("li");

    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    let deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = 'task';
    checkBox.type = "checkbox";
    checkBox.className = "input-task__checkbox";
    editInput.type = "text";
    editInput.className = "main-task__text";

    editButton.innerText = "Edit";
    editButton.className = "button-edit";

    deleteButton.className = "button-delete";
    deleteButtonImg.src = 'assets/svg/remove.png';
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

let addTask = function () {
    console.log("Add Task...");
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);
    listItem.classList.add('main-list');
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

let editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    let listItem = this.parentNode;

    let editInput = listItem.querySelector('.main-task__text');
    let label = listItem.querySelector("label");
    let editBtn = listItem.querySelector(".button-edit");
    let containsClass = listItem.classList.contains("main-list__edit");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("main-list__edit");
};

let deleteTask = function () {
    console.log("Delete Task...");
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

let taskCompleted = function () {
    console.log("Complete Task...");
    let listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}
let taskIncomplete = function () {
    console.log("Incomplete Task...");
    let listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

let ajaxRequest = function () {
    console.log("AJAX Request");
}
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    let checkBox = taskListItem.querySelector("input[type=checkbox]");
    let editButton = taskListItem.querySelector(".button-edit");
    let deleteButton = taskListItem.querySelector(".button-delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
