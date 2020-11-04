var corp=document.querySelector("body");
var bouton=document.getElementById("ajouter");
var boutonexec=document.getElementById("buttonevent");
var comptchild=0;

bouton.addEventListener("click",function (e) {
    var clone=corp.children[0].cloneNode();

    var balise=document.createElement("label");
    balise.innerHTML="Elément " + (comptchild+2);

    var saissie=document.createElement("input");
    saissie.setAttribute("type","text");

    clone.appendChild(balise);
    clone.appendChild(saissie);

    corp.insertBefore(clone,corp.children[(comptchild+1)]);
    clone.appendChild(bouton);

    comptchild++;
});
