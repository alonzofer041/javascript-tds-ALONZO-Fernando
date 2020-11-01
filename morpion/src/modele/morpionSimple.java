package modele;

public class morpionSimple extends Morpion {
    public morpionSimple(int taille){
        super(taille);
    }
    public boolean aGagne(String symbole, int y, int x){
        String aTrouver=symbole.repeat(3);
//        Ligne
        String ligne="";
        for (String li : this.grille[y]){
            ligne+=li;
        }
        if(ligne.indexOf(aTrouver)>=0){
            return true;
        }
//        Colonne
        String colonne="";
        for (String[] col : this.grille){
            colonne+=col[x];
        }
        if (colonne.indexOf(aTrouver)>=0){
            return true;
        }
//        Diagonale
        if(x==y){
            String diagonale="";
            for(int lc=0;lc<this.taille;lc++){
                diagonale+=this.grille[lc][lc];
            }
            if(diagonale.indexOf(aTrouver)>=0){
                return true;
            }
        }
//        diagonale inverse
        if(x==this.taille-(y-1)){
            String diaginverse="";
            for(int lcinverse=0;lcinverse<this.taille;lcinverse++){
                diaginverse+=this.grille[lcinverse][this.taille-(lcinverse+1)];
            }
            if (diaginverse.indexOf(aTrouver)>=0){
                return true;
            }
        }
        return false;
    }

}
