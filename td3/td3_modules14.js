import * as outils from "./array_outils";

var boutonexec=document.getElementById("buttonevent");
var recherche=document.getElementById("recherche");
boutonexec.addEventListener("click",resultats);

function resultats(){
    var tableauelements=[];
    var elements=document.getElementsByClassName("elements");
    for (var i=0;i<elements.length;i++){
        var element=parseInt(elements[i].children[1].value)
        tableauelements.push(element);
    }

    // var sommeelements=outils.aditionnerentiers(tableauelements);
    document.getElementById("somme").innerHTML=outils.aditionnerentiers(tableauelements);
    document.getElementById("pairs").innerHTML=outils.entierspair(tableauelements);
    document.getElementById("pairgrand").innerHTML=outils.entierpairmajeur(tableauelements);
    document.getElementById("dichotomie").innerHTML=outils.dichotomie(tableauelements,recherche);
}