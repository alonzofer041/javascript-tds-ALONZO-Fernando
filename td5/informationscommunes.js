
// var selectcommune=document.getElementById("commune");

fetch('https://geo.api.gouv.fr/regions',{
    method: "GET",
    headers: {"Content-type":"application/json; charset=UTF-8"}
})
    .then(response => response.json())
    .then(function(data){
        var selectregion=document.getElementById("region");
        var regions=data;
        regions.map(function(region){
            var opcionregion=document.createElement("option");
            opcionregion.setAttribute("value",`${region.code}`);
            opcionregion.innerHTML=`${region.nom}`
            selectregion.appendChild(opcionregion);
        });
        // chargerdepartement();
    })
.catch(err=>console.log("erreur: " + err));

function chargerdepartement(){
    var valorcasillaregion=document.getElementById("region").value;
    fetch('https://geo.api.gouv.fr/regions/'+valorcasillaregion+'/departements',{
        method: "GET",
        headers: {"Content-type":"application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(function (data){
            var selectregion=document.getElementById("region");
            var selectdepartement=document.getElementById("departement");
            var coderegion=selectregion.value;
            var departements=data;
            var codesregionsdepartements=[];
            departements.map(function (departement){
                var opciondepartement=document.createElement("option");
                opciondepartement.setAttribute("value",`${departement.code}`);
                opciondepartement.innerHTML=`${departement.nom}`;
                opciondepartement.setAttribute("class",`${departement.codeRegion}`);
                selectdepartement.appendChild(opciondepartement);
            });
            let compteur=selectdepartement.childElementCount;
            if (selectdepartement.compteur!==0){
                for (var i=0; i < compteur; i++){
                    if (selectdepartement.children[0].className!=coderegion){
                        selectdepartement.removeChild(selectdepartement.firstChild);
                    }
                }
            }
            chargercommunes();
        })
        .catch(err=>console.log("erreur: " + err));
}

function chargercommunes(){
    var selectdepartement=document.getElementById("departement");
    var codedepartement=selectdepartement.value;
    var valorcasilladepartamento=document.getElementById("departement").value;
    fetch('https://geo.api.gouv.fr/departements/'+valorcasilladepartamento+'/communes',{
        method: "GET",
        headers: {"Content-type":"application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(function (data){
            var selectcommune=document.getElementById("commune");
            var communes=data;
            communes.map(function (commune){
                var opcioncommune=document.createElement("option");
                opcioncommune.setAttribute("value",`${commune.code}`);
                opcioncommune.setAttribute("class",`${commune.codeDepartement}`);
                opcioncommune.innerHTML=`${commune.nom}`
                selectcommune.appendChild(opcioncommune);
            });
            let compteur=selectcommune.childElementCount;
            if (compteur!==0){
                for (var i=0; i < compteur; i++){
                    if (selectcommune.children[0].className!=codedepartement){
                        selectcommune.removeChild(selectcommune.firstChild);
                    }
                }
            }
            // selectioncommune();
        })
        .catch(err=>console.log("erreur: " + err));
}

function selectioncommune(){
    var selectcommune=document.getElementById("commune");
    fetch('https://geo.api.gouv.fr/communes',{
        method: "GET",
        headers: {"Content-type":"application/json; charset=UTF-8"}
    })
        .then(response=>response.json())
        .then(function (data){
        //    Primera parte: poblacion
            var parrafo=document.getElementById("population");
            var communes=data;
            var commune=communes.filter(function(el){
                if(el.code!=selectcommune.value){
                    return false;
                }
                else {
                    return true;
                }
            })
            console.log(commune);
            if(commune[0].population){
                parrafo.innerHTML=commune[0].population;
            }
            else{
                parrafo.innerHTML="aucun population";
            }
            //Segunda parte: lista de comunas por codigo postal
            var communesparcodep=communes.filter(function(el){
                for (var i=0;i<commune[0].codesPostaux.length;i++){
                    if(el.codesPostaux[0]==commune[0].codesPostaux[i]){
                        return true;
                    }
                }
            });
            console.log(communesparcodep);
            var tabledonnees=document.getElementById("tabledonneescommune");
            for (var i=0;i<communesparcodep.length;i++){
                var file=document.createElement("tr");
                var colonnenom=document.createElement("td");
                var colonnecodepostal=document.createElement("td");
                var colonnepopulation=document.createElement("td");
                colonnenom.innerHTML=communesparcodep[i].nom;
                colonnecodepostal.innerHTML=communesparcodep[i].codesPostaux[0];
                colonnepopulation.innerHTML=communesparcodep[i].population;
                file.appendChild(colonnenom);
                file.appendChild(colonnecodepostal);
                file.appendChild(colonnepopulation);
                file.setAttribute("class",communesparcodep[i].codesPostaux[0]);
                tabledonnees.appendChild(file);
            }
            let compteur=tabledonnees.childElementCount;
            if(compteur!=0){
                for(var i=0;i<compteur;i++){
                    if(tabledonnees.firstElementChild.className!=communesparcodep[0].codesPostaux[0]){
                        tabledonnees.removeChild(tabledonnees.firstElementChild);
                    }
                }
            }
            var populationtotale=0;
            var placepopulationtotale=document.getElementById("poptotal");
            for (var i=0;i<tabledonnees.children.length;i++){
                var populationind=parseFloat(tabledonnees.children[i].children[2].innerHTML);
                populationtotale+=populationind;
            }
            placepopulationtotale.innerHTML=populationtotale + " habitants";
        })
        .catch(err=>console.log("erreur: " + err));
}

function affichermeteo(){
    var commune=document.getElementById("commune");
    var codecommune=commune.options[commune.selectedIndex].innerHTML;
    localStorage.clear();
    localStorage.setItem("codeville",codecommune);
    window.location.href="./weather.html";
}

function supressionstockage(){
    localStorage.clear();
}