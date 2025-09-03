// Products array now populated from backend API
let products = [];
let productsLoaded = false;

// DOM Elements
const productGrid = document.getElementById('product-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

// Initialize the website when DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Show loading state
    showLoadingProducts();
    await loadProductsFromApi();
    displayProducts('all');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize animations
    initAnimations();
    
    // Create mobile menu
    createMobileMenu();
    
    // Add an event listener for language changes to update product displays
    document.addEventListener('languageChanged', () => {
        // Update product display with current category
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) {
            const filter = activeFilter.getAttribute('data-filter');
            displayProducts(filter);
        }
    });
    
    // Initialize video modal
    initVideoModal();
    if (productGrid) {
        productGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-video');
            if (!btn) return;
            const src = btn.getAttribute('data-video');
            if (src) openVideoModal(src);
        });
    }
});

// Display products based on category filter
function displayProducts(category) {
    // Clear the product grid
    productGrid.innerHTML = '';
    
    // Filter products based on category
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    // Display each product
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    
    // If no products found
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<div class="no-products">No products found in this category.</div>';
    }
}

async function loadProductsFromApi() {
    try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        if (data.success) {
            products = data.products.map(p => ({
                id: p.id,
                name: p.name,
                category: (p.category || '').toLowerCase(),
                price: Number(p.price) || 0,
                description: p.description || '',
                image: p.image_url || 'logo.png',
                video: p.video_url || '', // added video mapping
                gumroadUrl: p.gumroad_url || '#',
                developer: p.developer_name || 'D STUDIOS'
            }));
            productsLoaded = true;
        } else {
            showProductError('Could not load products');
        }
    } catch (err) {
        console.error(err);
        showProductError('Error loading products');
    }
}

function showLoadingProducts() {
    productGrid.innerHTML = '<div class="products-loading">Loading products...</div>';
}

function showProductError(msg) {
    productGrid.innerHTML = `<div class="products-error">${msg}</div>`;
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Get category display name
    const categoryDisplayName = getCategoryDisplayName(product.category);
    
    // Get translations based on current language
    let buyNowText = "Buy Now";
    let productDescription = product.description;
    const lang = window.currentLanguage || 'en';
    
    if (window.translations && lang) {
        buyNowText = window.translations[lang].viewDetails || "Buy Now";
    }
    
    // Use translated product description if available
    if (product.descriptions && product.descriptions[lang]) {
        productDescription = product.descriptions[lang];
    }
    
    const viewVideoText = (window.translations && window.currentLanguage && window.translations[window.currentLanguage].viewVideo) || 'View Video';
    const videoBtn = product.video ? `<button class="btn btn-secondary btn-video" data-video="${product.video}" type="button">${viewVideoText}</button>` : '';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-content">
            <span class="product-category">${categoryDisplayName}</span>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <p class="product-description">${productDescription}</p>
            <div class="product-actions">
                <a href="${product.gumroadUrl}" class="btn btn-primary" target="_blank" data-i18n="viewDetails">${buyNowText}</a>
                ${videoBtn}
            </div>
        </div>
    `;
    
    return card;
}

// Get a display-friendly name for categories
function getCategoryDisplayName(category) {
    if (window.translations && window.currentLanguage) {
        switch(category) {
            case 'python':
                return window.translations[window.currentLanguage].pythonGUI || 'Python GUI';
            case 'ai':
                return window.translations[window.currentLanguage].aimlModels || 'AI/ML Model';
            case 'powerpoint':
                return window.translations[window.currentLanguage].powerpointTemplates || 'PowerPoint Template';
            default:
                return category;
        }
    } else {
        switch(category) {
            case 'python':
                return 'Python GUI';
            case 'ai':
                return 'AI/ML Model';
            case 'powerpoint':
                return 'PowerPoint Template';
            default:
                return category;
        }
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Product filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value and display products
            const filter = button.getAttribute('data-filter');
            displayProducts(filter);
        });
    });
      // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Allow normal navigation for non-anchor links like /admin
            if (href && !href.startsWith('#')) return; // do not prevent default
            e.preventDefault();

            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            const targetId = href;
            if (!targetId || targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (document.querySelector('.mobile-menu.active')) {
                    toggleMobileMenu();
                }
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    
    if (!mobileMenu) {
        createMobileMenu();
        return;
    }
    
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Toggle hamburger icon to X
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Create mobile menu elements
function createMobileMenu() {
    // Only create if it doesn't exist
    if (document.querySelector('.mobile-menu')) return;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.addEventListener('click', toggleMobileMenu);
    document.body.appendChild(overlay);
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Add logo to mobile menu
    const logoContainer = document.createElement('div');
    logoContainer.className = 'mobile-logo';
    const logoImg = document.createElement('img');
    logoImg.src = 'logo.png';
    logoImg.alt = 'D STUDIOS Logo';
    logoContainer.appendChild(logoImg);
    mobileMenu.appendChild(logoContainer);
    
    // Clone nav links into mobile menu
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            const newLink = link.cloneNode(true);
            // Copy active state from main navigation
            if (link.classList.contains('active')) {
                newLink.classList.add('active');
            }
            mobileMenu.appendChild(newLink);
        });
    }
    
    document.body.appendChild(mobileMenu);
    
    // Reattach event listeners to the new mobile menu links
    setupMobileMenuLinks();
}

// Initialize animations and scroll effects
function initAnimations() {
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature, .stat, .about-text p');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        animateOnScroll();
        
        // Sticky header effect
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'var(--shadow-sm)';
        }
        
        // Update active navigation based on scroll position
        updateActiveNavOnScroll();
    });
}

// Update active navigation item based on scroll position
function updateActiveNavOnScroll() {
    // Get all sections that have an ID defined
    const sections = document.querySelectorAll('section[id], footer[id]');
    
    // Get current scroll position
    const scrollY = window.pageYOffset;
    
    // Loop through sections to find the one in view
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // Adjust offset for header
        const sectionId = current.getAttribute('id');
        
        // Check if current scroll position is within this section
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active class from all nav links
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(a => a.classList.remove('active'));
            if (sectionId) {
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        }
    });
    
    // Special case for home section (when at the top)
    if (scrollY < 100) {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(a => a.classList.remove('active'));
        const homeLink = document.querySelector('.nav-links a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    }
}

// Helper function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Setup event listeners for mobile menu links
function setupMobileMenuLinks() {
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#')) return; // normal navigation for /admin etc.
            e.preventDefault();

            mobileMenuLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            const mainNavLink = document.querySelector(`.nav-links a[href="${href}"]`);
            if (mainNavLink) {
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                mainNavLink.classList.add('active');
            }

            if (!href || href === '#') return;
            const targetElement = document.querySelector(href);
            if (targetElement) {
                toggleMobileMenu();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Video modal utilities
function initVideoModal() {
    if (document.getElementById('video-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.className = 'video-modal';
    modal.innerHTML = `
      <div class="video-modal-backdrop" data-close="1"></div>
      <div class="video-modal-dialog">
        <button class="video-modal-close" data-close="1">×</button>
        <video id="video-modal-player" controls playsinline></video>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target.dataset.close) closeVideoModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideoModal(); });
}

function openVideoModal(src) {
    initVideoModal();
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('video-modal-player');
    player.src = src;
    player.load();
    modal.classList.add('active');
    setTimeout(() => player.play().catch(()=>{}), 120);
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (!modal) return;
    const player = document.getElementById('video-modal-player');
    player.pause();
    player.removeAttribute('src');
    modal.classList.remove('active');
}
