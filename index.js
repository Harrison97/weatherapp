var date = new Date();
var hour = date.getHours();
var opacity = 0;
var temp = null;
var toggle = false;
switch(hour) {
    case 0:
    case 1:
    case 3:
        opacity = .1;
        break;
    case 4:
    case 5:
        opacity = .4;
        break
    case 6:
    case 7:
        opacity = .7;
        break;
    case 8:
    case 9:
    case 10:
    case 11:
    case 13:
    case 14:
    case 15:
    case 16:
        opacity = 1;
        break;
    case 17:
    case 18:
        opacity = .8;
        break;
    case 19:
    case 20:
        opacity = .4;
        break;
    case 20:
    case 21:
        opacity = .3;
        break;
    case 22:
    case 23:
        opacity = .1;
        break;
    default:
        opacity = 1;
}

$(document).ready(function(){
    $("#bg-img").animate({opacity: opacity}, 2*1000);

    $(document).on("click", function(){
        if(temp != null) {
            if(toggle){
                toggle=false;
                $("#city-temp").html(temp + "°C")
            } else {
                toggle=true;
                $("#city-temp").html(temp*9/5 + 32 + "°F")
            }
        }
    })

});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
    	latitude = position.coords.latitude
    	longitude = position.coords.longitude
    	console.log("Latitude: " + latitude)
	   	console.log("Longitude: " + longitude)		

        var url = "https://fcc-weather-api.glitch.me/api/current?lat="+latitude+"&lon="+longitude
        $.getJSON(url, function(city){
            console.log(city);
            temp = Math.round(city.main.temp)
            $("#city-name").html(city.name)
            $("#city-temp").html(temp + "°C")
            $("#city-humidity").html(city.main.humidity + "% Humidity")
            $("#city-weather").html(city.weather[0].main)
            var icon=""
            switch(city.weather[0].main) {
                case "Rain":
                    icon = "rain"
                    break;
                case "Clear":
                    icon = "cloud"
                    break;
                case "Clouds":
                    icon = "cloud"
                    break;
                case "Snow":
                    icon = "snow"
                    break;
                case "Haze":
                    icon = "dust"
                    break;
                default:
                    icon = "cloud"
            }
            $("#weather-icon").attr("class", "wi wi-" + icon)
        })

    });
} else {
	console.log("Location not found!")
}