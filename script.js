// Matrix Rain Animation
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions to match window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters for the rain - Katakana, Numerals, etc.
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const charactersArray = characters.split("");

const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);

// Initialize drops - one for each column
const drops = [];
function initializeDrops() {
    drops.length = 0; // Clear existing drops
    columns = Math.floor(canvas.width / fontSize);
    for (let x = 0; x < columns; x++) {
        drops[x] = 1; // Start y-coordinate for each drop
    }
}
initializeDrops();

function drawMatrix() {
    // Semi-transparent black background for fading effect
    ctx.fillStyle = "rgba(17, 24, 39, 0.05)"; // bg-gray-900 with low alpha
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#059669"; // Emerald-600 for the rain
    ctx.font = fontSize + "px monospace";

    // Loop through drops
    for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Send the drop back to the top randomly after it has crossed the screen
        // or reset randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment y coordinate
        drops[i]++;
    }
}

// Animation loop
let animationInterval = setInterval(drawMatrix, 50); // Adjust speed here (milliseconds)

// Handle window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeDrops(); // Re-initialize drops based on new width
});


document.addEventListener("DOMContentLoaded", function() {

    // --- Hamburger Menu Toggle --- 
    const menuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // --- Close mobile menu when a link is clicked --- 
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (!mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.add("hidden");
            }
        });
    });

    // --- Smooth scrolling for navigation links (both desktop and mobile) --- 
    document.querySelectorAll("nav a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset if needed (e.g., for sticky header)
                const headerOffset = document.querySelector("nav").offsetHeight || 80; // Height of nav
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Fade-in sections on scroll --- 
    const sections = document.querySelectorAll(".fade-in-section");

    if (sections.length > 0) {
        const observerOptions = {
            root: null, // relative to document viewport 
            rootMargin: "0px",
            threshold: 0.15 // 15% of item is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    // Optional: Stop observing the element once it's visible
                    // observer.unobserve(entry.target);
                }
                // Optional: Remove class if element scrolls out of view
                // else {
                //     entry.target.classList.remove("is-visible");
                // }
            });
        };

        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => {
            intersectionObserver.observe(section);
        });
    }

    // Add any other JS enhancements here

});

