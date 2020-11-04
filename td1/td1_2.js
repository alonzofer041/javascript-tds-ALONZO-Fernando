// PARTIE 2
function diftypes(x){

    console.log("le type de variable est: "+typeof(x));


}
diftypes();
diftypes('blabla');
diftypes("blabla");
diftypes(`blabla {$x}`);
diftypes(9);
diftypes(2.5);
diftypes(true);
diftypes(undefined);
diftypes(null);
diftypes([1,2,3]);
diftypes(new Array());
diftypes({});
diftypes(new Date());
diftypes(function() {alert('toto')});
diftypes(42n);


let y1="bonjour";
let y2=42.32;
let y3=43.89;
function conversiontypes(y1,y2,y3){
    var yconvert1=parseInt(y1);
    console.log("type:"+ typeof(yconvert1));
    var yconvert2=toString(y2);
    console.log("type: "+typeof(yconvert2));
    var yconvert3=parseFloat(y3);
    console.log("type: "+typeof(yconvert3));

    yoperation1=Math.floor(y2);
    console.log("operation 1: "+yoperation1);
    yoperation2=Math.ceil(y2);
    console.log("operation 2: "+yoperation2);
    yoperation3=Math.floor(y3);
    console.log("operation 3: "+yoperation3);

    yoperationchaine=Math.ceil(y1);
    console.log("operation 4: "+y1);
}
conversiontypes(y1,y2,y3);

let n=0;
let tab=[];
let b=false;
function testegalite(n,tab,b){
    if(n==tab){
        console.log(true);
    }
    else{
        console.log(false);
    }
    
    if(n===tab){
        console.log(true);
    }
    else{
        console.log(false);
    }

    if(tab==b){
        console.log(true);
    }
    else{
        console.log(false);
    }

    if(tab===b){
        console.log(true);
    }
    else{
        console.log(false);
    }

    if(n==b){
        console.log(true);
    }
    else{
        console.log(false);
    }

    if(n===b){
        console.log(true);
    }
    else{
        console.log(false);
    }
}
testegalite(n,tab,b)

// PARTIE 3
function saisirchaine(){
    do {
        var chaine=prompt("TD 1 3.1: saisissez une chaine ");
        var chainemay=chaine.toUpperCase();
    } while (chaine!==chainemay);
    console.log(chaine.toUpperCase());
}
saisirchaine();

function chainealeatoire(){
    var chaine="";
    var chaineechec="";
    var nomiteration=0;
    for (let i = 1; i <= 5; i++) {
        do {
            var ascii=65+Math.random()*(123-65);
            var caractere=String.fromCharCode(ascii);
            var caracterupp=caractere.toUpperCase();
            chaineechec+=caractere;
            nomiteration++;
            console.log("chaine genere: "+chaineechec);
            if(caractere!==caracterupp || ascii<65 || ascii>90){
                chaineechec=chaineechec.slice(0,-1);
            }
        } while (caractere!==caracterupp || ascii<65 || ascii>90);
        chaine+=caractere;
    }
    console.log("ont besoin de "+nomiteration+" iterations");
}
chainealeatoire();

function tableauchainesaleatoires(){
    var tableau=["a","e","i","o"];
    var chaine="";
    for (let i = 0; i < tableau.length; i++) {
        var position=Math.round(Math.random()*(3));
        chaine+=tableau[position];
    }
    console.log(chaine);
}
tableauchainesaleatoires();

function nomprenom(){
    var nom=prompt("Saisissez ton nom: ");
    var prenom=prompt("Saisissez ton prenom: ");
    console.log((nom.toUpperCase())+" "+prenom[0].toUpperCase()+prenom.slice(1));
}
nomprenom();

function chainecryptee() {
    var chaine="AcrDOfeZ";
    var chaineremplace="";
    for (var i=0;i<chaine.length;i++) {
        if(chaine[i]==="A"){
            chaineremplace+="4";
        }
        else if(chaine[i]==="E"){
            chaineremplace+="3";
        }
        else if(chaine[i]==="G"){
            chaineremplace+="6";
        }
        else if(chaine[i]==="I"){
            chaineremplace+="1";
        }
        else if(chaine[i]==="O"){
            chaineremplace+="0";
        }
        else if(chaine[i]==="S"){
            chaineremplace+="5";
        }
        else if(chaine[i]==="Z"){
            chaineremplace+="2";
        }
        else{
            chaineremplace+=chaine[i];
        }
    }
    console.log("chaine cryptee: "+chaineremplace);
}
// chainecryptee(prompt("Ecrivez quelque truc"));
chainecryptee();

