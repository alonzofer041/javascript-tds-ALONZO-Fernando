export function aditionnerentiers(tableau){
    var somme=0;
    for(var i=0;i<tableau.length;i++){
        somme+=tableau[i];
    }
    console.log("la somme des elements du tableau est: "+somme);
    return somme;
}

export function entierspair(tableau){
    var compte=0;
    for(var i=0;i<tableau.length;i++){
        if(tableau[i]%2===0){
            compte++;
        }
    }
    console.log("il y a "+compte+" pairs");
    return compte;
}

export function dichotomie(tableau, element) {

    let result = -1;
    let start = 0;
    let end = tableau.length - 1;
    while (start < end && result === -1) {
        const half = Math.round((end + start) / 2);
        if (element === tableau[half]) {
            result = half;
        }
        else if (element > tableau[half]) {
            start = half + 1;
        } else {
            end = half - 1;
        }
    }
    return result;
}
export function entierpairmajeur(tableau){
    var nombremajeur=0;
    var message="";
    for(var j=0;j<tableau.length;j++){
        if(tableau[j]%2===0){
            if(tableau[j]>nombremajeur){
                nombremajeur=tableau[j];
            }
        }
    }
    console.log(tableau);
    if(nombremajeur!==0) {
        console.log("Le pair majeur est "+nombremajeur);
        return nombremajeur;
    }
    else{
        console.log("Il n'y a pas des pairs majeurs");
        message="Il n'y a pas des pairs majeurs";
        return message;
    }
}