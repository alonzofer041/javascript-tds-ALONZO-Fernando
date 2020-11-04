export class Morpionclasse {
    constructor(taille,symbole,joueur) {
        this.taille=taille;
        this.morpion=new Array(taille);
        this.symbole=symbole;
        this.joueur=joueur;
        this.scores=[0,0];
        this.nbcoups=0;
        this.zonemessage="";

        for (let i=0;i<this.taille;i++){
            this.morpion[i]=new Array(this.taille);
            for (let j=0;j<this.taille;j++) {
                this.morpion[i][j] = " ";
            }
        }
    }
    verifierbouton(y,x){
        if(this.morpion[y][x] === " "){
            this.morpion[y][x]=this.symbole;
            this.nbcoups++;

            let victoire=this.verifiergagneur();
            if (victoire){
                this.zonemessage="le joueur " + this.joueur + " a gagné";
            //    desactiverecouteurs
                this.symbole==="x" ? scores[0]++ : scores[1]++;
            }
            else if(this.nbcoups===this.taille*this.taille){
                this.zonemessage="match nul!";
            }
            else{
                if(this.symbole==="x"){
                    this.symbole="o";
                    this.joueur=2;
                }
                else{
                    this.symbole="x";
                    this.joueur=1;
                }
                this.zonemessage="joueur " + this.joueur + " a tour de jouer";
            }
        }
        else{
            this.zonemessage="Case deja ocuppe";
        }
    }
    verifiergagneur(symbole,y,x){
        //en ligne
        let ligne=y;
        let nbSymboles;
        for (let col = 0; col < this.taille; col++) {
            if (this.morpion[ligne][col] === symbole) {
                nbSymboles++;
            }
        }
        if(nbSymboles===this.taille){
            return true;
        }
    //    en colonne
        let col = x;
        nbSymboles = 0;
        for (let ligne = 0; ligne < this.taille; ligne++) {
            if (this.morpion[ligne][col] === symbole) {
                nbSymboles++;
            }
        }
        if (nbSymboles === this.taille) {
            return true;
        }
    //    diagonale
        if (x === y) {
            nbSymboles = 0;
            for (let lc = 0; lc < this.taille; lc++) {
                if (this.morpion[lc][lc] === symbole) {
                    nbSymboles++;
                }
            }
            if (nbSymboles === this.taille) {
                return true;
            }
        }
    //    diagonaleinverse
        if (x === this.taille - (y + 1)) {
            nbSymboles = 0;
            for (let ligne = 0; ligne < this.taille; ligne++) {
                if (this.morpion[ligne][this.taille - (ligne + 1)] === symbole) {
                    nbSymboles++;
                }
            }
            if (nbSymboles === this.taille) {
                return true;
            }
        }
        return false;
    }
}