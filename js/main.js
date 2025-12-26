// Main JavaScript for Pearth Bond Cleaner
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.padding = '1rem 0';
        }
    });
    
    // Phone number click tracking
    const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
    phoneNumbers.forEach(phone => {
        phone.addEventListener('click', function() {
            gtag('event', 'phone_click', {
                'event_category': 'engagement',
                'event_label': 'Phone Call'
            });
        });
    });
    
    // WhatsApp click tracking
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'whatsapp_click', {
                'event_category': 'engagement',
                'event_label': 'WhatsApp Message'
            });
        });
    });
    
    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                return;
            }
            
            // Simulate API call
            setTimeout(() => {
                // Success message
                const successAlert = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <i class="fas fa-check-circle me-2"></i>
                        Thank you! Your request has been submitted successfully. We'll contact you within 24 hours.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                
                form.insertAdjacentHTML('beforebegin', successAlert);
                form.reset();
                
                // Remove loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Track form submission
                gtag('event', 'form_submit', {
                    'event_category': 'lead',
                    'event_label': form.id || 'contact_form'
                });
                
            }, 1500);
        });
    });
    
    // Remove validation styles on input
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });
    
    // Service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Price calculator functionality
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
    
    // Back to top button
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
        box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
    `;
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
    });
    
    // Lazy loading images
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
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Add loading animation to all elements with data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.add('fade-in');
    });
});

// WhatsApp message template
function sendWhatsAppMessage() {
    const message = "Hi, I'm interested in your bond cleaning service starting at $299. Can you provide more information?";
    const phone = "61452366782";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Book now function
function bookNow() {
    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
    bookingModal.show();
}

// Show pricing based on selection
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