let cityName:string | null = sessionStorage.getItem("cityName");
if (cityName != null) {
    (document.getElementById("cityName") as HTMLSpanElement).innerText = cityName;
}
weather(cityName);

function weather(cityName: string | null):void{

    let appid:string = "01cd2a43a52ecaee81d9f9b7af4fa448"

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ",fr&units=metric&lang=fr&appid=" + appid, {method: 'GET'})
        .then(function (response:Response) {
            let contentType:any = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                response.json().then(function (json:Response) {
                    displayData(json)
                });

            }
        })
        .catch(function (error) {
            console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
        });
}


function displayData(json:any) {

    if (json.weather) {
        (document.getElementById("temps") as HTMLSpanElement).innerHTML = json.weather[0].description;
        (document.getElementById("pct") as HTMLSpanElement).innerHTML = json.main.humidity + '%';
        (document.getElementById("ressentie") as HTMLSpanElement).innerHTML = json.main.feels_like + '°C';
        (document.getElementById("temperature") as HTMLSpanElement).innerHTML = json.main.temp + '°C';
        (document.getElementById("min") as HTMLSpanElement).innerHTML =  json.main.temp_min + '°C';
        (document.getElementById("max") as HTMLSpanElement).innerHTML = json.main.temp_max + '°C';
    } else {
        (document.getElementById("details") as HTMLDivElement).style.display="none";
        (document.getElementById("erreur") as HTMLDivElement).style.display="block";
    }
}