const queryString = document.location.search;
console.log(queryString);

const params = new URLSearchParams(queryString);
console.log(params);

const id = params.get('id');
console.log(id);

const main = document.querySelector('main');
const profile = document.querySelector('.profile');
const description = document.querySelector('.description');
const photos = document.querySelector('.photos');
const requirements = document.querySelector('.requirements');

async function getId(gamesId){
    try{
        const response = await fetch('https://lvlupgames.argenteam.tech/wp-json/wc/store/products/' + gamesId);
        const jsonResults = await response.json();
		console.log(jsonResults);

		//Profile section 

		const getImgArray = jsonResults.images;
		let getImgProfile = '';

		for(i= 0; i < getImgArray.length; i++){
			if(i === 0){
				console.log(getImgArray[i]);
				getImgProfile = getImgArray[i].src;
			}			
		}

		const getCategoriesArray = jsonResults.categories;
		let getCategory = '';

		for(i= 0; i < getCategoriesArray.length; i++){
			if(i === 0){
				console.log(getCategoriesArray[i]);
				getCategory = getCategoriesArray[i].name;
			}			
		}

		

		

        profile.innerHTML +=  `
            <div class="profile__img">
		  		<img src="${getImgProfile}" class="profile__img--game" />		  		
		 	</div>        
		 	<div class="profile__info">
		   		<h2>${jsonResults.name}</h2>
		   		<hr>
		   		<div class="profile__info--classification">
			 		<p>CLASIFICATION:</p>
			 		<div class="stars">
			 		 	<i class="fas fa-star"></i>
			 		 	<i class="fas fa-star"></i>
			 		 	<i class="fas fa-star"></i>
			 		 	<i class="fas fa-star"></i>
			 		 	<i class="fas fa-star"></i>
			 		</div>             
		   		</div>
		   		<hr>
		   		<div class="profile__info--type">
			 		<p>GENDER: ${getCategory}</p>
			 		<p class="stock"> </p>
			 		<p>RELEASE DATE: 04/09/2020</p>
			 		<p>PLATFORM:   <i class="fab fa-windows"></i></p>
		   		</div>
		   		<hr>
		  		<div class="profile__info--bottom">
			 		<span>${jsonResults.prices.price}${jsonResults.prices.currency_symbol}</span>
			 		<a href="checkout.html">BUY NOW</a>
				</div>
		 	</div>

        `; 

		if(jsonResults.is_in_stock){

			document.querySelector('.stock').innerHTML +=`
			AVAILAVILITY: <i class="far fa-check-circle"></i>
			`;
			
		}else{

			document.querySelector('.stock').innerHTML +=`
			AVAILAVILITY: <i class="far fa-times-circle"></i>
			`;
		}

		//Description section

		description.innerHTML += `
			<h3>DESCRIPTION</h3>
			${jsonResults.description}

		`;

				
		photos.innerHTML += `
			<h3>PHOTOS</h3>
		 	<hr>
		 	<div class="photos__wrapp">
		   		<div class="photos__wrapp--main">
					<img src="${getImgArray[1].src}" class="main-img"/>
		   		</div>
		   		<div class="photos__wrapp--secondary">
			 		<img src="${getImgArray[1].src}" class="mini-img" />
			 		<img src="${getImgArray[2].src}" class="mini-img" />
			 		<img src="${getImgArray[3].src}" class="mini-img" />
			 		<img src="${getImgArray[4].src}" class="mini-img" />
		   		</div>
		 	</div>
		 
		`;

		//Requirements section

		requirements.innerHTML += `
			
			${jsonResults.short_description}
		`; 

		
        
    }catch(error){
		document.querySelector('.alert').innerHTML = showAlertTouser(
			'An error occured. We are working to fix it as soon as possible',
			'danger'
		);

    }finally{

    }
}

getId(id);