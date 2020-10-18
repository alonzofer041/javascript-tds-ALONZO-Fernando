function chargerweather(){
    console.log('https://api.openweathermap.org/data/2.5/weather?' +
        'q='+localStorage.getItem("codeville")+',' +
        'fr&' +
        'APPID=38081232e24606f96bd8e963772a1244');
    fetch('https://api.openweathermap.org/data/2.5/weather?' +
        'q='+localStorage.getItem("codeville")+',' +
        'fr&' +
        'APPID=38081232e24606f96bd8e963772a1244',{
        method: "GET",
        headers: {"Content-type":"application/json; charset=UTF-8"}
    })
        .then(response=>response.json())
        .then(response=>console.log(response))
        .catch(error=>console.log("erreur: "+error));
}