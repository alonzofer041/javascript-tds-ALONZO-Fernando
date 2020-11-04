$(document).ready(function(){
    $("body").on("load",function (){
        localStorage.clear();
    });

    $.ajax({
       url: 'https://geo.api.gouv.fr/regions',
        type: 'GET',
        dataType: 'json',
        success: function (data){
           let selectregion=$("#region");
           let regions=data;
           $.map(regions,function(region){
              let optionregion=document.createElement("option");
              $(optionregion).attr("value",`${region.code}`);
              $(optionregion).html(`${region.nom}`);
              $(selectregion).append(optionregion);
           });
        },
        error: function (objet,statut,erreur){
           console.log(erreur);
        }
    });

    $("#region").bind("change",function(){
        let valuecasseregion=$(this).val();
        $.ajax({
            url:'https://geo.api.gouv.fr/regions/'+valuecasseregion+'/departements',
            type: 'GET',
            dataType: 'json',
            success:function (data) {
                $("#departement").empty();
                $("#commune").empty();
                let premier=document.createElement("option");
                $(premier).html("Seleccionez un departement");
                let selectdepartement=$("#departement");
                $(selectdepartement).append(premier);
                var departaments=data;
                $.map(departaments,function (departement){
                   let optiondepartement=document.createElement("option");
                   $(optiondepartement).attr({
                       "value":`${departement.code}`,
                       "class": `${departement.codeRegion}`
                   });
                   $(optiondepartement).html(`${departement.nom}`);
                   $(selectdepartement).append(optiondepartement);
                });
            },
            error: function (objet,statut,erreur){
                console.log(erreur);
            }
        });
    });

    $("#departement").bind("change",function(){
        let valuecassedepartement=$(this).val();
        $.ajax({
            url:'https://geo.api.gouv.fr/departements/'+valuecassedepartement+'/communes',
            method:'GET',
            dataType:'json',
            success:function(data){
                $("#commune").empty();
                let premier=document.createElement("option");
                $(premier).html("Seleccionez une commune");
                let selectcommune=$("#commune");
                $(selectcommune).append(premier);
                let communes=data;
                $.map(communes,function(commune){
                   let optioncommune=document.createElement("option");
                   $(optioncommune).attr({
                       "value":`${commune.code}`,
                       "class":`${commune.codeDepartement}`
                   });
                   $(optioncommune).html(`${commune.nom}`);
                   $(selectcommune).append(optioncommune);
                });
            },
            error: function (objet,statut,erreur){
                console.log(erreur);
            }
        });
    });

    $("#commune").bind("change",function(){
        $.ajax({
            url:'https://geo.api.gouv.fr/communes',
            method:'GET',
            dataType:'json',
            success:function (data){
                $("#tabledonneescommune").empty();
                let communes=data;
                let commune=$.grep(communes,function(el){
                    if(el.code!==$("#commune").val()){
                        return false;
                    }
                    else{
                        return true;
                    }
                });
                if(commune[0].population){
                    $("#population").html(commune[0].population);
                }
                else{
                    $("#population").html("aucune population");
                }
                let communescodepostal=$.grep(communes,function (el) {
                   for(let i=0;i<commune[0].codesPostaux.length;i++){
                       if(el.codesPostaux[0]===commune[0].codesPostaux[i]){
                           return true;
                       }
                       // console.log(commune[0].codesPostaux[0]);
                   }
                });
                let titres=document.createElement("tr");
                let titrenom=document.createElement("td");
                let titrecodepostal=document.createElement("td");
                let titrepopulation=document.createElement("td");
                $(titres).append($(titrenom).html("Nom"));
                $(titres).append($(titrecodepostal).html("Code postal"));
                $(titres).append($(titrepopulation).html("Population"));
                $("#tabledonneescommune").append(titres);
                for (let i=0;i<communescodepostal.length;i++){
                    let file=document.createElement("tr");
                    let colonnenom=document.createElement("td");
                    let colonnecodepostal=document.createElement("td");
                    let colonnepopulation=document.createElement("td");
                    $(colonnenom).html(communescodepostal[i].nom);
                    $(colonnecodepostal).html(communescodepostal[i].codesPostaux[0]);
                    $(colonnepopulation).html(communescodepostal[i].population);
                    $(file).append(colonnenom);
                    $(file).append(colonnecodepostal);
                    $(file).append(colonnepopulation);
                    $("#tabledonneescommune").append(file);
                }

                let populationtotale=0;
                for (let i=1;i<$("tr").length;i++){
                    let populationind=parseFloat($("#tabledonneescommune tr:eq("+i+") td:eq(2)").html());
                    populationtotale+=populationind;
                }
                $("#poptotal").html(populationtotale + " habitants");
            },
            error: function (objet,statut,erreur){
                console.log(erreur);
            }
        });
    });

    $("#affichermeteo").bind("click",function(){
        let codecommune=$("#commune option:selected").text();
        localStorage.setItem("codeville",codecommune);
        window.location.href="./meteo.html";
    });
});