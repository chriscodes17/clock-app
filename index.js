//API for random quote generation 
const quoteApi = function () {
    const quoteText = document.querySelector('.quote-text');
    const quoteAuthor = document.querySelector('.quote-author');
    const API_URL = 'https://api.quotable.io/random';
    fetch(API_URL)
        .then(function (res) {
            const processingRes = res.json();
            return processingRes;
        })
        .then(function (jsonRes) {
            quoteText.innerText = `"${jsonRes.content}"`;
            quoteAuthor.innerText = jsonRes.author;
        })
}
//API for current days/week # based on IP
const timeApi = function () {
    const dayYear = document.querySelector('.day-year');
    const dayWeek = document.querySelector('.day-week');
    const weekNum = document.querySelector('.week-num');
    cont proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    const API_URL = 'https://worldtimeapi.org/api/ip';
    fetch(proxyUrl + API_URL)
        .then(function (res) {
            const processingRes = res.json();
            return processingRes;
        })
        .then(function (jsonRes) {
            // timeConvert(jsonRes.unixtime, jsonRes.abbreviation);
            dayYear.innerText = jsonRes.day_of_year;
            dayWeek.innerText = jsonRes.day_of_week;
            weekNum.innerText = jsonRes.week_number;
        })
}

const locationAPI = function () {
    const locationText = document.querySelector('.clock-location');
    const timezone = document.querySelector('.timezone');
    const API_URL = 'https://freegeoip.app/json/';
    fetch(API_URL)
        .then(function (res) {
            const processingRes = res.json();
            return processingRes;
        })
        .then(function (jsonRes) {
            const locationStr = `in ${jsonRes.city}, ${jsonRes.country_name}`
            locationText.innerText = locationStr.toUpperCase();
            timezone.innerText = jsonRes.time_zone
        })
}

const getTime = function () {
    const clockTime = document.querySelector('.clock-time');
    let date = new Date();
    let hour = date.getHours();
    let mins = date.getMinutes();

    if (mins < 10) {
        clockTime.innerText = `${hour}:0${mins}`
    } else {
        clockTime.innerText = `${hour}:${mins}`;
    }

    backgroundImage(hour);
    greeting(hour);
}
//Get new quote, calls api onClick
const quoteRefresh = function () {
    const btn = document.querySelector('.quote-refresh');
    btn.addEventListener('click', quoteApi);
}

const btnLogic = function () {
    const btn = document.querySelector('.btn-more');
    const btnText = document.querySelector('.btn-text');
    const btnArrow = document.querySelector('.btn-arrow');
    const expandSection = document.querySelector('.expand-box');

    btn.addEventListener('click', function (e) {
        expandSection.classList.toggle('expand-appear');
        expandSection.scrollIntoView();
        if (btnText.innerHTML === 'LESS') {
            btnText.innerHTML = 'MORE';
            btnArrow.classList.remove('btn-arrow-up')
        } else {
            btnText.innerHTML = 'LESS';
            btnArrow.classList.add('btn-arrow-up');
        }
    });
}

const backgroundImage = function (hour) {
    const icon = document.querySelector('.clock-icon');
    if (hour >= 18 || hour <= 4) {
        document.body.classList.add('night');
        icon.src = './assets/desktop/icon-moon.svg';
    } else {
        document.body.classList.add('day');
        icon.src = './assets/desktop/icon-sun.svg';
    }
}

const greeting = function (hour) {
    const greetText = document.querySelector('.clock-greet');
    if (hour >= 5 && hour <= 11) {
        greetText.innerText = 'Good Morning!';
    } else if (hour >= 12 && hour <= 17) {
        greetText.innerText = 'Good Afternoon!';
    } else {
        greetText.innerText = 'Good Evening!';
    }
}

//Loading Screen 
const timeOut = function () {
    setTimeout(showPage, 3000);
}

const showPage = function () {
    document.querySelector('.loader-container').style.display = 'none';
    document.querySelector('.main-content').style.display = 'block';
}

//FUNCTION INVOKES
quoteApi();
timeApi();
locationAPI();
getTime();
quoteRefresh();
btnLogic();
setInterval(getTime, 1000);

window.onload = function(){
    timeOut();
}

