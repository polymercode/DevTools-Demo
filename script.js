// Sample data for cards - stored in localStorage
const cardsData = [
    {
        id: 1,
        title: "Gaming Laptop",
        description: "Super fast laptop for gaming and stuff. Has RGB lights and runs all the latest games pretty good. My friend has one and says its awesome!",
        category: "Electronics",
        price: "$899"
    },
    {
        id: 2,
        title: "Wireless Headphones",
        description: "These headphones are really cool. They have noise canceling (i think) and the battery lasts like forever. Good for music and calls.",
        category: "Audio",
        price: "$149"
    },
    {
        id: 3,
        title: "Smartwatch",
        description: "This watch can track your steps and heart rate and stuff. Also you can get notifications on it which is handy when your phone is not near you.",
        category: "Wearables",
        price: "$299"
    },
    {
        id: 4,
        title: "Portable Charger",
        description: "Big power bank that charges your phone like 4 times. Really useful when traveling or when you forget to charge overnight lol.",
        category: "Accessories",
        price: "$45"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('website started');
    
    initializeLocalStorage();
    renderCards();
    fetchAPIData();
    setupDebugButton();
    setupProfileIcon();
});

// Initialize localStorage with card data
function initializeLocalStorage() {
    const storedData = localStorage.getItem('devToolsCards');
    
    if (!storedData) {
        console.log('saving products to storage');
        localStorage.setItem('devToolsCards', JSON.stringify(cardsData));
    }
    
    // Add timestamp
    localStorage.setItem('lastVisit', new Date().toISOString());
}

// Render cards from localStorage
function renderCards() {
    const cardsContainer = document.getElementById('cardsContainer');
    const storedData = JSON.parse(localStorage.getItem('devToolsCards'));
    
    console.log('loading products');
    
    if (!storedData || storedData.length === 0) {
        cardsContainer.innerHTML = '<p>no products found</p>';
        return;
    }
    
    cardsContainer.innerHTML = '';
    
    storedData.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.setAttribute('data-card-id', card.id);
        cardElement.setAttribute('data-category', card.category);
        
        cardElement.innerHTML = `
            <h3>${card.title}</h3>
            <p>${card.description}</p>
            <div class="card-meta">
                <strong>Price:</strong> ${card.price} | <strong>Category:</strong> ${card.category}
            </div>
        `;
        
        cardsContainer.appendChild(cardElement);
    });
}

// Fetch data from API
async function fetchAPIData() {
    const apiContent = document.getElementById('apiContent');
    
    console.log('getting customer data from server');
    
    try {
        // Show loading state
        apiContent.innerHTML = '<p class="loading">getting customer info...</p>';
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        
        if (!response.ok) {
            throw new Error(`error: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('got customer data');
        
        // Store API data in a variable for debugging
        window.apiData = data;
        
        displayAPIData(data);
        
    } catch (error) {
        console.error('ERROR:', error);
        apiContent.innerHTML = `
            <div style="color: #EA4335;">
                <strong>Oops! Something went wrong</strong>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Display API data
function displayAPIData(data) {
    const apiContent = document.getElementById('apiContent');
    
    apiContent.innerHTML = `
        <div class="user-info">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company.name}</p>
            <p><strong>City:</strong> ${data.address.city}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Website:</strong> ${data.website}</p>
            <p style="margin-top: 1rem; color: #5f6368; font-size: 0.9rem;">
                Member since 2024
            </p>
        </div>
    `;
}

// Setup debug button functionality
function setupDebugButton() {
    const debugBtn = document.getElementById('debugBtn');
    
    debugBtn.addEventListener('click', () => {
        console.log('refreshing customer data...');
        
        // Trigger another API call
        fetchAPIData();
        
    });
}

// Setup profile icon interaction
function setupProfileIcon() {
    const profileIcon = document.getElementById('profileIcon');
    
    profileIcon.addEventListener('click', () => {
        console.log('profile clicked');

    });
    
    // Log if image fails to load
    profileIcon.addEventListener('error', () => {
        console.warn('image failed to load');
        // Set a fallback
        profileIcon.src = 'https://github.com/AlapanDas.png" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%234285F4"/%3E%3Ctext x="50" y="50" font-size="40" text-anchor="middle" dy=".3em" fill="white"%3E👤%3C/text%3E%3C/svg%3E';
    });
}

// some helper functions
window.storeHelpers = {
    viewStorage: () => {
        console.log('LocalStorage:', localStorage.getItem('devToolsCards'));
    },
    clearStorage: () => {
        localStorage.clear();
        console.log('storage cleared');
    },
    refreshCustomer: () => {
        fetchAPIData();
    }
};
