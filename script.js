// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 6000,
    image: "WhatsApp Image 2025-03-24 at 10.52.14_0e5e1ce9.jpg",
    badge: "Popular"
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    image: "WhatsApp Image 2025-03-24 at 10.52.01_ea081b0c.jpg"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 18999,
    image: "WhatsApp Image 2025-03-24 at 10.51.45_d7345b70.jpg",
    badge: "Sale"
  },
  {
    id: 4,
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: 899,
    image: "WhatsApp Image 2025-03-24 at 10.50.57_c798a994.jpg"
  },
  {
    id: 5,
    name: "Denim Jeans",
    category: "Clothing",
    price: 1899,
    image: "WhatsApp Image 2025-03-24 at 10.50.36_5067b743.jpg"
  },
  {
    id: 6,
    name: "Leather Jacket",
    category: "Clothing",
    price: 5000,
    image: "WhatsApp Image 2025-03-24 at 10.50.25_30d52fbf.jpg",
    badge: "New"
  },
  {
    id: 7,
    name: "Running Shoes",
    category: "Footwear",
    price: 3599,
    image: "WhatsApp Image 2025-03-24 at 10.50.16_48cb36bd.jpg"
  },
  {
    id: 8,
    name: "Hiking Boots",
    category: "Footwear",
    price: 4299,
    image: "WhatsApp Image 2025-03-24 at 10.50.03_f7512bf6.jpg"
  }
];

// Get unique categories from products
const categories = [...new Set(products.map(product => product.category))];

// DOM elements
const categoryFiltersContainer = document.getElementById('category-filters');
const productsContainer = document.getElementById('products-container');
const priceMinSlider = document.getElementById('price-min');
const priceMaxSlider = document.getElementById('price-max');
const priceMinValue = document.getElementById('price-min-value');
const priceMaxValue = document.getElementById('price-max-value');
const sliderTrack = document.getElementById('slider-track');
const filterToggle = document.getElementById('filter-toggle');
const filtersPanel = document.getElementById('filters-panel');
const clearFiltersBtn = document.getElementById('clear-filters');
const filterTags = document.getElementById('filter-tags');
const productCount = document.getElementById('product-count');
const sortSelect = document.getElementById('sort-select');

// State
let selectedCategories = [];
let minPrice = 0;
let maxPrice = 20000;
let currentSort = 'default';

// Initialize the page
function init() {
  renderCategoryFilters();
  renderProducts(products);
  setupEventListeners();
  updateSliderTrack();
  updateProductCount(products.length);
}

// Render category checkboxes
function renderCategoryFilters() {
  categories.forEach(category => {
    const categoryItem = document.createElement('div');
    categoryItem.className = 'category-item';
    
    const customCheckbox = document.createElement('label');
    customCheckbox.className = 'custom-checkbox';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `category-${category}`;
    checkbox.value = category;
    
    const checkmark = document.createElement('span');
    checkmark.className = 'checkmark';
    
    const label = document.createElement('label');
    label.htmlFor = `category-${category}`;
    label.textContent = category;
    
    customCheckbox.appendChild(checkbox);
    customCheckbox.appendChild(checkmark);
    customCheckbox.appendChild(label);
    
    categoryItem.appendChild(customCheckbox);
    categoryFiltersContainer.appendChild(categoryItem);
  });
}

// Render products
function renderProducts(productsToRender) {
  productsContainer.innerHTML = '';
  
  if (productsToRender.length === 0) {
    const noProducts = document.createElement('div');
    noProducts.className = 'no-products';
    noProducts.textContent = 'No products match your filters';
    productsContainer.appendChild(noProducts);
    return;
  }
  
  // Apply sorting
  const sortedProducts = sortProducts(productsToRender, currentSort);
  
  // Add animation delay for staggered appearance
  sortedProducts.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.style.animationDelay = `${index * 0.05}s`;
    
    const productImage = document.createElement('img');
    productImage.className = 'product-image';
    productImage.src = product.image;
    productImage.alt = product.name;
    
    if (product.badge) {
      const badge = document.createElement('div');
      badge.className = 'product-badge';
      badge.textContent = product.badge;
      productCard.appendChild(badge);
    }
    
    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';
    
    const productName = document.createElement('h3');
    productName.className = 'product-name';
    productName.textContent = product.name;
    
    const productDetails = document.createElement('div');
    productDetails.className = 'product-details';
    
    const productCategory = document.createElement('span');
    productCategory.className = 'product-category';
    productCategory.textContent = product.category;
    
    const productPrice = document.createElement('span');
    productPrice.className = 'product-price';
    productPrice.textContent = `Rs${product.price.toFixed(2)}`;
    
    productDetails.appendChild(productCategory);
    productDetails.appendChild(productPrice);
    
    productInfo.appendChild(productName);
    productInfo.appendChild(productDetails);
    
    productCard.appendChild(productImage);
    productCard.appendChild(productInfo);
    
    productsContainer.appendChild(productCard);
  });
}

// Sort products
function sortProducts(productsToSort, sortType) {
  const productsCopy = [...productsToSort];
  
  switch (sortType) {
    case 'price-low':
      return productsCopy.sort((a, b) => a.price - b.price);
    case 'price-high':
      return productsCopy.sort((a, b) => b.price - a.price);
    case 'name':
      return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return productsCopy;
  }
}

