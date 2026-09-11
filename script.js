let currentLanguage = "en";
let cart = [];

const languageBtn = document.getElementById("languageBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");

const cartBtn = document.getElementById("cartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

const checkoutOverlay = document.getElementById("checkoutOverlay");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");

const WHATSAPP_NUMBER = "201014111440";

/* LANGUAGE */
function updateLanguage() {
    document.querySelectorAll("[data-en][data-ar]").forEach((el) => {
        el.innerHTML = el.dataset[currentLanguage];
    });

    document.querySelectorAll("[data-placeholder-en][data-placeholder-ar]").forEach((el) => {
        el.placeholder = currentLanguage === "ar"
            ? el.dataset.placeholderAr
            : el.dataset.placeholderEn;
    });

    document.body.classList.toggle("arabic", currentLanguage === "ar");
    document.documentElement.lang = currentLanguage;

    languageBtn.textContent = currentLanguage === "en" ? "AR" : "EN";

    renderCart();
}

languageBtn.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "ar" : "en";
    updateLanguage();
});

/* MOBILE MENU */
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("active"));
});

/* NAVBAR SCROLL */
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
});

/* CART */
function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
    openCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    cartCount.textContent = cart.length;

    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
    cartTotal.textContent = `${total} EGP`;

    if (!cart.length) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>
                    ${currentLanguage === "ar"
                        ? "السلة فارغة حاليًا"
                        : "Your cart is currently empty"}
                </span>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div>
                <h4>${escapeHtml(item.name)}</h4>
                <small>${Number(item.price).toLocaleString()} EGP</small>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                ${currentLanguage === "ar" ? "حذف" : "Remove"}
            </button>
        </div>
    `).join("");
}

function openCart() {
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeCartPanel() {
    cartOverlay.classList.remove("active");
    if (!checkoutOverlay.classList.contains("active")) {
        document.body.style.overflow = "";
    }
}

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", (e) => {
    if (e.target === cartOverlay) closeCartPanel();
});

/* CHECKOUT */
checkoutBtn.addEventListener("click", () => {
    if (!cart.length) {
        alert(currentLanguage === "ar"
            ? "السلة فارغة. أضف منتجًا أولًا."
            : "Your cart is empty. Add a product first.");
        return;
    }

    closeCartPanel();
    checkoutOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
});

closeCheckout.addEventListener("click", () => {
    checkoutOverlay.classList.remove("active");
    document.body.style.overflow = "";
});

checkoutOverlay.addEventListener("click", (e) => {
    if (e.target === checkoutOverlay) {
        checkoutOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
});

checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!cart.length) return;

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const notes = document.getElementById("customerNotes").value.trim();

    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

    const products = cart.map((item, index) =>
        `${index + 1}. ${item.name} - ${item.price} EGP`
    ).join("\n");

    const message = currentLanguage === "ar"
        ? `مرحبًا رويال فلاورز 🌹

أرغب في تأكيد هذا الطلب:

${products}

الإجمالي: ${total} EGP

بيانات العميل:
الاسم: ${name}
رقم الهاتف: ${phone}
العنوان: ${address}
ملاحظات: ${notes || "لا توجد"}`

        : `Hello Royal Flowers 🌹

I would like to confirm this order:

${products}

Total: ${total} EGP

