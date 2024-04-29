let width = $("#layer").innerWidth();




// $(document).ready(function () {
//   $("#spinner").fadeOut(500)
// })

$("#layer").animate({ left: -width }, 500);
$(".side_nav").animate({ left: "0px" }, 500);

$("#open").on("click", function () {
  $("#layer").animate({ left: "0px" }, 500);
  $(".side_nav").animate({ left: "250px" }, 500);
  $("#open").removeClass("d-block").addClass("d-none");
  $("#close").addClass("d-block").removeClass("d-none");
});

$("#close").on("click", function () {
  $("#layer").animate({ left: -width }, 500);
  $(".side_nav").animate({ left: "0px" }, 500);
  $("#open").addClass("d-block").removeClass("d-none");
  $("#close").removeClass("d-block").addClass("d-none");
});

getAllCategories();

async function getAllCategories() {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let res = await data.json();
  final = res.categories;
  // console.log(final);
  displayCategories(final);
}

function displayCategories(categories) {

  let cartona = ``;
  for (let i = 0; i < categories.length; i++) {
    cartona += ` <div class="col-md-3 dataMeal">
        <div class="items position-relative ">
        <img src="${
          categories[i].strCategoryThumb
        }" alt="" class="w-100 "  data-meal="${categories[i].strCategory}">
        <div class="item-layer position-absolute d-flex justify-content-center align-items-center flex-column">
            <h2>${categories[i].strCategory}</h2>
            <p>${categories[i].strCategoryDescription
              .split(" ")
              .slice(0, 15)
              .join(" ")}</p>
        </div>
        </div>
        
        </div>
    `;
  }

  document.getElementById("myRow").innerHTML = cartona;
  let dataMeal = document.querySelectorAll(".dataMeal");
  // console.log(dataMeal);

  for (let i = 0; i < dataMeal.length; i++) {
    dataMeal[i].addEventListener("click", async function (e) {
      // console.log(e.target);
      let category = this.querySelector("img").getAttribute("data-meal");
      await getAllCategoryMeals(category);
    });
  }
}

document.querySelector(".Categories").addEventListener("click", function (e) {
  e.preventDefault();
  getAllCategories();
});

async function getAllAreas() {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let res = await data.json();
  let final = res.meals;
  // console.log(final);
  displayAreas(final);
}

function displayAreas(areas) {
  let cartona = ``;
  for (let i = 0; i < areas.length; i++) {
    cartona += ` <div class="col-md-3 text-center text-white dataMeal">
    <i class="fa-solid fa-house-laptop fa-4x" ></i>
    <h3> ${areas[i].strArea}</h3>
    
  </div>
    `;
  }
  document.getElementById("myRow").innerHTML = cartona;

  let dataMeal = document.querySelectorAll(".dataMeal");

  for (let i = 0; i < dataMeal.length; i++) {
    dataMeal[i].addEventListener("click", async function (e) {
      let areadata = areas[i].strArea;
      console.log(areadata);

      await getAllAreasMeals(areadata);
    });
  }
}

document.querySelector(".Area").addEventListener("click", function (e) {
  e.preventDefault();
  getAllAreas();
});
async function getAllIngredients() {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let res = await data.json();
  let Ingredient = res.meals;
  // console.log(Ingredient);
  displayIngredients(res.meals.slice(0, 25));
}

function displayIngredients(Ingredient) {
  let cartona = ``;
  for (let i = 0; i < Ingredient.length; i++) {
    cartona += ` <div class="col-md-3 text-center text-white dataMeal">
    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
    <h3>${Ingredient[i].strIngredient}</h3>
    <p>${Ingredient[i].strDescription.split(" ").slice(0, 15).join(" ")}</p>
  </div>
    `;
  }
  document.getElementById("myRow").innerHTML = cartona;

  let dataMeal = document.querySelectorAll(".dataMeal");

  for (let i = 0; i < dataMeal.length; i++) {
    dataMeal[i].addEventListener("click", async function (e) {
      let areadata = Ingredient[i].strIngredient;
      // console.log(areadata);

      await getAllIngredientsMeals(areadata);
    });
  }
}

document.querySelector(".Ingredients").addEventListener("click", function (e) {
  e.preventDefault();
  getAllIngredients();
});

async function getAllCategoryMeals(categories) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`
  );
  let res = await data.json();
  let final = res.meals;
  // console.log(final);

  displayCategoryMeals(final);
}

function displayCategoryMeals(meals) {
  let cartona = ``;
  for (let i = 0; i < meals.length; i++) {
    cartona += ` <div class="col-md-3 dataMeal">
    <div class="items position-relative ">
    <img src="${meals[i].strMealThumb}"  alt="" class="w-100  dataMeal">
    <div class="item-layer position-absolute d-flex justify-content-center align-items-center flex-column">
        <h2>${meals[i].strMeal}</h2>
    </div>
    </div>
    </div>
