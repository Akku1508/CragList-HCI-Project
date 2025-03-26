document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    const products = [
        { 
            id: 1, name: "Cozy Apartment", category: "apts", price: 1200, date: "2023-10-01", 
            bedrooms: 2, bathrooms: 1, sqft: 800, 
            images: ["apt1.png", "apt2.png", "apt3.png"]
        },
        { 
            id: 2, name: "Luxury Villa", category: "sale", price: 500000, date: "2023-10-05", 
            bedrooms: 5, bathrooms: 4, sqft: 3000, 
            images: ["villa1.png", "villa2.png", "villa3.png"]
        },
        { 
            id: 5, name: "Parking Spot", category: "parking", price: 100, date: "2023-10-20", 
            images: ["parking1.png", "parking2.png"]
        },
        { 
            id: 6, name: "Vacation Rental", category: "vacation", price: 300, date: "2023-10-25", 
            bedrooms: 3, bathrooms: 2, sqft: 1500, 
            images: ["vacation1.png", "vacation2.png", "vacation3.png"]
        }
    ];

    const product = products.find(p => p.id == productId);
    if (product) {
        // Generate the image slider (carousel)
        let carouselIndicators = "";
        let carouselInner = "";

        product.images.forEach((image, index) => {
            carouselIndicators += `<button type="button" data-bs-target="#productCarousel" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-label="Slide ${index + 1}"></button>`;
            
            carouselInner += `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${image}" class="d-block w-100" alt="${product.name}">
                </div>
            `;
        });

        document.getElementById("productDetails").innerHTML = `
            <!-- Carousel -->
            <div class="carousel-container">
                <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        ${carouselIndicators}
                    </div>
                    <div class="carousel-inner">
                        ${carouselInner}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
            </div>

            <!-- Product Info -->
            <div class="product-info">
                <h2>${product.name}</h2>
                <p class="price">$${product.price}</p>
                <p><strong>Bedrooms:</strong> ${product.bedrooms || "N/A"}</p>
                <p><strong>Bathrooms:</strong> ${product.bathrooms || "N/A"}</p>
                <p><strong>Size:</strong> ${product.sqft || "N/A"} sqft</p>
                <p><strong>Posted On:</strong> ${product.date}</p>
            </div>
        `;


    } else {
        document.getElementById("productDetails").innerHTML = `<p>Product not found.</p>`;
    }
});
