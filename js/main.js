
// BackgroundImage

let body = document.querySelector("body");
// Array of Imge
let imgsAray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
setInterval(() => {
  // Get random Number
  let random = Math.floor(Math.random() * imgsAray.length);
  //Changing BackGround Image Url
  body.style.backgroundImage = 'url("images/' + imgsAray[random] + '")';
}, 10000);

// Time

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let mounths =  ["Jan", "Feb", "Mar", "Apr","May", "Jun",
                "Jul", "Aug","Sep","Oct", "Nov", "Dec"];
setInterval(() =>{
  let time = new Date();
  let hour = time.getHours();
  let minutes = time.getMinutes();
  let day = time.getDay();
  let date = time.getDate();
  let mounth = time.getMonth();
  let amPm = hour <= 12 ? "AM":"PM" ;

  document.querySelector(".time").innerHTML = hour + ":" + minutes  + ` <span id="am-pm">${amPm}</span>`;
  document.querySelector(".date").innerHTML = days[day] + "," + date + " " + mounths[mounth] ; 
},1000);


// Weather

let weather = {
  apikey: "35ec082ff4aad51714e67f6a5045f02b",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q="
      + city
      +"&units=metric&appid=" 
      + this.apikey 
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data){
    let {name} = data;
    let {icon, description} = data.weather[0];
    let {temp, humidity} = data.main;
    let {speed} = data.wind;
    // let {country} = data.sys;
    let {sunrise} = data.sys;
    let {sunset} = data.sys;
    // let {timezone} = data;
    
    // display weather to UI

    document.querySelector(".city").innerHTML = "Weather In <span>" + name+"</span>";
    // document.querySelector("#country").innerHTML = country
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+".png";
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".temp").innerHTML = Math.round(temp) + "<sup>°C</sup>";
    document.querySelector(".humidity").innerHTML = "Humidy: " + humidity+"%";
    document.querySelector(".wind").innerHTML = "Wind Speed: " +speed+"km/h";
    document.querySelector(".sunrise").innerHTML = "Sunrise: " +  window.moment(sunrise * 1000).format("hh:mm A");
    document.querySelector(".sunset").innerHTML = "Sunset: " + window.moment(sunset *1000).format("hh:mm A");
    document.querySelector(".weather").style.display ="block";
  },

  search: function(){
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
  clear: function(){
    document.querySelector(".search-bar").value = "";
  }
};

document.querySelector(".search button").addEventListener("click",()=>{
  
  if (document.querySelector(".search-bar").value == "") {
    document.querySelector(".search-bar").focus()
  } else{
    weather.search()
  }
  weather.clear();
});

document.querySelector(".search-bar").addEventListener("keyup",(e)=>{
  if (e.key == "Enter" && document.querySelector(".search-bar").value !== "" ) {
    weather.search()
    weather.clear()
  }
  else  {
    document.querySelector(".search-bar").focus();    
  };
});








