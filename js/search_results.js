const main = document.querySelector('main');
const gamesWrapper = document.querySelector('.games-wrapper');
const gamesCards = document.querySelector('.games-wrapper__cover');

async function getGamesCards(){
	try{    
		const response = await fetch('https://lvl-up-games.herokuapp.com/api/products');
	
		const jsonResults = await response.json();
		console.log(jsonResults.data);    
		
		const productsData = jsonResults.data;
		for (let i = 0; i<productsData.length; i++){

			let productAtributes = productsData[i].attributes;
			
			gamesWrapper.innerHTML += `
				<div class="games-wrapper__cover">
					<a href="game_profile.html?id=${productsData[i].id}" class="games-wrapper__cover--a">
						<img src=${productAtributes.image_url} alt="game-image" class="games-wrapper__cover--img">
						<h3 class="games-wrapper__cover--title">${productAtributes.name}</h3>
					</a>					
					<p class="games-wrapper__cover--price">${productAtributes.price_after_discount} €</p>
					<p class="games-wrapper__cover--oldprice">${productAtributes.price_before_discount} €</p>
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