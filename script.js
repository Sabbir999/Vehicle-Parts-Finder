//dataset - year make model product type dataset.csv file
const vehicleData = [
    { year: "2011", make: "RAM", model: "1500", productType: "Front Bumper" },
    { year: "2012", make: "RAM", model: "1500", productType: "Front Bumper" },
    { year: "2013", make: "RAM", model: "1500", productType: "Front Bumper" },
    { year: "2014", make: "RAM", model: "1500", productType: "Front Bumper" },
    { year: "2015", make: "RAM", model: "1500", productType: "Front Bumper" },
    { year: "2011", make: "RAM", model: "1500", productType: "Rear Bumper" },
    { year: "2012", make: "RAM", model: "1500", productType: "Rear Bumper" },
    { year: "2013", make: "RAM", model: "1500", productType: "Rear Bumper" },
    { year: "2014", make: "RAM", model: "1500", productType: "Rear Bumper" },
    { year: "2015", make: "RAM", model: "1500", productType: "Rear Bumper" },
    { year: "2012", make: "RAM", model: "2500", productType: "Tailgate" },
    { year: "2013", make: "RAM", model: "2500", productType: "Tailgate" },
    { year: "2014", make: "RAM", model: "2500", productType: "Tailgate" },
    { year: "2015", make: "RAM", model: "2500", productType: "Tailgate" },
    { year: "2016", make: "RAM", model: "2500", productType: "Tailgate" },
    { year: "2013", make: "Toyota", model: "Camry", productType: "Front Bumper" },
    { year: "2014", make: "Toyota", model: "Camry", productType: "Front Bumper" },
    { year: "2015", make: "Toyota", model: "Camry", productType: "Front Bumper" },
    { year: "2016", make: "Toyota", model: "Camry", productType: "Front Bumper" },
    { year: "2017", make: "Toyota", model: "Corolla", productType: "Front Bumper" },
    { year: "2013", make: "Toyota", model: "Corolla", productType: "Passenger Side Fender" },
    { year: "2014", make: "Toyota", model: "Corolla", productType: "Passenger Side Fender" },
    { year: "2015", make: "Toyota", model: "Corolla", productType: "Passenger Side Fender" },
    { year: "2016", make: "Toyota", model: "Corolla", productType: "Passenger Side Fender" },
    { year: "2017", make: "Toyota", model: "Corolla", productType: "Passenger Side Fender" }
];

// Get all the dropdowns and elements from the page
const yearSelect = document.getElementById('year');
const makeSelect = document.getElementById('make');
const modelSelect = document.getElementById('model');
const productTypeSelect = document.getElementById('productType');
const findPartsBtn = document.getElementById('findPartsBtn');
const resultsSection = document.getElementById('resultsSection');
const vehicleDetail = document.getElementById('vehicleDetail');
const productDetail = document.getElementById('productDetail');
const partsCount = document.getElementById('partsCount');
const viewPartsLink = document.getElementById('viewPartsLink');
const partsForm = document.getElementById('partsForm');

// This function runs when the page first loads
function initForm() {
    // Get all unique years and add them to the year dropdown
    const years = [...new Set(vehicleData.map(item => item.year))].sort((a, b) => b - a);
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });

    // Add event listeners to each dropdown and form
    yearSelect.addEventListener('change', handleYearChange);
    makeSelect.addEventListener('change', handleMakeChange);
    modelSelect.addEventListener('change', handleModelChange);
    productTypeSelect.addEventListener('change', handleProductTypeChange);
    partsForm.addEventListener('submit', handleFormSubmit);
}

// When user selects a year
function handleYearChange() {
    if (yearSelect.value) {
        // Get all unique makes for the selected year
        const makes = [...new Set(vehicleData
            .filter(item => item.year === yearSelect.value)
            .map(item => item.make)
        )].sort();

        // Update the make dropdown
        makeSelect.innerHTML = '<option value="">Select Make</option>';
        makes.forEach(make => {
            const option = document.createElement('option');
            option.value = make;
            option.textContent = make;
            makeSelect.appendChild(option);
        });

        makeSelect.disabled = false;
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        modelSelect.disabled = true;
        productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';
        productTypeSelect.disabled = true;
        findPartsBtn.disabled = true;
    } else {
        // Reset everything if no year is selected
        makeSelect.innerHTML = '<option value="">Select Make</option>';
        makeSelect.disabled = true;
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        modelSelect.disabled = true;
        productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';
        productTypeSelect.disabled = true;
        findPartsBtn.disabled = true;
    }

    // Hide results when dropdown changes
    resultsSection.classList.remove('active');
}

// When user selects a make
function handleMakeChange() {
    if (makeSelect.value) {
        // Get all models for selected year and make
        const models = [...new Set(vehicleData
            .filter(item => item.year === yearSelect.value && item.make === makeSelect.value)
            .map(item => item.model)
        )].sort();

        // Update the model dropdown
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });

        modelSelect.disabled = false;
        productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';
        productTypeSelect.disabled = true;
        findPartsBtn.disabled = true;
    } else {
        // Reset model and product type
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        modelSelect.disabled = true;
        productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';
        productTypeSelect.disabled = true;
        findPartsBtn.disabled = true;
    }

    // Hide results
    resultsSection.classList.remove('active');
}

// When user selects a model
function handleModelChange() {
    if (modelSelect.value) {
        // Get product types for this specific vehicle
        const productTypes = [...new Set(vehicleData
            .filter(item =>
                item.year === yearSelect.value &&
                item.make === makeSelect.value &&
                item.model === modelSelect.value
            )
            .map(item => item.productType)
        )].sort();

        // Update the product type dropdown
        productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';
        productTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            productTypeSelect.appendChild(option);
        });

        productTypeSelect.disabled = false;
    } else {
        // Reset product type if model is not selected
        productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';
        productTypeSelect.disabled = true;
        findPartsBtn.disabled = true;
    }

    resultsSection.classList.remove('active');
}

// When user selects a product type
function handleProductTypeChange() {
    // Enable button only if product type is selected
    findPartsBtn.disabled = !productTypeSelect.value;
    resultsSection.classList.remove('active');
}

// When user submits the form
function handleFormSubmit(e) {
    e.preventDefault(); // stop the page from refreshing

    // Get values from dropdowns
    const year = yearSelect.value;
    const make = makeSelect.value;
    const model = modelSelect.value;
    const productType = productTypeSelect.value;

    // Create the link to the product page
    const baseUrl = "https://partifyusa.com/collections";
    const collectionPath = `${year}-${make}-${model}`.toLowerCase().replace(/\s+/g, '-');
    const productTypeParam = productType.replace(/\s+/g, '+');
    const url = `${baseUrl}/${collectionPath}?filter.p.product_type=${productTypeParam}`;

    // Count how many matching parts exist in our data
    const parts = vehicleData.filter(item =>
        item.year === year &&
        item.make === make &&
        item.model === model &&
        item.productType === productType
    );

    // Update the page to show the results
    vehicleDetail.textContent = `${year} ${make} ${model}`;
    productDetail.textContent = productType;
    partsCount.textContent = parts.length > 0 ? `${parts.length} options available` : "No parts found";
    viewPartsLink.href = url;

    // Show the result section
    resultsSection.classList.add('active');

    // Scroll to the result
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Run this function when the page is ready
document.addEventListener('DOMContentLoaded', initForm);
