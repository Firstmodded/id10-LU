// Ensure the script runs after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Check if particlesJS is loaded
    if (typeof particlesJS === "undefined") {
        console.error("particles.js is not loaded!");
        return;
    }

    // Initialize particles.js
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#000000"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": true
            },
            "size": {
                "value": 3,
                "random": true
            },
            "move": {
                "enable": true,
                "speed": 1
            }
        },
        "interactivity": {
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                }
            }
        }
    });

    console.log("particles.js initialized successfully!");
});
