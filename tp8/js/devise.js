export class Devise {
    constructor(montant, typemonnaie, tauxconversion) {
        this._montant = montant;
        this._typemonnaie = typemonnaie;
        this._tauxconversion = tauxconversion;
    }
    ajouterArgent(montantplus) {
        return this.montant += montantplus;
    }
    retirerArgent(montantretire) {
        return this.montant -= montantretire;
    }
    get montant() {
        return this._montant;
    }
    set montant(newMontant) {
        this._montant = newMontant;
    }
    get typemonnaie() {
        return this._typemonnaie;
    }
    set typemonnaie(newTypemonnaie) {
        this._typemonnaie = newTypemonnaie;
    }
    get tauxconversion() {
        return this._tauxconversion;
    }
    set tauxconversion(newTauxconversion) {
        this._tauxconversion = newTauxconversion;
    }
}
//# sourceMappingURL=devise.js.map