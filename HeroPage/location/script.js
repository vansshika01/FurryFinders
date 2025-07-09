const petShops = [
    { name: "Happy Paws", address: "123 Main St, Mumbai", city: "Mumbai", latitude: 19.076, longitude: 72.8777 },
    { name: "Pet World", address: "45 MG Road, Mumbai", city: "Mumbai", latitude: 19.085, longitude: 72.879 },
    { name: "Furry Friends", address: "78 Park Avenue, Delhi", city: "Delhi", latitude: 28.7041, longitude: 77.1025 },
    { name: "Paws & Claws", address: "56 Central Road, Delhi", city: "Delhi", latitude: 28.7100, longitude: 77.1100 },
    { name: "Pet Paradise", address: "89 Nehru Street, Bangalore", city: "Bangalore", latitude: 12.9716, longitude: 77.5946 },
    { name: "Animal Kingdom", address: "23 Park Avenue, Chennai", city: "Chennai", latitude: 13.0827, longitude: 80.2707 },
    { name: "Tail Waggers", address: "67 MG Road, Hyderabad", city: "Hyderabad", latitude: 17.385, longitude: 78.4867 },
    { name: "Puppy Love", address: "34 Main St, Kolkata", city: "Kolkata", latitude: 22.5726, longitude: 88.3639 },
    { name: "Best Pet Store", address: "22 Green Lane, Pune", city: "Pune", latitude: 18.5204, longitude: 73.8567 },
    { name: "Furry Tails", address: "11 Baner Road, Pune", city: "Pune", latitude: 18.5586, longitude: 73.7845 },
    { name: "The Pet Hub", address: "89 FC Road, Pune", city: "Pune", latitude: 18.5288, longitude: 73.8474 },
    { name: "Paws Heaven", address: "33 Koregaon Park, Pune", city: "Pune", latitude: 18.5362, longitude: 73.8935 },
    { name: "Pet Lovers Spot", address: "77 Kothrud, Pune", city: "Pune", latitude: 18.5074, longitude: 73.8077 },
    { name: "Pune Pet Care", address: "55 Viman Nagar, Pune", city: "Pune", latitude: 18.5664, longitude: 73.9142 },
    { name: "Paws & Claws", address: "12 MG Road, Pune", city: "Pune", latitude: 18.5167, longitude: 73.8567 },
    { name: "Pet Care Center", address: "4 Vishrantwadi Road, Pune", city: "Vishrantwadi", latitude: 18.5785, longitude: 73.8796 },
    { name: "Paws & More", address: "12 Alandi Road, Pune", city: "Vishrantwadi", latitude: 18.5802, longitude: 73.8809 },
    { name: "Furry Friends", address: "9 Dhanori Road, Pune", city: "Vishrantwadi", latitude: 18.5817, longitude: 73.8815 },
    { name: "Happy Tails", address: "15 Tingre Nagar, Pune", city: "Vishrantwadi", latitude: 18.5743, longitude: 73.8861 },
    { name: "Pet Haven", address: "5 Dighi Road, Pune", city: "Dighi", latitude: 18.6187, longitude: 73.8501 },
    { name: "Furry Palace", address: "22 Alandi Road, Pune", city: "Dighi", latitude: 18.6201, longitude: 73.8497 },
    { name: "Pawfect Pets", address: "10 Sai Chowk, Pune", city: "Dighi", latitude: 18.6235, longitude: 73.8514 },
    { name: "Happy Paws Dighi", address: "14 Dighi Camp, Pune", city: "Dighi", latitude: 18.6210, longitude: 73.8525 },
    { name: "Alandi Pet Care", address: "8 Temple Road, Pune", city: "Alandi", latitude: 18.6775, longitude: 73.8987 },
    { name: "Divine Paws", address: "20 Sai Nagar, Pune", city: "Alandi", latitude: 18.6789, longitude: 73.9021 },
    { name: "Viman Pet Store", address: "30 Central Avenue, Pune", city: "Viman Nagar", latitude: 18.5669, longitude: 73.9153 },
    { name: "Hadapsar Paws", address: "42 Main Street, Pune", city: "Hadapsar", latitude: 18.5089, longitude: 73.9260 },
    { name: "Magarpatta Pet Care", address: "15 Pet Street, Pune", city: "Magarpatta", latitude: 18.5203, longitude: 73.9318 },
    { name: "Jhunjhun Pet Haven", address: "21 Market Road, Jhunjhun", city: "Jhunjhun", latitude: 28.1276, longitude: 75.3991 }
];

function searchShops() {
    const city = document.getElementById('city').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const filteredShops = petShops.filter(shop => shop.city.toLowerCase() === city);

    if (filteredShops.length === 0) {
        resultsDiv.innerHTML = '<p>No pet shops found.</p>';
        return;
    }

    filteredShops.forEach(shop => {
        const div = document.createElement('div');
        div.classList.add('shop');
        div.innerHTML = `<strong>${shop.name}</strong><br>${shop.address} <br>
            <button onclick="openMaps(${shop.latitude}, ${shop.longitude})">📍 Get Directions</button>`;
        resultsDiv.appendChild(div);
    });
}

function openMaps(lat, lng) {
    window.location.href = `https://www.google.com/maps?q=${lat},${lng}`;
}
