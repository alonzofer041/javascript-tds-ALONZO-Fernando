import {Morpionclasse} from "./morpionclasse.js";
// let morpion;
// let nbCoups;
// let joueur;
// let symbole;
// let scores = [0, 0];
//
// let taille;
// let modeJeu;
// let zone_message;

let grille=new Morpionclasse(3,"x",1);
// function recommence() {

    const MAX_GRILLE = 8;
    const MIN_GRILLE = 3;

    let zone_message = document.getElementById("messages");
    // grille.taille = Number.parseInt(document.getElementById("taille").value);
    // modeJeu = document.getElementById("simple").checked ? "simple" : "complet";
    if (Number.isNaN(grille.taille) || grille.taille < MIN_GRILLE || grille.taille > MAX_GRILLE) {
        zone_message.innerHTML = "Taille invalide !";
    } else {
        let table = document.getElementById("table_morpion");
        for (let l = table.rows.length - 1; l >= 0; l--) {
            table.deleteRow(l);
        }
        for(let i = 0;i<grille.taille;i++){
            let ligne=table.insertRow(i);
            for(let j = 0;j<grille.taille;j++){
                let id = '' + ((i + 1) * 10 + (j + 1));
                let cell = ligne.insertCell(j);
                cell.innerHTML = "<input type='button' class='case' id='" + id + "' onclick='grille.verifierbouton(i,j)'/>";
                document.getElementById(id).value = '';
            }
        }
        // morpion = new Array(taille);
        // for (let i = 0; i < taille; i++) {
        //     let ligne = table.insertRow(i);
        //     morpion[i] = new Array(taille);
        //     for (let j = 0; j < taille; j++) {
        //         morpion[i][j] = ' ';
        //
        //         let id = '' + ((i + 1) * 10 + (j + 1));
        //         let cell = ligne.insertCell(j);
        //         cell.innerHTML = "<input type='button' class='case' id='" + id + "' onclick='clicBouton(this, " + i + "," + j + ")'/>";
        //         document.getElementById(id).value = '';
        //     }
        // }

        // nbCoups = 0;
        // joueur = 1;
        // symbole = 'x';
        zone_message.innerHTML =/*
    for (let i = 0; i <= Math.floor(lesUL.length / 2); i++) {
        console.log(i);
        let unUL = document.createElement("UL");
        unUL.innerHTML = lesUL[i].innerHTML;
        console.log("rep 1")
        document.body.replaceChild(unUL, lesUL[lesUL.length - i - 1]);
        if (lesUL.length % 2 === 0 || i < Math.floor(lesUL.length / 2)) {
            document.body.replaceChild(lesUL[lesUL.length - i - 1], lesUL[i]);
        }
    }
*/
 "Joueur 1, à toi !";
        document.getElementById("btn_reset").disabled = true;
    }
// }

function clicBouton(uneCase, y, x) {

    // if (morpion[y][x] === ' ') {
    //     morpion[y][x] = symbole;
    //     uneCase.value = symbole;
    //     uneCase.classList.add("joueur" + joueur);
    //     nbCoups++;
    //
    //     let victoire = aGagne(symbole, y, x);
    //     if (victoire) {
    //         zone_message.innerHTML = "Le joueur " + joueur + " a gagné !";
    //         desactiveEcouteurs();
    //         symbole === "x" ? scores[0]++ : scores[1]++;
    //         document.getElementById("score").innerHTML = "X : " + scores[0] + " - O  : " + scores[1];
    //     } else if (nbCoups === taille * taille) {
    //         zone_message.innerHTML = "Match nul !";
    //         desactiveEcouteurs();
    //     } else {
    //
    //         if (symbole === 'x') {
    //             symbole = 'o';
    //             joueur = 2;
    //         } else {
    //             symbole = 'x';
    //             joueur = 1;
    //         }
    //         zone_message.innerHTML = "Joueur " + joueur + ", à toi de jouer !";
    //     }
    //
    // } else {
    //     zone_message.innerHTML = "Case déjà occupée !!! ";
    // }
}

function desactiveEcouteurs() {

    for (let i = 0; i < taille; i++) {
        for (let j = 0; j < taille; j++) {
            document.getElementById('' + ((i + 1) * 10 + (j + 1))).removeAttribute("onclick");
        }
    }
    document.getElementById("btn_reset").disabled = false;
}

function aGagne(symbole, y, x) {

    if (modeJeu === 'simple') {
        return aGagne3ParmiN(symbole, y, x)
    }

    let nbSymboles;

    // gagné en ligne ?
    let ligne = y;
    nbSymboles = 0;
    for (let col = 0; col < taille; col++) {
        if (morpion[ligne][col] === symbole) {
            nbSymboles++;
        }
    }
    if (nbSymboles === taille) {
        return true;
    }

    // gagné en colonne ?
    let col = x;
    nbSymboles = 0;
    for (let ligne = 0; ligne < taille; ligne++) {
        if (morpion[ligne][col] === symbole) {
            nbSymboles++;
        }
    }
    if (nbSymboles === taille) {
        return true;
    }

    // gagné diagonale
    if (x === y) {
        nbSymboles = 0;
        for (let lc = 0; lc < taille; lc++) {
            if (morpion[lc][lc] === symbole) {
                nbSymboles++;
            }
        }
        if (nbSymboles === taille) {
            return true;
        }
    }

    // gagné diag inverse
    if (x === taille - (y + 1)) {
        nbSymboles = 0;
        for (let ligne = 0; ligne < taille; ligne++) {
            if (morpion[ligne][taille - (ligne + 1)] === symbole) {
                nbSymboles++;
            }
        }
        if (nbSymboles === taille) {
            return true;
        }
    }

    return false;
}

function aGagne3ParmiN(symbole, y, x) {

    let aTrouver = symbole.repeat(3);

    // gagné en ligne ? : concaténation de la ligne, et recherche de la sous-chaîne gagnante
    let ligne = '';
    morpion[y].forEach(element => ligne += element);
    if (ligne.indexOf(aTrouver) >= 0) {
        return true;
    }

    // gagné en colonne ? : concaténation de la colonne et recherche de la sous-chaîne gagnante
    let col = '';
    morpion.forEach(element => col += element[x]);
    if (col.indexOf(aTrouver) >= 0) {
        return true;
    }

    // gagné diagonale
    if (x === y) {
        let diagonale = '';
        for (let lc = 0; lc < taille; lc++) {
            diagonale += morpion[lc][lc];
        }
        if (diagonale.indexOf(aTrouver) >= 0) {
            return true;
        }
    }

    // gagné diag inverse
    if (x === taille - (y + 1)) {
        let inverse = '';
        for (let lc = 0; lc < taille; lc++) {
            inverse += morpion[lc][taille - (lc + 1)];
        }
        if (inverse.indexOf(aTrouver) >= 0) {
            return true;
        }
    }

    return false;
}

document.getElementById("score").innerHTML = "X : " + grille.scores[0] + " - O  : " + grille.scores[1];