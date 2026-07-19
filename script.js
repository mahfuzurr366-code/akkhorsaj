window.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. PREMIUM LIGHTBOX SYSTEM (FIXED)
    // ==========================================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");
    // নতুন HTML অনুযায়ী ক্লাস সিলেক্টর .art-card করা হলো
    const images = document.querySelectorAll(".art-card img");

    if (lightbox && lightboxImg && images.length > 0) {
        images.forEach((img) => {
            img.addEventListener("click", function () {
                lightbox.style.display = "flex";
                lightbox.setAttribute("aria-hidden", "false");
                lightboxImg.src = this.src;
            });
        });

        if (closeBtn) {
            closeBtn.onclick = function () {
                lightbox.style.display = "none";
                lightbox.setAttribute("aria-hidden", "true");
            };
        }

        lightbox.onclick = function (e) {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
                lightbox.setAttribute("aria-hidden", "true");
            }
        };
    }

    // ==========================================
    // 2. GALLERY FILTER & SEARCH SYSTEM (FIXED)
    // ==========================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    // নতুন HTML অনুযায়ী ক্লাস সিলেক্টর .art-card করা হলো
    const cards = document.querySelectorAll(".art-card");
    const searchInput = document.getElementById("searchInput");

    function filterArticles() {
        const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
        const activeBtn = document.querySelector(".filter-btn.active");
        const activeFilter = activeBtn ? activeBtn.dataset.filter : "all";

        cards.forEach(card => {
            const titleElement = card.querySelector(".art-title");
            const title = titleElement ? titleElement.textContent.toLowerCase() : "";
            const category = card.dataset.category;

            const matchesSearch = title.includes(searchValue);
            const matchesFilter = (activeFilter === "all" || category === activeFilter);

            // গ্রিড লেআউট ঠিক রাখতে block-এর বদলে flex ব্যবহার করা নিরাপদ
            if (matchesSearch && matchesFilter) {
                card.style.display = "flex"; 
            } else {
                card.style.display = "none";
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            filterArticles();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("keyup", filterArticles);
    }
});

// ==========================================
// 3. DYNAMIC LUXURY COPY FUNCTION (FIXED)
// ==========================================
// HTML-এর onclick="copyNumber()" ফাংশনের সাথে মেলানোর জন্য প্যারামিটার সহজ করা হলো
function copyNumber() {
    const numberElement = document.getElementById("bkashNumber");
    // HTML-এ থাকা নির্দিষ্ট বাতনকে সিলেক্ট করা হলো
    const buttonElement = document.querySelector(".btn-copy"); 
    
    if (!numberElement || !buttonElement) return;

    const number = numberElement.innerText.trim();

    navigator.clipboard.writeText(number).then(() => {
        // আইকনসহ টেক্সট চেঞ্জ করার লাক্সারি অ্যানিমেশন
        const originalHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = '<span style="font-size: 11px; font-weight: 600; color: #c5a880; letter-spacing: 1px;">COPIED!</span>';
        buttonElement.disabled = true;

        setTimeout(() => {
            buttonElement.innerHTML = originalHTML;
            buttonElement.disabled = false;
        }, 2000);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}