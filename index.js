emailjs.init("Bf2O8gq5fTzog_Vry");

document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-btn');
    let selectedTitle = '';
    let selectedPrice = '';

    const orderModal = document.getElementById('order-modal');
    const closeModalBtn = document.querySelector('.close');
    const orderForm = document.getElementById('order-form');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedTitle = button.getAttribute('data-title');
            selectedPrice = button.getAttribute('data-price');
            orderModal.style.display = 'block';
        });
    });

    closeModalBtn.addEventListener('click', () => {
        orderModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == orderModal) {
            orderModal.style.display = 'none';
        }
    });

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const buyerName = document.getElementById('buyer-name').value;
        const buyerEmail = document.getElementById('buyer-email').value;
        const buyerAddress = document.getElementById('buyer-address').value;
        const buyerPhone = document.getElementById('buyer-phone').value;
        const buyerMessage = document.getElementById('buyer-message').value;

        const templateParams = {
            title: selectedTitle,
            price: selectedPrice,
            buyer_name: buyerName,
            buyer_email: buyerEmail,
            buyer_address: buyerAddress,
            buyer_phone: buyerPhone,
            buyer_message: buyerMessage
        };

        emailjs.send('service_5e0yfwo', 'template_jsriq8m', templateParams)
            .then(() => {
                alert('Order placed successfully! The artist will contact you soon.');
                orderModal.style.display = 'none';
                orderForm.reset();
            }, (error) => {
                alert('Failed to send order. Please try again later.');
                console.error('EmailJS error:', error);
            });
    });

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! The artist will get back to you soon.');
        contactForm.reset();
    });
});
