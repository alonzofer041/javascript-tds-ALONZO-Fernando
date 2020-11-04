"use strict";
function insertArticle(body) {
    let titre = "Article 0 - Interdiction absolue";
    let texte = "<span style='color:#000000;'>Il est absolument interdit de doubler la vedette de l'épreuve : Stéphane Joyeux, sous peine de disqualification immédiate.</span>";
    let newH2 = document.createElement("h2");
    newH2.innerHTML = titre;
    let newP = document.createElement("p");
    newP.innerHTML = texte;
    let firstH2 = body.getElementsByTagName("h2")[0];
    body.insertBefore(newP, firstH2);
    body.insertBefore(newH2, newP);
}
function titresMayuscules(body) {
    let lesH2 = body.getElementsByTagName("h2");
    for (let i = 0; i < lesH2.length; i++) {
        const ch = lesH2[i].innerHTML;
        lesH2[i].innerHTML = ch.toUpperCase();
    }
}
function decalerNumeros(body) {
    let lesH2 = body.getElementsByTagName("h2");
    for (let i = 0; i < lesH2.length; i++) {
        const ch = lesH2[i].innerHTML;
        const idx = ch.indexOf(" ");
        const idx2 = ch.indexOf(" ", idx + 1);
        const numero = parseInt(ch.substring(idx, idx2)) + 1;
        const ch2 = ch.substring(0, idx + 1) + numero + ch.substring(idx2);
        lesH2[i].innerHTML = ch2;
    }
}
function styles(body) {
    let lesH2 = body.getElementsByTagName("h2");
    for (let i = 0; i < lesH2.length; i++) {
        if (i % 2 === 0) {
            lesH2[i].classList.add("unsurdeux");
            let precedent = lesH2[i];
            let paragraphe;
            do {
                paragraphe = precedent.nextElementSibling;
                precedent = paragraphe;
                if (paragraphe.nodeName !== "H2") {
                    if (paragraphe.classList !== undefined) {
                        paragraphe.classList.add("unsurdeux");
                    }
                }
            } while (paragraphe.nodeName !== "H2");
        }
    }
}
function changeDates(body) {
    let lesH2 = body.getElementsByTagName("h2");
    let art4 = lesH2[3];
    let noude = art4;
    while (noude.nodeName !== "UL") {
        noude = noude.nextElementSibling;
    }
    let lesUL = [];
    let unUL;
    do {
        unUL = noude;
        if (unUL.nodeName === "UL") {
            lesUL.push(unUL);
        }
        noude = noude.nextElementSibling;
    } while (unUL.nodeName === "UL");
    let pointInsertion = lesUL[0];
    for (let i = lesUL.length - 1; i >= 1; i--) {
        document.body.insertBefore(lesUL[i], pointInsertion);
    }
}
insertArticle(document.body);
titresMayuscules(document.body);
decalerNumeros(document.body);
styles(document.body);
changeDates(document.body);
//# sourceMappingURL=td2_marathon.js.map