function jazzbundle(nombrefois) {
    parseInt(nombrefois);
    for(var i=1;i<=nombrefois;i++){
        if (i%3===0 && i%5===0){
            console.log("JazzBundle");
        }
        else if(i%3===0){
            console.log("Jazz");
        }
        else if(i%5===0){
            console.log("Bundle");
        }
        else{
            console.log(i);
        }
    }
}

jazzbundle(prompt("Ecrivez le nombre de fois"));

//Partie 4
function aditionnerentiers(){
    var tableau=[3,6,2,9];
    var somme=0;
    for(var i=0;i<tableau.length;i++){
        somme+=tableau[i];
    }
    console.log("la somme des elements du tableau est: "+somme);
}
aditionnerentiers();

function entierspair(){
    var tableau=[4,5,7,18,3,32];
    var compte=0;
    for(var i=0;i<tableau.length;i++){
        if(tableau[i]%2===0){
            compte++;
        }
    }
    console.log("il y a "+compte+" pairs");
}
entierspair();

function fusionnertableaux(){
    // var tableau1=["A","b",4,23,34.1];
    // var tableau2=["das","F",44.3];
    var tableau1=["H","fa","re","z"];
    var tableau2=["j",50,32];
    var tableau3=tableau1.concat(tableau2);
    for (var i=0;i<tableau3.length;i++){
        for(var j=0;j<tableau3.length-i;j++){
            if(tableau3[j]>tableau3[j+1]){
                [tableau3[j],tableau3[j+1]]=[tableau3[j+1],tableau3[j]];
            }
        }
    }
    console.log(tableau3);
}
fusionnertableaux();

function dichotomie(recherche,maxiterations){
    var tableau=["B","A","Gmail","3","1"];
    var valmin=0;
    var valmax=tableau.length-1;
    var iterations=0;
    for (var i=0;i<tableau.length;i++){
        for(var j=0;j<tableau.length-i;j++){
            if(tableau[j]>tableau[j+1]){
                [tableau[j],tableau[j+1]]=[tableau[j+1],tableau[j]];
            }
        }
    }
    console.log(tableau);
    do {
        var indexdemi=Math.floor(Math.abs((valmin+valmax)/2));
        tableau[indexdemi]=tableau[indexdemi].toString();
        recherche=recherche.toString();
        var resultat=tableau[indexdemi].localeCompare(recherche);
        if(resultat===0) {
            console.log("objet dans la position: " + indexdemi);
            break;
        }
        else if(resultat===1){
            valmax=indexdemi-1;
        }
        else if(resultat===-1){
            valmin=indexdemi+1;
        }
        if(tableau[indexdemi]!==recherche && iterations===maxiterations){
            console.log("element pas trouvé");
        }
        iterations++;
    }while (iterations<=maxiterations);
}
dichotomie("Gmail",10);

function entierpairmajeur(nombreelements){
    nombreelements=parseInt(nombreelements);
    var tableauentiers=[];
    var nombremajeur=0;
    for(var i=1;i<=nombreelements;i++){
        var element=prompt("Saisissez l'element "+i);
        tableauentiers.push(element);
    }
    for(var j=0;j<tableauentiers.length;j++){
        if(tableauentiers[j]%2===0){
            if(tableauentiers[j]>nombremajeur){
                nombremajeur=tableauentiers[j];
            }
        }
    }
    console.log(tableauentiers);
    if(nombremajeur!==0) {
        console.log("Le pair majeur est "+nombremajeur);
    }
    else{
        console.log("Il n'y a pas des pairs majeurs");
    }
}
entierpairmajeur(prompt("Combien d'elements?"));

function nombreocurrences(chaine){
    var tableauchaine=chaine.split(" ");
    var tableauassoc=new Array();
    for (i=0;i<tableauchaine.length;i++){
        var chaineacompt=tableauchaine[i];
        var compteur=0;
        for(j=0;j<tableauchaine.length;j++){
            if(chaineacompt===tableauchaine[j]){
                compteur++;
            }
        }
        tableauassoc[tableauchaine[i]]=compteur;
    }
    console.log(tableauassoc);
}
nombreocurrences("Hola me llamo fer y soy llamo para llamo");

