package modele;

public class Morpion {
    protected int taille;
    protected String[][] grille;

    public Morpion(){
        this(3);
    }
    public Morpion(int taille){
        this.setTaille(taille);
    }
    public void setTaille(int taille){
        final int MINGRILLE=3;
        final int MAXGRILLE=8;
        if(taille<MINGRILLE || taille>MAXGRILLE){
            throw new IllegalArgumentException("Taille invalide");
        }
        this.taille=taille;
        this.grille=new String[taille][];
        for(int i=0;i<taille;i++){
            this.grille[i]=new String[taille];
            for(int j=0;j<taille;j++){
                this.grille[i][j]=" ";
            }
        }
    }
    public boolean setCase(String symbole, int y, int x){
        if(this.grille[y][x].equals(" ")){
            this.grille[y][x]=symbole;
            return this.aGagne(symbole,y,x);
        }
        else {
            throw new IllegalArgumentException("case deja ocupe");
        }
    }
    public boolean aGagne(String symbole, int y, int x){
        int nSymboles;
//        Ligne
        int ligne=y;
        nSymboles=0;
        for (int col=0;col<this.taille;col++){
            if(this.grille[ligne][col].equals(symbole)){
                nSymboles++;
            }
        }
        if(nSymboles==this.taille){
            return true;
        }
//        Colonne
        int col=x;
        nSymboles=0;
        for (int lignecol=0;lignecol<this.taille;lignecol++){
            if(this.grille[lignecol][col].equals(symbole)){
                nSymboles++;
            }
        }
        if (nSymboles==this.taille){
            return true;
        }
//        diagonale
        if(x==y){
            nSymboles=0;
            for (int lc=0;lc<taille;lc++){
                if(this.grille[lc][lc].equals(symbole)){
                    nSymboles++;
                }
            }
            if(nSymboles==this.taille){
                return true;
            }
        }
//        diagonale inverse
        if (x==(this.taille-(y+1))){
            nSymboles=0;
            for (int ligdiag=0;ligdiag<taille;ligdiag++){
                if(this.grille[ligdiag][this.taille - (ligdiag + 1)].equals(symbole)){
                    nSymboles++;
                }
            }
            if (nSymboles==this.taille){
                return true;
            }
        }
        return false;
    }

    public int getTaille() {
        return taille;
    }

    public String getGrille(int i,int j) {
        return grille[i][j];
    }
}
