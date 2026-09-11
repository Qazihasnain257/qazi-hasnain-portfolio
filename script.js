/* ==========================================
   AI Portfolio - script.js
========================================== */

// ===============================
// Loading Screen
// ===============================

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 500);

        }, 1000);
    }
});

// ===============================
// Typing Animation
// ===============================

const typingText = document.querySelector(".typing");

if (typingText) {

    const words = [
        "AI Enthusiast",
        "Machine Learning Learner",
        "Web Developer",
        "Computer Science Student"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingText.textContent = currentWord.substring(0, charIndex++);

            if (charIndex > currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1200);
                return;
            }

        } else {

            typingText.textContent = currentWord.substring(0, charIndex--);

            if (charIndex < 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

        }

        setTimeout(typeEffect, deleting ? 50 : 100);

    }

    typeEffect();
}

// ===============================
// Counter Animation
// ===============================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let count = 0;

            const update = () => {

                count += Math.ceil(target / 100);

                if (count >= target) {

                    counter.innerText = target;

                } else {

                    counter.innerText = count;

                    requestAnimationFrame(update);

                }

            };

            update();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter => counterObserver.observe(counter));

// ===============================
// Skill Bars
// ===============================

const bars = document.querySelectorAll(".progress-bar");

const skillObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.width = entry.target.dataset.width;

        }

    });

}, { threshold: 0.4 });

bars.forEach(bar => skillObserver.observe(bar));

// ===============================
// Project Filter
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        projects.forEach(project => {

            if (filter === "all" || project.dataset.category === filter) {

                project.style.display = "block";

            } else {

                project.style.display = "none";

            }

        });

    });

});

// ===============================
// Contact Form - Backend API
// ===============================

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        try {

            const response = await fetch("http://127.0.0.1:5000/api/messages", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: subject + ": " + message
                })

            });

            const data = await response.json();

            if (response.ok) {

                alert("Thank you! Your message has been sent successfully.");

                form.reset();

            } else {

                alert(data.error || "Something went wrong.");

            }

        } catch (error) {

            console.error("Error:", error);

            alert("Unable to connect to the server. Please try again.");

        }

    });

}

// ===============================
// Scroll To Top
// ===============================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 400) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// ===============================
// Active Navigation
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
// ===============================
// Scroll Progress Bar
// ===============================

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});
// ==========================
// Cursor Glow
// ==========================

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove",(e)=>{

glow.style.left = e.clientX + "px";

glow.style.top = e.clientY + "px";

});
// ======================================
// Terminal Typing Animation
// ======================================

const terminalLines=document.querySelectorAll(".terminal-body p");

terminalLines.forEach((line,index)=>{

line.style.opacity=0;

setTimeout(()=>{

line.style.transition="1s";

line.style.opacity=1;

},700*index);

});
// =================================
// PROJECT POPUP
// =================================

const modal=document.getElementById("projectModal");

const close=document.querySelector(".close");

document.querySelectorAll(".project-card").forEach(card=>{

card.addEventListener("click",()=>{

document.getElementById("modalImage").src=

card.querySelector("img").src;

document.getElementById("modalTitle").innerHTML=

card.querySelector("h3").innerHTML;

document.getElementById("modalDescription").innerHTML=

card.querySelector("p").innerHTML;

modal.style.display="flex";

});

});

close.onclick=()=>{

modal.style.display="none";

}

window.onclick=(e)=>{

if(e.target===modal){

modal.style.display="none";

}

}
// ==========================
// AI Assistant
// ==========================

const aiButton=document.getElementById("aiButton");

const aiChat=document.getElementById("aiChat");

aiButton.addEventListener("click",()=>{

if(aiChat.style.display==="block"){

aiChat.style.display="none";

}

else{

aiChat.style.display="block";

}

});