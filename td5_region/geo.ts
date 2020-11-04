let dataCities:any;
(document.getElementById("details") as HTMLDivElement).style.display="none";


function fetchGeoApi(url:string,oneselect:HTMLSelectElement,callbackFunction:CallableFunction):void{
    fetch(url,{
        method:'GET',
    })
        .then<void>(function (response:Response){
            let contentType:any = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                response.json().then(function (json:Response){
                   if(url.endsWith("communes")){
                       dataCities=json;
                   }
                   let options:string="";
                   for (const donnee of json){
                       options+="<option value='" + donnee.code + "'>"+donnee.nom+"</option>";
                   }
                   oneselect.innerHTML=options;
                   callbackFunction(oneselect);
                });
            }
        })
        .catch(function (error:Error){
           console.log("Il y a eu un erreur: " + error.message);
        });
}

function getRegions():void{
    fetchGeoApi('https://geo.api.gouv.fr/regions',(document.getElementById("regions") as HTMLSelectElement),getCities)
}

function getCities(regionSelect:HTMLSelectElement):void{
    fetchGeoApi('https://geo.api.gouv.fr/regions/' + regionSelect.value + '/departements',
        (document.getElementById("departements") as HTMLSelectElement),
        citySelected)
}
function citySelected(city:HTMLSelectElement):void{
    (document.getElementById("details") as HTMLDivElement).style.display="inline";
    let population:string=dataCities[city.selectedIndex].population;
    (document.getElementById("population") as HTMLSpanElement).innerHTML=population===undefined ? "[Donnee pas disponible]" : population;
    let tableCities:HTMLTableElement=document.getElementById("tdata");
    tableCities.innerHTML="";
    let arrayCPReference:Array<number>=dataCities[city.selectedIndex].codesPostaux;
    let filteredArray:Array<any>=dataCities.filter((value: { codesPostaux: number[]; })=>arrayCPReference.includes(value.codesPostaux[0]));
    filteredArray.forEach(element=>{
       let population:string=element.population===undefined ? "--" : element.population;
       tableCities.innerHTML+=`<tr><td>${element.nom}</td><td>${element.codesPostaux[0]}</td><td>${population}</td><tr/>`
    });
    let total:number=filteredArray.map(element=>element.population).reduce((elt1:bigint,elt2:bigint)=>elt1+elt2);
    (document.getElementById("total") as HTMLSpanElement).innerHTML=isNaN(total) ? "[Donnée non disponible]" : total.toString();
    sessionStorage.setItem("cityName",dataCities[city.selectedIndex].nom);
}