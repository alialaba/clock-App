const wrap = document.querySelector(".wrapper");
const icon = document.querySelector(".hero__icon img");
const greetText = document.querySelector(".hero__text");
const timerHour = document.getElementById("hour");
const timerMinute = document.getElementById("minute");
const timerPeriod = document.querySelector(".timer__period");
const locate = document.querySelector(".location");
const timeZone = document.getElementById("timezone");
const zoneYear = document.getElementById('year')
const ZoneWeek = document.getElementById('week');
const zoneDay = document.getElementById('day');
const showMore = document.querySelector(".more");
const showLess = document.querySelector(".less");
const arrow = document.querySelector(".switch__arrow");
const titleText = document.querySelector('.title');
const subTitleText = document.querySelector('.sub__title');
const btn = document.querySelector(".btn");
const clock = document.querySelector(".clock__section");
const dataDetails = document.querySelector(".date__details");

const timerFunction = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let halfHour = hours % 12;

    // set hour
    if (hours > 12) {
        timerHour.innerHTML = halfHour;
    } else {
        timerHour.innerHTML = hours;
    }

    //set minutes
    if (minutes < 10) {
        timerMinute.innerHTML = `0${minutes}`
    } else {

        timerMinute.innerHTML = minutes;
    }

    //timer period
    hours >= 12 ? timerPeriod.innerHTML = "PM" : timerPeriod.innerHTML = "AM"

    //timming says
    if (hours >= 0 && hours <= 11) {
        greetText.innerHTML = "Good Morning";
    } else if (hours >= 12 && hours < 16) {
        greetText.innerHTML = "Good Afternon";
    } else if (hours >= 16 && hours < 21) {
        greetText.innerHTML = "Good Evening";
    } else {
        greetText.innerHTML = "Good Night";
    }
    //background
    if (hours >= 6 && hours <= 18) {
        icon.src = "images/sun.png";
        wrap.style.backgroundImage = "url('images/daytime.jpg')";
        dataDetails.style.background = " rgba(255, 255, 255, 0.8)";
        // subTitleText.forEach(item => {
        //     item.classList.remove('darkgray');
        //     item.classList.add("lightgray");
        // })
        // titleText.forEach(item => item.classList.add("dark"))
    } else {
        icon.src = "images/sun.png";
        wrap.style.backgroundImage = "url('images/night.jpg')";
        dataDetails.style.background = "rgba(0,0,0,0.6)";
        // subTitleText.forEach(item => {
        //     item.classList.remove('lightgray');
        //     item.classList.add("darkgray");
        // })
    }
    // titleText.forEach(item => item.classList.remove("dark"))
}
timerFunction()

const switchData = () => {
    showMore.classList.toggle("hide__text")
    showLess.classList.toggle("show__text");
    arrow.classList.toggle("rotate");
    clock.classList.toggle("slide");
    dataDetails.classList.toggle("show")

}
btn.addEventListener('click', switchData)

const currentDayWeekYear = day => {
    let currentTimer = new Date(day.getTime());
    let dayOne = new Date(day.getFullYear(), 0, 1);
    //set number of the day in the year
    const currentDAyNumber = Math.ceil((currentTimer - dayOne + 1) / 86400000);
    zoneYear.innerHTML = currentDAyNumber;
    //set week number
    const currentWeekNumber = Math.ceil(currentDAyNumber / 7);
    zoneDay.innerHTML = currentWeekNumber;
}

const getCurrentWeek = (day) => {
    day.getDay() === 0 ? ZoneWeek.innerHTML = 7 : ZoneWeek.innerHTML = day.getDay();
}

const locationData = async() => {
    try {
        const res = await fetch('https://ipapi.co/json')
        const data = await res.json();
        const { timezone, city, country } = data;
        locate.innerHTML = `in ${city}, ${country}`;
        timeZone.innerHTML = `${timezone}`;

    } catch {
        locate.innerHTML = "Location Data not Available";
        timeZone.innerHTML = "Timezone Data not Available";

    }
}

window.addEventListener('load', () => {
    timerFunction();
    locationData();

})



setInterval(timerFunction, 1000);
setInterval(locationData, 30000);
setInterval(() => { currentDayWeekYear(new Date) }, 9000);
setInterval(() => { getCurrentWeek(new Date) }, 1000);