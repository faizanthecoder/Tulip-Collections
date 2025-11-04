emailjs.init("Bf2O8gq5fTzog_Vry");

document.addEventListener('DOMContentLoaded', () => {

    // ---------- POPUP + FAVOURITES FEATURE ---------- //

    const images = document.querySelectorAll("img");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popupImg");
    const popupDetails = document.getElementById("popupDetails");
    const closeBtn = document.getElementById("closeBtn");
    const saveBtn = document.getElementById("saveBtn"); // <-- add this button inside your popup HTML

    let currentImageData = null; // will hold data of the clicked image

    images.forEach(img => {
        img.addEventListener("click", () => {
            // Store current image info
            currentImageData = {
                src: img.src,
                name: img.getAttribute("data-img_name"),
                price: img.getAttribute("data-img_price"),
                madewith: img.getAttribute("data-img_madewith")
            };

            // Update popup content
            popupImg.src = currentImageData.src;
            popupDetails.innerHTML = `
                <strong>${currentImageData.name}</strong><br>
                Made with: ${currentImageData.madewith}<br>
                Price: ${currentImageData.price}
            `;

            // Show popup
            popup.classList.add("active");
        });
    });

    // Close popup
    closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
    });

    // Close popup by clicking outside the image
    popup.addEventListener("click", (e) => {
        if (e.target === popup) popup.classList.remove("active");
    });

    // Save to favourites (only when Save button is clicked)
    saveBtn.addEventListener("click", () => {
        if (!currentImageData) return;

        let favs = JSON.parse(localStorage.getItem("favourites")) || [];
        let alreadySaved = favs.some(f => f.src === currentImageData.src);

        if (!alreadySaved) {
            favs.push(currentImageData);
            localStorage.setItem("favourites", JSON.stringify(favs));
            saveBtn.textContent = "✅ Saved!";
            setTimeout(() => saveBtn.textContent = "❤️ Save", 1200);
        } else {
            alert("Already in favourites!");
        }
    });



    // ---------- BUY MODAL FEATURE ---------- //

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



    // ---------- SHOW MORE FEATURE ---------- //

    const imagess = document.querySelectorAll(".art-item");
    const showMoreBtn = document.getElementById("showMoreBtn");

    let imagessPerPage = 6; // number of images to show initially
    let currentIndex = 0;

    // hide all initially
    imagess.forEach(img => img.style.display = "none");

    // show first batch
    function showImagess() {
        const nextIndex = currentIndex + imagessPerPage;
        for (let i = currentIndex; i < nextIndex && i < imagess.length; i++) {
            imagess[i].style.display = "block";
        }
        currentIndex += imagessPerPage;

        // hide button if all images shown
        if (currentIndex >= imagess.length) {
            showMoreBtn.style.display = "none";
        }
    }

    // initial load
    showImagess();

    // button click handler
    showMoreBtn.addEventListener("click", showImagess);



    // ---------- EMAILJS ORDER FEATURE ---------- //

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



    // ---------- CONTACT FORM FEATURE ---------- //

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! The artist will get back to you soon.');
        contactForm.reset();
    });
});
