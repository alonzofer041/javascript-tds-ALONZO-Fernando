import { Devise } from "./devise";
export class Portefeuille {
    constructor() {
        this._tabportefeuille = [];
    }
    get tabportefeuille() {
        return this._tabportefeuille;
    }
    set tabportefeuille(newtabportefeuille) {
        this._tabportefeuille = newtabportefeuille;
    }
    ajouterDeviseDansPortefeuille(valuemonnaie, typemonnaie, tauxconversion) {
        if (isNaN(valuemonnaie)) {
            throw "Ajoutez une quantite";
        }
        const validator = this.monnaieRecherche(typemonnaie);
        // console.log("validador: "+validator);
        if (validator) {
            const elementaajouter = this.tabportefeuille.map(function (element) {
                // console.log("map: "+element.typemonnaie);
                return element.typemonnaie;
            }).indexOf(typemonnaie);
            // console.log("element a ajouter: "+elementaajouter);
            if (elementaajouter || elementaajouter !== -1) {
                this.tabportefeuille[elementaajouter].montant = this.tabportefeuille[elementaajouter].ajouterArgent(valuemonnaie);
            }
        }
        else {
            let devise = new Devise(valuemonnaie, typemonnaie, tauxconversion);
            this.tabportefeuille.push(devise);
        }
    }
    retirerDeviseHorsPortefeuille(valuemonnaie, typemonnaie) {
        const validator = this.monnaieRecherche(typemonnaie);
        if (validator) {
            const elementaretirer = this.tabportefeuille.map(function (element) {
                return element.typemonnaie;
            }).indexOf(typemonnaie);
            if (elementaretirer || elementaretirer !== -1) {
                if (valuemonnaie <= this.tabportefeuille[elementaretirer].montant) {
                    this.tabportefeuille[elementaretirer].montant = this.tabportefeuille[elementaretirer].retirerArgent(valuemonnaie);
                    if (this.tabportefeuille[elementaretirer].montant <= 0) {
                        this.tabportefeuille.splice(elementaretirer, 1);
                        // console.log(this.tabportefeuille);
                    }
                }
                else {
                    throw "desole, tu peux pas retirer que se trouve dans le portefeuille";
                }
            }
        }
        else {
            throw "Type de monnaie pas trouvé, essaie de nouveau";
        }
    }
    monnaieRecherche(typemonnaie) {
        let tablecherche = this.tabportefeuille;
        let longueur = tablecherche.length;
        for (let i = 0; i < longueur; i++) {
            if (tablecherche[i].typemonnaie === typemonnaie) {
                return true;
            }
        }
        return false;
    }
}
//# sourceMappingURL=portefeuille.js.map