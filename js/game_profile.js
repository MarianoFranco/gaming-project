const queryString = document.location.search;
console.log(queryString);

const params = new URLSearchParams(queryString);
console.log(params);

const id = params.get('id');
console.log(id);

async function getId(gamesId){
    try{
        const response = await fetch('https://lvlupgames.argenteam.tech/wp-json/wc/store/products/' + gamesId);
        const jsonResults = await response.json();
		console.log(jsonResults);
    }catch{

    }finally{

    }
}

getId(id);