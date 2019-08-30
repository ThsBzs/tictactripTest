export default class Dom{
    //Ajout d'un affichage des villes
    showList(city, field){
        const origin = document.getElementById('origin');
        const destination = document.getElementById('destination');
        let replace;
    	const container =  document.getElementById('city-container');
        let li = document.createElement('li');
        container.appendChild(li);
        li.textContent = city;
        li.classList.add("city");
        li.onclick = (function(){
            replace = this.textContent;
            console.log(replace);
            if (field == origin){
                origin.value = replace;
            } else if (field == destination){
                destination.value = replace;
            };
            explain.style.display = 'initial';//Affichage du texte de droite
            update.style.display = 'none';
        });
        
    };
}