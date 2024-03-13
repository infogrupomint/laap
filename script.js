// Datos de ejemplo de productos agrupados por categorías
const categories = ['Pizzas', 'Empanadas', 'Sandwiches', 'Bebidas' ];

const products = {
  'Pizzas': [
    { id: 1, name: 'P. Muzzarella', price: 5000, quantity: 1,},
    { id: 2, name: 'P. Especial', price: 7200, quantity: 1, },
    { id: 4, name: 'P. Napolitana', price: 7500, quantity:1 },
    { id: 5, name: 'P. Capresse', price: 6500, quantity:1 },
    { id: 9, name: 'P. Calabresa', price: 5700, quantity:1 },
    { id: 12, name: 'P. Palmitos', price: 7500, quantity:1 },
    { id: 16, name: 'P. Pollo', price: 7500, quantity:1 },
    { id: 17, name: 'P. Roquefort', price: 7500, quantity:1 },
    { id: 18, name: 'P. 4 Quesos', price: 7500, quantity:1 },

  ],

  'Empanadas': [
    { id: 45, name: 'E. de Carne', price: 850, quantity:1 },
    { id: 46, name: 'E. de Pollo', price: 850, quantity:1 },
    { id: 47, name: 'E. de Jamon y Queso', price: 850, quantity:1 },
    { id: 48, name: 'E. de Choclo', price: 850, quantity:1 },
    { id: 49, name: 'E. de Cebolla', price: 850, quantity:1 },
    { id: 50, name: 'E. de Verdura', price: 850, quantity:1 },
  ],
  'Sandwiches': [
    { id: 51, name: 'Haburguesa Simple', price: 4000, quantity:1 },
    { id: 52, name: 'Hamburguesa Doble', price: 4500, quantity:1 },
    { id: 53, name: 'Hamburguesa Cheddar', price: 4750, quantity:1 },
    { id: 54, name: 'Milanesa Completa', price: 4500, quantity:1 },
  ],

  'Bebidas': [
    { id: 60, name: 'Coca Cola 1.5 L', price: 2200, quantity:1 },
    { id: 61, name: 'Coca Cola Zero 1.5 L', price: 2200, quantity:1 },
    { id: 62, name: 'Sprite 1.5 L', price: 2200, quantity:1 },
    { id: 63, name: 'Lata Cerveza Imperial Rubia', price: 1800, quantity:1 },
    { id: 64, name: 'Lata Cerveza Imperial Apa', price: 1800, quantity:1 },
    { id: 65, name: 'Lata Cerveza Imperial Roja', price: 1800, quantity:1 },
  ],

};

// Llamamos a la función loadCategories al cargar la página para cargar las categorías
window.onload = function() {
  loadCategories();
};

// Función para cargar las categorías
function loadCategories() {
  const categoriesElement = document.getElementById('categories');
  
  categories.forEach(category => {
    const button = document.createElement('button');
    button.className = "categorias-btn";
    button.textContent = category;
    button.addEventListener('click', () => filterCategory(category));
    categoriesElement.appendChild(button);
  });
}

// Función para cargar los productos de una categoría
function filterCategory(category) {
  const menu = document.getElementById('menu');
  menu.innerHTML = '';

  products[category].forEach(product => {
    const productHTML = `
    <div class="productInicio">
    <h3>${product.name}</h3>
    <div class="details">
      <p>Precio: $${product.price}</p>
      <button class="btnAgregarCarrito" onclick="addToCart('${product.name}', ${product.price}, ${product.quantity}, ${product.id})">Agregar al carrito</button>
    </div>
    `;
    menu.insertAdjacentHTML('beforeend', productHTML);
  });

}

// Array para almacenar los productos seleccionados en el carrito
let cart = [];

// Función para agregar productos al carrito
function addToCart(productName, productPrice, productQuantity, productId,) {
  // Crear un objeto que representa el producto seleccionado
  const product = {
    name: productName,
    price: productPrice,
    quantity: productQuantity,
    id: productId,
  };

  //Ponemos un mensaje de 2 segundos cada vez que se aprete el boton Agregar al carrito
  const mensaje = document.createElement('div');
  mensaje.textContent = 'Añadido al Carrito';
  mensaje.classList.add('mensajeTemporal');
  document.body.appendChild(mensaje);

  // Después de 2 segundos, eliminamos el mensaje temporal
  setTimeout(() => {
    mensaje.remove();
  }, 500);

  // Agregar el producto al carrito
  cart.push(product);

  // Recorrer la lista de productos en el carrito y actualizar la interfaz de usuario
  let total = 0;
  console.log(cart);

}


// Función para enviar el pedido por WhatsApp
function sendOrder() {

  // Formar el mensaje del pedido

  let mensajePedido =`----------------------------------\n`;
  mensajePedido    += `   PEDIDO:    \n`;
  let total = 0; // Inicializa una variable para almacenar el total
  


    const salaSeleccionada = document.getElementById('sala').value;
    const ubicacion = document.getElementById('ubicacion').value;
    cart.forEach(item => {
      mensajePedido += ` ${item.name} - $${item.price}\n`;
      total += item.price; // Agrega el precio del artículo al total
  });
  
  
  mensajePedido +=`----------------------------------\n`;
  mensajePedido += `Total: $${totalPrecio}\n`; // Agrega una línea para mostrar el total
  mensajePedido +=`----------------------------------\n`;
  mensajePedido += `${salaSeleccionada}\n ${ubicacion}\n`;
  mensajePedido +=`----------------------------------\n`;
  



  // Enviar el pedido a través de WhatsApp
  const numeroWhatsApp = '+5492364265933'; // Reemplaza con tu número de WhatsApp
  const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajePedido)}`;

  // Abrir WhatsApp en una nueva pestaña
  window.open(enlaceWhatsApp, '_blank');

}



