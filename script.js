const categorySelect = document.getElementById("category");
const recipesDiv = document.getElementById("recipes");

// Load all categories dynamically
async function loadCategories(){
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
  const data = await res.json();

  data.meals.forEach(m=>{
    const opt = document.createElement("option");
    opt.value = m.strCategory;
    opt.innerText = m.strCategory;
    categorySelect.appendChild(opt);
  });
}
loadCategories();

// When category selected
async function loadCategory(){
  const cat = categorySelect.value;
  if(!cat) return;

  recipesDiv.innerHTML = "<h3>Loading category... 🍽️</h3>";

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
  const data = await res.json();

  renderMeals(data.meals.slice(0,25));
}

// Keyword search
async function findRecipes(){

  const keyword = document.getElementById("ingredients").value.trim();
  if(!keyword){
    recipesDiv.innerHTML = "<h3>Please enter a dish name 😇</h3>";
    return;
  }

  recipesDiv.innerHTML = "<h3>Searching recipes... 🔍</h3>";

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
  const data = await res.json();

  if(!data.meals){
    recipesDiv.innerHTML = "<h2>No recipes found 😔</h2>";
    return;
  }

  renderMeals(data.meals.slice(0,25));
}

// Render cards
function renderMeals(meals){

  recipesDiv.innerHTML = meals.map(m => {

    let yt = m.strYoutube && m.strYoutube.startsWith("http")
      ? m.strYoutube
      : `https://www.youtube.com/results?search_query=${encodeURIComponent(m.strMeal + " recipe")}`;

    return `
      <div class="card">
        <a href="${yt}" target="_blank" class="yt-link">
          <img src="${m.strMealThumb}">
          <h3>${m.strMeal}</h3>
          <p>▶ Watch Recipe</p>
        </a>
      </div>
    `;
  }).join("");
}



function openVideo(url){
  window.open(url, "_blank");
}
