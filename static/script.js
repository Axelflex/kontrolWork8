const input = document.getElementsByClassName('input')[0];
const btn = document.getElementsByClassName('button')[0];
const drinksContainer = document.getElementsByClassName('drinks')[0];

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";






const renderPosts = (posts, users) => {
      postContainer.innerHTML = '';
      posts.forEach(async (post) => {
        const comments = await _getAllComments(post.id);
        postContainer.insertAdjacentHTML('beforeend', postTemplateString + modalTemplateString);
      });
};
   
async function renderDrinks() {
  const drinks = await _getDrinks();
  templateDrinks(drinks)
}

const drinkInfoTemplate = (drink) => {
  let template = ``
  for (let i = 1; i < 15; i++){
    let str = "strIngredient" + i
    let measure = "strMeasure" + i
    if (drink[str] != null) {
      template = template + `<p>${drink[str] + "  " + drink[measure]}</p><img src="https://www.thecocktaildb.com/images/ingredients/${drink[str]}-Small.png">`
    }
  }
  return template
}
const templateDrinks = (drinks) => {
  drinksContainer.innerHTML = '';
  drinks.forEach((drink) => {
    const template = `
      <div class = "card me-3 mb-3" style = "width: 18rem;">
        <a data-bs-toggle = "modal" data-bs-target = "#exampleModal" >
          <img src = "${drink.strDrinkThumb}"class = "img card-img-top" alt = "${drink.strDrink}">
        </a>
        <div class="card-body">
          <p class="card-text">${drink.strDrink}</p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#drinkModal${drink.idDrink}">get info</button>
        </div>
      </div>
      `;
      const modalTemplate = `
      <div class = "modal" id = "drinkModal${drink.idDrink}" tabindex = "-1">
      <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title">Cocktail info</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h6>Ingredients:</h6>
        ${drinkInfoTemplate(drink)}
        <h6>Instructions:</h6>
        <p>${drink.strInstructions}</p>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
      </div>
      </div>
      </div>
      `;
    drinksContainer.insertAdjacentHTML('beforeend', template + modalTemplate);
  })
}

async function _getDrinks() {
  if (input.value != '') {
    let url = BASE_URL + input.value;
    console.log(url)
    if (url) {
      url = `www.thecocktaildb.com/api/json/v1/1/search.php?i=${input.value}`;
    } else {
      url = BASE_URL + input.value;
    }
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    console.log(response.data.drinks)
    return response.data.drinks;
  } else {
    alert('nothing written')
  }
  
}
window.addEventListener('DOMContentLoaded',async () => {
  const drinks = await _getDrinks();
  
})
btn.addEventListener('click', renderDrinks)
