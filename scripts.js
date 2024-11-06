//action lors du bouton search
document.querySelector('input[type="button"][value="Search"]').addEventListener('click',
    function() {
        console.log('clic');
        console.log(document.querySelector('#departure').value);
        console.log(document.querySelector('#arrival').value);
        console.log(document.querySelector('#date').value);
        //ecoute des champs & // vérification que tous les champs soit remplis

        if ( document.querySelector('#departure').value && document.querySelector('#arrival').value && document.querySelector('#date').value){
            console.log('champs pleins')
            //envoie de la requette-----------------------------------------------

            //recetion et affichage des résutats----------------------------------
            // pas de trajet trouvé
            
            document.querySelector('#tripResult').innerHTML = `
             <div class="resultLine">
                    <div id="depRes">Paris</div>
                    <div id="arrRes">Lyon</div>
                    <div id="dateRes">16h</div>
                    <div id="priceRes">120€</div>
                    <input type="button" value="Book">
                </div>
                <div class="resultLine">
                    <div id="depRes">Paris</div>
                    <div id="arrRes">Lyon</div>
                    <div id="dateRes">16h</div>
                    <div id="priceRes">120€</div>
                    <input type="button" value="Book">
                </div>
                <div class="resultLine">
                    <div id="depRes">Paris</div>
                    <div id="arrRes">Lyon</div>
                    <div id="dateRes">16h</div>
                    <div id="priceRes">120€</div>
                    <input type="button" value="Book">
                </div>
            `


        }else{
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



