// استهداف العناصر
const cartIcon = document.querySelector('.icons .fa-shopping-cart');

// 1. وظيفة لتحديث رقم السلة (مجموع الكميات)
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('flowers_cart')) || [];
    
    // حساب مجموع الـ quantity لكل المنتجات
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    
    let badge = document.getElementById('cart-badge');
    
    if (!badge) {
        badge = document.createElement('span');
        badge.id = 'cart-badge';
        // التعديل هنا: بنضيف الرقم "جوه" أيقونة العربية عشان يثبت مكانه
        cartIcon.appendChild(badge);
    }

    badge.innerText = totalQuantity;
    
    // يظهر كدائرة (flex) لو فيه منتجات ويختفي لو فاضية
    badge.style.display = totalQuantity > 0 ? 'flex' : 'none';
}

// 2. وظيفة إظهار التنبيه (Custom Notification)
function showNotification(name, img) {
    const existingNotify = document.querySelector('.custom-notification');
    if (existingNotify) existingNotify.remove();

    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerHTML = `
        <img src="${img}" alt="${name}">
        <div class="msg-content">
            <h4>${name}</h4>
            <p>تمت الإضافة للسلة بنجاح 🌸</p>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 50);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// 3. كود إضافة المنتج مع منع التكرار وزيادة الكمية
document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const productBox = button.closest('.box');
        const name = productBox.querySelector('h3').innerText;
        const price = productBox.querySelector('.price').innerText.split('\n')[0];
        const image = productBox.querySelector('img').src;

        let cart = JSON.parse(localStorage.getItem('flowers_cart')) || [];

        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        localStorage.setItem('flowers_cart', JSON.stringify(cart));

        updateCartBadge();
        showNotification(name, image);
    });
});

updateCartBadge();