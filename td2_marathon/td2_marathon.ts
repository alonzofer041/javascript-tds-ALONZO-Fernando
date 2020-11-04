function insertArticle(body:HTMLBodyElement):void{
    let titre:string="Article 0 - Interdiction absolue";
    let texte:string="<span style='color:#000000;'>Il est absolument interdit de doubler la vedette de l'épreuve : Stéphane Joyeux, sous peine de disqualification immédiate.</span>";
    let newH2:HTMLHeadElement=document.createElement("h2");
    newH2.innerHTML=titre;
    let newP:HTMLParagraphElement=document.createElement("p");
    newP.innerHTML=texte;
    let firstH2:HTMLHeadElement=body.getElementsByTagName("h2")[0];
    body.insertBefore(newP,firstH2);
    body.insertBefore(newH2,newP);
}
function titresMayuscules(body:HTMLBodyElement):void{
    let lesH2:HTMLCollectionOf<HTMLHeadElement> = body.getElementsByTagName("h2");
    for (let i:number=0;i<lesH2.length;i++){
        const ch:string=lesH2[i].innerHTML;
        lesH2[i].innerHTML=ch.toUpperCase();
    }
}
function decalerNumeros(body:HTMLBodyElement):void{
    let lesH2:HTMLCollectionOf<HTMLHeadElement> = body.getElementsByTagName("h2");
    for (let i:number=0;i<lesH2.length;i++){
        const ch:string=lesH2[i].innerHTML;
        const idx:number=ch.indexOf(" ");
        const idx2:number=ch.indexOf(" ",idx+1);
        const numero:number=parseInt(ch.substring(idx,idx2))+1;
        const ch2:string=ch.substring(0,idx+1)+numero+ch.substring(idx2);
        lesH2[i].innerHTML=ch2;
    }
}
function styles(body:HTMLBodyElement):void{
    let lesH2:HTMLCollectionOf<HTMLHeadElement> = body.getElementsByTagName("h2");
    for (let i:number=0;i<lesH2.length;i++){
        if(i%2===0){
            lesH2[i].classList.add("unsurdeux");
            let precedent:Element=lesH2[i];
            let paragraphe:Element;
            do{
                paragraphe=precedent.nextElementSibling;
                precedent=paragraphe;
                if (paragraphe.nodeName!=="H2"){
                    if(paragraphe.classList!==undefined){
                        paragraphe.classList.add("unsurdeux");
                    }
                }
            } while (paragraphe.nodeName!=="H2");
        }
    }
}
function changeDates(body:HTMLBodyElement):void{
    let lesH2:HTMLCollectionOf<HTMLHeadElement> = body.getElementsByTagName("h2");
    let art4:HTMLHeadElement=lesH2[3];
    let noude:HTMLElement=art4;
    while (noude.nodeName!=="UL"){
        noude=noude.nextElementSibling;
    }
    let lesUL:any[]=[];
    let unUL:HTMLElement;
    do{
        unUL=noude;
        if (unUL.nodeName==="UL"){
            lesUL.push(unUL);
        }
        noude=noude.nextElementSibling;
    }while(unUL.nodeName==="UL");
    let pointInsertion:HTMLElement=lesUL[0];
    for(let i:number=lesUL.length-1;i>=1;i--){
        document.body.insertBefore(lesUL[i],pointInsertion);
    }
}
insertArticle((document.body as HTMLBodyElement));
titresMayuscules((document.body as HTMLBodyElement));
decalerNumeros((document.body as HTMLBodyElement));
styles((document.body as HTMLBodyElement));
changeDates((document.body as HTMLBodyElement));