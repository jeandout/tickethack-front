

window.addEventListener("load", function(){
    console.log("chargé");
    
fetch('http://localhost:3000/check-booked/')
                .then(response => response.json())
                .then(data => {
                    // si pas de trajet trouvé
                    if (data.result === false) {
                        console.log("data.result=false");
                        
                    } else {
                                    console.log(data);
                                    //recetion et affichage des résutats----------------------------------
                                    document.querySelector('.infoCard').innerHTML = "<p>My cart</p>" 
                        for (let i = 0; i < data.cart.length; i++) {
                            const date = new Date(data.cart[i].date);
                            document.querySelector('.infoCard').innerHTML += `
                           
                <div class="resultLine">
                    <div id="depRes">${data.cart[i].departure}</div>
                    <div id="arrRes">${data.cart[i].arrival}</div>
                    <div id="dateRes">${(date.getHours() < 10 ? '0' : '') + date.getHours() }:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}</div>
                    <div id="priceRes">${data.cart[i].price} €</div>
                    <input type="button" value=" X " id='${data.cart[i]._id}'}>
                </div>`
             
                        }
                        //bookAction();
                        
                        document.querySelector('.infoCard').innerHTML += `
                        <div id='bluebar'>
                        <div><p>Total: </p>
                        </div>
                        <input type = 'button' value="purchase">
                        </div>
                        `
                    }
                }
            )

        });
