// Main JavaScript for Perth Bond Cleaner
document.addEventListener('DOMContentLoaded', function () {
    /* ================= NAVBAR SCROLL ================= */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.padding = '1rem 0';
            }
        });
    }

    /* ================= SAFE ANALYTICS HELPER ================= */
    function safeGtag(eventName, params) {
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, params);
        }
    }

    /* ================= PHONE CLICK TRACKING ================= */
    document.querySelectorAll('a[href^="tel:"]').forEach(phone => {
        phone.addEventListener('click', () => {
            safeGtag('phone_click', {
                event_category: 'engagement',
                event_label: 'Phone Call'
            });
        });
    });

    /* ================= WHATSAPP CLICK TRACKING ================= */
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(link => {
        link.addEventListener('click', () => {
            safeGtag('whatsapp_click', {
                event_category: 'engagement',
                event_label: 'WhatsApp Message'
            });
        });
    });

    /* ================= IMPORTANT =================
       ❌ DO NOT INTERCEPT FORM SUBMISSION
       ✅ Netlify must handle it natively
    ================================================= */

    /* ================= INPUT VALIDATION UI ONLY ================= */
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', function () {
            this.classList.remove('is-invalid');
        });
    });

    /* ================= SERVICE CARD ANIMATION ================= */
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    /* ================= SMOOTH SCROLL ================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    /* ================= PRICE CALCULATOR ================= */
    const priceCalculator = document.getElementById('priceCalculator');
    if (priceCalculator) {
        const bedroomsSelect = document.getElementById('bedrooms');
        const extrasCheckboxes = document.querySelectorAll('.extra-service');
        const totalPriceEl = document.getElementById('totalPrice');
        
        function updatePrice() {
            let total = 299; // Base price
            
            // Add bedroom charges if any
            const bedrooms = parseInt(bedroomsSelect.value) || 0;
            if (bedrooms > 4) {
                total += (bedrooms - 4) * 50; // $50 per extra bedroom
            }
            
            // Add extras
            extrasCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    total += parseInt(checkbox.dataset.price || 0);
                }
            });
            
            // Update display
            totalPriceEl.textContent = `$${total}`;
        }
        
        bedroomsSelect.addEventListener('change', updatePrice);
        extrasCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updatePrice);
        });
    }

    /* ================= LAZY LOADING IMAGES ================= */
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    /* ================= AOS FADE-IN ================= */
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('fade-in');
    });

    /* ================= BACK TO TOP BUTTON ================= */
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'btn btn-success back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        z-index: 1000;
    `;
    document.body.appendChild(backToTop);
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
    });

    /* ================= TOOLTIP INIT ================= */
    if (window.bootstrap) {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }
});

/* ================= WHATSAPP QUICK MESSAGE ================= */
function sendWhatsAppMessage() {
    const message = "Hi, I'm interested in your bond cleaning service starting at $299. Can you provide more information?";
    window.open(`https://wa.me/61452366782?text=${encodeURIComponent(message)}`, '_blank');
}

/* ================= BOOK NOW ================= */
function bookNow() {
    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
    bookingModal.show();
}

/* ================= UPDATE SERVICE PRICE ================= */
function updateServicePrice(service) {
    const prices = {
        'bond': 299,
        'carpet': 99,
        'oven': 79,
        'window': 129,
        'wall': 149,
        'blind': 89
    };
    
    const priceElement = document.getElementById('selectedPrice');
    if (priceElement && prices[service]) {
        priceElement.textContent = `$${prices[service]}`;
    }
}