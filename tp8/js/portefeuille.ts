import {Devise} from "./devise";

export class Portefeuille{
    private _tabportefeuille:Array<Devise>=[];

    get tabportefeuille():Array<Devise>{
        return this._tabportefeuille;
    }
    set tabportefeuille(newtabportefeuille:Devise[]) {
        this._tabportefeuille = newtabportefeuille;
    }
    ajouterDeviseDansPortefeuille(valuemonnaie:number,typemonnaie:string,tauxconversion?:number):void{
        if(isNaN(valuemonnaie)){
            throw "Ajoutez une quantite";
        }
        const validator:boolean=this.monnaieRecherche(typemonnaie);
        // console.log("validador: "+validator);
        if(validator){
            const elementaajouter:number=this.tabportefeuille.map(function (element:Devise):string{
                // console.log("map: "+element.typemonnaie);
                return element.typemonnaie;
            }).indexOf(typemonnaie);
            // console.log("element a ajouter: "+elementaajouter);
            if(elementaajouter || elementaajouter!==-1){
                this.tabportefeuille[elementaajouter].montant=this.tabportefeuille[elementaajouter].ajouterArgent(valuemonnaie);
            }
        }
        else{
            let devise:Devise=new Devise(valuemonnaie,typemonnaie,tauxconversion);
            this.tabportefeuille.push(devise);
        }
    }
    retirerDeviseHorsPortefeuille(valuemonnaie:number,typemonnaie:string):void{
        const validator:boolean=this.monnaieRecherche(typemonnaie);
        if(validator){
            const elementaretirer=this.tabportefeuille.map(function (element:Devise):string{
                return element.typemonnaie;
            }).indexOf(typemonnaie);
            if(elementaretirer || elementaretirer!==-1){
                if(valuemonnaie<=this.tabportefeuille[elementaretirer].montant){
                    this.tabportefeuille[elementaretirer].montant=this.tabportefeuille[elementaretirer].retirerArgent(valuemonnaie);
                    if(this.tabportefeuille[elementaretirer].montant<=0){
                        this.tabportefeuille.splice(elementaretirer,1);
                        // console.log(this.tabportefeuille);
                    }
                }
                else{
                    throw "desole, tu peux pas retirer que se trouve dans le portefeuille";
                }
            }
        }
        else{
            throw "Type de monnaie pas trouvé, essaie de nouveau";
        }
    }
    monnaieRecherche(typemonnaie:string):boolean{
        let tablecherche:Array<Devise> = this.tabportefeuille;
        let longueur:number=tablecherche.length;
        for (let i:number=0; i < longueur; i++){
            if(tablecherche[i].typemonnaie===typemonnaie){
                return true;
            }
        }
        return false;
    }
}