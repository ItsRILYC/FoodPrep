document.addEventListener('DOMContentLoaded', () => {
  // Registreer de service worker voor offline ondersteuning
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker geregistreerd'))
      .catch(err => console.error('Service Worker registratie mislukt:', err));
  }

  const ingredientInput = document.getElementById('ingredient');
  const addIngredientBtn = document.getElementById('add-ingredient');
  const ingredientList = document.getElementById('ingredient-list');
  let ingredients = [];

  addIngredientBtn.addEventListener('click', () => {
    const ingredient = ingredientInput.value.trim().toLowerCase();
    if (ingredient && !ingredients.includes(ingredient)) {
      ingredients.push(ingredient);
      updateIngredientList();
      ingredientInput.value = '';
      generateRecipeCombination();
    }
  });

  function updateIngredientList() {
    ingredientList.innerHTML = '';
    ingredients.forEach((ing, index) => {
      const li = document.createElement('li');
      li.textContent = ing;
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Verwijder';
      removeBtn.addEventListener('click', () => {
        ingredients.splice(index, 1);
        updateIngredientList();
        generateRecipeCombination();
      });
      li.appendChild(removeBtn);
      ingredientList.appendChild(li);
    });
  }

  // Voorbeeld recepten database
  const recipeDB = [
    {
      id: 1,
      name: "Kip met Paprika",
      ingredients: ["kip", "paprika", "ui"],
      photo: "assets/kip-paprika.jpg"
    },
    {
      id: 2,
      name: "Vegetarische Roerbak",
      ingredients: ["paprika", "ui", "champignons"],
      photo: "assets/vegetarische-roerbak.jpg"
    }
    // Voeg hier extra recepten toe
  ];

  // Functie om recepten weer te geven in de UI
  function renderRecipes() {
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = '';
    recipeDB.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';
      card.innerHTML = `
        <img src="${recipe.photo}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
        <p>Ingrediënten: ${recipe.ingredients.join(', ')}</p>
      `;
      recipeContainer.appendChild(card);
    });
  }

  // Functie om receptcombinaties te genereren zodat alle ingevoerde ingrediënten gebruikt worden
  function generateRecipeCombination() {
    const combinationContainer = document.getElementById('combination-container');
    combinationContainer.innerHTML = '';

    // Voorbeeldlogica: toon recepten die ALLE ingevoerde ingrediënten bevatten
    const matchingRecipes = recipeDB.filter(recipe => {
      return ingredients.every(ing => recipe.ingredients.includes(ing));
    });

    if (matchingRecipes.length === 0) {
      combinationContainer.innerHTML = '<p>Geen combinaties gevonden die alle ingrediënten gebruiken.</p>';
    } else {
      matchingRecipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
          <img src="${recipe.photo}" alt="${recipe.name}">
          <h3>${recipe.name}</h3>
          <p>Ingrediënten: ${recipe.ingredients.join(', ')}</p>
        `;
        combinationContainer.appendChild(card);
      });
    }
  }

  renderRecipes();
});
