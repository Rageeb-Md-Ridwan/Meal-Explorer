const loadData = () => {
  const input_value = document.getElementById("search-input").value;

  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${
      input_value ? input_value : global
    }`
  )
    .then((res) => res.json())
    .then((data) => displayData(data.meals));
};
const displayData = (data) => {
  document.getElementById("total-meals").innerText = data.length;
  const meals_container = document.getElementById("meals-container");
  data.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("box");
    card.innerHTML = `
        <img class="box-img" src="${element.strMealThumb}" alt="">
        <br>
        <h2>${element.strMeal}</h2>
        <br>
        <button class="btn" onclick="my_modal_3.showModal();displayModal(${element.idMeal});">Details</button>

    `;
    meals_container.appendChild(card);
  });
};
const displayModal = async (id) => {
  try {
    const details_meal = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const details_meal_parsed = await details_meal.json();
    const meal_arr = details_meal_parsed.meals[0];
    const modal_desc = document.getElementById("modal-desc");
    const description = document.createElement("div");
    description.innerHTML = `
        <p>Country of Origin: ${meal_arr.strArea}</p>
        <p>Category: ${meal_arr.strCategory}</p>
    
    
    `;
    modal_desc.appendChild(description);
  } catch {
    (err) => console.log(err);
  }
};
