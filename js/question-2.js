const url = "https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-rating&key=c729d198c1e34b18bda6cbed364f92bc";
//changed the API endpoint as there was porn in one of the earlier results
const gamesContainer = document.querySelector("#games-container");


async function getGames(){
    try{
        const response = await fetch(url);
        const results = await response.json();
        gamesContainer.innerHTML = "";
        for(let i=0; i<8; i++){ 
            let html = 
            `<div style = "background: url(${results.results[i].background_image}) no-repeat center center; background-size: cover" class="game">
            <div class="layered">
            <h3>${results.results[i].name}</h3>
            <p>Rated ${results.results[i].rating} out of 5</p>`
            //I did this because some of the tag lists only contain 1 tag, and I feel this looks better
            if(results.results[i].tags.length +1 === 1){
                html += `<p>${results.results[i].tags.length +1} tag</p>`
             } else {
                html += `<p>${results.results[i].tags.length +1} tags</p>`
                }
            html +=
            `</div>
            </div>`
            gamesContainer.innerHTML += html;
        }
    }
    catch(error){
        gamesContainer.innerHTML = `<h2 class="error">Error: ${error.message}</h2>`
    }
}

getGames();