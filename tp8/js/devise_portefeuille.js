import { Portefeuille } from "./portefeuille";
let tauxconversion = [];
let tabledevises = document.getElementById("tabledevises");
let inputtypemonnaie = document.getElementById("typemonnaie");
let inputmontant = document.getElementById("montant");
let boutonajouter = document.getElementById("ajouter");
let boutonretirer = document.getElementById("retirer");
let zonemessage = document.getElementById("zone_message");
let portefeuille = new Portefeuille();
obtenirExchangeApi('https://api.exchangeratesapi.io/latest', inputtypemonnaie);
//Separer le map dans une autre fonction
function obtenirExchangeApi(url, selectcaisse) {
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(function (json) {
        console.log(json);
        let options = "";
        tauxconversion.push(json.rates);
        tauxconversion = tauxconversion[0];
        console.log(tauxconversion);
        for (const donnee in json.rates) {
            options += "<option value='" + donnee + "'>" + donnee + "</option>";
            //NO OLVIDAR
            // console.log(json.rates[donnee]);
        }
        selectcaisse.innerHTML = options;
    })
        .catch(err => console.log("erreur: " + err));
}
function dechainerAjouterMontant() {
    try {
        let tauxconversionvalue = tauxconversion[inputtypemonnaie.value];
        console.log(tauxconversionvalue);
        portefeuille.ajouterDeviseDansPortefeuille(parseInt(inputmontant.value), inputtypemonnaie.value, tauxconversionvalue);
        if (portefeuille.tabportefeuille.length !== 0) {
            tabledevises.innerHTML = "";
            portefeuille.tabportefeuille.map(function (element) {
                tabledevises.innerHTML += "<tr><td>" + `${element.typemonnaie}` + "</td><td>" + `${element.montant}` + "</td><td>" + Math.round((element.montant / element.tauxconversion) * 100) / 100 + "</td></tr>";
            });
        }
        // console.log("arreglo de resultado: ");
        // console.log(portefeuille.tabportefeuille);
    }
    catch (error) {
        zonemessage.innerText = error;
        return;
    }
}
function dechainerRetirerMontant() {
    // tabledevises.innerHTML="";
    try {
        portefeuille.retirerDeviseHorsPortefeuille(parseInt(inputmontant.value), inputtypemonnaie.value);
        tabledevises.innerHTML = "";
        portefeuille.tabportefeuille.map(function (element) {
            tabledevises.innerHTML += "<tr><td>" + `${element.typemonnaie}` + "</td><td>" + `${element.montant}` + "</td><td>" + Math.round((element.montant / element.tauxconversion) * 100) / 100 + "</td></tr>";
        });
    }
    catch (error) {
        zonemessage.innerHTML = error;
        return;
    }
}
boutonajouter.addEventListener("click", dechainerAjouterMontant);
boutonretirer.addEventListener("click", dechainerRetirerMontant);
//# sourceMappingURL=devise_portefeuille.js.map