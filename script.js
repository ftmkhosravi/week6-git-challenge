
let inputValue = document.querySelector("#input-city");
let searchBtn = document.querySelector("#btn");
let currentBtn = document.querySelector("#current");
let city = document.querySelector("#city-name");
let temperature = document.querySelector(".temperature");
let description = document.querySelector(".description");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let img = document.querySelector(".images");
let lon ,lat ; 
let apiKey = "4aa4f4c485e2f9ad87e3fd6f892979f5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;


function SetValue(response){
    let temp = response.data.main.temp ;
    city.innerHTML = `city name : ${response.data.name}`;
    temperature.innerHTML = `<h4>temperature :</h4> ${Math.round(temp)}`;
    wind.innerHTML = `<h4>wind(speed) :</h4> ${Math.round(response.data.wind.speed)} km/h`;
    humidity.innerHTML = `<h4>humidity : </h4> ${Math.round(response.data.main.humidity)}%`;
    description.innerHTML = `<h4>description : </h4>${response.data.weather[0].description}`;
    if(temp <= 0){
        img.innerHTML = `<img src="img/wear-jacket.jpg">`;
    }else if( temp<10 && temp >0){
        img.innerHTML = `<img src="img/fleece.png">`;
    }else if( temp<20 && temp >11){
        img.innerHTML = `<img src="img/medium-coat.jpg">`;
    }else if( temp<30 && temp >20){
        img.innerHTML = `<img src="img/shirts.jpg">`;
    }else{
        img.innerHTML = `<img src="img/summer.jpg">`;
    }
}

function GetValue(event){
    event.preventDefault();
    let cityName = inputValue.value;
    axios.get(apiUrl+`&q=${cityName}`).then(SetValue);
}

function SetPosition(position){
    lon = position.coords.latitude;
    lat = position.coords.longitude;
    axios.get(apiUrl+`&lat=${lat}&lon=${lon}`).then(SetValue);
}

function ShowCurrentLocation(){
    navigator.geolocation.getCurrentPosition(SetPosition);
}

searchBtn.addEventListener("click" , GetValue);
currentBtn.addEventListener("click" , ShowCurrentLocation);
