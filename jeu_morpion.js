import { MorpionSimple } from "./morpionSimple.js";
import { Morpion } from "./morpion.js";
let morpion;
let nbCoups;
let joueur;
let symbole;
let scores = [0, 0];
let modeJeu;
let zone_message;
// nécessaire pour pouvoir désactiver les listeners, car je leur passe des paramètres lors du addEventListener
let ecouteurs = [];
function recommence() {
    zone_message = document.getElementById("messages");
    let taille = document.getElementById("taille").value;
    modeJeu = document.getElementById("simple").checked ? "simple" : "complet";
    let table = document.getElementById("table_morpion");
    for (let l = table.rows.length - 1; l >= 0; l--) {
        table.deleteRow(l);
    }
    try {
        if (modeJeu === "simple") {
            morpion = new MorpionSimple(Number.parseInt(taille));
        }
        else {
            morpion = new Morpion(Number.parseInt(taille));
        }
    }
    catch (error) {
        zone_message.innerHTML = error;
        return;
    }
    for (let i = 0; i < taille; i++) {
        let ligne = table.insertRow(i);
        for (let j = 0; j < taille; j++) {
            let id = '' + ((i + 1) * 10 + (j + 1));
            let cell = ligne.insertCell(j);
            cell.innerHTML = "<input type='button' id='" + id + "' class='case' />";
            const monEcouteur = () => clicBouton(cell.firstChild, i, j);
            ecouteurs.push(monEcouteur);
            cell.firstChild.addEventListener("click", monEcouteur);
        }
    }
    nbCoups = 0;
    joueur = 1;
    symbole = 'x';
    zone_message.innerHTML = "Joueur 1, à toi !";
    document.getElementById("btn_reset").disabled = true;
}
function clicBouton(uneCase, y, x) {
    try {
        let victoire = morpion.setCase(symbole, y, x);
        uneCase.value = symbole;
        uneCase.classList.add("joueur" + joueur);
        nbCoups++;
        if (victoire) {
            zone_message.innerHTML = "Le joueur " + joueur + " a gagné !";
            desactiveEcouteurs();
            symbole === "x" ? scores[0]++ : scores[1]++;
            document.getElementById("score").innerHTML = "X : " + scores[0] + " - O  : " + scores[1];
        }
        else if (nbCoups === morpion.taille * morpion.taille) {
            zone_message.innerHTML = "Match nul !";
            desactiveEcouteurs();
        }
        else {
            if (symbole === 'x') {
                symbole = 'o';
                joueur = 2;
            }
            else {
                symbole = 'x';
                joueur = 1;
            }
            zone_message.innerHTML = "Joueur " + joueur + ", à toi de jouer !";
        }
    }
    catch (error) {
        zone_message.innerHTML = error;
    }
}
function desactiveEcouteurs() {
    let l = 0;
    for (let i = 0; i < morpion.taille; i++) {
        for (let j = 0; j < morpion.taille; j++) {
            document.getElementById("" + ((i + 1) * 10 + (j + 1))).removeEventListener("click", ecouteurs[l]);
            l++;
        }
    }
    ecouteurs = [];
    document.getElementById("btn_reset").disabled = false;
}
document.getElementById("score").innerHTML = "X : " + scores[0] + " - O  : " + scores[1];
document.getElementById("btn_reset").addEventListener("click", recommence);
recommence();
//# sourceMappingURL=jeu_morpion.js.map