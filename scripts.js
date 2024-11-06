//action lors du bouton search
document.querySelector('input[type="button"][value="Search"]').addEventListener('click',
    function () {
        //reset de la card
        document.querySelector('#tripResult').innerHTML = '';

        //ecoute des champs & // vérification que tous les champs soit remplis
        const request = { departure: document.querySelector('#departure').value, arrival: document.querySelector('#arrival').value, date: document.querySelector('#date').value };
        console.log(request);

        if (request.departure && request.arrival && request.date) {
            console.log('champs pleins')
            //envoie de la requette-----------------------------------------------
            fetch(`http://localhost:3000/search-trip/${request.departure}/${request.arrival}/${request.date}`)
                .then(response => response.json())
                .then(data => {
                    // si pas de trajet trouvé
                    if (data.result == false) {
                        console.log('pas de trajet');
                        document.querySelector('#tripResult').innerHTML = `
                <div id="searchError">
                    <div id='notFoundImg'>
                        <img src="/front/src/notfound.png" style="width:130px"  alt="not found">
                    </div>
                    <p>No trip found</p>

                </div>
               `
                    } else {
                                    //recetion et affichage des résutats----------------------------------
                        for (let i = 0; i < data.trajet.length; i++) {
                            const date = new Date(data.trajet[i].date);
                            document.querySelector('#tripResult').innerHTML += `
                <div class="resultLine">
                    <div id="depRes">${data.trajet[i].departure}</div>
                    <div id="arrRes">${data.trajet[i].arrival}</div>
                    <div id="dateRes">${date.getHours()}:${date.getMinutes()}</div>
                    <div id="priceRes">${data.trajet[0].price} €</div>
                    <input type="button" value="Book">
                </div>
               `
                        }
                    }
                })

        } else {
            console.log('champs vides')
            //Affinchage no trip found avec texte champs vide
            document.querySelector('#tripResult').innerHTML = `
            <div id="searchError">
                    <div id='notFoundImg'>
                        <img src="/front/src/notfound.png" style="width:130px"  alt="not found">
                    </div>
                    <p>Please complete all fields</p>

                </div>
            `
        }
    }
);



