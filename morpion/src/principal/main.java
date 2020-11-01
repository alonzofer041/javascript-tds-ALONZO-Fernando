package principal;
import modele.Morpion;
import modele.morpionSimple;

import java.util.Random;
import java.util.Scanner;

public class main {
    public static void main(String[] args) {
        int nbCoups=0;
        int joueur=1;
        char message;
        String symbol="x";
        int [] score={0,0};
        Morpion m=null;
        boolean v=false;
        boolean erreurtaille;
        boolean erreursymboleocupe=false;
        boolean erreurdehorsindex=false;
        boolean erreurtypejeu=false;
        boolean victoire=false;
        boolean recommencer=true;
        do{
            do {
                System.out.println("taille de morpion?");
                Scanner clavier=new Scanner(System.in);
                int taille=clavier.nextInt();
                System.out.println("Mode de jeu?");
                Scanner claviermode=new Scanner(System.in);
                String modeJeu=claviermode.nextLine();
                try {
                    if(modeJeu.equals("complet")){
                        m=new Morpion(taille);
                        erreurtypejeu=false;
                    }
                    else if(modeJeu.equals("simple")){
                        m=new morpionSimple(taille);
                        erreurtypejeu=false;
                    }
                    else{
                        erreurtypejeu=true;
                    }
                    erreurtaille=false;
                }
                catch (IllegalArgumentException e){
                    System.out.println(e.getMessage());
                    erreurtaille=true;
                }
            }while (erreurtaille || erreurtypejeu);

            do{

                do {
                    Scanner clavier_i=new Scanner(System.in);
                    System.out.println("fille?");
                    int i=clavier_i.nextInt();
                    System.out.println("element?");
                    int j=clavier_i.nextInt();
                    try{
                        v=m.setCase(symbol,(i-1),(j-1));
                        erreursymboleocupe=false;
                        erreurdehorsindex=false;
                        nbCoups++;
                    }
                    catch (IllegalArgumentException e){
                        System.out.println(e.getMessage());
                        erreursymboleocupe=true;
                    }
                    catch (ArrayIndexOutOfBoundsException e){
                        System.out.println("ce position n'est pas valide");
                        erreurdehorsindex=true;
                    }
                }while (erreursymboleocupe || erreurdehorsindex);

                if(v){
                    victoire=true;
                    System.out.println("le joueur " + joueur + " a gagne");
                    if(symbol.equals("x")){
                        score[0]++;
                    }
                    else{
                        score[1]++;
                    }
                }
                for (int ligne=0;ligne<m.getTaille();ligne++){
                    for (int colonne=0;colonne<m.getTaille();colonne++){
                        System.out.print(m.getGrille(ligne,colonne)+" | ");
                    }
                    System.out.println();
                }
                if (joueur==1){
                    symbol="o";
                    joueur=2;
                }
                else {
                    symbol="x";
                    joueur=1;
                }
            }while (!victoire || nbCoups==m.getTaille()*m.getTaille());
            System.out.println("Score: " + score[0] + " - " + score[1]);
            System.out.println("Recommencer? Y/N");
            Scanner clavierquestion=new Scanner(System.in);
            if(clavierquestion.nextLine().toUpperCase().equals("N")){
                recommencer=false;
            }
            else{
                v=false;
                victoire=false;
                erreursymboleocupe=true;
                erreurtaille=true;
                erreurtypejeu=false;
                symbol="x";
                joueur=1;
                nbCoups=0;
            }
        }while (recommencer);

    }
}
