var cuerpopagina=document.querySelector("body");
var articulo0titulo=document.createElement("h2");
var articulo0=document.createElement("p");
var articulo0span=document.createElement("span");
articulo0titulo.innerHTML="Article 0 - Doubler";
articulo0span.innerHTML="Il est interdit de vous doubler, sous peine de disqualification";
cuerpopagina.insertBefore(articulo0titulo,cuerpopagina.firstChild);
cuerpopagina.insertBefore(articulo0,articulo0titulo.nextSibling);
articulo0.appendChild(articulo0span);

var titres=document.getElementsByTagName("h2");
for (var i=0;i<titres.length;i++){
    titres[i].innerHTML=titres[i].innerHTML.toUpperCase();
}

for (var j=0;j<titres.length;j++){
    var chainepartie=titres[j].innerHTML.split(" ");
    var entier=chainepartie[1]++;
    titres[j].innerHTML=chainepartie.join(" ");
}

// var  elementoscuerpo=cuerpopagina.children;
for (var k=0;k<titres.length;k+=2){
    var titulo=titres[k];
    var suivant=titres[k].nextElementSibling;
    console.log(suivant);
    titulo.style.backgroundColor="blue";
    suivant.style.backgroundColor="blue";
}

var listas=document.getElementsByTagName("ul");
var listahijos=[];
for (var i=0;i<listas.length-1;i+=2){
    listahijos.push(listas[i]);
}
cuerpopagina.removeChild(listahijos[2]);
var clon=listahijos[0].cloneNode(listahijos[0]);
clon.removeChild(clon.firstChild)
listahijos[0].replaceChild(listahijos[2].firstElementChild,listahijos[0].firstElementChild);

cuerpopagina.insertBefore(clon,listahijos[1].nextElementSibling);
console.log(clon);
console.log(listahijos);
// for (var i=0;i<listas.length;i++){
//     // console.log(listahijos);
//     listas[i].insertBefore(listahijos[i].firstElementChild,listas[i].lastChild);
// }