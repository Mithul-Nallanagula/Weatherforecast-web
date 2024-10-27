document.getElementById("btn").addEventListener("click", () => {
    const cityn = document.getElementById("city").value;
    const container = document.getElementById("con1");
    const white = document.getElementById("whitecon");
    const day0 = document.getElementById("day0");
    const black = document.getElementById("bcon");

   const extra = document.getElementById("extra");
  
   const API = "1db38870fb16fe1adb55a7a31d3c8311";

    const logo = document.getElementById("logo");
    const cong = document.getElementById("cong");
logo.innerHTML = "";
      cong.innerHTML = "" ;
    if (cityn === "") {
        alert("Please Enter a Valid City");
        return;  
    }

  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityn}&appid=${API}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Invalid City");
            }
            return response.json();
        })
        .then(data => {
        
     
          

            

            document.getElementById("cityname").textContent = cityn;
            
            document.getElementById("temp").textContent = `${data.main.temp}°C`;
            document.getElementById("wind").textContent = `${data.wind.speed} km/h`;
            document.getElementById("humidity").textContent = `${data.main.humidity}%`;


            

           
         
            
             
            
            const condition = data.weather[0].description.toLowerCase();
            let weth ;
           
            console.log("Weather Condition:", condition); 
            

            let imgsrc = "";
            if (condition.includes("sunny")) {
                imgsrc = "images/sunny.png";
              weth = "Sunny";
               
            } else if (condition.includes("cloud")) {
                imgsrc = "images/cloudy.png";
                weth = "Cloudy";
            } else if (condition.includes("mist") || condition.includes("haze")) {
                imgsrc = "images/mist.png";
                weth = "Mist";
               
            } else if (condition.includes("rain") || condition.includes("drizzle")) {
                imgsrc = "images/rain.png"; 
                weth = "Mist";
                
            } else if (condition.includes("partly cloudy")) {
                imgsrc = "images/Partly cloudy.png";
                weth = "partly cloudy";
            } else if (condition.includes("clear")) {
                imgsrc = "images/cloudy.png";
                weth = "Clear";
            }  else {
                imgsrc = "images/default.jpg";
                
            }

           
           
               
            
                


            const img = document.createElement("img");
            
            img.style.display = "block";
            img.src = imgsrc;
            logo.appendChild(img);

            
            const sunny = document.createElement("span");

            
            sunny.style.fontSize = "4vw";
           
            sunny.innerText = weth;
            cong.appendChild(sunny);
            

            document.getElementById("con1").style.display = "block";
            document.getElementById("whitecon").style.display = "none";
            document.getElementById("bcon").style.display = "flex";
            document.getElementById("day0").style.display = "grid";
            document.getElementById("extra").style.display = "grid";

             




            return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityn}&appid=${API}&units=metric`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error fetching forecast data");
            }
            return response.json();
        })
        .then(forecastData => {
            const uniqueDates = [];
            const sixDayForecast = [];

            
            forecastData.list.forEach(forecast => {
                const forecastDate = new Date(forecast.dt * 1000).toDateString();
                
                if (!uniqueDates.includes(forecastDate) && uniqueDates.length < 6) {
                    uniqueDates.push(forecastDate);
                    sixDayForecast.push({
                        date: forecastDate,
                        temp: forecast.main.temp,
                        wind: forecast.wind.speed,
                        humidity: forecast.main.humidity,
                        climate : forecast.weather[0]?.description
                    });
                }
            });

           

            sixDayForecast.forEach((day,index) => {
               
                const dateElement = document.getElementById(`Date${index}`);
                const tempElement = document.getElementById(`temp${index + 1}`);
                const windElement = document.getElementById(`wind${index + 1}`);
                const humiElement = document.getElementById(`humi${index + 1}`);
            
              
                if (dateElement) dateElement.textContent = day.date; 
                if (tempElement) tempElement.textContent = `${day.temp}°C`;
                if (windElement) windElement.textContent = `${day.wind} km/h`; 
                if (humiElement) humiElement.textContent = `${day.humidity}%`; 
            });

           
           
            console.log("Next 6 Days Weather Forecast Array:", sixDayForecast);
    

           

        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("City not found. Please enter a valid city.");
        
        });
});


document.getElementById("locate").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Fetch current weather data
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1db38870fb16fe1adb55a7a31d3c8311&units=metric`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Location not found");
                        }
                        return response.json();
                    })
                    .then(data => {
                       
                        document.getElementById("cityname").textContent = `${data.name}`;
                        document.getElementById("temp").textContent = `${data.main.temp}°C`;
                        document.getElementById("wind").textContent = `${data.wind.speed} km/h`;
                        document.getElementById("humidity").textContent = `${data.main.humidity}%`;

                        const condition = data.weather[0].description.toLowerCase();
                        console.log("Weather Condition:", condition); 
                        let imgsrc = "";
                        let weth;
                        if (condition.includes("sunny")) {
                            imgsrc = "images/sunny.png";
                            weth = "Sunny";
                        } else if (condition.includes("cloud")) {
                            imgsrc = "images/cloudy.png";
                            weth = "Cloudy";
                        } else if (condition.includes("mist") || condition.includes("haze")) {
                            imgsrc = "images/mist.png";
                            weth = "Mist";
                        } else if (condition.includes("rain") || condition.includes("drizzle") ) {
                            imgsrc = "images/rain.png";
                            weth = "Rain";
                        } else if (condition.includes("clear")) {
                            imgsrc = "images/cloudy.png";
                            weth = "Clear";
                        } else {
                            imgsrc = "images/default.jpg";
                            
                        }

                        const logo = document.getElementById("logo");
                        logo.innerHTML = "";
                        const img = document.createElement("img");
                        img.src = imgsrc;
                        logo.appendChild(img);

                        const cong = document.getElementById("cong");
                        cong.innerHTML = "";
                        const sunny = document.createElement("span");
                        sunny.style.fontSize = "4vw";
                        sunny.innerText = weth;
                        cong.appendChild(sunny);

                        document.getElementById("con1").style.display = "block";
                        document.getElementById("whitecon").style.display = "none";
                        document.getElementById("bcon").style.display = "flex";
                        document.getElementById("day0").style.display = "grid";
                        document.getElementById("extra").style.display = "grid";

                        // Fetch 6-day forecast data using the correct endpoint
                        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1db38870fb16fe1adb55a7a31d3c8311&units=metric`)
                    
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Error fetching forecast data");
                        }
                        return response.json();
                    })
                    .then(forecastData => {
                        if (!forecastData.list) {
                            throw new Error("Forecast data is unavailable");
                        }

                        const uniqueDates = [];
                        const sixDayForecast = [];



                        forecastData.list.forEach(forecast => {
                            const forecastDate = new Date(forecast.dt * 1000).toDateString();
                            if (!uniqueDates.includes(forecastDate) && uniqueDates.length < 6) {
                                uniqueDates.push(forecastDate);
                                sixDayForecast.push({
                                    date: forecastDate,
                                    temp: forecast.main.temp,
                                    wind: forecast.wind.speed,
                                    humidity: forecast.main.humidity
                                });
                            }
                        });
                        sixDayForecast.forEach((day, index) => {
               
                            const dateElement = document.getElementById(`Date${index}`);
                            const tempElement = document.getElementById(`temp${index + 1}`);
                            const windElement = document.getElementById(`wind${index + 1}`);
                            const humiElement = document.getElementById(`humi${index + 1}`);
                        
                          
                            if (dateElement) dateElement.textContent = day.date; 
                            if (tempElement) tempElement.textContent = `${day.temp}°C`;
                            if (windElement) windElement.textContent = `${day.wind} km/h`; 
                            if (humiElement) humiElement.textContent = `${day.humidity}%`; 
                        });
            
                    
                        console.log("Next 6 Days Weather Forecast Array:", sixDayForecast);
                    })
                    })
                    .catch(err => {
                        console.error("Error fetching weather data:", err);
                        alert("Could not retrieve weather data. Please try again.");
                    });
            },
            error => {
                alert("Unable to retrieve your location. Please try again.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
})
const cityInput = document.getElementById("city");
const recentSearchesDiv = document.getElementById("recentSearches");
let recentCities = [];

cityInput.addEventListener("input", function() {
    
    recentSearchesDiv.innerHTML = "";

   
    if (cityInput.value.trim()) {
        if (!recentCities.includes(cityInput.value.trim())) {
            recentCities.push(cityInput.value.trim());
        }
    }

    if (recentCities.length > 0) {
        const select = document.createElement("select");
        select.className = "bg-white border-2 rounded-lg w-2/3 mt-2   h-24";
        select.style.height = "50px";
        select.style.backgroundColor = "black";
        select.style.color = "White";
        select.style.borderRadius = "20px"
        
       
        recentCities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            select.appendChild(option);
        });

        recentSearchesDiv.appendChild(select);
    }
});
