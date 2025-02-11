document.addEventListener("DOMContentLoaded", function () {
    if (typeof particlesJS === "undefined") {
        console.error("particles.js is not loaded!");
        return;
    }

    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 100, // More particles for a denser, dynamic look
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#6C5B7B", "#C06C84", "#F67280", "#F8B195"] // Modern gradient colors
            },
            "shape": {
                "type": "circle", // Simple circles for a clean look
                "stroke": {
                    "width": 0, // No stroke for minimalism
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5 // Optional: Use polygons for variety
                }
            },
            "opacity": {
                "value": 0.8, // Slightly transparent particles
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.2,
                    "sync": false
                }
            },
            "size": {
                "value": 4, // Slightly larger particles
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.5,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true, // Enable connecting lines
                "distance": 150,
                "color": "#C06C84", // Modern accent color
                "opacity": 0.5,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2.5, // Faster movement for a dynamic feel
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "bounce", // Particles bounce off edges
                "bounce": true,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab" // Particles grab on hover
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse" // Particles repel on click
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 200,
                    "line_linked": {
                        "opacity": 1 // Highlight connections on hover
                    }
                },
                "repulse": {
                    "distance": 150, // Repel particles on click
                    "duration": 0.4
                },
                "bubble": {
                    "distance": 250,
                    "size": 8,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                }
            }
        },
        "retina_detect": true // Optimize for retina displays
    });

    console.log("particles.js initialized successfully!");
});