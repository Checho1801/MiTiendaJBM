/*
    ----------------------------------------------------------
    Este archivo contiene el comportamiento (lógica) de tu página.
    Aquí se gestionan las interacciones del usuario.
    ----------------------------------------------------------
*/

const products = {
    aseo: [
        { id: 1, name: "Detergente Líquido Poderoso", description: "Elimina la suciedad más difícil, cuida los colores.", price: 18000, image: "assets/images/detergente1.jpg" },
        { id: 2, name: "Jabón en Polvo Multienzimático", description: "Fórmula avanzada para manchas rebeldes y blancura impecable.", price: 15000, image: "assets/images/jabon-polvo1.jpg" },
        { id: 3, name: "Suavizante Concentrado Aroma Floral", description: "Deja tu ropa suave, perfumada y fácil de planchar.", price: 12000, image: "assets/images/suavizante1.jpg" },
        { id: 4, name: "Limpiavidrios Anti-Empañante", description: "Brillo sin rayas, protege contra el vaho por más tiempo.", price: 9000, image: "assets/images/limpiavidrios1.jpg" },
        { id: 5, name: "Desinfectante Antibacterial Multiusos", description: "Elimina el 99.9% de gérmenes y bacterias, ideal para todas las superficies.", price: 11000, image: "assets/images/desinfectante1.jpg" },
    ],
    alimentos: [
        { id: 6, name: "Arroz Supremo Grano Largo", description: "Selección especial, grano entero y de cocción perfecta.", price: 9500, image: "assets/images/arroz1.jpg" },
        { id: 7, name: "Aceite de Oliva Extra Virgen", description: "Prensado en frío, sabor intenso y saludable.", price: 25000, image: "assets/images/aceite-oliva1.jpg" },
        { id: 8, name: "Frijol Cargamanto Selección", description: "Grano grande, cremoso, ideal para tus preparaciones.", price: 7000, image: "assets/images/frijol1.jpg" },
        { id: 9, name: "Panela Molida Orgánica", description: "Endulzante natural, sin aditivos ni conservantes.", price: 6000, image: "assets/images/panela1.jpg" },
        { id: 10, name: "Café Premium Tostado Molido", description: "Aroma intenso, sabor equilibrado, 100% colombiano.", price: 14000, image: "assets/images/cafe1.jpg" },
    ],
    otros: [
        { id: 11, name: "Bolsas de Basura Resistentes", description: "Paquete de 30 bolsas grandes, doble capa anti-goteo.", price: 8500, image: "assets/images/bolsas-basura1.jpg" },
        { id: 12, name: "Bombillos LED Alta Eficiencia", description: "Luz brillante, bajo consumo, larga duración.", price: 16000, image: "assets/images/bombillos1.jpg" },
        { id: 13, name: "Cinta Adhesiva Transparente", description: "Rollo de 50 metros, alta adherencia.", price: 4000, image: "assets/images/cinta-adhesiva1.jpg" },
        { id: 14, name: "Pilhas Alcalinas AA (Pack x4)", description: "Energía duradera para tus dispositivos.", price: 9500, image: "assets/images/pilas1.jpg" },
        { id: 15, name: "Escoba de Cerdas Suaves", description: "Ideal para todo tipo de pisos, no raya.", price: 13000, image: "assets/images/escoba1.jpg" },
    ]
};

const categories = {
    aseo: { name: "ASEO", image: "assets/images/categoria-aseo.jpg" },
    alimentos: { name: "ALIMENTOS", image: "assets/images/categoria-alimentos.jpg" },
    otros: { name: "OTROS", image: "assets/images/categoria-otros.jpg" }
};

const promotions = [
    { title: "20% de Descuento en Detergentes", image: "assets/images/promo1.jpg" },
    { title: "Lleva 3 Cafés y Paga 2", image: "assets/images/promo2.jpg" },
    { title: "Envío Gratis por Compras Mayores a $100.000", image: "assets/images/promo3.jpg" }
];

const brands = [
    { name: "Marca A", image: "assets/logos/brand-a.png" },
    { name: "Marca B", image: "assets/logos/brand-b.png" },
    { name: "Marca C", image: "assets/logos/brand-c.png" },
    { name: "Marca D", image: "assets/logos/brand-d.png" },
    { name: "Marca E", image: "assets/logos/brand-e.png" },
    { name: "Marca F", image: "assets/logos/brand-f.png" },
    { name: "Marca G", image: "assets/logos/brand-g.png" },
    { name: "Marca H", image: "assets/logos/brand-h.png" },
    { name: "Marca I", image: "assets/logos/brand-i.png" },
    { name: "Marca J", image: "assets/logos/brand-j.png" }
];

let cart = [];

// --- Funciones de Renderizado ---

