/*
    ----------------------------------------------------------
    Este archivo contiene el comportamiento (lógica) de tu página.
    Aquí se gestionan las interacciones del usuario.
    ----------------------------------------------------------
*/

// Este es el "modelo de datos" de tus productos.
// Lo usaremos para simular una base de datos.
const products = {
    aseo: [
        { id: 1, name: "Detergente Líquido", description: "Limpia y cuida tu ropa.", price: 15000, image: "assets/images/detergente.jpg" },
        { id: 2, name: "Jabón en Polvo", description: "Para una limpieza profunda y eficaz.", price: 12000, image: "assets/images/jabon-polvo.jpg" },
        // Puedes agregar más productos aquí...
    ],
    alimentos: [
        { id: 3, name: "Arroz Extra", description: "Grano largo, perfecto para tus comidas.", price: 8000, image: "assets/images/arroz.jpg" },
        { id: 4, name: "Aceite de Girasol", description: "Ideal para freír y cocinar.", price: 10500, image: "assets/images/aceite.jpg" },
        // Puedes agregar más productos aquí...
    ],
    otros: [
        { id: 5, name: "Servilletas de Papel", description: "Paquete de 200 servilletas dobles.", price: 5000, image: "assets/images/servilletas.jpg" },
        { id: 6, name: "Papel Higiénico", description: "Paquete de 4 rollos, doble hoja.", price: 7500, image: "assets/images/papel-higienico.jpg" },
        // Puedes agregar más productos aquí...
    ]
};

let cart = []; // Este arreglo almacenará los productos que el usuario agregue al carrito.

// Función para renderizar (dibujar) los productos en la página.
function renderProducts(category) {
    const productList = document.getElementById('product-list'); // Obtiene el contenedor de productos del HTML.
    productList.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos productos.

    products[category].forEach(product => { // Itera sobre los productos de la categoría seleccionada.
        const productCard = document.createElement('div'); // Crea un nuevo div para la tarjeta del producto.
        productCard.classList.add('product-card'); // Le asigna una clase CSS para darle estilo.
        
        // Rellena la tarjeta con el contenido del producto.
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toLocaleString('es-CO')}</p>
            <div class="quantity-selector">
                <label for="quantity-${product.id}">Cantidad:</label>
                <input type="number" id="quantity-${product.id}" value="1" min="1">
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}" data-category="${category}">Agregar al Carrito</button>
        `;

        productList.appendChild(productCard); // Añade la tarjeta al contenedor.
    });

    // Añade un "escuchador de eventos" a todos los botones "Agregar al Carrito".
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Función para renderizar el carrito de compras.
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = ''; // Limpia el carrito.
    let total = 0;

    cart.forEach(item => { // Itera sobre los productos del carrito.
        const cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `
            <span>${item.name} (${item.quantity} unidades)</span>
            <span>$${(item.price * item.quantity).toLocaleString('es-CO')}</span>
        `;
        cartItems.appendChild(cartItemDiv);
        total += item.price * item.quantity; // Acumula el total.
    });

    cartTotal.innerHTML = `Total: $${total.toLocaleString('es-CO')}`; // Muestra el total final.
}

// Función para agregar un producto al carrito.
function addToCart(event) {
    const productId = event.target.dataset.id;
    const category = event.target.dataset.category;
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
    
    // Encuentra el producto en el modelo de datos.
    const productToAdd = products[category].find(p => p.id == productId);

    if (productToAdd) {
        // Verifica si el producto ya está en el carrito.
        const existingItem = cart.find(item => item.id == productId);
        if (existingItem) {
            existingItem.quantity += quantity; // Si existe, solo actualiza la cantidad.
        } else {
            cart.push({ ...productToAdd, quantity }); // Si no, agrega el nuevo producto.
        }
    }
    
    renderCart(); // Vuelve a dibujar el carrito para mostrar el cambio.
    alert(`${quantity} unidad(es) de ${productToAdd.name} agregadas al carrito.`);
}

// Función para generar el mensaje de WhatsApp y redirigir.
function redirectToWhatsApp() {
    if (cart.length === 0) {
        alert('El carrito está vacío. Por favor, agregue productos.');
        return;
    }

    // Construye el mensaje con los detalles del pedido.
    let message = "¡Hola! Quisiera realizar un pedido con los siguientes productos:\n\n";
    cart.forEach(item => {
        message += `- ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CO')}\n`;
    });
    
    // Obtiene el total.
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal: $${total.toLocaleString('es-CO')}`;

    // Codifica el mensaje para que sea válido en una URL.
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "573001234567"; // Reemplaza con tu número de WhatsApp.
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Redirige al usuario a WhatsApp.
    window.open(whatsappUrl, '_blank');
}

// Eventos que se ejecutan al cargar la página.
document.addEventListener('DOMContentLoaded', () => {
    // Añade "escuchadores de eventos" a los botones de categorías.
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const category = event.target.dataset.category;
            renderProducts(category); // Llama a la función para mostrar los productos de la categoría seleccionada.
        });
    });

    // Añade un "escuchador de eventos" al botón "Hacer Pedido".
    document.getElementById('checkout-btn').addEventListener('click', redirectToWhatsApp);

    // Muestra la primera categoría (aseo) por defecto al cargar la página.
    renderProducts('aseo');
});