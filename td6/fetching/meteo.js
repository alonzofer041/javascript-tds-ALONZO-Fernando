$(document).ready(function(){
    $("#titre").html("Météo de la ville de " + localStorage.getItem("codeville"));
   $.ajax({
       url:'https://api.openweathermap.org/data/2.5/weather?q='+localStorage.getItem("codeville")+',fr&units=metric&appid=38081232e24606f96bd8e963772a1244',
       type:'GET',
       dataType:'json',
       success:function (data){
           console.log(data);
           $("#temperature span").html("Température: " + data.main.temp + " °C");
           $("#ressentie span").html("Ressentie: "+ data.main.feels_like + " °C");
           $("#tempmin span").html("Minimal: "+ data.main.temp_min + " °C");
           $("#tempmax span").html("Maximale: "+ data.main.temp_max + " °C");
           $("#temps span").html("Temps: "+ data.weather[0].description);
           $("#humidite span").html("Humidité: "+ data.main.humidity + "%");
       },
       error: function (objet,statut,erreur){
           console.log(erreur);
       }
   });
});