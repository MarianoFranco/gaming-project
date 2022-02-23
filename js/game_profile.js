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
        const response = await fetch('https://lvl-up-games.herokuapp.com/api/products/' + gamesId);
		
        const jsonResults = await response.json();
	
		

		const productAttributes = jsonResults.data.attributes;
		console.log(productAttributes);
		
		//Profile section 	

        profile.innerHTML +=  `
            <div class="profile__img">
		  		<img src="${productAttributes.image_url}" class="profile__img--game" />		  		
		 	</div>        
		 	<div class="profile__info">
		   		<h2>${productAttributes.name}</h2>
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
			 		<p>GENDER:${productAttributes.gender}</p>
			 		<p class="stock"> </p>
			 		<p>RELEASE DATE: 04/09/2020</p>
			 		<p>PLATFORM:   <i class="fab fa-windows"></i></p>
		   		</div>
		   		<hr>
		  		<div class="profile__info--bottom">
			 		<span>${productAttributes.price_after_discount}</span>
			 		<a href="checkout.html">BUY NOW</a>
				</div>
		 	</div>

        `; 

		if(productAttributes.in_stock){

			document.querySelector('.stock').innerHTML +=`
				AVAILAVILITY: <i class="far fa-check-circle"></i> In stock
				`;
			
			
		}else {

			document.querySelector('.stock').innerHTML +=`
			AVAILAVILITY: <i class="far fa-times-circle"></i> Out of stock
			`;
		}

		//Description section

		description.innerHTML += `
			<h3>DESCRIPTION</h3>
			${productAttributes.description}

		`;

				
		photos.innerHTML += `
			<h3>PHOTOS</h3>
		 	<hr>
		 	<div class="photos__wrapp">
		   		<div class="photos__wrapp--main">
					<img src="${productAttributes.image1}" class="main-img active"/>
		   		</div>
		   		<div class="photos__wrapp--secondary">
			 		<img src="${productAttributes.image2}" class="mini-img" />
			 		<img src="${productAttributes.image3}" class="mini-img" />
			 		<img src="${productAttributes.image4}" class="mini-img" />
			 		<img src="${productAttributes.image5}" class="mini-img" />
		   		</div>
		 	</div>
		 
		`;
		
		const miniImgs = document.querySelector('.photos__wrapp--secondary');
		const mainImg = document.querySelector('.main-img');

		miniImgs.onclick = function(e){
			console.log (e.target);
			let targetImg = e.target.getAttribute("src");
			console.log (targetImg);
			mainImg.src = targetImg;
			
		}
		
		//Requirements section

		requirements.innerHTML += `
			
			${productAttributes.requirements}
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