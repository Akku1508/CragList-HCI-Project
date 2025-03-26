document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Cozy Apartment", category: "apts", price: 1200, date: "2023-10-01", bedrooms: 2, bathrooms: 1, sqft: 800, image: "apt1.png" },
        { id: 2, name: "Luxury Villa", category: "sale", price: 500000, date: "2023-10-05", bedrooms: 5, bathrooms: 4, sqft: 3000, image: "villa1.png" },
        { id: 3, name: "Shared Room", category: "shared", price: 500, date: "2023-10-10", bedrooms: 1, bathrooms: 1, sqft: 200, image: "room1.png" },
        { id: 4, name: "Office Space", category: "office", price: 2000, date: "2023-10-15", sqft: 1200, image: "office1.png" },
        { id: 5, name: "Parking Spot", category: "parking", price: 100, date: "2023-10-20", image: "parking1.png" },
        { id: 6, name: "Vacation Rental", category: "vacation", price: 300, date: "2023-10-25", bedrooms: 3, bathrooms: 2, sqft: 1500, image: "vacation1.png" },
        // Add more products as needed
    ];

    const productList = document.getElementById("productList");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const dynamicFilters = document.getElementById("dynamicFilters");
    const sortBy = document.getElementById("sortBy");
    const toggleFilters = document.getElementById("toggleFilters");
    const filtersContent = document.getElementById("filtersContent");
    const toggleCategories = document.getElementById("toggleCategories");
    const categoriesContent = document.getElementById("categoriesContent");
    const categoriesColumn = document.getElementById("categoriesColumn");
    const productsColumn = document.getElementById("productsColumn");

    // Function to render dynamic filters based on category
    function renderDynamicFilters(category) {
        let filtersHTML = "";
        switch (category) {
            case "apts":
                filtersHTML = `
                    <div class="row">
                        <div class="col-md-6">
                            <label for="milesFromLocation">Miles from Location</label>
                            <input type="text" id="milesFromLocation" class="form-control mb-3" placeholder="Miles from zip">
                        </div>
                        <div class="col-md-6">
                            <label for="price">Rooms</label>
                            <input type="number" id="priceMin" class="form-control mb-3" placeholder="Min">
                            <input type="number" id="priceMax" class="form-control mb-3" placeholder="Max">
                        </div>
                    </div>
                    <!-- Add more filters for apts/housing -->
                `;
                break;
            // Add cases for other categories (swap, wanted, office, parking, sale, shared, roomsWanted, sublets, vacation) similarly...
        }
        dynamicFilters.innerHTML = filtersHTML;
    }

    // Function to filter and sort products
    function filterAndSortProducts() {
        const price = parseInt(priceRange.value);
        const sort = sortBy.value;

        // Filter products by price
        let filteredProducts = products.filter(product => product.price <= price);

        // Sort products
        switch (sort) {
            case "priceLowHigh":
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case "priceHighLow":
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case "dateNewOld":
                filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case "dateOldNew":
                filteredProducts.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
        }

        // Render filtered and sorted products
        renderProducts(filteredProducts);
    }

   
    function renderProducts(filteredProducts) {
        productList.innerHTML = "";
        filteredProducts.forEach(product => {
            const card = `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text left bold">$${product.price}</p>
                            <p class="card-text left">${product.bedrooms || 0} BR | ${product.bathrooms || 0} BA</p>
                            <p class="card-text left">${product.sqft || 'N/A'} sqft</p>
                            <p class="card-text right">${product.date}</p>
                            <a href="product_details.html?id=${product.id}" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                </div>
            `;
            productList.innerHTML += card;
        });
    }
    
    // Event listener for category selection
    document.querySelectorAll(".list-group-item").forEach(item => {
        item.addEventListener("click", () => {
            const category = item.getAttribute("data-category");
            renderDynamicFilters(category);
            filterAndSortProducts();
        });
    });

    // Event listener for price range change
    priceRange.addEventListener("input", () => {
        priceValue.textContent = `0 - ${priceRange.value}`;
        filterAndSortProducts();
    });

    // Event listener for sort by change
    sortBy.addEventListener("change", filterAndSortProducts);

    // Event listener for toggle filters
    toggleFilters.addEventListener("click", () => {
        if (filtersContent.style.display === "none") {
            filtersContent.style.display = "block";
            toggleFilters.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
        } else {
            filtersContent.style.display = "none";
            toggleFilters.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
        }
    });

    // Event listener for toggle categories
    toggleCategories.addEventListener("click", () => {
        if (categoriesColumn.classList.contains("collapsed")) {
            categoriesColumn.classList.remove("collapsed");
            productsColumn.classList.remove("expanded");
            categoriesContent.style.display = "block";
            toggleCategories.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Categories';
        } else {
            categoriesColumn.classList.add("collapsed");
            productsColumn.classList.add("expanded");
            categoriesContent.style.display = "none";
            toggleCategories.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Categories';
        }
    });

    // Initial render
    renderDynamicFilters("apts");
    filterAndSortProducts();
});
