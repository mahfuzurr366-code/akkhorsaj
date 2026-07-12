window.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");
    const images = document.querySelectorAll(".gallery .card img");

    console.log("Images Found:", images.length);

    images.forEach((img) => {

        img.addEventListener("click", function () {

            lightbox.style.display = "flex";
            lightboxImg.src = this.src;

        });

    });

    if (closeBtn) {

        closeBtn.onclick = function () {
            lightbox.style.display = "none";
        };

    }

    lightbox.onclick = function (e) {

        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }

    };

});// ==========================
// GALLERY FILTER
// ==========================

const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".gallery .card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Active Button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        cards.forEach(card => {

            if (filter === "all" || card.dataset.category === filter) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});// ==========================
// SEARCH
// ==========================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function(){

    const value = this.value.toLowerCase();

    cards.forEach(card=>{

        const title =
        card.querySelector("h3").textContent.toLowerCase();

        if(title.includes(value)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

});function copyNumber(){

    const number =
    document.getElementById("bkashNumber").innerText;

    navigator.clipboard.writeText(number);

    alert("bKash Number Copied!");
}