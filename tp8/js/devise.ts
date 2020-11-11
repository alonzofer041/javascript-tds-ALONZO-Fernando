export class Devise{
    private _montant:number;
    private _typemonnaie:string;
    private _tauxconversion:number | undefined

    constructor(montant: number, typemonnaie: string, tauxconversion: number | undefined) {
        this._montant=montant;
        this._typemonnaie=typemonnaie;
        this._tauxconversion=tauxconversion;
    }
    ajouterArgent(montantplus:number):number{
        return this.montant+=montantplus;
    }
    retirerArgent(montantretire:number):number{
        return this.montant-=montantretire;
    }
    get montant():number{
        return this._montant;
    }
    set montant(newMontant:number){
        this._montant=newMontant;
    }
    get typemonnaie():string{
        return this._typemonnaie;
    }
    set typemonnaie(newTypemonnaie:string){
        this._typemonnaie=newTypemonnaie;
    }
    get tauxconversion():number{
        return <number>this._tauxconversion;
    }
    set tauxconversion(newTauxconversion:number){
        this._tauxconversion=newTauxconversion;
    }
}