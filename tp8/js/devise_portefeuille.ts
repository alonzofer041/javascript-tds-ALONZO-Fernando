import {Portefeuille} from "./portefeuille";
let tauxconversion:Array<any>=[];
let tabledevises:HTMLTableElement=(document.getElementById("tabledevises") as HTMLTableElement);
let inputtypemonnaie:HTMLSelectElement=(document.getElementById("typemonnaie") as HTMLSelectElement);
let inputmontant:HTMLInputElement=(document.getElementById("montant") as HTMLInputElement);
let boutonajouter:HTMLButtonElement=(document.getElementById("ajouter") as HTMLButtonElement);
let boutonretirer:HTMLButtonElement=(document.getElementById("retirer") as HTMLButtonElement);
let zonemessage:HTMLParagraphElement=(document.getElementById("zone_message") as HTMLParagraphElement);
let portefeuille:Portefeuille=new Portefeuille();

obtenirExchangeApi('https://api.exchangeratesapi.io/latest',inputtypemonnaie);
//Separer le map dans une autre fonction
function obtenirExchangeApi(url:string,selectcaisse:HTMLSelectElement):void{
    fetch(url,{
        method:'GET',
    })
        .then<Response>(response=>response.json())
        .then<void>(function (json:any):void{
            console.log(json);
            let options:string="";
            tauxconversion.push(json.rates);
            tauxconversion=tauxconversion[0];
            console.log(tauxconversion);
            for (const donnee in json.rates){
                options+="<option value='"+donnee+"'>"+donnee+"</option>";
                //NO OLVIDAR
                // console.log(json.rates[donnee]);
            }
            selectcaisse.innerHTML=options;
        })
        .catch(err=>console.log("erreur: "+err));
}
function dechainerAjouterMontant(){
    try{
        let tauxconversionvalue:number=tauxconversion[inputtypemonnaie.value];
        console.log(tauxconversionvalue);
        portefeuille.ajouterDeviseDansPortefeuille(parseInt(inputmontant.value),inputtypemonnaie.value,tauxconversionvalue);
        if (portefeuille.tabportefeuille.length!==0){
            tabledevises.innerHTML="";
            portefeuille.tabportefeuille.map(function(element){
                tabledevises.innerHTML+="<tr><td>"+`${element.typemonnaie}`+"</td><td>"+`${element.montant}`+"</td><td>"+Math.round((element.montant/element.tauxconversion)*100)/100+"</td></tr>";
            });
        }
        // console.log("arreglo de resultado: ");
        // console.log(portefeuille.tabportefeuille);
    }
    catch (error){
        zonemessage.innerText=error;
        return;
    }
}
function dechainerRetirerMontant(){
    // tabledevises.innerHTML="";
    try{
        portefeuille.retirerDeviseHorsPortefeuille(parseInt(inputmontant.value),inputtypemonnaie.value);
        tabledevises.innerHTML="";
        portefeuille.tabportefeuille.map(function(element){
            tabledevises.innerHTML+="<tr><td>"+`${element.typemonnaie}`+"</td><td>"+`${element.montant}`+"</td><td>"+Math.round((element.montant/element.tauxconversion)*100)/100+"</td></tr>";
        });
    } catch(error){
        zonemessage.innerHTML=error;
        return;
    }
}

boutonajouter.addEventListener("click",dechainerAjouterMontant);
boutonretirer.addEventListener("click",dechainerRetirerMontant);