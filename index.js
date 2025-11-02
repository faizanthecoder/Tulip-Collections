emailjs.init("Bf2O8gq5fTzog_Vry");

document.addEventListener('DOMContentLoaded', () => {

    const images = document.querySelectorAll("img");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popupImg");
    const popupDetails = document.getElementById("popupDetails");
    const closeBtn = document.getElementById("closeBtn");

    images.forEach(img => {
        img.addEventListener("click", () => {
            // let h3=document.querySelectorAll("h3")
            popupImg.src = img.src; // use clicked image
            popupDetails.innerHTML = `This painting name is ${img.getAttribute("data-img_name")}. It is made of water ${img.getAttribute("data-img_madewith")} <br> It's Price is ${img.getAttribute("data-img_price")}`; // use alt text as details

            // popupDetails.textContent = `This painting name is ${h3}.Its made of water pensil collors <br>Its Price is ${img.getAttribute("p")}`; // use alt text as details
            popup.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
    });

    // Close popup when clicking outside image
    popup.addEventListener("click", (e) => {
        if (e.target === popup) popup.classList.remove("active");
    });
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
