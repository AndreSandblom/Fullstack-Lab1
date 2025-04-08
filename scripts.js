document.addEventListener("DOMContentLoaded", () => {
    fetchDishes();
});

async function fetchDishes() {
    try {
        const response = await fetch("/api/dishes");

        if (!response.ok) {
            throw new Error("Couldnt fetch dishes");
        }

        const dishes = await response.json();
        showDishes(dishes);
    } catch (error) {
        console.error("Error fetching dishes: ", error);
    }
}

function showDishes(dishes) {
    console.log("Dishes:,",dishes);
    const tableBody = document.getElementById("dishBody");
    tableBody.innerHTML = "";

    dishes.forEach(dish => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${dish.name}</td>
        <td>${dish.ingredients.join(", ")}</td>
        <td>${dish.preparationSteps}</td>
        <td>${dish.cookingTime}</td>
        <td>${dish.origin}</td>
        <td>${dish.difficulty}</td>
        <td>
            <button onclick="updateDish(
            '${dish._id}',
            '${dish.name}',
            '${dish.ingredients.join(", ")}',
            '${dish.preparationSteps}',
            '${dish.cookingTime}',
            '${dish.origin}',
            '${dish.difficulty}'
        )">Update</button>
            <button onclick="deleteDish('${dish._id}')">Delete</button>
        </td>
        `;
        tableBody.appendChild(row);
    });
}

async function deleteDish(dishId){
    const confirmation = confirm("Delete dish?");
    if (!confirmation) return;

    try {
        const response = await fetch(`/api/dishes/${dishId}`, {
            method: "DELETE", 
        });

        if (response.ok) {
            console.log("Dish deleted")
            fetchDishes();
        } else {
            console.error("Couldnt delete dish")
        }
    } catch (error) {
        console.error("Error deleting dish: ", error);
    }
}

async function updateDish(dishId, name, ingredients, steps, time, origin, difficulty){
    const confirmation = confirm("Update dish recipe?")
    if (!confirmation) return;
    const updateName = prompt("Update Name:", name)
    const updateIngredient = prompt("Update Ingredients: ", ingredients)
    const updateSteps = prompt("UpdateP Preparation Steps:", steps)
    const updateTime = prompt("Updte Cooking Time: ", time)
    const updateOrigin = prompt("Update Origin: ", origin)
    const updateDifficulty = prompt("Updaate Diffuculty: ", difficulty)

    const updatedDish = {
        name: updateName,
        ingredients: updateIngredient.split(", "),
        preparationSteps: updateSteps,
        cookingTime: updateTime,
        origin: updateOrigin,
        difficulty: updateDifficulty
    };

    try {
        const response = await fetch(`/api/dishes/${dishId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedDish)
        });
        if (!response.ok) throw new Error("Couldnt Update Dish");

        fetchDishes();
    } catch (error) {
        console.error("Update Error: ", error);
    }
}

document.getElementById("addDish").addEventListener("submit",async function (e) {
  e.preventDefault();
  
  const newDish = {
    name: document.getElementById("addName").value,
    ingredients: document.getElementById("addIngredients").value.split(","),
    preparationSteps: document.getElementById("addPreparationSteps").value,
    cookingTime: document.getElementById("addCookingTime").value,
    origin: document.getElementById("addOrigin").value, 
    difficulty: document.getElementById("addDifficulty").value
  };

  try {
    const response = await fetch("/api/dishes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDish),
    });
    if (!response.ok) throw new Error("Couldnt Add dish:")
    
    document.getElementById("addDish").reset();
    fetchDishes();
  } catch(error) {
    console.error("Error adding dish:", error);
  }
});