Customer Details:
Name: ${name}
Phone: ${phone}
Address: ${address}
Notes: ${notes || "None"}`;

    const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    checkoutForm.reset();
});

/* PRODUCTS */
const naturalProducts = [
    750, 750, 1000, 1200, 850, 650, 750, 650, 1100, 750,
    750, 1000, 1500, 1300, 1500, 2000, 2000, 750, 1500, 1200,
    2500, 1200, 850, 900, 1500, 500, 200, 300, 750, 1800,
    1650, 400, 25, 50, 600
];

const artificialProducts = [
    1500, 1500, 900, 750, 1200, 1500, 1000, 1000, 850, 750,
    850, 1200, 1500, 750, 750, 850, 1200, 2000, 1400, 850,
    1300, 500, 1000, 1100, 1200, 850, 3000, 900, 800, 1200,
    650, 750, 1500, 180
];

const chocolateProducts = [
    2000, 1500, 1600, null, 200, 2700, 1400, 750, 3000,
    3000, 2000, 3000, 1700, 1500, 1300, 2500, 3000
];

const carsProducts = [
    1000, 750, 1200, 850, 1500, 1800, 1600,
    1800, 1000, 1500, 1500, 700, 850
];

const naturalData = naturalProducts.map((price, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
        id: `natural-${index + 1}`,
        price,
        image: `images/natural/${number}.jpeg`,
        cartNameEn: `Natural Bouquet ${number}`,
        cartNameAr: `بوكيه ورد طبيعي ${index + 1}`
    };
});

// Artificial bouquets use the actual filenames 33–66.
const artificialImageNumbers = Array.from({ length: 34 }, (_, i) => i + 33);
const artificialData = artificialProducts.map((price, index) => {
    const number = artificialImageNumbers[index];
    return {
        id: `artificial-${number}`,
        price,
        image: `images/artificial/${number}.jpeg`,
        cartNameEn: `Artificial Bouquet ${number}`,
        cartNameAr: `بوكيه ورد صناعي ${number}`
    };
});

// Flowers & chocolates use the actual filenames 66–82.
const chocolateImageNumbers = Array.from({ length: 17 }, (_, i) => i + 66);
const chocolateData = chocolateProducts.map((price, index) => {
    const number = chocolateImageNumbers[index];
    return {
        id: `chocolate-${number}`,
        price,
        image: `images/chocolate/${number}.jpeg`,
        cartNameEn: `Flowers & Chocolates ${number}`,
        cartNameAr: `ورد وشوكولاتة ${number}`
    };
});

const carsData = carsProducts.map((price, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
        id: `car-${index + 1}`,
        price,
        image: `images/cars/${number}.jpeg`,
        cartNameEn: `Car Decoration ${number}`,
        cartNameAr: `تزيين سيارة ${index + 1}`
    };
});

function renderProducts(data, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    grid.innerHTML = data.map((product) => `
        <article class="product-card reveal">
            <div class="product-image-frame">
                <div class="product-image-wrap">
                    <img src="${product.image}"
                         alt="Product ${product.id}"
                         loading="lazy"
                         class="product-clickable-image">
                </div>
                <div class="product-frame-shine"></div>
            </div>

            <div class="product-info">
                ${product.price !== null ? `
                    <strong class="product-price">${product.price.toLocaleString()} EGP</strong>
                    <button class="product-add" type="button"
                            onclick="addToCart(currentLanguage === 'ar' ? '${product.cartNameAr}' : '${product.cartNameEn}', ${product.price})">
                        <span data-en="ADD TO CART" data-ar="أضف إلى السلة">ADD TO CART</span>
                        <span>+</span>
                    </button>
                ` : `
                    <strong class="product-price no-price" data-en="Price on request" data-ar="السعر عند الطلب">Price on request</strong>
                    <button class="product-add" type="button"
                            onclick="contactForProduct('${product.cartNameEn}', '${product.cartNameAr}')">
                        <span data-en="CONTACT US" data-ar="تواصل معنا">CONTACT US</span>
                        <span>→</span>
                    </button>
                `}
            </div>
        </article>
    `).join("");

    grid.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
}

function contactForProduct(nameEn, nameAr) {
    const name = currentLanguage === "ar" ? nameAr : nameEn;
    const message = currentLanguage === "ar"
        ? `مرحبًا رويال فلاورز 🌹\nأرغب في معرفة سعر المنتج رقم ${name.split(" ").pop()}.`
        : `Hello Royal Flowers 🌹\nI would like to know the price of product #${name.split(" ").pop()}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
}

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/* CATEGORY CLICK */
document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", (e) => {
        e.preventDefault();
        const category = card.dataset.category;
        const sections = {
            natural: "natural-products",
            artificial: "artificial-products",
            chocolate: "chocolate-products",
            cars: "cars-products"
        };
        if (sections[category]) scrollToSection(sections[category]);
    });
});

/* IMAGE LIGHTBOX */
const imageLightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

function closeLightbox() {
    if (!imageLightbox) return;
    imageLightbox.classList.remove("active");
    imageLightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lightboxImage) lightboxImage.src = "";
}

if (imageLightbox && lightboxImage) {
    document.addEventListener("click", (e) => {
        const img = e.target.closest(".product-clickable-image");
        if (!img) return;
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || "Product Preview";
        imageLightbox.classList.add("active");
        imageLightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });

    lightboxClose?.addEventListener("click", (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    imageLightbox.addEventListener("click", (e) => {
        if (e.target === imageLightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeLightbox();
    });
}

/* SCROLL REVEAL */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
});

/* SAFETY */
function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* INITIAL */
updateLanguage();
renderProducts(naturalData, "naturalProductsGrid");
renderProducts(artificialData, "artificialProductsGrid");
renderProducts(chocolateData, "chocolateProductsGrid");
renderProducts(carsData, "carsProductsGrid");

/* Expose cart functions for product cards */
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
