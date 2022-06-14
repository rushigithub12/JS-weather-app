let weather = {
  apiKey: "a789894c433bd187495f71ede53ee4fe",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { speed } = data.wind;
    const { temp, humidity } = data.main;
    const { icon, description } = data.weather[0];

    const fahrenheit = (temp * 9) / 5 + 32;

    console.log(temp, fahrenheit);

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";

    return fahrenheit;
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};


//invoking search method when click search icon
document
  .querySelector(".search .search-btn")
  .addEventListener("click", function () {
    weather.search();
  });

  //invoking search method when press enter button
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