// Apply filters and update product display
function applyFilters() {
  let filteredProducts = products;
  
  // Filter by category
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedCategories.includes(product.category)
    );
  }
  
  // Filter by price range
  filteredProducts = filteredProducts.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );
  
  renderProducts(filteredProducts);
  updateFilterTags();
  updateProductCount(filteredProducts.length);
}

// Update the slider track appearance
function updateSliderTrack() {
  const minVal = parseInt(priceMinSlider.value);
  const maxVal = parseInt(priceMaxSlider.value);
  
  const percent1 = (minVal / parseInt(priceMinSlider.max)) * 100;
  const percent2 = (maxVal / parseInt(priceMaxSlider.max)) * 100;
  
  sliderTrack.style.background = `linear-gradient(to right, var(--border-color) ${percent1}%, var(--primary-color) ${percent1}%, var(--primary-color) ${percent2}%, var(--border-color) ${percent2}%)`;
}

// Update filter tags display
function updateFilterTags() {
  filterTags.innerHTML = '';
  
  // Add category tags
  selectedCategories.forEach(category => {
    const tag = document.createElement('div');
    tag.className = 'filter-tag';
    tag.innerHTML = `${category} <span class="tag-remove" data-category="${category}">×</span>`;
    filterTags.appendChild(tag);
  });
  
  // Add price range tag if not default
  if (minPrice > 0 || maxPrice < 300) {
    const tag = document.createElement('div');
    tag.className = 'filter-tag';
    tag.innerHTML = `$${minPrice} - $${maxPrice} <span class="tag-remove" data-price="reset">×</span>`;
    filterTags.appendChild(tag);
  }
  
  // Add event listeners to remove tags
  document.querySelectorAll('.tag-remove').forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.dataset.category) {
        removeCategory(this.dataset.category);
      } else if (this.dataset.price) {
        resetPriceRange();
      }
    });
  });
}

// Remove a category from filters
function removeCategory(category) {
  selectedCategories = selectedCategories.filter(c => c !== category);
  document.getElementById(`category-${category}`).checked = false;
  applyFilters();
}

// Reset price range to default
function resetPriceRange() {
  minPrice = 0;
  maxPrice = 300;
  priceMinSlider.value = minPrice;
  priceMaxSlider.value = maxPrice;
  priceMinValue.textContent = `$${minPrice}`;
  priceMaxValue.textContent = `$${maxPrice}`;
  updateSliderTrack();
  applyFilters();
}

// Clear all filters
function clearAllFilters() {
  selectedCategories = [];
  document.querySelectorAll('.category-item input').forEach(checkbox => {
    checkbox.checked = false;
  });
  resetPriceRange();
}

// Update product count display
function updateProductCount(count) {
  productCount.textContent = `${count} product${count !== 1 ? 's' : ''}`;
}

// Toggle filters panel on mobile
function toggleFilters() {
  filtersPanel.classList.toggle('active');
  filterToggle.classList.toggle('active');
}

// Set up event listeners
function setupEventListeners() {
  // Category filter change
  const categoryCheckboxes = document.querySelectorAll('.category-item input');
  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const category = this.value;
      
      if (this.checked) {
        selectedCategories.push(category);
      } else {
        selectedCategories = selectedCategories.filter(c => c !== category);
      }
      
      applyFilters();
    });
  });
  
  // Price min slider change
  priceMinSlider.addEventListener('input', function() {
    minPrice = parseInt(this.value);
    priceMinValue.textContent = `$${minPrice}`;
    
    // Ensure min doesn't exceed max
    if (minPrice > maxPrice) {
      maxPrice = minPrice;
      priceMaxSlider.value = minPrice;
      priceMaxValue.textContent = `$${maxPrice}`;
    }
    
    updateSliderTrack();
    applyFilters();
  });
  
  // Price max slider change
  priceMaxSlider.addEventListener('input', function() {
    maxPrice = parseInt(this.value);
    priceMaxValue.textContent = `$${maxPrice}`;
    
    // Ensure max isn't less than min
    if (maxPrice < minPrice) {
      minPrice = maxPrice;
      priceMinSlider.value = maxPrice;
      priceMinValue.textContent = `$${minPrice}`;
    }
    
    updateSliderTrack();
    applyFilters();
  });
  
  // Clear filters button
  clearFiltersBtn.addEventListener('click', function() {
    clearAllFilters();
    applyFilters();
  });
  
  // Filter toggle for mobile
  filterToggle.addEventListener('click', toggleFilters);
  
  // Sort select change
  sortSelect.addEventListener('change', function() {
    currentSort = this.value;
    applyFilters();
  });
  
  // Add hover effect to product cards
  productsContainer.addEventListener('mouseover', function(e) {
    const card = e.target.closest('.product-card');
    if (card) {
      card.style.transform = 'translateY(-8px)';
    }
  });
  
  productsContainer.addEventListener('mouseout', function(e) {
    const card = e.target.closest('.product-card');
    if (card) {
      card.style.transform = 'translateY(-5px)';
    }
  });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', init);