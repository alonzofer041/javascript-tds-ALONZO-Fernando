var joueur1=prompt("saisissez ton nom premier joueur:");
var joueur2=prompt("saisissez ton nom deuxieme joueur:");
do {
    var nombre1=prompt("choississez le nombre des filles:");
    var nombre2=prompt("choississez le nombre des colonnes:");
}while (nombre2!==nombre1 || (nombre1<3 && nombre2<3) || (nombre1>8 && nombre2>8));
// console.log(nombre1 + " x " + nombre2);
do{
    var mode=prompt("Choissir le mode jeu: simple ou complet?");
    var modeJeu=mode.toLowerCase();
}while(modeJeu!=="complet" && modeJeu!=="simple");
//creación de una tabla para jugar
var documentgeneral=document.querySelector("body");
var table=document.createElement("table");
table.style.width="100%";
table.style.border="1px solid #000";
documentgeneral.insertBefore(table,documentgeneral.firstElementChild);
for (var i=1;i<=nombre1;i++){
    var fille=document.createElement("tr");
    table.appendChild(fille);
    for (var j=1;j<=nombre2;j++){
        var activeur=document.createElement("a");
        activeur.setAttribute("href","#");
        activeur.setAttribute("onclick","dessinerjoueur1(this)");
        activeur.style.width="100%";
        activeur.style.height="10px";
        activeur.style.textDecoration="none";
        activeur.style.color="#000";
        activeur.innerHTML="-";
        var colonne=document.createElement("td");
        fille.appendChild(colonne);
        colonne.appendChild(activeur);
        colonne.style.border="1px solid #000";
        colonne.style.padding="10px";
    }
}
var scorejoueur1=document.createElement("p");
scorejoueur1.innerHTML=joueur1 + " : " + 0;
var scorejoueur2=document.createElement("p");
scorejoueur2.innerHTML=joueur2 + " : " + 0;
documentgeneral.appendChild(scorejoueur1);
documentgeneral.appendChild(scorejoueur2);

//evento para dibujar algo
function dessinerjoueur1(target){
    target.innerHTML="X";
    // target.setAttribute("onclick","dessinerjoueur2(this)");
    var joueur=1;
    verifiergagneur("X",joueur,modeJeu);
    // console.log(document.getElementsByClassName("jugador1"));
    var dessins=document.getElementsByTagName("a");
    for(var i=0;i<dessins.length;i++){
        dessins[i].setAttribute("onclick","dessinerjoueur2(this)");
    }
}


function dessinerjoueur2(target){
    target.innerHTML="O";
    target.setAttribute("onclick","dessinerjoueur1(this)");
    var joueur=2;
    verifiergagneur("O",joueur,modeJeu);
    var dessins=document.getElementsByTagName("a");
    for(var i=0;i<dessins.length;i++){
        dessins[i].setAttribute("onclick","dessinerjoueur1(this)");
    }
}