`;
  }
  document.getElementById("myRow").innerHTML = cartona;
  let dataMeal = document.querySelectorAll(".dataMeal");

  for (let i = 0; i < dataMeal.length; i++) {
    dataMeal[i].addEventListener("click", async function (e) {
      let areadata = meals[i].idMeal;
      // console.log(meals[i].strMealThumb);

      await getMealDetails(areadata);
    });
  }
}

async function getAllAreasMeals(area) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let res = await data.json();
  let areas = res.meals;
  // console.log(areas);
  displayAreasMeals(areas);
}

function displayAreasMeals(meals) {
  let cartona = ``;
  for (let i = 0; i < meals.length; i++) {
    cartona += `
        <div class="col-md-3 dataMeal ">
          <div class="items position-relative">
            <img src="${meals[i].strMealThumb}" alt="" class="w-100" >
            <div class="item-layer position-absolute d-flex justify-content-center align-items-center">
              <h2 >${meals[i].strMeal}</h2>
            </div>
          </div>
        </div>
      `;
  }
  document.getElementById("myRow").innerHTML = cartona;
  let dataMeal = document.querySelectorAll(".dataMeal");

  for (let i = 0; i < dataMeal.length; i++) {
    dataMeal[i].addEventListener("click", async function (e) {
      let areadata = meals[i].idMeal;
      console.log(meals[i].strMealThumb);

      await getMealDetails(areadata);
    });
  }
}

async function getAllIngredientsMeals(Ingredientsea) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredientsea}`
  );
  let res = await data.json();
  let final = res.meals;
  // console.log(final);
  displayingredientsMeals(final);
}

function displayingredientsMeals(meals) {
  let cartona = ``;
  for (let i = 0; i < meals.length; i++) {
    cartona += `
        <div class="col-md-3 dataMeal " data-meal = ${meals[i].idMeal}>
          <div class="items position-relative">
            <img src="${meals[i].strMealThumb}" alt="" class="w-100" >
            <div class="item-layer position-absolute d-flex justify-content-center align-items-center">
              <h2 >${meals[i].strMeal}</h2>
            </div>
          </div>
        </div>
      `;
  }
  document.getElementById("myRow").innerHTML = cartona;

  let dataMeal = document.querySelectorAll(".dataMeal");

  for (let i = 0; i < dataMeal.length; i++) {
    dataMeal[i].addEventListener("click", async function (e) {
      let areadata = meals[i].idMeal;
      console.log(areadata);

      await getMealDetails(areadata);
    });
  }
}

async function getMealDetails(meal) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`
  );
  let res = await data.json();
  let final = res.meals;
  // console.log(final);
  displayMealDetails(final);
}

function displayMealDetails(meal) {
  let cartona = ``;
  for (let i = 0; i < meal.length; i++) {
    cartona += `
  <div class="col-md-4 text-white">
  <img class="w-100 rounded-3" src="${meal[i].strMealThumb}"
      alt="">
      <h2>${meal[i].strMeal}</h2>
</div>
<div class="col-md-8 text-white">
  <h2>Instructions</h2>
  <p>${meal[i].strInstructions}</p>
  <h3><span class="fw-bolder">Area : </span>${meal[i].strArea}</h3>
  <h3><span class="fw-bolder">Category : </span>${meal[i].strCategory}</h3>
  <h3>Recipes :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap Recipes">
  <li>${meal[i].strIngredient1}</li>
  <li>${meal[i].strIngredient2}</li>
  <li>${meal[i].strIngredient3}</li>
  <li>${meal[i].strIngredient4}</li>
  <li>${meal[i].strIngredient5}</li>
  </ul>

  <h3>Tags :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap tags"> <li>${meal[i].strTags}</li>
  </ul>

  <a target="_blank" href="${meal[i].strSource}" class="btn btn-success">Source</a>
  <a target="_blank" href="${meal[i].strYoutube}" class="btn btn-danger">Youtube</a>
</div>`;
  }
  document.getElementById("myRow").innerHTML = cartona;
}

function displaySearchInputs() {
  let cartona = `
    <div class="col-md-6">
      <input oninput="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
      <input oninput="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>
  `;
  document.getElementById("myRow").innerHTML = cartona;
}

document.querySelector(".Search").addEventListener("click", function (e) {
  e.preventDefault();
  displaySearchInputs();
});

async function searchByName(term) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  let data = await response.json();
  // console.log(data);
  displayMeals(data.meals);
}

async function searchByFLetter(term) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  let data = await response.json();
  displayMeals(data.meals);
}

function displayMeals(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
    <div class="col-md-3 dataMeal">
    <div class="items position-relative ">
    <img src="${arr[i].strMealThumb}"  alt="" class="w-100  dataMeal">
    <div class="item-layer position-absolute d-flex justify-content-center align-items-center flex-column">
        <h2>${arr[i].strMeal}</h2>
    </div>
    </div>
    </div>
    `;
  }
  document.getElementById("Search").innerHTML = cartoona;
}

function showContacts() {
  let carton = ``;
  carton = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `;

  document.getElementById("myRow").innerHTML = carton;
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

document.querySelector(".Contact").addEventListener("click", function (e) {
  e.preventDefault();
  showContacts();
});

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
}