// Renderiza los productos de una categoría específica o una búsqueda
function renderProducts(productsToRender) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    if (!productsToRender || productsToRender.length === 0) {
        productList.innerHTML = '<p>No se encontraron productos en esta categoría.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toLocaleString('es-CO')}</p>
            <div class="quantity-selector">
                <label for="quantity-${product.id}">Cantidad:</label>
                <input type="number" id="quantity-${product.id}" value="1" min="1">
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}">Agregar al Carrito</button>
        `;

        productList.appendChild(productCard);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Renderiza las categorías (con imágenes)
function renderCategories() {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';

    for (const key in categories) {
        if (Object.hasOwnProperty.call(categories, key)) {
            const category = categories[key];
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('category-card');
            categoryCard.dataset.category = key;

            categoryCard.innerHTML = `
                <img src="${category.image}" alt="${category.name}">
                <span>${category.name}</span>
            `;

            categoryCard.addEventListener('click', () => {
                renderProducts(products[key]);
            });
            categoryContainer.appendChild(categoryCard);
        }
    }
}

// Renderiza el carrusel de promociones
function renderPromotions() {
    const carouselTrack = document.getElementById('carousel-track');
    promotions.forEach(promo => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        slide.innerHTML = `
            <img src="${promo.image}" alt="${promo.title}">
            <div class="carousel-slide-caption">${promo.title}</div>
        `;
        carouselTrack.appendChild(slide);
    });
}

// Renderiza el carrito de compras
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>El carrito está vacío.</p>';
        cartTotal.innerHTML = `Total: $0`;
        return;
    }

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <span>${item.name} (${item.quantity} unidades)</span>
            <span>$${(item.price * item.quantity).toLocaleString('es-CO')}
                <button class="remove-item-btn" data-id="${item.id}">Eliminar</button>
            </span>
        `;
        cartItems.appendChild(cartItemDiv);
        total += item.price * item.quantity;
    });

    cartTotal.innerHTML = `Total: $${total.toLocaleString('es-CO')}`;

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Renderiza los logos y nombres de las marcas
function renderBrands() {
    const brandsGrid = document.querySelector('.brands-grid');
    brandsGrid.innerHTML = '';
    brands.forEach(brand => {
        const brandItem = document.createElement('div');
        brandItem.classList.add('brand-item');
        brandItem.innerHTML = `
            <img src="${brand.image}" alt="${brand.name}">
            <span>${brand.name}</span>
        `;
        brandsGrid.appendChild(brandItem);
    });
}

// --- Funciones del Carrito ---

function addToCart(event) {
    const productId = event.target.dataset.id;
    const allProducts = [...products.aseo, ...products.alimentos, ...products.otros];
    const productToAdd = allProducts.find(p => p.id == productId);
    
    if (productToAdd) {
        const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
        if (quantity < 1) {
            alert('Por favor, ingrese una cantidad válida.');
            return;
        }

        const existingItem = cart.find(item => item.id == productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...productToAdd, quantity });
        }
        
        alert(`${quantity} unidad(es) de ${productToAdd.name} agregadas al carrito.`);
    }
    
    renderCart();
}

function removeFromCart(event) {
    const productId = event.target.dataset.id;
    cart = cart.filter(item => item.id != productId);
    renderCart();
}

// --- Funciones Adicionales ---

function redirectToWhatsApp() {
    if (cart.length === 0) {
        alert('El carrito está vacío. Por favor, agregue productos.');
        return;
    }

    let message = "¡Hola! Quisiera realizar un pedido con los siguientes productos:\n\n";
    cart.forEach(item => {
        message += `- ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CO')}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal: $${total.toLocaleString('es-CO')}`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "573212773768";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    
    cart = [];
    renderCart();
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const allProducts = [...products.aseo, ...products.alimentos, ...products.otros];
    
    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(filteredProducts);
}

// --- Lógica del Carrusel ---
let currentSlide = 0;
let carouselInterval;

function moveCarousel(direction) {
    const carouselTrack = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startCarousel() {
    if (carouselInterval) clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000); // Cambia de imagen cada 5 segundos
}

// --- Eventos que se ejecutan al cargar la página ---
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza las categorías, promociones y marcas al cargar la página
    renderCategories();
    renderPromotions();
    renderBrands();
    renderCart();

    // Eventos para los botones del carrusel
    document.getElementById('prev-btn').addEventListener('click', () => {
        moveCarousel(-1);
        startCarousel(); // Reinicia el temporizador
    });
    document.getElementById('next-btn').addEventListener('click', () => {
        moveCarousel(1);
        startCarousel(); // Reinicia el temporizador
    });

    // Inicia el carrusel automático
    startCarousel();

    // Eventos para la barra de búsqueda
    document.getElementById('search-input').addEventListener('input', handleSearch);

    // Eventos para el botón de checkout
    document.getElementById('checkout-btn').addEventListener('click', redirectToWhatsApp);

    // Evento para los enlaces de anclaje (ej. el mapa)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});