//Agregar matrices
function verifiergagneur(marque,numjoueur,mode){
    //Se recorrera por matrices
    var filles=document.getElementsByTagName("tr");
    var compteurhorizontal=[];
    if(mode==="complet"){
        for(var i=0;i<filles.length;i++){
            var compteurhorcomplet=0;
            var colonneshorizontalcomplet=filles[i].children;
            for (var j=0;j<colonneshorizontalcomplet.length;j++){
                if(colonneshorizontalcomplet[j].firstElementChild.innerHTML===marque){
                    compteurhorcomplet++;
                }
            }
            compteurhorizontal.push(compteurhorcomplet);
        }
    }
    else if(mode==="simple"){
        for (var i=0;i<filles.length;i++){
            var compteurhorsimple=0;
            var colonneshorizontalsimple=filles[i].children;
            for (var j=0;j<colonneshorizontalsimple.length;j++){
                var chaine1=colonneshorizontalsimple[j].firstElementChild.innerHTML;
                if(colonneshorizontalsimple[j-1]){
                    var chaine2=colonneshorizontalsimple[j-1].firstElementChild.innerHTML;
                }
                if(chaine1==marque && chaine2===marque && chaine1===chaine2){
                    compteur++;
                }
            }
            compteurhorizontal.push(compteurhorsimple);
        }
    }
    //para contar horizontalmente
    // console.log("horizontal: "+compteurhorizontal);
    //Para contar verticalmente
    var compteurvertical=[];
    if(mode==="complet"){
        var pointeurvertical=0;
        var colonnes=filles[0].children;
        for (var i=0;i<colonnes.length;i++){
            var compteur=0;
            var aditionner=0;
            while (filles[0+aditionner]){
                var cadena1=filles[0+aditionner].children[i].firstElementChild.innerHTML;
                if (cadena1===marque){
                    compteur++;
                }
                aditionner++;
            }
            compteurvertical.push(compteur);
        }
    }
    else if(mode==="simple"){
        var pointeurvertical=0;
        var colonnes=filles[0].children;
        for (var i=0;i<colonnes.length;i++){
            var compteur=0;
            var aditionner=0;
            while (filles[0+aditionner]){
                var chaine1=filles[0+aditionner].children[i].firstElementChild.innerHTML;
                if(filles[0+(aditionner-1)]){
                    // console.log(filles[0+(aditionner-1)].children[i]);
                    var chaine2=filles[0+(aditionner-1)].children[i].firstElementChild.innerHTML;
                    if (chaine1===marque && chaine2===marque && chaine1===chaine2){
                        compteur++;
                    }
                }
                aditionner++;
            }
            compteurvertical.push(compteur);
        }
    }
    // console.log("vertical: "+compteurvertical);
    //Para contar de forma diagonal
    var compteurdiagonal=[];
    var colonnes=filles[0].children;
    if(mode==="complet"){
        for(var i=0;i<colonnes.length;i++){
            var compteur=0;
            var pointeurfille=0;
            var pointeurchild=0;
            while (filles[0+pointeurfille]){
                if(filles[0+pointeurfille].children[i+pointeurchild]){
                    var cadena1=filles[0+pointeurfille].children[i+pointeurchild].firstElementChild.innerHTML;
                    if(cadena1===marque){
                        compteur++;
                    }
                }
                pointeurfille++;
                pointeurchild++;
            }
            compteurdiagonal.push(compteur);
        }
    }
    else if(mode==="simple"){
        for(var i=0;i<colonnes.length;i++){
            var compteur=0;
            var pointeurfille=0;
            var pointeurchild=0;
            while (filles[0+pointeurfille]){
                if(filles[0+pointeurfille].children[i+pointeurchild]){
                    var chaine1=filles[0+pointeurfille].children[i+pointeurchild].firstElementChild.innerHTML;
                    if(filles[0+(pointeurfille-1)]){
                        var chaine2=filles[0+(pointeurfille-1)].children[i+(pointeurchild-1)].firstElementChild.innerHTML
                        if(chaine1===marque && chaine2===marque && chaine1===chaine2){
                            compteur++;
                        }
                    }
                }
                pointeurfille++;
                pointeurchild++;
            }
            compteurdiagonal.push(compteur);
        }
    }
    // console.log("diagonal: "+compteurdiagonal);
    //Diagonales inversas
    var compteurdiagonalinversa=[];
    if(mode==="complet"){
        for (var i=colonnes.length-1;i>=0;i--){
            var compteur=0;
            var pointeurfille=0;
            var pointeurchild=0;
            while (filles[0+pointeurfille]){
                if(filles[0+pointeurfille].children[i-pointeurchild]){
                    var cadena1=filles[0+pointeurfille].children[i-pointeurchild].firstElementChild.innerHTML;
                    if(cadena1===marque){
                        compteur++;
                    }
                }
                pointeurfille++;
                pointeurchild++;
            }
            compteurdiagonalinversa.push(compteur);
        }
    }
    else if(mode==="simple"){
        for (var i=colonnes.length-1;i>=0;i--){
            var compteur=0;
            var pointeurfille=0;
            var pointeurchild=0;
            while (filles[0+pointeurfille]){
                if(filles[0+pointeurfille].children[i-pointeurchild]){
                    var chaine1=filles[0+pointeurfille].children[i-pointeurchild].firstElementChild.innerHTML;
                    if(filles[0+(pointeurfille-1)]){
                        if(filles[0+(pointeurfille-1)].children[i-(pointeurchild-1)]){
                            // console.log(filles[0+(pointeurfille-1)].children[i-(pointeurchild-1)]);
                            var chaine2=filles[0+(pointeurfille-1)].children[i-(pointeurchild-1)].firstElementChild.innerHTML;
                            if(chaine1===marque && chaine2===marque && chaine1===chaine2){
                                compteur++;
                            }
                        }
                    }
                }
                pointeurfille++;
                pointeurchild++;
            }
            compteurdiagonalinversa.push(compteur);
        }
    }
    // console.log("diagonal inversa: "+compteurdiagonalinversa);
    //Validar ganador juego completo:
    var tableaugagneur=[compteurhorizontal,compteurvertical,compteurdiagonal,compteurdiagonalinversa];
    var chgagneur="";
    for (var i=0;i<tableaugagneur.length;i++){
        chgagneur=compterval(tableaugagneur[i],numjoueur,mode);
        if (chgagneur!=""){
            break;
        }
    }
    if(chgagneur===""){
        var compteurllenos=0;
        for (var i=0;i<filles.length;i++){
            var colonnes=filles[i].children;
            for (j=0;j<colonnes.length;j++){
                if(colonnes[j].firstElementChild.innerHTML!="-"){
                    compteurllenos++;
                }
            }
        }
        if(compteurllenos===(filles.length * filles[0].children.length)){
            console.log("Y a pas de gagneur");
            reinitialiser();
        }
    }
    else if(chgagneur==="joueur 1"){
        var puntos=scorejoueur1.innerHTML.split(" ");
        puntos[2]++;
        scorejoueur1.innerHTML=puntos.join(" ");
        // console.log("joueur 1 gagne");
        alert("joueur1 gagne");
        reinitialiser();
    }
    else if(chgagneur=="joueur 2"){
        var puntos=scorejoueur2.innerHTML.split(" ");
        puntos[2]++;
        scorejoueur2.innerHTML=puntos.join(" ");
        alert("joueur2 gagne");
        // console.log("joueur 2 gagne");
        reinitialiser();
    }
}
function compterval(tableau,nom,mod){
    var filles=document.getElementsByTagName("tr");
    var gagneur="";
    if(mod==="complet"){
        for (var i=0;i<tableau.length;i++){
            if(tableau[i]===filles[i].children.length && nom===1){
                gagneur="joueur 1";
            }
            else if(tableau[i]===filles[i].children.length && nom===2){
                gagneur="joueur 2";
            }
        }
    }
    else if(mod==="simple"){
        for (var i=0;i<tableau.length;i++){
            if(tableau[i]===2 && nom===1){
                gagneur="joueur 1";
            }
            else if(tableau[i]===2 && nom===2){
                gagneur="joueur 2";
            }
        }
    }
    return gagneur;
}
function reinitialiser(){
    if(confirm("Desea reiniciar?")){
        var filles=document.getElementsByTagName("tr");
        for (var i=0;i<filles.length;i++){
            var colonnes=filles[i].children;
            for (j=0;j<colonnes.length;j++){
                colonnes[j].firstElementChild.innerHTML="-";
            }
        }
    }
}