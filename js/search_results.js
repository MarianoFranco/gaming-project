const main = document.querySelector('main');
const gamesWrapper = document.querySelector('.games-wrapper');
const gamesCards = document.querySelector('.games-wrapper__cover');

async function getGamesCards(){
	try{    
		const response = await fetch('https://lvlupgames.argenteam.tech/wp-json/wc/store/products');
		const jsonResults = await response.json();
		console.log(jsonResults);    
		
		for (let i = 0; i<jsonResults.length; i++){

			let imagenes = jsonResults[i].images;
			let getCoverImg = '';

			for (let j = 0; j < imagenes.length; j++) {
				if(j===0){
					getCoverImg = imagenes[j].src
					console.log(getCoverImg)
				}			
			}		
			
			gamesWrapper.innerHTML += `
				<div class="games-wrapper__cover">
					<a href="game_profile.html?id=${jsonResults[i].id}" class="games-wrapper__cover--a">
						<img src=${getCoverImg} alt="game-image" class="games-wrapper__cover--img">
						<h3 class="games-wrapper__cover--title">${jsonResults[i].name}</h3>
					</a>					
					<p class="games-wrapper__cover--price">${jsonResults[i].prices.price}${jsonResults[i].prices.currency_symbol}</p>
					<p class="games-wrapper__cover--oldprice">${jsonResults[i].prices.regular_price}${jsonResults[i].prices.currency_symbol}</p>
				</div>
			`;

		}

	} catch(error){
		document.querySelector('.alert').innerHTML = showAlertTouser(
			'An error occured. We are working to fix it as soon as possible',
			'danger'
		);

	}finally{

	}
}
getGamesCards();