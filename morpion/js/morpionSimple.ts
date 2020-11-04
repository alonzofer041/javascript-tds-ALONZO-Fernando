import {Morpion} from './morpion.js';

export class MorpionSimple extends Morpion {

    aGagne(symbole:string, y:number, x:number) {
        let aTrouver:string = symbole.repeat(3);

        // gagné en ligne ? : concaténation de la ligne, et recherche de la sous-chaîne gagnante
        let ligne:string = '';
        this.grille[y].forEach(element => ligne += element);
        if (ligne.indexOf(aTrouver) >= 0) {
            return true;
        }

        // gagné en colonne ? : concaténation de la colonne et recherche de la sous-chaîne gagnante
        let col:string = '';
        this.grille.forEach(element => col += element[x]);
        if (col.indexOf(aTrouver) >= 0) {
            return true;
        }

        // gagné diagonale
        if (x === y) {
            let diagonale:string = '';
            for (let lc:number = 0; lc < this.taille; lc++) {
                diagonale += this.grille[lc][lc];
            }
            if (diagonale.indexOf(aTrouver) >= 0) {
                return true;
            }
        }

        // gagné diag inverse
        if (x === this.taille - (y + 1)) {
            let inverse:string = '';
            for (let lc:number = 0; lc < this.taille; lc++) {
                inverse += this.grille[lc][this.taille - (lc + 1)];
            }
            if (inverse.indexOf(aTrouver) >= 0) {
                return true;
            }
        }

        return false;

    }
}
