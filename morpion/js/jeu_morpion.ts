import {MorpionSimple} from "./morpionSimple.js";
import {Morpion} from "./morpion.js";

let morpion:Morpion;
let nbCoups:number;
let joueur:number;
let symbole:string;
let scores:Array<number> = [0, 0];

let modeJeu;
let zone_message:HTMLParagraphElement;


// nécessaire pour pouvoir désactiver les listeners, car je leur passe des paramètres lors du addEventListener
let ecouteurs:Array<EventHandlerNonNull> = [];

function recommence() {

    zone_message = document.getElementById("messages") as HTMLParagraphElement;
    let taille:number = parseInt((document.getElementById("taille") as HTMLInputElement).value);
    modeJeu = (document.getElementById("simple") as HTMLInputElement).checked ? "simple" : "complet";

    let table:HTMLTableElement = (document.getElementById("table_morpion") as HTMLTableElement);
    for (let l = table.rows.length - 1; l >= 0; l--)
    {
        table.deleteRow(l);
    }

    try {
        if (modeJeu === "simple") {
            morpion = new MorpionSimple(taille);
        } else {
            morpion = new Morpion(taille);
        }

    } catch (error) {
        zone_message.innerHTML = error;
        return;
    }

    for (let i:number = 0; i < taille; i++) {
        let ligne:HTMLTableRowElement = table.insertRow(i);
        for (let j:number = 0; j < taille; j++) {
            let id:string = '' + ((i + 1) * 10 + (j + 1));
            let cell:HTMLTableCellElement = ligne.insertCell(j);
            cell.innerHTML = "<input type='button' id='" + id + "' class='case' />";
            const monEcouteur = () => clicBouton((cell.firstChild as HTMLInputElement), i, j);
            ecouteurs.push(monEcouteur);
            (cell.firstChild as HTMLElement).addEventListener("click", monEcouteur);
        }
    }

    nbCoups = 0;
    joueur = 1;
    symbole = 'x';
    zone_message.innerHTML = "Joueur 1, à toi !";
    (document.getElementById("btn_reset") as HTMLButtonElement).disabled = true;
}

function clicBouton(uneCase:HTMLInputElement, y:number, x:number) {

    try {
        let victoire = morpion.setCase(symbole, y, x);
        uneCase.value = symbole;
        uneCase.classList.add("joueur" + joueur);
        nbCoups++;
        if (victoire) {
            zone_message.innerHTML = "Le joueur " + joueur + " a gagné !";
            desactiveEcouteurs();
            symbole === "x" ? scores[0]++ : scores[1]++;
            (document.getElementById("score") as HTMLElement).innerHTML = "X : " + scores[0] + " - O  : " + scores[1];
        } else if (nbCoups === morpion.taille * morpion.taille) {
            zone_message.innerHTML = "Match nul !";
            desactiveEcouteurs();
        } else {
            if (symbole === 'x') {
                symbole = 'o';
                joueur = 2;
            } else {
                symbole = 'x';
                joueur = 1;
            }
            zone_message.innerHTML = "Joueur " + joueur + ", à toi de jouer !";
        }
    } catch (error) {
        zone_message.innerHTML = error;
    }
}

function desactiveEcouteurs() {

    let l:number = 0;
    for (let i:number = 0; i < morpion.taille; i++) {
        for (let j:number = 0; j < morpion.taille; j++) {
            (document.getElementById("" + ((i + 1) * 10 + (j + 1))) as HTMLButtonElement).removeEventListener("click", ecouteurs[l]);
            l++;
        }
    }
    ecouteurs = [];
    (document.getElementById("btn_reset") as HTMLButtonElement).disabled = false;
}

(document.getElementById("score") as HTMLElement).innerHTML = "X : " + scores[0] + " - O  : " + scores[1];
(document.getElementById("btn_reset") as HTMLButtonElement).addEventListener("click", recommence);
recommence();
