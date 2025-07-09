document.addEventListener("DOMContentLoaded", () => {
    const categoryBtn = document.getElementById("categoryBtn");
    const categoryContainer = document.getElementById("categoryContainer");
    const breedContainer = document.getElementById("breedContainer");
    const petContainer = document.getElementById("petContainer");

    let petData = [];

    // Fetch JSON Data from pets.json
    fetch("pets.json")
        .then(response => response.json())
        .then(data => {
            petData = data;
        })
        .catch(error => console.error("Error loading pet data:", error));

    // Show Categories
    categoryBtn.addEventListener("click", () => {
        categoryContainer.innerHTML = "";
        breedContainer.innerHTML = "";
        petContainer.innerHTML = "";
        
        const categories = ["Dog", "Cat", "Parrot", "Rabbit", "Buffalo", "Cow"]; // Ensure all six categories are present
        
        categories.forEach(category => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `<img src="assets/${category.toLowerCase()}.png" alt="${category}"><br>${category}`;
            div.addEventListener("click", () => showBreeds(category));
            categoryContainer.appendChild(div);
        });

        categoryContainer.classList.remove("hidden");
    });

    // Show Breeds Based on Category
    function showBreeds(category) {
        breedContainer.innerHTML = `<h3>Breeds of ${category}</h3>`;
        petContainer.innerHTML = "";
        
        const breeds = [...new Set(petData.filter(pet => pet.pet_type === category).map(pet => pet.breed))];

        breeds.forEach(breed => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `<img src="assets/images/${breed.toLowerCase().replace(/\s/g, '')}.jpg" alt="${breed}"><br>${breed}`;
            div.addEventListener("click", () => showPets(breed));
            breedContainer.appendChild(div);
        });

        breedContainer.classList.remove("hidden");
    }

    // Show Pets Based on Breed
    function showPets(breed) {
        petContainer.innerHTML = "<h3>Available Pets</h3>";
        const pets = petData.filter(pet => pet.breed.toLowerCase() === breed.toLowerCase());

        pets.forEach(pet => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `
                <img src="uploads/${pet.photo}" alt="${pet.breed}">
                <p><strong>Breed:</strong> ${pet.breed}</p>
                <p><strong>Email:</strong> <a href="mailto:${pet.email}">${pet.email}</a></p>
                <p><strong>Contact:</strong> ${pet.owner_mobile}</p>
                <p><strong>Location:</strong> ${pet.district}, ${pet.state} - ${pet.pin_code}</p>
                <p><strong>Pet Type:</strong> ${pet.pet_type}</p>
                <p><strong>Age:</strong> ${pet.age} years old</p>
                <p><strong>Price:</strong> ₹${pet.price}</p>
                <p><strong>Description:</strong> ${pet.description}</p>
                <p><strong>Vaccination Docs:</strong> 
                    ${pet.vaccination_docs ? `<a href="uploads/${pet.vaccination_docs}" target="_blank">View</a>` : "Not Available"}
                </p>
                <p><strong>Additional Docs:</strong> 
                    ${pet.additional_docs ? `<a href="uploads/${pet.additional_docs}" target="_blank">View</a>` : "Not Available"}
                </p>
            `;
            petContainer.appendChild(div);
        });

        petContainer.classList.remove("hidden");
    }
});
