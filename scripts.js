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
                    <div id="dateRes">${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}</div>
                    <div id="priceRes">${data.trajet[i].price} €</div>
                    <input type="button" value="Book" id='${data.trajet[i]._id}'}>
                </div>
               `
                        }
                        bookAction();

                    }
                }
                )
            //reset recherche
            // document.querySelector('#departure').value = '';
            // document.querySelector('#arrival').value = '';
            // document.querySelector('#departure').value = '';




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

//-------------------------------Ajout au panier--------------------

//pour chaque bouton book
function bookAction() {
    for (let i = 0; i < document.querySelectorAll('input[type="button"][value="Book"]').length; i++) {
        //ecouter le bouton
        document.querySelectorAll('input[type="button"][value="Book"]')[i].addEventListener('click',
            function () {

                // console.log(this.parentNode.firstElementChild.innerHTML)
                // console.log(this.parentNode.firstElementChild.nextElementSibling.innerHTML)
                const data = {

                    departure: this.parentNode.firstElementChild.innerHTML,
                    arrival: this.parentNode.firstElementChild.nextElementSibling.innerHTML,
                    date: this.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerHTML,
                    price: this.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML,

                }

                fetch(`http://localhost:3000/add-to-cart/${this.id}`, {

                    method: 'POST',

                    headers: { 'Content-Type': 'application/json' },

                    body: JSON.stringify(data)

                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.result == true) {
                            window.open('/front/cart.html', '_self');
                        }

                        console.log(data);
                    });




            }
        );
        //prendre les infos du context
        //faire un post des éléments
        // afficher la page panier
    }
}


