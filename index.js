import apikey from 'config.js'
$(document).ready({

});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
    	latitude = position.coords.latitude
    	longitude = position.coords.longitude
    	console.log("Latitude: " + latitude)
	   	console.log("Longitude: " + longitude)
	   	// console.log("Location: " +  json)
    	$.getJSON("https://raw.githubusercontent.com/Harrison97/data/master/city.list.json", function(json){
    		var city = json[0];
    		console.log("Getting city...")
    		for (var i = 1; i < json.length; i++) {
    			if(Math.abs(latitude - json[i].coord.lat) + Math.abs(longitude - json[i].coord.lon) < Math.abs(latitude - city.coord.lat) + Math.abs(longitude - city.coord.lon)) {
    				city = json[i]
    			}
    		}
    		console.log(city)
    		
    		$.getJSON("https://api.darksky.net/forecast/" + config.apikey + "/" + latitude + "," + latitude, function(weather){
    			console.log(weather)
    		})
    		
    		

    	})
	   	
    });
} else {
	console.log("Location not found!")
}