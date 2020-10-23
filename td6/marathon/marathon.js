$(document).ready(function () {
    //EXO 1
    function insertArticle(){
        let titre="Article 0 - Interdiction absolute";
        let description="<span>Il est absolument interdit de doubler la vedette de l'épreuve : Stéphane Joyeux, sous peine de disqualification immédiate.</span>"
        let paragraphe=document.createElement("p");
        let titreh2=document.createElement("h2");
        $(paragraphe).html(description);
        $(titreh2).html(titre);
        let premierH2=$("body h2:first");
        $(premierH2).before(titreh2);
        $(titreh2).after(paragraphe);
    }

//    EXO 2
    function titresMayuscules(){
        let titres=$("h2");
        for(let titre of titres){
            let ch=$(titre).html();
            $(titre).html(ch.toUpperCase());
        }
    }

//    EXO 3
    function decalerNumeros(){
        let titres=$("h2");
        for(let titre of titres){
            let ch=$(titre).html().split(" ");
            let entier=ch[1]++;
            $(titre).html(ch.join(" "));
        }
    }

    //EXO 4
    function stylesarticles(){
        let titres=$("h2");
        let i=0;
        for(let titre of titres){
            if(i%2===0){
                $(titre).addClass("unsurdeux");
                let precedent=titre;
                let suivant;
                do{
                    suivant=$(precedent).next();
                    precedent=suivant;
                    if($(suivant).prop("tagName")!=="H2"){
                        if($(suivant).classList===undefined){
                            $(suivant).addClass("unsurdeux");
                        }
                    }
                }while($(suivant).prop("tagName")!=="H2");
            }
            i++;
        }
    }

    //EXO 5
    function changedates(){
        let titres=$("h2");
        let article4=titres[3];
        let nodeul=article4;
        while ($(nodeul).prop("tagName")!=="UL"){
            nodeul=$(nodeul).next();
        }
        let uls=[];
        let ulunique;
        do{
            ulunique=nodeul;
            if ($(ulunique).prop("tagName")==="UL"){
                uls.push(ulunique);
            }
            nodeul=$(nodeul).next();
        }while ($(ulunique).prop("tagName")==="UL");
        let insertion=uls[0];
        for (let i=uls.length-1;i>=1;i--){
            $(insertion).before(uls[i]);
        }
    }
    insertArticle();
    titresMayuscules();
    decalerNumeros();
    stylesarticles();
    changedates();
});