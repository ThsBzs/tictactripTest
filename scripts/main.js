import Dom from './dom.js';
//Appel du bloc de droite pour masquage
const explain = document.getElementById('explain');
const update = document.getElementById('update');
const form = document.getElementById('form');
// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

//Utilisation des éléments des API
function handler(reponse, field){
    //Récupération des éléments renvoyés par la requête
            let cities = JSON.parse(reponse);
            cities.forEach(function (cities) {
                let name = cities.unique_name;
                dom.showList(name, field);
            });
};

const container =  document.getElementById('city-container');
let dom = new Dom;
const origin = document.getElementById('origin');
const destination =  document.getElementById('destination');
let replace;

function choose(event, field){
    let saisie;
    let saisieOrigin = form.elements.origin.value;
    let saisieDestination = form.elements.destination.value;
    if(field == origin){
        saisie = saisieOrigin;
    } else if (field == destination){
        saisie = saisieDestination;
    }
    while(container.firstChild){
            container.removeChild(container.firstChild);
        };
	explain.style.display = 'none';//Masquage du texte de droite
    update.style.display = 'initial';//Affichage de la liste
    if(event == 'click'){
        ajaxGet(`https://api.comparatrip.eu/cities/popular/5`, function (reponse){
            handler(reponse , field);
        });
    } else if (event == 'keypress'){
        ajaxGet(`https://api.comparatrip.eu/cities/autocomplete/?q=${saisie}`, function (reponse){
            handler(reponse , field);
        });
    }
}

origin.addEventListener("keypress", function(e){
    choose('keypress', origin);
});
origin.addEventListener("click", function(e){
    choose('click', origin);
});


destination.addEventListener("keypress", function(e){
    choose('keypress', destination);
});
destination.addEventListener("click", function(e){
    choose('click', destination);
});
